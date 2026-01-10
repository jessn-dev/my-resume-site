import type { Metadata } from "next";
import { Inter } from "next/font/google"; // 1. Keep your font import
import "./globals.css";

// 2. Import the new SmoothScroll component
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "JBN | Jesse Ngolab",
    description: "Designer & Coder Portfolio",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        /* REMOVE "scroll-smooth" if it is here! */
        <html lang="en">
        <body className={inter.className}>
        <SmoothScroll>
            {children}
        </SmoothScroll>
        </body>
        </html>
    );
}