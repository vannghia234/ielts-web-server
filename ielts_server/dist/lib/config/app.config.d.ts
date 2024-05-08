export declare const AppConfig: (() => {
    isDev: boolean;
    port: number;
    apiKey: string;
    database: {
        host: string;
        port: number;
        username: string;
        password: string;
        databaseName: string;
    };
    jwt: {
        publicKey: string;
        privateKey: string;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    isDev: boolean;
    port: number;
    apiKey: string;
    database: {
        host: string;
        port: number;
        username: string;
        password: string;
        databaseName: string;
    };
    jwt: {
        publicKey: string;
        privateKey: string;
    };
}>;
