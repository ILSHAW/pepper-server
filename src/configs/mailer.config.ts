import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter"
import { resolve } from "path"

export function factory() {
    return { 
        mailer: {
            transport: {
                host: process.env.MAILER_TRANSPORT_HOST,
                port: process.env.MAILER_TRANSPORT_PORT,
                secure: process.env.MAILER_TRANSPORT_SECURE === "true" ? true : false,
                auth: {
                    user: process.env.MAILER_TRANSPORT_AUTH_USER,
                    pass: process.env.MAILER_TRANSPORT_AUTH_PASS
                }
            },
            template: {
                dir: resolve(__dirname, "../templates"),
                adapter: new HandlebarsAdapter()
            }
        } 
    }
}

export default { factory }