import { Controller, Get } from "@overnightjs/core";
import { coinList } from "../services/coin.service";
import responseMiddleware from "../utils/response.middleware";
import { Request, Response } from "express";

@Controller('coin')
export class CoinController {
    @Get('')
    async getCoins(req: Request, res: Response){
        try {
            const coins = await coinList()
            return responseMiddleware(res, true, 'success', coins);
        } catch (error: any) {
            return responseMiddleware(res, false, error.message);
        }
    }
}