import { IsNotEmpty, IsString, IsMongoId, IsEmail, Matches, MinLength, MaxLength } from "class-validator"
import { MailerService } from "@nestjs-modules/mailer"
import { ConfigService } from "@nestjs/config"
import { InjectModel } from "@nestjs/mongoose"
import { Injectable } from "@nestjs/common"
import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"
import * as argon from "argon2"

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
export class ForgotDTO {
	@Matches(/@gmail\.com$/, { message: "Email domain is invalid" })
    @IsEmail({}, { message: "Email is invalid" })
    @IsString({ message: "Email must be a string" })
    @IsNotEmpty({ message: "Email is required" })
	email: string
}
export class ResetDTO {
    password: string
	token: string
}

@Injectable()
export class UserService {
	constructor(@InjectModel("USER") private userModel: IUserModel, private readonly config: ConfigService, private readonly exceptionService: ExceptionService, private readonly mailerService: MailerService) {}

	async get(req: Request, res: Response) {
		return res.status(200).send({ status: 200, message: "There is information about user", user: {
			id: req.user.id,
			login: req.user.login,
			role: req.user.role,
			name: req.user.name,
			surname: req.user.surname,
			fathername: req.user.fathername,
			department: req.user.department,
			job: req.user.job
		}})
	}
	async id(req: Request, res: Response, params: IdDTO) {
		const user = await this.userModel.findById(params.id)

		if(user) {
			if(req.user.role <= user.role) {
				return res.status(200).send({ status: 200, message: "There is information about user", user: {
					id: user.id,
					login: user.login,
					role: user.role,
					name: user.name,
					surname: user.surname,
					fathername: user.fathername,
					department: user.department,
					job: user.job
				}})
			}
			else {
				throw this.exceptionService.forbidden("Access denied")
			}
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
			role: user.role,
			name: user.name,
			surname: user.surname,
			fathername: user.fathername,
			department: user.department,
			job: user.job
		}))})
	}
	async promote(req: Request, res: Response, body: PromoteDTO) {
		const user = await this.userModel.findById(body.id)

		if(user) {
			if(user.role === 2) {
				await user.updateOne({ role: 1 })

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
	async forgot(req: Request, res: Response, body: ForgotDTO) {
		const token = jwt.sign({ id: req.user.id }, this.config.get("jwt.secret"), { expiresIn: 5*60 })

		await this.mailerService.sendMail({
            to: body.email,
            subject: "Reset",
            template: "./forgot",
            context: {
                url: `http://some-frontend-url/forgot?token=${token}`
            }
        })
		
		return res.status(200).send({ status: 200, message: "A password reset link has been sent to email" })
	}
	async reset(req: Request, res: Response, body: ResetDTO) {
		await req.user.updateOne({ password: await argon.hash(body.password) })

		return res.status(200).send({ status: 200, message: "Password successfully changed" })
	}
}