declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production',
            TOKEN: string,
            REDIS_HOST: string,
            REDIS_PORT: string,
            MONGO_HOST: string,
            MONGO_PORT: string,
            MONGO_DATABASE: string,
            MONGO_USER: string,
            MONGO_PASS: string
        }
    }
}

export {}