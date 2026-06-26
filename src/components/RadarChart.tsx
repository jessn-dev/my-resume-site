"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SpotlightCard from "./SpotlightCard";

const STATS = [
    { label: "Frontend", value: 95 },
    { label: "Backend", value: 85 },
    { label: "DevOps", value: 75 },
    { label: "Security", value: 80 },
    { label: "UI/UX", value: 90 },
    { label: "Cloud", value: 70 },
];

export default function RadarChart() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const size = 320;
    const center = size / 2;
    const radius = size * 0.35;
    const angleStep = (Math.PI * 2) / STATS.length;

    const bgPoints = STATS.map((_, i) => {
        const x = center + radius * Math.cos(i * angleStep - Math.PI / 2);
        const y = center + radius * Math.sin(i * angleStep - Math.PI / 2);
        return `${x},${y}`;
    }).join(" ");

    const statPoints = STATS.map((stat, i) => {
        const r = radius * (stat.value / 100);
        const x = center + r * Math.cos(i * angleStep - Math.PI / 2);
        const y = center + r * Math.sin(i * angleStep - Math.PI / 2);
        return `${x},${y}`;
    }).join(" ");

    return (
        <SpotlightCard className="relative w-full h-[400px] md:h-[500px] flex flex-col items-center justify-center rounded-3xl border border-slate-800 bg-slate-950/50 backdrop-blur-md overflow-hidden mt-10">
            <h3 className="absolute top-8 left-8 text-sm md:text-lg font-bold text-white tracking-widest uppercase font-mono border-b border-blue-500/50 pb-2 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">SYS_SKILL_MATRIX</h3>
            <svg width={size} height={size} className="overflow-visible mt-8">
                {/* Background Web Rings */}
                {[0.2, 0.4, 0.6, 0.8, 1].map((scale) => (
                    <polygon
                        key={scale}
                        points={bgPoints}
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="1"
                        style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
                    />
                ))}
                
                {/* Axes Lines */}
                {STATS.map((_, i) => {
                    const x = center + radius * Math.cos(i * angleStep - Math.PI / 2);
                    const y = center + radius * Math.sin(i * angleStep - Math.PI / 2);
                    return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />;
                })}

                {/* Data Polygon Fill */}
                {mounted && (
                    <motion.polygon
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
                        points={statPoints}
                        fill="rgba(59, 130, 246, 0.2)"
                        stroke="rgba(59, 130, 246, 0.8)"
                        strokeWidth="2"
                        className="drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                        style={{ transformOrigin: "center" }}
                    />
                )}

                {/* Text Labels */}
                {STATS.map((stat, i) => {
                    const x = center + (radius + 35) * Math.cos(i * angleStep - Math.PI / 2);
                    const y = center + (radius + 35) * Math.sin(i * angleStep - Math.PI / 2);
                    return (
                        <text
                            key={i}
                            x={x}
                            y={y}
                            fill="rgba(255,255,255,0.6)"
                            fontSize="11"
                            fontFamily="monospace"
                            textAnchor="middle"
                            dominantBaseline="middle"
                        >
                            {stat.label} [{stat.value}]
                        </text>
                    );
                })}
            </svg>
        </SpotlightCard>
    );
}
