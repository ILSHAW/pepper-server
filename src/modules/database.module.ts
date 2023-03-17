import { MongooseModule } from "@nestjs/mongoose"
import { ConfigService } from "@nestjs/config"
import { Module } from "@nestjs/common"

import { ConfigModule } from "@/modules/config.module"
import { UserSchema } from "@/models/user.model"

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