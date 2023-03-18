import { Module } from "@nestjs/common"

import { ExceptionService } from "@/services/exception.service"
import { FileController } from "@/controllers/file.controller"
import { FileService } from "@/services/file.service"

@Module({
    controllers: [FileController],
    providers: [FileService, ExceptionService]
})
export class FileModule {}