import { Module } from "@nestjs/common"

import { WebsocketModule } from "@/modules/websocket.module"
import { DatabaseModule } from "@/modules/database.module"
import { MailerModule } from "@/modules/mailer.module"
import { ConfigModule } from "@/modules/config.module"
import { AvatarModule } from "@/modules/avatar.module"
import { StaticModule } from "@/modules/static.module"
import { TokenModule } from "@/modules/token.module"
import { AuthModule } from "@/modules/auth.module"
import { UserModule } from "@/modules/user.module"
import { RoomModule } from "@/modules/room.module"

@Module({
	imports: [
		ConfigModule,
		DatabaseModule,
		AuthModule,
		TokenModule,
		UserModule,
		AvatarModule,
		StaticModule,
		MailerModule,
		WebsocketModule,
		RoomModule
	]
})
export class AppModule {}
