import { Controller, Post, Req, Res, Get, UseGuards, Body } from "@nestjs/common"
import { Request, Response } from "express"

import { AuthService, SignupDTO } from "@/services/auth.service"
import { AccessGuard } from "@/guards/access.guard"
import { SignupGuard } from "@/guards/signup.guard"
import { Role } from "@/decorators/role.decorator"
import { LoginGuard } from "@/guards/login.guard"
import { RoleGuard } from "@/guards/role.guard"

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("signup")
    @UseGuards(SignupGuard)
    async signup(@Req() req: Request, @Res() res: Response, @Body() body: SignupDTO) {
        return await this.authService.signup(req, res, body)
    }
    @Post("login")
    @Role("user-2", "user-1", "admin")
    @UseGuards(LoginGuard, RoleGuard)
    async login(@Req() req: Request, @Res() res: Response) {
        return await this.authService.login(req, res)
    }
    @Get("logout")
    @Role("user-2", "admin")
    @UseGuards(AccessGuard, RoleGuard)
    async logout(@Req() req: Request, @Res() res: Response) {
        return await this.authService.logout(req, res)
    }
}