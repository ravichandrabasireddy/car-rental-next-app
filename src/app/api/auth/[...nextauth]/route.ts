import  NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

async function refreshToken(token: JWT): Promise<JWT>{
    const res = await fetch("https://34.72.8.122:3000" + "/auth/refresh", {
        method: 'POST',
        headers: { 
            Authorization: `Refresh ${token.backend_tokens.refresh_token}`
        },
    });
    const new_tokens = await res.json();
    return {
      user:{
        ...token.user,
      },
      backend_tokens:{
        access_token: new_tokens.backend_tokens.access_token,
        refresh_token: new_tokens.backend_tokens.refresh_token,
        expires_in: new_tokens.backend_tokens.expires_in,
      }
    };
}


export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials,req) {
                 if (!credentials?.email || !credentials.password) {
                    throw new Error("Invalid email or password");
                    return null;
                 }

                const { email, password } = credentials;

                const res = await fetch("https://34.72.8.122:3000" + "/auth/login", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: email, password: password }),
                });

                if (res.status==401) {
                    return null;
                }

                const user = await res.json();
                return user;
            }
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) return {...token, ...user};
            if (new Date().getTime()<token.backend_tokens.expires_in){
                return token;
            }
            return await refreshToken(token);
        },
        async session({token, session}) {
            
            session.user=token.user;
            session.backend_tokens=token.backend_tokens;
            return session; 
        },
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };