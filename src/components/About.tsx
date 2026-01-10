"use client";

import React, { useEffect, useRef, useState } from "react";
import { Code2, Server, ShieldCheck, Cpu, Settings } from "lucide-react";
import { aboutBento } from "@/data/resume";
import CardSwap from "./ui/CardSwap";
import PhilosophyTerminal from "./PhilosophyTerminal";

const IconMap: Record<string, any> = { Code2, Server, ShieldCheck, Cpu };

const PanelFrame = ({ title, children, className = "", status = "ACTIVE" }: any) => (
    <div className={`relative flex flex-col rounded-3xl border border-slate-800 bg-slate-950/50 backdrop-blur-md overflow-hidden h-[600px] ${className}`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-black/60 shrink-0">
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40" />
            </div>
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em]">{title}</span>
                <div className="h-1 w-1 rounded-full bg-blue-500 animate-pulse" />
            </div>
            <div className="flex items-center gap-3 text-slate-600">
                <span className="text-[9px] font-mono hidden md:block">{status}</span>
                <Settings size={12} className="opacity-50" />
            </div>
        </div>
        <div className="flex-1 p-8 md:p-10 overflow-y-auto custom-scrollbar relative">
            {children}
        </div>
    </div>
);

export default function About() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
        }, { threshold: 0.1 });
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="about" ref={sectionRef} className="relative w-full min-h-fit bg-black text-slate-300 pt-32 pb-10 px-6 md:px-12 lg:px-20 overflow-visible">
            <div suppressHydrationWarning className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-[1920px] mx-auto">
                <div className={`mb-24 max-w-4xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                    <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">Beyond the <span className="text-blue-500">Code</span>.</h2>
                    <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-light">{aboutBento.header.description}</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-10 items-start justify-center mb-0">
                    <div className="w-full lg:w-1/2 max-w-[620px] relative overflow-visible">
                        <CardSwap delay={4500}>
                            {aboutBento.cards.map((card, idx) => {
                                const Icon = IconMap[card.icon];
                                return (
                                    <PanelFrame key={card.id} title={`DRIVE_0${idx + 1}`} status="STABLE">
                                        <div className="flex flex-col h-full">
                                            <div className="p-4 w-fit rounded-2xl bg-blue-500/10 text-blue-400 mb-8 border border-blue-500/20 shrink-0">{Icon && <Icon size={32} />}</div>
                                            <h3 className="text-3xl font-bold text-white mb-6 tracking-tight shrink-0">{card.title}</h3>
                                            <p className="text-lg text-slate-400 font-light leading-relaxed mb-8">{card.description}</p>
                                            {card.tags && (
                                                <div className="flex flex-wrap gap-2 mt-auto pt-4 shrink-0">
                                                    {card.tags.map((tag) => (
                                                        <span key={tag} className="px-3 py-1 text-[10px] font-mono rounded-full bg-blue-500/5 text-blue-400/60 border border-blue-500/10">{tag}</span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </PanelFrame>
                                );
                            })}
                        </CardSwap>
                    </div>

                    <aside className={`w-full lg:w-1/2 max-w-[620px] lg:sticky lg:top-32 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`}>
                        <PanelFrame title="EXECUTION_LOG" status="LIVE">
                            <div className="flex items-center gap-4 mb-8 shrink-0">
                                <div className="p-3 rounded-2xl bg-green-500/10 text-green-400 border border-green-500/20"><Cpu size={28} /></div>
                                <h3 className="text-2xl font-bold text-white tracking-tight">Philosophy</h3>
                            </div>
                            <div className="p-8 rounded-2xl bg-black/60 border border-slate-800/50 shadow-[inset_0_2px_20px_rgba(0,0,0,0.8)] flex flex-col justify-center min-h-[340px]">
                                <PhilosophyTerminal />
                            </div>
                            <div className="mt-8 pt-6 border-t border-slate-800/50 flex justify-between items-center text-[9px] font-mono text-slate-500 tracking-[0.2em] uppercase shrink-0">
                                <span>Kernel: 0x9FF22</span><span className="text-green-500">Security: Hardened</span>
                            </div>
                        </PanelFrame>
                    </aside>
                </div>
            </div>
        </section>
    );
}