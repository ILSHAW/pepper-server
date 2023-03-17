import { ValidationError } from "class-validator"
import { Injectable } from "@nestjs/common"

import { InternalServerErrorException } from "@/exceptions/internal.exception"
import { UnauthorizedException } from "@/exceptions/unauthorized.exception"
import { BadRequestException } from "@/exceptions/badrequest.exception"
import { ValidationException } from "@/exceptions/validation.exception"
import { ForbiddenException } from "@/exceptions/forbidden.exception"
import { ConflictException } from "@/exceptions/conflict.exception"
import { NotFoundException } from "@/exceptions/notfound.exception"

@Injectable()
export class ExceptionService {
	internal(message: string) {
        return new InternalServerErrorException(message)
    }
	unauthorized(message: string) {
        return new UnauthorizedException(message)
    }
	badRequest(message: string) {
        return new BadRequestException(message)
    }
	forbidden(message: string) {
        return new ForbiddenException(message)
    }
    conflict(message: string) {
        return new ConflictException(message)
    }
    notFound(message: string) {
        return new NotFoundException(message)
    }
    validation(error: ValidationError) {
        return new ValidationException(error)
    }
}