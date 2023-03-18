import { Controller, Req, Res, Get, UseGuards, Post, UseInterceptors, UploadedFiles, Param, Body } from "@nestjs/common"
import { FilesInterceptor } from "@nestjs/platform-express"
import { Request, Response } from "express"

import { AvatarIdDTO, AvatarService, ChangeDTO } from "@/services/avatar.service"
import { ValidationPipe } from "@/pipes/validation.pipe"
import { FileCountPipe } from "@/pipes/filecount.pipe"
import { FileTypePipe } from "@/pipes/filetype.pipe"
import { FileSizePipe } from "@/pipes/filesize.pipe"
import { AccessGuard } from "@/guards/access.guard"
import { Role } from "@/decorators/role.decorator"
import { RoleGuard } from "@/guards/role.guard"

@Controller("avatar")
export class AvatarController {
    constructor(private readonly avatarService: AvatarService) {}

    @Post("")
    @Role(2, 1, 0)
    @UseGuards(AccessGuard, RoleGuard)
    @UseInterceptors(FilesInterceptor("avatar"))
    async upload(@Req() req: Request, @Res() res: Response, @UploadedFiles(new FileCountPipe(1), new FileSizePipe(20*1024*1024), new FileTypePipe("image/png", "image/jpeg")) files: Array<Express.Multer.File>) {
        return await this.avatarService.upload(req, res, files)
    }
    @Get("")
    @Role(2, 1, 0)
    @UseGuards(AccessGuard, RoleGuard)
    async avatar(@Req() req: Request, @Res() res: Response) {
        return await this.avatarService.avatar(req, res)
    }
    @Get(":id")
    @Role(2, 1, 0)
    @UseGuards(AccessGuard, RoleGuard)
    async avatarid(@Req() req: Request, @Res() res: Response, @Param(ValidationPipe) params: AvatarIdDTO) {
        return await this.avatarService.avatarid(req, res, params)
    }
    @Post("change")
    @Role(0)
    @UseGuards(AccessGuard, RoleGuard)
    @UseInterceptors(FilesInterceptor("avatar"))
    async change(@Req() req: Request, @Res() res: Response, @Body(ValidationPipe) body: ChangeDTO, @UploadedFiles(new FileCountPipe(1), new FileSizePipe(20*1024*1024), new FileTypePipe("image/png", "image/jpeg")) files: Array<Express.Multer.File>) {
        return await this.avatarService.change(req, res, body, files)
    }
}