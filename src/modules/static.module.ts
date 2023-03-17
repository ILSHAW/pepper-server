import { ServeStaticModule } from "@nestjs/serve-static"
import { Module } from "@nestjs/common"
import * as path from "path"

const staticModule = ServeStaticModule.forRoot({
    rootPath: "public/",
    serveStaticOptions: {
        index: false
    }
})

@Module({
    imports: [staticModule],
    exports: [staticModule]
})
export class StaticModule {}