export function factory() {
    return {
        database: {
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
            name: process.env.DATABASE_NAME
        } 
    }
}

export default { factory }