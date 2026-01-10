"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "Experience", href: "#experience" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <nav
            // REMOVED "border-b border-white/5" from the isScrolled string below
            className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
                isScrolled
                    ? "bg-black/80 py-4 shadow-lg backdrop-blur-md"
                    : "bg-transparent py-8"
            }`}
        >
            <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between px-6 md:px-12 lg:px-20">

                {/* --- LOGO --- */}
                <Link
                    href="#home"
                    className="text-2xl font-black tracking-tighter text-white transition-transform hover:scale-105"
                >
                    JBN<span className="text-blue-500">.</span>
                </Link>

                {/* --- DESKTOP NAVIGATION --- */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-slate-300 transition-colors hover:text-white hover:underline decoration-blue-500 underline-offset-8 decoration-2"
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Resume Button */}
                    <a
                        href="https://drive.google.com/file/d/1KW0UZZvpYgDZj1GqBMIPGpSP_8VdzoX2/view?usp=drive_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-slate-700 bg-slate-900/50 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white hover:text-black hover:border-white"
                    >
                        Resume
                    </a>
                </div>

                {/* --- MOBILE MENU BUTTON --- */}
                <button
                    className="block md:hidden text-white focus:outline-none"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-8 w-8"
                    >
                        {mobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        )}
                    </svg>
                </button>
            </div>

            {/* --- MOBILE MENU OVERLAY --- */}
            <div
                className={`absolute top-full left-0 w-full overflow-hidden bg-black/95 backdrop-blur-xl transition-[max-height] duration-500 ease-in-out md:hidden ${
                    mobileMenuOpen ? "max-h-screen" : "max-h-0"
                }`}
            >
                <div className="flex flex-col items-center gap-8 py-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-xl font-bold text-slate-300 hover:text-white"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        className="text-xl font-bold text-blue-400"
                    >
                        Resume
                    </a>
                </div>
            </div>
        </nav>
    );
}