import { WsException } from "@nestjs/websockets"
import { Socket } from "socket.io"

export class WebsocketAuthMiddleware {
    middleware() {
        return (socket: Socket, next: any) => {
            throw new WsException("Unauthorized")
        }
    }
}