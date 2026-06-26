"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import Magnetic from "./Magnetic";
import HoverScrambleText from "./HoverScrambleText";

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

    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
            const offset = 100; // Offset for fixed navbar
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        }
        setMobileMenuOpen(false);
    };

    return (
        <nav
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
                    onClick={(e) => handleScrollTo(e, "#home")}
                    className="text-2xl font-black tracking-tighter text-white transition-transform hover:scale-105 flex items-center gap-1"
                >
                    <HoverScrambleText text="JBN" /><span className="text-blue-500">.</span>
                </Link>

                {/* --- DESKTOP NAVIGATION --- */}
                <div className="hidden md:flex items-center gap-8">
                    
                    {/* Command Menu Hint / Trigger */}
                    <button 
                        onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
                        className="flex items-center gap-6 px-3 py-1.5 rounded-lg border border-slate-700/50 bg-[#0d1117] text-xs text-slate-400 hover:text-white hover:border-slate-500 transition-colors group"
                    >
                        <span className="flex items-center gap-2">
                            <Search size={14} className="group-hover:text-blue-400 transition-colors" /> 
                            <HoverScrambleText text="Quick Menu..." />
                        </span>
                        <div className="flex items-center gap-1 font-mono text-[10px]">
                            <kbd className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">⌘</kbd>
                            <kbd className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">K</kbd>
                        </div>
                    </button>

                    {navLinks.map((link) => (
                        <Magnetic key={link.name}>
                            <a
                                href={link.href}
                                onClick={(e) => handleScrollTo(e, link.href)}
                                className="text-sm font-medium text-slate-300 transition-colors hover:text-white hover:underline decoration-blue-500 underline-offset-8 decoration-2"
                            >
                                <HoverScrambleText text={link.name} />
                            </a>
                        </Magnetic>
                    ))}

                    {/* Resume Button */}
                    <Magnetic>
                        <a
                            href="/Jesse_Ngolab_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-slate-700 bg-slate-900/50 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white hover:text-black hover:border-white group"
                        >
                            <HoverScrambleText text="Resume" />
                        </a>
                    </Magnetic>
                </div>

                {/* --- MOBILE MENU BUTTON --- */}
                <button
                    aria-label="Toggle menu"
                    aria-expanded={mobileMenuOpen}
                    className="block md:hidden text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1"
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
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                        )}
                    </svg>
                </button>
            </div>

            {/* --- MOBILE NAVIGATION --- */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden"
                    >
                        <div className="flex h-full flex-col items-center justify-center space-y-12">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 + 0.1 }}
                                >
                                    <a
                                        href={link.href}
                                        onClick={(e) => handleScrollTo(e, link.href)}
                                        className="text-4xl font-black text-white hover:text-blue-500 transition-colors"
                                    >
                                        <HoverScrambleText text={link.name} />
                                    </a>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <a
                                    href="/Jesse_Ngolab_Resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="rounded-full bg-blue-600 px-8 py-3 text-lg font-bold text-white transition-colors hover:bg-blue-700"
                                >
                                    <HoverScrambleText text="Download Resume" />
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}