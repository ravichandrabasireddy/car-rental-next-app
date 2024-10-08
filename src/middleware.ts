export { default } from "next-auth/middleware"

export const config = {
    matcher: [
        "/profile/:path*",
        "/reservations/:path*",
        "/admin/:path*",
    ]
};
