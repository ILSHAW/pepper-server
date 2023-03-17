import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import * as cookies from "cookie-parser"
import { Logger } from "@nestjs/common"

import { ValidationPipe } from "@/pipes/validation.pipe"
import { AppModule } from "@/modules/app.module"

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const config = app.get(ConfigService)
	const logger = new Logger("SERVER")

	app.use(cookies())
	app.useGlobalPipes(new ValidationPipe())

	await app.listen(config.get("app.port"), () => logger.log(`Server is running on port ${config.get("app.port")}`))
}
bootstrap()
