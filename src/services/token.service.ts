import { ConfigService } from "@nestjs/config"
import { Injectable } from "@nestjs/common"
import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"

@Injectable()
export class TokenService {
	constructor(private readonly config: ConfigService) {}

	async check(req: Request, res: Response) {
		return res.status(200).send({ status: 200, message: "Access token is valid" })
	}
	async refresh(req: Request, res: Response) {
		const access = jwt.sign({ id: req.user.id }, this.config.get("jwt.secret"), { expiresIn: 15*60 })
		const refresh = jwt.sign({ id: req.user.id, fingerprint: req.headers.fingerprint }, this.config.get("jwt.secret"), { expiresIn: 24*60*60 })

		res.cookie("REFRESH_TOKEN", `Bearer ${refresh}`, { httpOnly: true, sameSite: "strict", maxAge: 24*60*60*1000 })

		return res.status(200).send({ status: 200, message: "Token successfully refreshed", access: `Bearer ${access}` })
	}
}