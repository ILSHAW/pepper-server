export function factory() {
    console.log(process.env.DATABASE_HOST, process.env.DATABASE_PORT, process.env.DATABASE_NAME)
    return {
        database: {
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
            name: process.env.DATABASE_NAME
        } 
    }
}

export default { factory }