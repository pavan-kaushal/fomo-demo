import { Document, model, Model, Schema, Types } from "mongoose"
import { ICoin } from "./coin.model";

export interface ICoinHistory extends Document{
    coin: Types.ObjectId | ICoin,
    price: number,
    time: Date,
    dateString: string,
}

const coinHistorySchema = new Schema({
    coin: { type: Schema.Types.ObjectId, required: true },
    price: { type: Schema.Types.Number, required: true },
    time: { type: Schema.Types.Date, required: true },
    dateString: { type: Schema.Types.String, required: true },
});

coinHistorySchema.index({coin: 1})

export const CoinHistory: Model<ICoinHistory> = model<ICoinHistory>('CoinHistory', coinHistorySchema);