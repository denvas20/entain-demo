export interface Config {
    // Service
    PORT: number;
    API_URL: string;
    API_KEY: string;
    SEED: boolean;
    // Database
    DATABASE_HOST: string;
    DATABASE_PORT: number;
    DATABASE_USER: string;
    DATABASE_PASSWORD: string;
    DATABASE_NAME: string;
    DATABASE_SYNCRONIZE: boolean;
}
