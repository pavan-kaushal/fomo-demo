import { Document, model, Model, Schema } from "mongoose"

export interface ICoin extends Document{
    sourceId: string,
    symbol: string,
    name: string,
    image: string,
    latestPrice: number,
}

const coinSchema = new Schema({
    sourceId: { type: Schema.Types.String, required: true, unique: true },
    symbol: { type: Schema.Types.String, required: true, unique: true },
    name: { type: Schema.Types.String, required: true },
    image: { type: Schema.Types.String, required: true },
    latestPrice: { type: Schema.Types.Number, required: true },
});

export const Coin: Model<ICoin> = model<ICoin>('Coin', coinSchema);