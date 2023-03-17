import { IsNotEmpty, IsString, Matches, IsEmail, MinLength, MaxLength, validate } from "class-validator"
import { ExecutionContext, Injectable } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { Request } from "express"

import { ExceptionService } from "@/services/exception.service"

class SignupDTO {
    @IsEmail({}, { message: "Login is invalid email" })
    @IsString({ message: "Login must be a string" })
    @IsNotEmpty({ message: "Login is required" })
    login: string
    @Matches(/[\[\]\\\^\$\.\|\?\*\+\(\)\@]{1,}/, { message: "Password must contain at least one special character" })
    @Matches(/[A-Z]{1,}/, { message: "Password must contain at least one uppercase letter" })
    @Matches(/[a-z]{1,}/, { message: "Password must contain at least one lowercase letter" })
    @Matches(/[0-9]{1,}/, { message: "Password must contain at least one digit" })
    @MinLength(8, { message: "Password must be longer than or equal to 8 characters" })
    @MaxLength(20, { message: "Password must be shorter than or equal to 20 characters" })
    @IsString({ message: "Password must be a string" })
    @IsNotEmpty({ message: "Password is required" })
    password: string

    constructor(data: SignupDTO) {
        this.login = data.login
        this.password = data.password
    }
}

@Injectable()
export class SignupGuard extends AuthGuard("signup") {
    constructor(private readonly exceptionService: ExceptionService) {
        super()
    }
    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<Request>()
        const errors = await validate(new SignupDTO(req.body))

        if(errors.length === 0) {
            return (super.canActivate(context) as boolean)
        }
        else {
            throw this.exceptionService.validation(errors[0])
        }
    }
}