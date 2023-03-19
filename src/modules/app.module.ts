import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common"

import { HttpLoggerMiddleware } from "@/middlewares/http.logger.middleware"
import { WebsocketModule } from "@/modules/websocket.module"
import { DatabaseModule } from "@/modules/database.module"
import { MailerModule } from "@/modules/mailer.module"
import { ConfigModule } from "@/modules/config.module"
import { AvatarModule } from "@/modules/avatar.module"
import { TokenModule } from "@/modules/token.module"
import { AuthModule } from "@/modules/auth.module"
import { UserModule } from "@/modules/user.module"
import { RoomModule } from "@/modules/room.module"
import { FileModule } from "@/modules/file.module"

@Module({
	imports: [
		ConfigModule,
		DatabaseModule,
		AuthModule,
		TokenModule,
		UserModule,
		AvatarModule,
		MailerModule,
		WebsocketModule,
		RoomModule,
		FileModule
	]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(HttpLoggerMiddleware).forRoutes("*")
    }
}
