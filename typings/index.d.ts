declare global {
    namespace NodeJS {
        interface ProcessEnv {
            APP_ENV: string,
            TOKEN: string,
            REDIS_HOST: string,
            REDIS_PORT: string,
            MONGO_HOST: string,
            MONGO_PORT: string,
            MONGO_DB: string,
            MONGO_USER: string,
            MONGO_PASS: string
        }
    }
}