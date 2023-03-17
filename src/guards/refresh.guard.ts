import { IsNotEmpty, IsString, Matches, validate } from "class-validator"
import { ExecutionContext, Injectable } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { Request } from "express"

import { ExceptionService } from "@/services/exception.service"

class RefreshDTO {
    @Matches(/^Bearer (?:[\w-]*\.){2}[\w-]*$/, { message: "Refresh token format is invalid" })
    @IsString({ message: "Refresh token must be a string" })
    @IsNotEmpty({ message: "Refresh cookie is requried" })
    token: string

    constructor(data: RefreshDTO) {
        this.token = data.token
    }
}

@Injectable()
export class RefreshGuard extends AuthGuard("refresh") {
    constructor(private readonly exceptionService: ExceptionService) {
        super()
    }
    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<Request>()
        const errors = await validate(new RefreshDTO({ token: req.cookies?.REFRESH_TOKEN }))

        if(errors.length === 0) {
            return (super.canActivate(context) as boolean)
        }
        else {
            throw this.exceptionService.validation(errors[0])
        }
    }
    handleRequest(error: any, user: any, info: any) {
        if(error) {
            throw error
        }
        else if(info) { 
            throw this.exceptionService.unauthorized("Refresh token is invalid")
        }
        else {
            return user
        }
    }
}