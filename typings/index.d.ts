declare global {
    namespace NodeJS {
        interface ProcessEnv {
            APP_ENV: string,
            TOKEN: string,
            REDIS_HOST: string,
            REDIS_PORT: string
        }
    }
}