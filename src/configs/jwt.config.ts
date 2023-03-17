export function factory() {
    return { 
        jwt: {
            secret: process.env.JWT_SECRET
        } 
    }
}

export default { factory }