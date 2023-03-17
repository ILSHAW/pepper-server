import { Controller, Req, Res, Get, UseGuards, Post, Body } from "@nestjs/common"
import { Request, Response } from "express"

import { UserService, PromoteDTO } from "@/services/user.service"
import { AccessGuard } from "@/guards/access.guard"
import { Role } from "@/decorators/role.decorator"
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
    async id(@Req() req: Request, @Res() res: Response) {
        return await this.userService.id(req, res)
    }
    @Post("promote")
    @Role("admin")
    @UseGuards(AccessGuard, RoleGuard)
    async promote(@Req() req: Request, @Res() res: Response, @Body() body: PromoteDTO) {
        return await this.userService.promote(req, res, body)
    }
}