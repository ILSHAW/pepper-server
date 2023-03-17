import { Document, Schema, Model } from "mongoose"

export interface IUser {
    login: string
    password: string
    role: string
    avatar: string
    name: string
    surname: string
    fathername: string
    department: string
    job: string
}
export interface IUserDocument extends IUser, Document {
    
}
export interface IUserModel extends Model<IUserDocument> {
    
}

export const UserSchema = new Schema<IUserDocument>({
    login: { type: Schema.Types.String },
    password: { type: Schema.Types.String },
    role: { type: Schema.Types.String, default: "user-2" },
    avatar: { type: Schema.Types.String, default: "default.png" },
    name: { type: Schema.Types.String },
    surname: { type: Schema.Types.String },
    fathername: { type: Schema.Types.String },
    department: { type: Schema.Types.String },
    job: { type: Schema.Types.String }
})