import { Injectable, NestMiddleware, Logger } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		res.on("close", () => new Logger("HTTP").log(`${req.method} - ${req.url} - ${res.statusCode}`))
        next()
	}
}