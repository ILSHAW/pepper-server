import { IsNotEmpty, IsString, IsMongoId } from "class-validator"
import { InjectModel } from "@nestjs/mongoose"
import { Injectable } from "@nestjs/common"
import { Request, Response } from "express"
import * as fs from "fs/promises"
import * as path from "path"

import { ExceptionService } from "@/services/exception.service"
import { IUserModel } from "@/models/user.model"

export class AvatarIdDTO {
	@IsMongoId({ message: "User id format is invalid" })
	@IsString({ message: "User id must be a string" })
	@IsNotEmpty({ message: "User id is required" })
	id: string
}

@Injectable()
export class AvatarService {
	constructor(@InjectModel("USER") private userModel: IUserModel, private readonly exceptionService: ExceptionService) {}

	async upload(req: Request, res: Response, files: Array<Express.Multer.File>) {
		try {
			await fs.writeFile(path.resolve(`public/images/avatars/${req.user.id}${path.extname(files[0].originalname)}`), files[0].buffer)
			await req.user.updateOne({ avatar: `${req.user.id}${path.extname(files[0].originalname)}` })

			return res.status(201).send({ status: 201, message: "Avatar successfully uploaded" })
		}
		catch(e: any) {
			throw this.exceptionService.badRequest("Failed to upload avatar")
		}
	}
	async avatar(req: Request, res: Response) {
		try {
			await fs.access(path.resolve(`public/images/avatars/${req.user.avatar}`))

			return res.sendFile(path.resolve(`public/images/avatars/${req.user.avatar}`))
		}
		catch(e: any) {
			return res.sendFile("public/images/avatars/default.png")
		}
	}
	async avatarid(req: Request, res: Response, params: AvatarIdDTO) {
		const user = await this.userModel.findOne({ _id: params.id })

		if(user) {
			try {
				await fs.access(path.resolve(`public/images/avatars/${user.avatar}`))
	
				return res.sendFile(path.resolve(`public/images/avatars/${user.avatar}`))
			}
			catch(e: any) {
				return res.sendFile("public/images/avatars/default.png")
			}
		}
		else {
			throw this.exceptionService.notFound("User not found")
		}
	}
}