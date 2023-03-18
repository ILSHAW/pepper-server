import { MongooseModule } from "@nestjs/mongoose"
import { ConfigService } from "@nestjs/config"
import { Module } from "@nestjs/common"

import { ConfigModule } from "@/modules/config.module"
import { MessageSchema } from "@/models/message.model"
import { UserSchema } from "@/models/user.model"
import { RoomSchema } from "@/models/room.model"

const databaseModule = MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (config: ConfigService) => ({ 
        uri: `mongodb://${config.get("database.host")}:${config.get("database.port")}/${config.get("database.name")}` 
    }),
    inject: [ConfigService]
})
const userDatabaseModule = MongooseModule.forFeature([
    { name: "USER", schema: UserSchema }
])
const messageDatabaseModule = MongooseModule.forFeature([
    { name: "MESSAGE", schema: MessageSchema }
])
const roomDatabaseModule = MongooseModule.forFeature([
    { name: "ROOM", schema: RoomSchema }
])

@Module({
    imports: [databaseModule],
    exports: [databaseModule]
})
export class DatabaseModule {}

@Module({
    imports: [userDatabaseModule],
    exports: [userDatabaseModule]
})
export class UserDatabaseModule {}

@Module({
    imports: [messageDatabaseModule],
    exports: [messageDatabaseModule]
})
export class MessageDatabaseModule {}

@Module({
    imports: [roomDatabaseModule],
    exports: [roomDatabaseModule]
})
export class RoomDatabaseModule {}