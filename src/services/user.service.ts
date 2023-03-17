import { IsNotEmpty, IsString, IsMongoId } from "class-validator"
import { InjectModel } from "@nestjs/mongoose"
import { Injectable } from "@nestjs/common"
import { Request, Response } from "express"

import { ExceptionService } from "@/services/exception.service"
import { IUserModel } from "../models/user.model"

export class PromoteDTO {
	@IsMongoId({ message: "User id format is invalid" })
	@IsString({ message: "User id must be a string" })
	@IsNotEmpty({ message: "User id is required" })
	id: string
}
export class IdDTO {
	@IsMongoId({ message: "User id format is invalid" })
	@IsString({ message: "User id must be a string" })
	@IsNotEmpty({ message: "User id is required" })
	id: string
}

@Injectable()
export class UserService {
	constructor(@InjectModel("USER") private userModel: IUserModel, private readonly exceptionService: ExceptionService) {}

	async get(req: Request, res: Response) {
		return res.status(200).send({ status: 200, message: "There is information about user", user: {
			id: req.user.id,
			login: req.user.login,
			role: req.user.role
		}})
	}
	async id(req: Request, res: Response, params: IdDTO) {
		const user = await this.userModel.findOne({ _id: params.id })

		if(user) {
			return res.status(200).send({ status: 200, message: "There is information about user", user: {
				id: user.id,
				login: user.login,
				role: user.role
			}})
		}
		else {
			throw this.exceptionService.notFound("User not found")
		}
	}
	async all(req: Request, res: Response) {
		const users = await this.userModel.find()

		return res.status(200).send({ status: 200, message: "There is information about user", user: users.map((user) => ({
			id: user.id,
			login: user.login,
			role: user.role
		}))})
	}
	async promote(req: Request, res: Response, body: PromoteDTO) {
		const user = await this.userModel.findById(body.id)

		if(user) {
			if(user.role === "user-2") {
				await user.updateOne({ role: "user-1" })

				return res.status(200).send({ status: 200, message: "User successfully promoted" })
			}
			else {
				throw this.exceptionService.badRequest("This user cannot be promoted")
			}
		}
		else {
			throw this.exceptionService.notFound("User not found")
		}
	}
}