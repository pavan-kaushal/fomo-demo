import * as cron from 'node-cron';
import environmentConfig from '../environment.config';
import { fetchCoinDataFromSource } from './coin.service';
import socket from '../socket';
import { Types } from 'mongoose';
import { CoinHistory } from '../models/coin-history.model';

export const scheduleCronToFetchCoinDataFromSource = () => {
    cron.schedule(environmentConfig.COIN_PRICE_CRON_CONFIG, async () => {
        console.log('Starting Cron for Fetching Coin Price');
        // await fetchCoinDataFromSource();
        console.log("Coin prices updated")
        socket.emitData('priceUpdates', null)
    }, {
        timezone: environmentConfig.timezone
    });
}

export const coinHistory  = async (coin: Types.ObjectId) => {
    const now = new Date()
    const data = await CoinHistory.aggregate([
        {
            $match: {
                coin,
                time: {$lte: now}
            }
        }, {
            $limit: environmentConfig.numberOfRecords
        }, {
            $sort: {
                _id: -1
            }
        }, {
            $setWindowFields: {
              output: {
                prevPrice: {
                  $shift: {
                    output: "$price",
                    by: -1,
                    default: null
                  }
                }
              }
            }
        }, {
            $addFields: {
              change: {
                $cond: {
                  if: { $ne: ["$prevPrice", null] },
                  then: {
                    $multiply: [
                      {
                        $divide: [
                          { $subtract: ["$price", "$prevPrice"] },
                          "$prevPrice"
                        ]
                      },
                      100
                    ]
                  },
                  else: null
                }
              }
            }
          }
    ])
    return data
}