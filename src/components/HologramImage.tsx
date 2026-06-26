"use client";
import Image from "next/image";

export default function HologramImage() {
    return (
        <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-full border border-slate-800 bg-black overflow-hidden group cursor-pointer shadow-[0_0_50px_rgba(59,130,246,0.15)]">
            {/* Scanline Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_4px] z-20 pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity" />
            
            {/* Base Image */}
            <Image 
                src="/assets/image_2.png" 
                alt="Profile" 
                fill 
                className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            
            {/* Holographic Blue Tint */}
            <div className="absolute inset-0 bg-blue-500/20 opacity-100 group-hover:opacity-0 transition-opacity duration-500 z-10 mix-blend-color pointer-events-none" />
            
            {/* Glitch RGB Split Layers (Visible only on hover) */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 mix-blend-screen pointer-events-none">
                <div className="absolute -inset-4 translate-x-[4px] translate-y-[-2px] bg-red-500/30 mix-blend-screen animate-pulse">
                    <Image src="/assets/image_2.png" alt="Profile Red Glitch" fill className="object-cover object-center opacity-50" />
                </div>
                <div className="absolute -inset-4 translate-x-[-4px] translate-y-[2px] bg-cyan-500/30 mix-blend-screen animate-pulse delay-75">
                    <Image src="/assets/image_2.png" alt="Profile Cyan Glitch" fill className="object-cover object-center opacity-50" />
                </div>
            </div>
            
            {/* Live Feed Badge */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/80 border border-white/20 rounded backdrop-blur-md">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-[pulse_1s_infinite]" />
                    <span className="text-[10px] font-mono text-white/80 uppercase tracking-widest">Live_Feed // 0x48A</span>
                </div>
            </div>
        </div>
    );
}
