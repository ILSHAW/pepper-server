import { Document, Schema, Model } from "mongoose"

export interface IRoom {
    members: Array<Schema.Types.ObjectId>
    messages: Array<Schema.Types.ObjectId>
}
export interface IRoomDocument extends IRoom, Document {
    
}
export interface IRoomModel extends Model<IRoomDocument> {
    
}

export const RoomSchema = new Schema<IRoomDocument>({
    members: [{ type: Schema.Types.ObjectId, ref: "USER" }],
    messages: [{ type: Schema.Types.ObjectId, ref: "MESSAGE" }]
})