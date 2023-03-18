import { ConfigModule as BaseConfigModule } from "@nestjs/config"
import { Module } from "@nestjs/common"

import databaseConfig from "@/configs/database.config"
import mailerConfig from "@/configs/mailer.config"
import appConfig from "@/configs/app.config"
import jwtConfig from "@/configs/jwt.config"

const configModule = BaseConfigModule.forRoot({
    load: [
        appConfig.factory,
        databaseConfig.factory,
        jwtConfig.factory,
        mailerConfig.factory
    ]
})

@Module({
	imports: [configModule],
    exports: [configModule]
})
export class ConfigModule {}