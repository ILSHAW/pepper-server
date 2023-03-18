import { IsNotEmpty, IsString, Matches, validate } from "class-validator"
import { ExecutionContext, Injectable } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { Request } from "express"

import { ExceptionService } from "@/services/exception.service"

class ResetDTO {
    @Matches(/^(?:[\w-]*\.){2}[\w-]*$/, { message: "Reset token format is invalid" })
    @IsString({ message: "Reset token must be a string" })
    @IsNotEmpty({ message: "Reset token is requried" })
    token: string

    constructor(data: ResetDTO) {
        this.token = data.token
    }
}

@Injectable()
export class ResetGuard extends AuthGuard("reset") {
    constructor(private readonly exceptionService: ExceptionService) {
        super()
    }
    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<Request>()
        const errors = await validate(new ResetDTO(req.body))

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
            throw this.exceptionService.unauthorized("Reset token is invalid")
        }
        else {
            return user
        }
    }
}