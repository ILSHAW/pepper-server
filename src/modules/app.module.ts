import { Module } from "@nestjs/common"

import { DatabaseModule } from "@/modules/database.module"
import { ConfigModule } from "@/modules/config.module"
import { TokenModule } from "@/modules/token.module"
import { AuthModule } from "@/modules/auth.module"
import { UserModule } from "@/modules/user.module"

@Module({
	imports: [
		ConfigModule,
		DatabaseModule,
		AuthModule,
		TokenModule,
		UserModule
	]
})
export class AppModule {}
