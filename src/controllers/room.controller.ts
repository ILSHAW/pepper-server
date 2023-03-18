import { Controller, Post, Req, Res, Get, UseGuards, Body } from "@nestjs/common"
import { Request, Response } from "express"

import { RoomService, CreateDTO } from "@/services/room.service"
import { ValidationPipe } from "@/pipes/validation.pipe"
import { AccessGuard } from "@/guards/access.guard"
import { Role } from "@/decorators/role.decorator"
import { RoleGuard } from "@/guards/role.guard"

@Controller("room")
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @Post("")
    @Role(2, 1, 0)
    @UseGuards(AccessGuard, RoleGuard)
    async create(@Req() req: Request, @Res() res: Response, @Body(ValidationPipe) body: CreateDTO) {
        return await this.roomService.create(req, res, body)
    }
    @Get("")
    @Role(2, 1, 0)
    @UseGuards(AccessGuard, RoleGuard)
    async get(@Req() req: Request, @Res() res: Response) {
        return await this.roomService.get(req, res)
    }
}