import { Catch, ArgumentsHost } from "@nestjs/common"
import { BaseWsExceptionFilter, WsException } from "@nestjs/websockets"

@Catch()
export class WebsocketExceptionsFilter extends BaseWsExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        super.catch(exception, host)
    }
}
