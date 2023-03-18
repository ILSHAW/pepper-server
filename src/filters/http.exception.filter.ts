import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common"
import { Response } from "express"

import { UnauthorizedException } from "../exceptions/unauthorized.exception"
import { ValidationException } from "../exceptions/validation.exception"
import { BadRequestException } from "../exceptions/badrequest.exception"
import { ForbiddenException } from "../exceptions/forbidden.exception"
import { ConflictException } from "../exceptions/conflict.exception"
import { NotFoundException } from "../exceptions/notfound.exception"

type Exception = ConflictException | BadRequestException | ForbiddenException | NotFoundException | UnauthorizedException | ValidationException
const exceptions = [ConflictException, BadRequestException, ForbiddenException, NotFoundException, UnauthorizedException, ValidationException]

@Catch(...exceptions)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: Exception, host: ArgumentsHost) {
		return host.switchToHttp().getResponse<Response>().status(exception.getStatus()).send({ 
			status: exception.getStatus(), 
			message: exception.message
		})
	}
}