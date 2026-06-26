"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { initAudio } from "@/utils/audio";

const SYMBOLS = ["{", "}", "<", ">", "/", "*", ";", "[]", "=>", "()"];

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);
    const [particles, setParticles] = useState<{ id: number; x: number; y: number; symbol: string; targetX: number; targetY: number; rotate: number }[]>([]);

    useEffect(() => {
        // Disable custom cursor physics on touch devices (mobile/tablets) to save battery and prevent jank
        if (typeof window !== "undefined" && window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
            return;
        }

        let lastSpawn = 0;
        let particleId = 0;

        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            
            const now = Date.now();
            if (now - lastSpawn > 50) { // Spawn rate
                setParticles(prev => {
                    const newParticles = [...prev, {
                        id: particleId++,
                        x: e.clientX,
                        y: e.clientY,
                        symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
                        targetX: e.clientX + (Math.random() * 60 - 30),
                        targetY: e.clientY - (Math.random() * 50 + 50),
                        rotate: Math.random() * 360
                    }];
                    // Keep only last 12 active particles
                    return newParticles.slice(-12);
                });
                lastSpawn = now;
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("a") || target.closest("button") || target.closest(".magnetic") || target.closest("input")) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const enableAudio = () => initAudio();
        window.addEventListener('mousedown', enableAudio, { once: true });
        window.addEventListener('keydown', enableAudio, { once: true });

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener('mousedown', enableAudio);
            window.removeEventListener('keydown', enableAudio);
        };
    }, []);

    return (
        <>
            <AnimatePresence>
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 1, x: p.x, y: p.y, scale: 0.5 }}
                        animate={{ opacity: 0, x: p.targetX, y: p.targetY, rotate: p.rotate, scale: 1.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="hidden md:block fixed top-0 left-0 text-blue-400 font-mono text-sm font-bold pointer-events-none z-[9998]"
                    >
                        {p.symbol}
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* The main tiny dot */}
            <motion.div
                className="hidden md:block fixed top-0 left-0 w-2 h-2 bg-blue-400 rounded-full pointer-events-none z-[10000] mix-blend-screen shadow-[0_0_15px_rgba(59,130,246,1)]"
                animate={{ x: mousePosition.x - 4, y: mousePosition.y - 4 }}
                transition={{ type: "tween", ease: "linear", duration: 0 }}
            />
            {/* The trailing ring */}
            <motion.div
                className="hidden md:block fixed top-0 left-0 w-8 h-8 border border-blue-400/50 rounded-full pointer-events-none z-[9999]"
                animate={{ 
                    x: mousePosition.x - 16, 
                    y: mousePosition.y - 16,
                    scale: isHovering ? 1.5 : 1,
                    backgroundColor: isHovering ? "rgba(59, 130, 246, 0.15)" : "rgba(59, 130, 246, 0)"
                }}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.2 }}
            />
        </>
    );
}
