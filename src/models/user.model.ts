import { Document, Schema, Model } from "mongoose"

export interface IUser {
    login: string
    password: string
    role: string
    avatar: string
}
export interface IUserDocument extends IUser, Document {
    
}
export interface IUserModel extends Model<IUserDocument> {
    
}

export const UserSchema = new Schema<IUserDocument>({
    login: { type: Schema.Types.String },
    password: { type: Schema.Types.String },
    role: { type: Schema.Types.String, default: "user-2" },
    avatar: { type: Schema.Types.String, default: "default.png" }
})