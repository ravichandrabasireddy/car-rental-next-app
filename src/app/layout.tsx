import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import { Providers } from "@/features/auth/providers/providers";
import { getServerSession } from "next-auth";


export const metadata: Metadata = {
  title: "Car Rental App",
  description: "A car rental app built with Next.js, Tailwind CSS, and NextAuth.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <Providers session={session}>
          <Navbar currentUser={null} />
          {children}
        </Providers>
      </body>
    </html>
  );
}