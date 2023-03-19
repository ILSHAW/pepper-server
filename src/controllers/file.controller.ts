import { Controller, Req, Res, UseGuards, Post, UseInterceptors, UploadedFiles, Get, Query } from "@nestjs/common"
import { FilesInterceptor } from "@nestjs/platform-express"
import { Request, Response } from "express"

import { FileService, DownloadDTO } from "@/services/file.service"
import { FileCountPipe } from "@/pipes/filecount.pipe"
import { FileTypePipe } from "@/pipes/filetype.pipe"
import { FileSizePipe } from "@/pipes/filesize.pipe"
import { AccessGuard } from "@/guards/access.guard"
import { Role } from "@/decorators/role.decorator"
import { RoleGuard } from "@/guards/role.guard"

@Controller("file")
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Post("")
    @Role(2, 1, 0)
    @UseGuards(AccessGuard, RoleGuard)
    @UseInterceptors(FilesInterceptor("files"))
    async upload(@Req() req: Request, @Res() res: Response, @UploadedFiles(new FileCountPipe(5), new FileSizePipe(20*1024*1024), new FileTypePipe("image/png", "image/jpeg", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword", "application/pdf")) files: Array<Express.Multer.File>) {
        return await this.fileService.upload(req, res, files)
    }
    @Get("")
    //@Role(2, 1, 0)
    //@UseGuards(AccessGuard, RoleGuard)
    async download(@Req() req: Request, @Res() res: Response, @Query() query: DownloadDTO) {
        return await this.fileService.download(req, res, query)
    }
}