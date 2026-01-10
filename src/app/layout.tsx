import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 1. Import Components
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader"; // <--- NEW IMPORT

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
        <html lang="en">
        <body className={inter.className}>

        {/* 2. ADD PRELOADER HERE */}
        <Preloader />

        <SmoothScroll>
            {children}
        </SmoothScroll>

        </body>
        </html>
    );
}