import { Document, Schema, Model } from "mongoose"

export interface IUser {
    login: string
    password: string
    role: number
    avatar: string
    name: string
    surname: string
    fathername: string
    department: string
    job: string
    rooms: Array<Schema.Types.ObjectId>
}
export interface IUserDocument extends IUser, Document {
    
}
export interface IUserModel extends Model<IUserDocument> {
    
}

export const UserSchema = new Schema<IUserDocument>({
    login: { type: Schema.Types.String },
    password: { type: Schema.Types.String },
    role: { type: Schema.Types.Number, default: 2 },
    avatar: { type: Schema.Types.String, default: "default.png" },
    name: { type: Schema.Types.String },
    surname: { type: Schema.Types.String },
    fathername: { type: Schema.Types.String },
    department: { type: Schema.Types.String },
    job: { type: Schema.Types.String },
    rooms: [{ type: Schema.Types.ObjectId, ref: "ROOM" }]
})