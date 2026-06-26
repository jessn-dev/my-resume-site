"use client";
import React from "react";
import { Code2, Server, Cpu, Database, Cloud, Shield, Terminal, Webhook } from "lucide-react";

export default function TechOrbit({ children }: { children: React.ReactNode }) {
    const icons = [Code2, Server, Cpu, Database, Cloud, Shield, Terminal, Webhook];
    const radius = 260; // Original large radius

    return (
        <div className="relative flex items-center justify-center w-full h-full min-h-[550px]">
            {/* Center Item */}
            <div className="relative z-20 w-full h-full flex items-center justify-center">
                {children}
            </div>

            {/* Orbiting Ring */}
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                {/* Visual Ring Track */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-blue-500/10 opacity-50" />
                
                {/* Rotating Container */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] animate-[spin_30s_linear_infinite]">
                    {icons.map((Icon, i) => {
                        const angle = (i / icons.length) * 360;
                        return (
                            <div 
                                key={i}
                                className="absolute top-1/2 left-1/2"
                                style={{ transform: `rotate(${angle}deg) translateX(${radius}px)` }}
                            >
                                {/* Counter-rotation to keep icons upright */}
                                <div className="animate-[spin_30s_linear_infinite_reverse] flex items-center justify-center w-12 h-12 -ml-6 -mt-6 bg-black/80 border border-blue-500/30 rounded-full text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] backdrop-blur-md">
                                    <Icon size={20} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
