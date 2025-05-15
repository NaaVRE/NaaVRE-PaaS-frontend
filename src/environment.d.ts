declare namespace NodeJS {
    interface ProcessEnv {
        AUTH0_ID: string,
        AUTH0_SECRET: string,
        AUTH0_ISSUER: string,
        NAAVRE_CATALOGUE_SERVICE_URL: string,
        FRONTEND_BASE_PATH: string,
    }
}