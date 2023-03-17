import { Module } from "@nestjs/common"

import { ExceptionService } from "@/services/exception.service"
import { UserDatabaseModule } from "@/modules/database.module"
import { UserController } from "@/controllers/user.controller"
import { UserService } from "@/services/user.service"

@Module({
    imports: [UserDatabaseModule],
    controllers: [UserController],
    providers: [UserService, ExceptionService]
})
export class UserModule {}