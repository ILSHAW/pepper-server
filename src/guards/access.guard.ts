import { IsNotEmpty, IsString, Matches, validate } from "class-validator"
import { ExecutionContext, Injectable } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { Request } from "express"

import { ExceptionService } from "@/services/exception.service"

class AccessDTO {
    @Matches(/^Bearer (?:[\w-]*\.){2}[\w-]*$/, { message: "Access token format is invalid" })
    @IsString({ message: "Access token must be a string" })
    @IsNotEmpty({ message: "Authorization header is requried" })
    token: string

    constructor(data: AccessDTO) {
        this.token = data.token
    }
}

@Injectable()
export class AccessGuard extends AuthGuard("access") {
    constructor(private readonly exceptionService: ExceptionService) {
        super()
    }
    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<Request>()
        const errors = await validate(new AccessDTO({ token: req.headers.authorization }))

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
            throw this.exceptionService.unauthorized("Access token is invalid")
        }
        else {
            return user
        }
    }
}