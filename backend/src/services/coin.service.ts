import environmentConfig from "../environment.config"
import axios from "axios";
import { CoinMarket } from "./data-interfaces";
import { Coin } from "../models/coin.model";
import { CoinHistory } from "../models/coin-history.model";

export const fetchCoinDataFromSource = async (ids?:string[]) => {
    const url = `https://api.coingecko.com/api/v3/coins/markets`
    try {
        const response = await axios.get<CoinMarket[]>(url, {
            params: {
                vs_currency: environmentConfig.currency,
                order: 'market_cap_desc',
                per_page: environmentConfig.coinCount,
                page: 1,
                ...(ids?.length ? {ids: ids?.join(',')} : {}),
                sparkline: 'false',
            },
            headers: {
              'X-CoinAPI-Key': environmentConfig.apiKey
            }
        });
        let now = new Date()
        for(let doc of response.data){
            const coin = await Coin.findOneAndUpdate({sourceId: doc.id}, {
                $set: {latestPrice: doc.current_price},
                $setOnInsert: {
                    symbol: doc.symbol,
                    name: doc.name,
                    image: doc.image,
                }
            }, {upsert: true})
            await CoinHistory.create({
                coin: coin?._id,
                time: now,
                price: coin?.latestPrice,
                dateString: now.toISOString().split('T')[0]
            })
        }
    } catch (error) {
        console.log("Couldnt fetch Coin data")
    }
}

export const coinList = async () => {
    return await Coin.find().sort({_id: 1}).lean()
}