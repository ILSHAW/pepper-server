import { Module } from "@nestjs/common"

import { TokenController } from "@/controllers/token.controller"
import { ExceptionService } from "@/services/exception.service"
import { RefreshStrategy } from "@/strategies/refresh.strategy"
import { UserDatabaseModule } from "@/modules/database.module"
import { AccessStrategy } from "@/strategies/access.strategy"
import { TokenService } from "@/services/token.service"
import { ConfigModule } from "@/modules/config.module"

@Module({
    imports: [UserDatabaseModule, ConfigModule],
    controllers: [TokenController],
    providers: [TokenService, AccessStrategy, RefreshStrategy, ExceptionService]
})
export class TokenModule {}