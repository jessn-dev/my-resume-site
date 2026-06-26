"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IDENTITIES = [
    { icon: "💻", text: "Software Engineer" },
    { icon: "🥋", text: "Martial Artist" },
    { icon: "📸", text: "Photographer" },
    { icon: "🎮", text: "Gamer" },
];

export default function IdentityRotator() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % IDENTITIES.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-[100px] overflow-hidden relative w-full md:w-[400px] flex items-center border-l-4 border-blue-500 pl-8 bg-gradient-to-r from-blue-500/10 to-transparent rounded-r-2xl">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={index}
                    initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -50, opacity: 0, filter: "blur(10px)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="absolute flex items-center gap-5"
                >
                    <span className="text-5xl drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                        {IDENTITIES[index].icon}
                    </span>
                    <h3 className="text-3xl font-bold text-white tracking-tight">
                        {IDENTITIES[index].text}
                    </h3>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
