import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import * as cookies from "cookie-parser"
import { Logger } from "@nestjs/common"

import { WebsocketExceptionsFilter } from "@/filters/websocket.exception.filter"
import { EverythingExceptionFilter } from "@/filters/everything.exception.filter"
import { HttpExceptionFilter } from "./filters/http.exception.filter"
import { NotFoundExceptionFilter } from "./filters/notfound.filter"
import { AppModule } from "@/modules/app.module"

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const config = app.get(ConfigService)
	const logger = new Logger("SERVER")

	app.useGlobalFilters(new EverythingExceptionFilter(), new HttpExceptionFilter(), new NotFoundExceptionFilter(), new WebsocketExceptionsFilter())
	app.use(cookies())

	await app.listen(config.get("app.port"), () => logger.log(`Server is running on port ${config.get("app.port")}`))
}
bootstrap()
