import { Catch, ArgumentsHost, WsExceptionFilter } from "@nestjs/common"

@Catch()
export class WebsocketExceptionFilter implements WsExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        console.log("***")
    }
}

