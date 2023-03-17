import { Controller, Post, Req, Res, Get, UseGuards } from "@nestjs/common"
import { Request, Response } from "express"

import { AuthService } from "@/services/auth.service"
import { AccessGuard } from "@/guards/access.guard"
import { SignupGuard } from "@/guards/signup.guard"
import { Role } from "@/decorators/role.decorator"
import { LoginGuard } from "@/guards/login.guard"

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("signup")
    @UseGuards(SignupGuard)
    async signup(@Req() req: Request, @Res() res: Response) {
        return await this.authService.signup(req, res)
    }
    @Post("login")
    @Role("user", "admin")
    @UseGuards(LoginGuard)
    async login(@Req() req: Request, @Res() res: Response) {
        return await this.authService.login(req, res)
    }
    @Get("logout")
    @Role("user", "admin")
    @UseGuards(AccessGuard)
    async logout(@Req() req: Request, @Res() res: Response) {
        return await this.authService.logout(req, res)
    }
}