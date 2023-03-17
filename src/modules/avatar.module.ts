import { Module } from "@nestjs/common"

import { ExceptionService } from "@/services/exception.service"
import { UserDatabaseModule } from "@/modules/database.module"
import { AvatarController } from "@/controllers/avatar.controller"
import { AvatarService } from "@/services/avatar.service"

@Module({
    imports: [UserDatabaseModule],
    controllers: [AvatarController],
    providers: [AvatarService, ExceptionService]
})
export class AvatarModule {}