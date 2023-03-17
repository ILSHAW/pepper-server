import { Module } from "@nestjs/common"

import { ExceptionService } from "@/services/exception.service"
import { UserDatabaseModule } from "@/modules/database.module"
import { AuthController } from "@/controllers/auth.controller"
import { AccessStrategy } from "@/strategies/access.strategy"
import { SignupStrategy } from "@/strategies/signup.strategy"
import { LoginStrategy } from "@/strategies/login.strategy"
import { ConfigModule } from "@/modules/config.module"
import { AuthService } from "@/services/auth.service"

@Module({
	imports: [UserDatabaseModule, ConfigModule],
    controllers: [AuthController],
    providers: [AuthService, SignupStrategy, LoginStrategy, AccessStrategy, ExceptionService]
})
export class AuthModule {}