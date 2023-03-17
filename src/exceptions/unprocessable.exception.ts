import { HttpStatus, HttpException } from "@nestjs/common"

export class UnprocessableException extends HttpException {
	constructor(message: string) {
        super({ status: HttpStatus.UNPROCESSABLE_ENTITY, message }, HttpStatus.UNPROCESSABLE_ENTITY)
	}
}