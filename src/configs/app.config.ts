export function factory() {
    return { 
        app: {
            port: process.env.APP_PORT
        } 
    }
}

export default { factory }