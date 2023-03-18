import { Controller, Req, Res, Get, UseGuards, Post, Body, Param, Patch } from "@nestjs/common"
import { Request, Response } from "express"

import { UserService, PromoteDTO, IdDTO, ForgotDTO, ResetDTO } from "@/services/user.service"
import { ValidationPipe } from "@/pipes/validation.pipe"
import { AccessGuard } from "@/guards/access.guard"
import { Role } from "@/decorators/role.decorator"
import { ResetGuard } from "@/guards/reset.guard"
import { RoleGuard } from "@/guards/role.guard"

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("")
    @Role("user-2", "user-1", "admin")
    @UseGuards(AccessGuard, RoleGuard)
    async get(@Req() req: Request, @Res() res: Response) {
        return await this.userService.get(req, res)
    }
    @Get("all")
    @Role("user-2", "user-1", "admin")
    @UseGuards(AccessGuard, RoleGuard)
    async all(@Req() req: Request, @Res() res: Response) {
        return await this.userService.all(req, res)
    }
    @Get(":id")
    @Role("user-2", "user-1", "admin")
    @UseGuards(AccessGuard, RoleGuard)
    async id(@Req() req: Request, @Res() res: Response, @Param(ValidationPipe) params: IdDTO) {
        return await this.userService.id(req, res, params)
    }
    @Post("promote")
    @Role("admin")
    @UseGuards(AccessGuard, RoleGuard)
    async promote(@Req() req: Request, @Res() res: Response, @Body(ValidationPipe) body: PromoteDTO) {
        return await this.userService.promote(req, res, body)
    }
    @Post("forgot")
    @Role("user-1", "user-2", "admin")
    @UseGuards(AccessGuard, RoleGuard)
    async forgot(@Req() req: Request, @Res() res: Response, @Body(ValidationPipe) body: ForgotDTO) {
        return await this.userService.forgot(req, res, body)
    }
    @Patch("forgot")
    @Role("user-1", "user-2", "admin")
    @UseGuards(AccessGuard, ResetGuard, RoleGuard)
    async reset(@Req() req: Request, @Res() res: Response, @Body() body: ResetDTO) {
        return await this.userService.reset(req, res, body)
    }
}