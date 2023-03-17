import { HttpStatus, HttpException } from "@nestjs/common"

export class InternalServerErrorException extends HttpException {
	constructor(message: string) {
        super({ status: HttpStatus.INTERNAL_SERVER_ERROR, message }, HttpStatus.INTERNAL_SERVER_ERROR)
	}
}