import { Module } from "@nestjs/common"

import { MessageDatabaseModule, RoomDatabaseModule, UserDatabaseModule } from "@/modules/database.module"
import { ChatGateway } from "@/gateways/chat.gateway"

@Module({
    imports: [MessageDatabaseModule, RoomDatabaseModule, UserDatabaseModule],
    providers: [ChatGateway]
})
export class WebsocketModule {}
