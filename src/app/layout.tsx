import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 1. Import Components
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader"; // <--- NEW IMPORT

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Jesse Ngolab | Full Stack Developer & UI Designer",
    description: "Portfolio of Jesse Ngolab, a Full Stack Developer & UI Designer specializing in dynamic, interactive, and beautifully crafted web experiences.",
    keywords: ["Jesse Ngolab", "Full Stack Developer", "UI Designer", "React", "Next.js", "Portfolio", "Software Engineer", "Web Developer"],
    authors: [{ name: "Jesse Ngolab", url: "https://jessn.dev" }],
    creator: "Jesse Ngolab",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://jessn.dev",
        title: "Jesse Ngolab | Full Stack Developer & UI Designer",
        description: "Portfolio of Jesse Ngolab, a Full Stack Developer & UI Designer specializing in dynamic, interactive web experiences.",
        siteName: "Jesse Ngolab Portfolio",
        images: [
            {
                url: "/assets/image_2.png",
                width: 1200,
                height: 630,
                alt: "Jesse Ngolab - Full Stack Developer",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Jesse Ngolab | Full Stack Developer & UI Designer",
        description: "Portfolio of Jesse Ngolab, a Full Stack Developer & UI Designer specializing in dynamic, interactive web experiences.",
        images: ["/assets/image_2.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": "Jesse Ngolab",
                        "url": "https://jessn.dev",
                        "jobTitle": "Full Stack Developer",
                        "sameAs": [
                            "https://github.com/jessn-dev",
                            "https://linkedin.com/in/jesse-ngolab"
                        ]
                    })
                }}
            />
        </head>
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