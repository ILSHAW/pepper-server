import { PassportStrategy } from "@nestjs/passport"
import { Strategy, ExtractJwt } from "passport-jwt"
import { ConfigService } from "@nestjs/config"
import { InjectModel } from "@nestjs/mongoose"
import { Injectable } from "@nestjs/common"
import { Request } from "express"

import { ExceptionService } from "@/services/exception.service"
import { IUserModel } from "@/models/user.model"

interface RefreshPayload {
    id: string
    fingerprint: string
}

function fromRefreshCookieAsBearerToken(req: Request) {
    const regexp = /(?:[\w-]*\.){2}[\w-]*$/g
    
    return regexp.test(req.cookies?.REFRESH_TOKEN) ? req.cookies?.REFRESH_TOKEN?.match(regexp)[0] : null
}

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, "refresh") {
    constructor(private readonly exceptionService: ExceptionService, @InjectModel("USER") private userModel: IUserModel, private readonly config: ConfigService) {
        super({
            secretOrKey: config.get("jwt.secret"),
            jwtFromRequest: ExtractJwt.fromExtractors([fromRefreshCookieAsBearerToken]),
            passReqToCallback: true
        })
    }
    async validate( req: Request, payload: RefreshPayload) {
        const user = await this.userModel.findById(payload.id)

        if(user) {
            if(req.headers.fingerprint === payload.fingerprint) {
                return user
            }
            else {
                throw this.exceptionService.unauthorized("Fingerprint is invalid")
            }
        }
        else {
            throw this.exceptionService.notFound("User not found")
        }
    }
}