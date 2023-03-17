import { PassportStrategy } from "@nestjs/passport"
import { InjectModel } from "@nestjs/mongoose"
import { Injectable } from "@nestjs/common"
import { Strategy } from "passport-local"

import { ExceptionService } from "@/services/exception.service"
import { IUserModel } from "@/models/user.model"

@Injectable()
export class SignupStrategy extends PassportStrategy(Strategy, "signup") {
    constructor(private readonly exceptionService: ExceptionService, @InjectModel("USER") private userModel: IUserModel) {
        super({ usernameField: "login" })
    }
    async validate(login: string, password: string) {
        if(await this.userModel.exists({ login: login })) {
            throw this.exceptionService.conflict("Login already taken")
        }
        else {
            return { login, password }
        }
    }
}