"use client";
import { motion } from "framer-motion";

const TECH_STACK = [
    "REACT.JS", "NEXT.JS", "TYPESCRIPT", "NODE.JS", "GO", "DOCKER", "KUBERNETES", "AWS", "POSTGRESQL", "MONGODB", "REDIS", "LINUX", "BASH", "PYTHON", "TERRAFORM", "CI/CD"
];

export default function TechMarquee() {
    return (
        <div className="w-full overflow-hidden bg-black/20 border-y border-white/5 py-6 my-16 relative flex items-center">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-[#000000] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-[#000000] to-transparent z-10" />
            
            <motion.div
                className="flex whitespace-nowrap gap-8 pr-8 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            >
                {/* Double the array for seamless infinite scroll */}
                {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                    <div key={i} className="flex items-center gap-8">
                        <span className="text-xs md:text-sm font-mono text-white/40 tracking-[0.2em] font-bold">{tech}</span>
                        <span className="text-blue-500/30">/</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
