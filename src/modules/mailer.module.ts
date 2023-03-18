import { MailerModule as BaseMailerModule } from "@nestjs-modules/mailer"
import { ConfigService } from "@nestjs/config"
import { Module } from "@nestjs/common"

import { ConfigModule } from "./config.module"

const mailerModule = BaseMailerModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (config: ConfigService) => config.get("mailer"),
    inject: [ConfigService]
})

@Module({
    imports: [mailerModule],
    exports: [mailerModule]
})
export class MailerModule {}