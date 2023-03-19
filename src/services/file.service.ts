import { IsNotEmpty, IsString, Matches } from "class-validator"
import { Injectable } from "@nestjs/common"
import { Request, Response } from "express"
import { randomBytes } from "crypto"
import * as fs from "fs/promises"
import * as path from "path"

import { ExceptionService } from "@/services/exception.service"

export class DownloadDTO {
	@Matches(/^(images|documents)((\/)|(\\))([a-z0-9]{40,40})(\.(docx|doc|pdf|jpg|png|xls|xlsx))$/, { message: "Path format is invalid" })
	@IsString({ message: "Path must be a string" })
	@IsNotEmpty({ message: "Path is required" })
	path: string
}

@Injectable()
export class FileService {
	constructor(private readonly exceptionService: ExceptionService) {}

	async upload(req: Request, res: Response, files: Array<Express.Multer.File>) {
		if(files === undefined) {
			throw this.exceptionService.badRequest("Files not provided")
		}
		else {
			const paths: Array<string> = []

			await Promise.all(files.map(async (file) => {
				const ext = path.extname(file.originalname)
				const name = randomBytes(20).toString("hex")

				if(file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
					await fs.writeFile(path.resolve(`public/images/${name}${ext}`), file.buffer)
					paths.push(`images/${name}${ext}`)
				}
				else {
					await fs.writeFile(path.resolve(`public/documents/${name}${ext}`), file.buffer)
					paths.push(`documents/${name}${ext}`)
				}
			}))

			return res.send({ status: 200, message: "Files successfully uploaded", attachments: paths })
		}
	}
	async download(req: Request, res: Response, query: DownloadDTO) {
		try {
			await fs.access(path.resolve(`public/${query.path}`))

			res.download(path.resolve(`public/${query.path}`))
		}
		catch(e: any) {
			this.exceptionService.badRequest("File not found")
		}
	}
}