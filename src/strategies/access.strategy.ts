import { PassportStrategy } from "@nestjs/passport"
import { Strategy, ExtractJwt } from "passport-jwt"
import { ConfigService } from "@nestjs/config"
import { InjectModel } from "@nestjs/mongoose"
import { Injectable } from "@nestjs/common"

import { ExceptionService } from "@/services/exception.service"
import { IUserModel } from "@/models/user.model"

interface AccessPayload {
    id: string
}

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, "access") {
    constructor(private readonly exceptionService: ExceptionService, @InjectModel("USER") private userModel: IUserModel, private readonly config: ConfigService) {
        super({
            secretOrKey: config.get("jwt.secret"),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }
    async validate(payload: AccessPayload) {
        const user = await this.userModel.findById(payload.id)

        if(user) {
            return user
        }
        else {
            throw this.exceptionService.notFound("User not found")
        }
    }
}