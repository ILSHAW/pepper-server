import { Document, Schema, Model } from "mongoose"

export interface IMessage {
    author: Schema.Types.ObjectId
    message: string
    timestamp: number,
    attachments: string[]
}
export interface IMessageDocument extends IMessage, Document {
    
}
export interface IMessageModel extends Model<IMessageDocument> {
    
}

export const MessageSchema = new Schema<IMessageDocument>({
    author: { type: Schema.Types.ObjectId, ref: "USER" },
    message: { type: Schema.Types.String },
    timestamp: { type: Schema.Types.Number },
    attachments: [{ type: Schema.Types.String }]
})