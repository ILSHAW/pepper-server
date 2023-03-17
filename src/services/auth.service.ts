import { InjectModel } from "@nestjs/mongoose"
import { ConfigService } from "@nestjs/config"
import { Injectable } from "@nestjs/common"
import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"
import * as argon from "argon2"

import { IUserModel } from "@/models/user.model"

@Injectable()
export class AuthService {
	constructor(@InjectModel("USER") private userModel: IUserModel, private readonly config: ConfigService) {}

	async signup(req: Request, res: Response) {
		await this.userModel.create({
			login: req.user.login,
			password: await argon.hash(req.user.password)
		})

		return res.status(201).send({ status: 201, message: "User successfully created" })
	}
	async login(req: Request, res: Response) {
		const access = jwt.sign({ id: req.user.id }, this.config.get("jwt.secret"), { expiresIn: 15*60 })
		const refresh = jwt.sign({ id: req.user.id, fingerprint: req.body.fingerprint }, this.config.get("jwt.secret"), { expiresIn: 24*60*60 })

		res.cookie("REFRESH_TOKEN", `Bearer ${refresh}`, { httpOnly: true, sameSite: "strict", maxAge: 24*60*60*1000 })

		return res.status(200).send({ status: 200, message: "User successfully authenticated", access: `Bearer ${access}` })
	}
	async logout(req: Request, res: Response) {
		res.cookie("REFRESH_TOKEN", null, { httpOnly: true, sameSite: "strict", maxAge: 0 })

		return res.status(200).send({ status: 200, message: "User successfully logged out" })
	}
}