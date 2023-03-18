import { Module } from "@nestjs/common"

import { ExceptionService } from "@/services/exception.service"
import { UserDatabaseModule } from "@/modules/database.module"
import { UserController } from "@/controllers/user.controller"
import { AccessStrategy } from "@/strategies/access.strategy"
import { ResetStrategy } from "@/strategies/reset.strategy"
import { ConfigModule } from "@/modules/config.module"
import { UserService } from "@/services/user.service"

@Module({
    imports: [UserDatabaseModule, ConfigModule],
    controllers: [UserController],
    providers: [UserService, ExceptionService, ResetStrategy, AccessStrategy]
})
export class UserModule {}