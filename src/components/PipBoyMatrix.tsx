"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SPECIAL_STATS = [
    { label: "S", name: "Strength", skill: "Backend", desc: "Server architecture & databases.", val: 8 },
    { label: "P", name: "Perception", skill: "Frontend", desc: "UI/UX & client-side engineering.", val: 9 },
    { label: "E", name: "Endurance", skill: "DevOps", desc: "CI/CD & infrastructure pipelines.", val: 7 },
    { label: "C", name: "Charisma", skill: "Leadership", desc: "Mentorship & team scaling.", val: 8 },
    { label: "I", name: "Intelligence", skill: "Systems", desc: "High-level system architecture.", val: 9 },
    { label: "A", name: "Agility", skill: "Algorithms", desc: "Data structures & rapid iteration.", val: 8 },
    { label: "L", name: "Luck", skill: "Debugging", desc: "Sometimes it just works.", val: 10 },
];

export default function PipBoyMatrix() {
    const [selectedStat, setSelectedStat] = useState(0);
    const [glitch, setGlitch] = useState(false);
    const [level, setLevel] = useState(30); // Default placeholder
    const [progress, setProgress] = useState(50); // Default placeholder

    useEffect(() => {
        // Glitch effect interval
        const glitchInterval = setInterval(() => {
            if (Math.random() > 0.8) {
                setGlitch(true);
                setTimeout(() => setGlitch(false), 150);
            }
        }, 2000);

        // Age & XP Progress Calculator
        const today = new Date();
        const birthDate = new Date("1995-07-16");
        
        let calculatedAge = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            calculatedAge--;
        }
        setLevel(calculatedAge);

        const nextBirthday = new Date(today.getFullYear(), 6, 16); // Month is 0-indexed (6 = July)
        if (today > nextBirthday) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }
        const lastBirthday = new Date(nextBirthday.getFullYear() - 1, 6, 16);
        const totalDays = (nextBirthday.getTime() - lastBirthday.getTime()) / (1000 * 60 * 60 * 24);
        const daysPassed = (today.getTime() - lastBirthday.getTime()) / (1000 * 60 * 60 * 24);
        setProgress(Math.floor((daysPassed / totalDays) * 100));

        return () => clearInterval(glitchInterval);
    }, []);

    return (
        <div className="relative w-full h-full bg-[#050505] text-[#14FF00] font-mono p-4 rounded-xl overflow-hidden shadow-[inset_0_0_20px_rgba(20,255,0,0.1)] flex flex-col cursor-default select-none">
            {/* CRT Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-40"></div>
            
            {/* Screen Glitch overlay */}
            {glitch && <div className="absolute inset-0 pointer-events-none z-40 bg-white/5 mix-blend-screen -translate-x-1"></div>}

            {/* Header */}
            <div className="flex justify-between items-end border-b-2 border-[#14FF00] pb-2 mb-4 shrink-0">
                <h3 className="text-xl font-black tracking-widest uppercase">STAT</h3>
                <h3 className="text-xl font-black tracking-widest uppercase opacity-50">INV</h3>
                <h3 className="text-xl font-black tracking-widest uppercase opacity-50">DATA</h3>
                <h3 className="text-xl font-black tracking-widest uppercase opacity-50">MAP</h3>
                <h3 className="text-xl font-black tracking-widest uppercase opacity-50">RADIO</h3>
            </div>

            {/* Body */}
            <div className="flex-1 flex gap-4">
                {/* Left Side: Character / Vault Boy Stand-in */}
                <div className="flex-1 border-2 border-[#14FF00] rounded-sm relative flex flex-col justify-center items-center overflow-hidden">
                    {/* Retro Vault Boy Ascii or Icon */}
                    <motion.div 
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-center"
                    >
                        <pre className="text-[10px] leading-[10px] font-black text-[#14FF00] drop-shadow-[0_0_5px_rgba(20,255,0,0.8)]">
{`   _..._
 .:::::::.
 ::::::::'
  \`::::'
    ||
   /||\\
  / || \\
 /  ||  \\`}
                        </pre>
                    </motion.div>
                    
                    {/* Level Bar */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                        <span className="text-xs shrink-0">LVL {level}</span>
                        <div className="flex-1 h-3 border border-[#14FF00] p-[1px]">
                            <div className="h-full bg-[#14FF00] transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                </div>

                {/* Right Side: S.P.E.C.I.A.L Stats */}
                <div className="w-[180px] flex flex-col gap-1">
                    {SPECIAL_STATS.map((stat, idx) => (
                        <div 
                            key={stat.name}
                            onMouseEnter={() => setSelectedStat(idx)}
                            className={`flex justify-between items-center px-2 py-1 cursor-pointer transition-colors ${
                                selectedStat === idx ? "bg-[#14FF00] text-black" : "text-[#14FF00] hover:bg-[#14FF00]/20"
                            }`}
                        >
                            <span className="font-bold truncate pr-2">{selectedStat === idx ? stat.skill : stat.name}</span>
                            <span className="font-bold shrink-0">{stat.val}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Description Box */}
            <div className="h-[80px] mt-4 border-2 border-[#14FF00] p-3 text-sm shrink-0">
                <p className="opacity-80">
                    <span className="font-bold uppercase block mb-1">
                        {SPECIAL_STATS[selectedStat].name} // {SPECIAL_STATS[selectedStat].skill}
                    </span>
                    {SPECIAL_STATS[selectedStat].desc}
                </p>
            </div>
            
            {/* Ambient Green Glow */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(20,255,0,0.15)] z-0"></div>
        </div>
    );
}
