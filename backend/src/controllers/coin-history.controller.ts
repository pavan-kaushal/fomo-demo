import { Controller, Get } from "@overnightjs/core";
import { coinList } from "../services/coin.service";
import responseMiddleware from "../utils/response.middleware";
import { Request, Response } from "express";
import { Types } from "mongoose";
import { coinHistory } from "../services/coin-history.service";

@Controller('coin-history')
export class CoinHistoryController {
    @Get('')
    async getCoins(req: Request, res: Response){
        try {
            const coin = req.query.coin;
            if(!coin){
                throw Error("Invalid Request")
            }
            const data = await coinHistory(new Types.ObjectId(coin as string))
            return responseMiddleware(res, true, 'success', data);
        } catch (error: any) {
            return responseMiddleware(res, false, error.message);
        }
    }
}