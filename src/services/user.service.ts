import { InjectModel } from "@nestjs/mongoose"
import { Injectable } from "@nestjs/common"
import { Request, Response } from "express"

import { ExceptionService } from "@/services/exception.service"
import { IUserModel } from "../models/user.model"

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
	async id(req: Request, res: Response) {
		const user = await this.userModel.findOne({ _id: req.params.id })

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
}