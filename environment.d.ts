// This file is needed to support autocomplete for process.env
export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            RENTAL_API_URL: string;
            NEXTAUTH_SECRET: string;
            NEXTAUTH_URL: string;
            NEXT_PUBLIC_RENTAL_API_URL: string;
        }
    }
}