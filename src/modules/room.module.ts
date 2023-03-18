import { Module } from "@nestjs/common"

import { UserDatabaseModule, RoomDatabaseModule } from "@/modules/database.module"
import { ExceptionService } from "@/services/exception.service"
import { RoomController } from "@/controllers/room.controller"
import { AccessStrategy } from "@/strategies/access.strategy"
import { ConfigModule } from "@/modules/config.module"
import { RoomService } from "@/services/room.service"

@Module({
    imports: [UserDatabaseModule, RoomDatabaseModule, ConfigModule],
    controllers: [RoomController],
    providers: [RoomService, ExceptionService, AccessStrategy]
})
export class RoomModule {}