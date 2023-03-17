import { Controller, Req, Res, Get, UseGuards } from "@nestjs/common"
import { Request, Response } from "express"

import { UserService } from "@/services/user.service"
import { AccessGuard } from "@/guards/access.guard"
import { Role } from "@/decorators/role.decorator"

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("")
    @Role("user", "admin")
    @UseGuards(AccessGuard)
    async get(@Req() req: Request, @Res() res: Response) {
        return await this.userService.get(req, res)
    }
    @Get("all")
    @Role("user", "admin")
    @UseGuards(AccessGuard)
    async all(@Req() req: Request, @Res() res: Response) {
        return await this.userService.all(req, res)
    }
    @Get(":id")
    @Role("user", "admin")
    @UseGuards(AccessGuard)
    async id(@Req() req: Request, @Res() res: Response) {
        return await this.userService.id(req, res)
    }
}