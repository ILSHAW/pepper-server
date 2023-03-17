import { Controller, Post, Req, Res, Get, UseGuards } from "@nestjs/common"
import { Request, Response } from "express"

import { TokenService } from "@/services/token.service"
import { RefreshGuard } from "@/guards/refresh.guard"
import { AccessGuard } from "@/guards/access.guard"
import { Role } from "@/decorators/role.decorator"
import { RoleGuard } from "@/guards/role.guard"

@Controller("token")
export class TokenController {
    constructor(private readonly tokenService: TokenService) {}

    @Get("check")
    @Role("user-2", "user-1", "admin")
    @UseGuards(AccessGuard, RoleGuard)
    async check(@Req() req: Request, @Res() res: Response) {
        return await this.tokenService.check(req, res)
    }
    @Get("refresh")
    @Role("user-2", "user-1", "admin")
    @UseGuards(RefreshGuard, RoleGuard)
    async refresh(@Req() req: Request, @Res() res: Response) {
        return await this.tokenService.refresh(req, res)
    }
}