import { IsNotEmpty, IsString, IsMongoId, IsArray, ArrayMinSize } from "class-validator"
import { InjectModel } from "@nestjs/mongoose"
import { Injectable } from "@nestjs/common"
import { Request, Response } from "express"

import { ExceptionService } from "@/services/exception.service"
import { IUserModel } from "@/models/user.model"
import { IRoomModel, IRoomDocument } from "@/models/room.model"
import { IMessageDocument } from "@/models/message.model"

export class CreateDTO {
    @IsArray({ message: "Members must be a array" })
    @ArrayMinSize(2, { message: "Members must contain at least 2 id" })
    @IsMongoId({ each: true, message: "Some id in members array is invalid" })
    @IsString({ each: true, message: "Some id in members array must be a string" })
    @IsNotEmpty({ each: true, message: "Some id in members array is required" })
    members: string[]
}

@Injectable()
export class RoomService {
	constructor(@InjectModel("USER") private userModel: IUserModel, private readonly exceptionService: ExceptionService, @InjectModel("ROOM") private roomModel: IRoomModel) {}

	async create(req: Request, res: Response, body: CreateDTO) {
        body.members.forEach(async (member) => {
            if(!await this.userModel.exists({ _id: member })) {
                throw this.exceptionService.notFound("Some user not found")
            }
        })

        const room = await this.roomModel.create({
            members: body.members,
            messages: []
        })

        body.members.forEach(async (member) => {
            await this.userModel.findOneAndUpdate({ _id: member }, { $push: { rooms: room.id } })
        })
        
        res.status(201).send({ status: 201, message: "Room successfully created" })
    }
    async get(req: Request, res: Response) {
        const user = await req.user.populate<{ rooms: Array<IRoomDocument> }>("rooms")
        const rooms = await Promise.all(user.rooms.map(async (room) => ({
            id: room.id,
            members: room.members,
            messages: await room.populate<{ messages: Array<IMessageDocument> }>("messages").then((room) => room.messages.map((message) => ({
                id: message.id,
                message: message.message,
                author: message.author,
                timestamp: message.timestamp,
                attachments: message.attachments
            })))
        })))

        res.send({ status: 200, message: "There is information about all user rooms", rooms })
    }
}