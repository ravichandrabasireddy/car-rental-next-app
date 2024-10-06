import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
declare module "next-auth" {
    interface Session {
        user:{
            id: string;
            username: string;
            email: string;
            role: string;
        }
        backend_tokens:{
            access_token: string;
            refresh_token: string;
            expires_in: number;
            error?: string;
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user:{
            id: string;
            username: string;
            email: string;
            role: string;
        }
        backend_tokens:{
            access_token: string;
            refresh_token: string;
            expires_in: number;
            error?: string;
        }
    }
}