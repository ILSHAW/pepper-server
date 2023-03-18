import { PassportStrategy } from "@nestjs/passport"
import { Strategy, ExtractJwt } from "passport-jwt"
import { ConfigService } from "@nestjs/config"
import { InjectModel } from "@nestjs/mongoose"
import { Injectable } from "@nestjs/common"

import { ExceptionService } from "@/services/exception.service"
import { IUserModel } from "@/models/user.model"

interface ResetPayload {
    id: string
}

@Injectable()
export class ResetStrategy extends PassportStrategy(Strategy, "reset") {
    constructor(private readonly exceptionService: ExceptionService, @InjectModel("USER") private userModel: IUserModel, private readonly config: ConfigService) {
        super({
            secretOrKey: config.get("jwt.secret"),
            jwtFromRequest: ExtractJwt.fromBodyField("token")
        })
    }
    async validate(payload: ResetPayload) {
        const user = await this.userModel.findById(payload.id)

        if(user) {
            return user
        }
        else {
            throw this.exceptionService.notFound("User not found")
        }
    }
}