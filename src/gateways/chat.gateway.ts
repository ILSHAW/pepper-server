import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, ConnectedSocket, MessageBody } from "@nestjs/websockets"
import { InjectModel } from "@nestjs/mongoose"
import { Server, Socket } from "socket.io"
import * as jwt from "jsonwebtoken"

import { IMessageModel } from "@/models/message.model"
import { IRoomModel } from "@/models/room.model"
import { IUserModel } from "@/models/user.model"

class RequestMessage {
    room: string
    author: string
    message: string
    attachments: string[]
}

@WebSocketGateway({
    cors: {
        origin: "*",
        methods: ['GET', 'POST'],
        transports: ['websocket', 'polling'],
        credentials: true
    }
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    @WebSocketServer()
    private readonly server: Server;

    constructor(@InjectModel("MESSAGE") private messageModel: IMessageModel, @InjectModel("ROOM") private roomModel: IRoomModel, @InjectModel("USER") private userModel: IUserModel) {}

    @SubscribeMessage("message")
    async message(@ConnectedSocket() client: Socket, @MessageBody() data: RequestMessage) {
        const message = await this.messageModel.create({
            author: data.author,
            message: data.message,
            timestamp: new Date().getTime(),
            attachments: data.attachments
        })

        await this.roomModel.updateOne({ _id: data.room }, { $push: { messages: message.id } })

        this.server.to([data.room, client.id]).emit("message", { status: "OK", message: {
            author: message.author,
            message: message.message,
            timestamp: message.timestamp,
            attachments: message.attachments
        }})
    }

    afterInit() {
        console.log("Chat gateway initialized")
    }
    handleDisconnect() {
        console.log("User disconnected")
    }
    async handleConnection(client: Socket) {
        const payload = jwt.decode(client.request.headers?.authorization?.match(/(?:[\w-]*\.){2}[\w-]*$/)[0]) as { id: string }
        const user = await this.userModel.findById(payload.id)
        
        await client.join(user.rooms.map((id) => String(id)))

        this.server.to(client.id).emit("connected", { status: "OK" })
    }
}