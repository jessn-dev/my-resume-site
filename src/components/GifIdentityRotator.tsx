"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IDENTITIES = [
    { text: "Software Engineer", type: "video", url: "https://media.tenor.com/iCqG_iT-h48AAAPo/bills-ugh.mp4" },
    { text: "Martial Artist", type: "video", url: "https://media.tenor.com/Ggi6UKslMZEAAAPo/cat-fight.mp4" }, 
    { text: "Photographer", type: "video", url: "https://media.tenor.com/dmQT6a5gm7kAAAPo/cat.mp4" },
    { text: "Gamer", type: "video", url: "https://media.tenor.com/PDwgdKMLIdIAAAPo/8bit-cat-funny-cat.mp4" },
];

export default function GifIdentityRotator() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % IDENTITIES.length);
        }, 10000); // Increased from 4s to 10s for better viewing time
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-[400px] flex flex-col justify-end items-center pb-8 group">
            {/* Seamless Blended Background Video */}
            <div 
                className="absolute inset-0 pointer-events-none mix-blend-screen"
                style={{
                    maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
                    WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)"
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        {IDENTITIES[index].type === "video" ? (
                            <video 
                                src={IDENTITIES[index].url} 
                                autoPlay 
                                loop 
                                muted 
                                playsInline
                                className="w-full h-full object-cover opacity-80"
                            />
                        ) : (
                            <motion.img 
                                initial={{ scale: 1.15 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 6, ease: "easeOut" }}
                                src={IDENTITIES[index].url} 
                                alt={IDENTITIES[index].text}
                                className="w-full h-full object-cover opacity-80"
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
            
            {/* Crisp Floating TextOverlay (Unmasked) */}
            <div className="relative z-10 text-center">
                <AnimatePresence mode="wait">
                    <motion.h3 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] tracking-tighter"
                    >
                        {IDENTITIES[index].text}
                    </motion.h3>
                </AnimatePresence>
                <div className="w-12 h-1 bg-blue-500 mx-auto mt-4 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
            </div>
        </div>
    );
}
