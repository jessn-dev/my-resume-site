"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import ScrambleText from "./ScrambleText";
import SpotlightCard from "./SpotlightCard";
import { schools, certificates } from "@/data/resume";
import { GraduationCap, Settings, Terminal as TerminalIcon } from "lucide-react";

// --- 1. SHARED UI: PANEL FRAME ---
const PanelFrame = ({ title, children, className = "" }: any) => (
    <div className={`relative p-[1px] rounded-xl overflow-hidden w-full min-w-0 ${className} shadow-[0_0_40px_rgba(0,0,0,0.8)] group`}>
        {/* Sweeping Animated Border Glow */}
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,transparent_60%,#3b82f6_100%)] animate-[spin_4s_linear_infinite] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Inner Card Content */}
        <SpotlightCard className="relative flex flex-col rounded-xl border border-white/5 bg-[#0d1117] overflow-hidden w-full h-full z-10">
            {/* Futuristic Reticle Watermark */}
            <div className="absolute -bottom-32 -right-32 z-0 opacity-[0.03] pointer-events-none text-blue-500 animate-[spin_60s_linear_infinite]">
                <svg width="500" height="500" viewBox="0 0 100 100" className="opacity-50">
                    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" fill="none" />
                    <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="1" strokeDasharray="1 3" fill="none" />
                    <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="0.5" fill="none" />
                    <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
                    <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
                    <rect x="48" y="5" width="4" height="4" fill="currentColor" />
                    <rect x="48" y="91" width="4" height="4" fill="currentColor" />
                    <rect x="5" y="48" width="4" height="4" fill="currentColor" />
                    <rect x="91" y="48" width="4" height="4" fill="currentColor" />
                </svg>
            </div>

            <div className="relative flex items-center justify-between px-5 py-3 border-b border-white/5 bg-black/40 shrink-0 z-20">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]/20 border border-[#ff5f56]/50 shadow-[0_0_8px_rgba(255,95,86,0.4)]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]/20 border border-[#ffbd2e]/50 shadow-[0_0_8px_rgba(255,189,46,0.4)]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]/20 border border-[#27c93f]/50 shadow-[0_0_8px_rgba(39,201,63,0.4)]" />
                </div>
                <span className="text-[10px] font-mono text-white/50 uppercase tracking-[0.3em] font-bold drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
                    {title}
                </span>
                <Settings size={14} className="text-white/30 animate-[spin_10s_linear_infinite]" />
            </div>
            <div className="relative flex-1 pt-8 px-8 md:px-12 pb-10 overflow-y-auto custom-scrollbar min-w-0 z-10 bg-transparent">
                {children}
            </div>
        </SpotlightCard>
    </div>
);

// --- 2. CYBER CONTRIBUTION GRAPH ---
const ContributionGraph = ({ period }: { period: string }) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["", "Mon", "", "Wed", "", "Fri", ""];

    const { weeks, labels } = useMemo(() => {
        let labelsToUse = monthNames;
        let totalWeeksToUse = 52;
        
        try {
            const [start, end] = period.split("-").map(s => s.trim());
            const parseDate = (str: string) => {
                if (!str || str.toLowerCase() === "present") return new Date();
                const parts = str.split(" ");
                if (parts.length < 2) return new Date();
                const m = monthNames.findIndex(mon => parts[0].substring(0,3).toLowerCase() === mon.toLowerCase());
                const y = parseInt(parts[1], 10);
                return new Date(y, m > -1 ? m : 0, 1);
            };

            const startDate = parseDate(start);
            const endDate = parseDate(end);
            
            const monthsDiff = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()) + 1;
            
            if (monthsDiff > 0 && monthsDiff < 120) {
                const genLabels = [];
                let currMonth = startDate.getMonth();
                for(let i = 0; i < monthsDiff; i++) {
                    genLabels.push(monthNames[currMonth]);
                    currMonth++;
                    if (currMonth > 11) currMonth = 0;
                }
                labelsToUse = genLabels;
                totalWeeksToUse = Math.ceil(monthsDiff * (52 / 12));
            }
        } catch(e) {
            console.error("Failed to parse period", e);
        }

        const generatedWeeks = [];
        // Create a strong, distinct seed from the period string
        const seedBase = period.split('').reduce((hash, char) => {
            return ((hash << 5) - hash) + char.charCodeAt(0);
        }, 0);

        for (let i = 0; i < totalWeeksToUse; i++) {
            const dayValues = Array.from({ length: 7 }, (_, j) => {
                // Multiply by non-integers so different seeds jump to completely different wave phases
                const rand = (Math.sin(seedBase * 13.37 + i * 9.13 + j * 7.77) * 10000) % 1;
                // Specific sparse logic to match your reference image
                return Math.abs(rand) > 0.96 ? 4 : Math.abs(rand) > 0.92 ? 2 : Math.abs(rand) > 0.88 ? 1 : 0;
            });
            generatedWeeks.push({ days: dayValues });
        }
        return { weeks: generatedWeeks, labels: labelsToUse };
    }, [period]);

    return (
        <div className="mt-10 rounded-lg border border-white/5 bg-[#0a0a0a] p-6 w-full overflow-hidden relative group">
            {/* Animated Graph Scanline */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-full h-[2px] bg-cyan-400/50 shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-[scan_2s_linear_infinite]" />
            </div>

            <div className="relative flex flex-col gap-2 z-20">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                        // SYSTEM_COMMITS
                    </span>
                </div>

                <div className="overflow-x-auto scrollbar-hide pb-2">
                    <div className="w-max">
                        {/* Month Labels */}
                        <div className="flex text-[10px] text-white/40 font-mono pl-[38px] mb-2">
                            {labels.map((m, idx) => (
                                <div key={idx} className="w-[56px] text-left shrink-0">{m}</div>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            {/* Day Labels */}
                            <div className="flex flex-col justify-between text-[10px] text-white/40 font-mono h-[85px] py-1 w-[26px]">
                                {days.map((d, i) => <div key={i} className="h-[10px] leading-[10px]">{d}</div>)}
                            </div>

                            {/* The Grid */}
                            <div className="grid grid-flow-col gap-[3px] auto-cols-max">
                                {weeks.map((week, wIdx) => (
                                    <div key={wIdx} className="grid grid-rows-7 gap-[3px]">
                                        {week.days.map((level, dIdx) => (
                                            <div
                                                key={dIdx}
                                                className={`h-[10px] w-[10px] rounded-[2px] transition-all duration-300 hover:scale-150 hover:z-30 cursor-crosshair ${
                                                    level === 4 ? "bg-cyan-300 shadow-[0_0_5px_rgba(103,232,249,0.8)]" :
                                                        level === 2 ? "bg-cyan-500 shadow-[0_0_5px_rgba(6,182,212,0.6)]" :
                                                            level === 1 ? "bg-blue-600" : "bg-white/5"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/30">
                    <span>System Activity Log</span>
                    <div className="flex items-center gap-1.5">
                        <span>Idle</span>
                        <div className="h-[10px] w-[10px] rounded-[2px] bg-white/5" />
                        <div className="h-[10px] w-[10px] rounded-[2px] bg-blue-600" />
                        <div className="h-[10px] w-[10px] rounded-[2px] bg-cyan-500 shadow-[0_0_5px_rgba(6,182,212,0.6)]" />
                        <div className="h-[10px] w-[10px] rounded-[2px] bg-cyan-300 shadow-[0_0_5px_rgba(103,232,249,0.8)]" />
                        <span>Peak</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 3. MAIN COMPONENT ---
export default function Experience() {
    const [activeTabId, setActiveTabId] = useState(0);
    const [experiences, setExperiences] = useState<any[]>([]);

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const res = await fetch("/resume.json");
                if (res.ok) {
                    const data = await res.json();
                    setExperiences(data);
                    if (data.length > 0 && activeTabId === 0) {
                        setActiveTabId(data[0].id);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch resume.json", error);
            }
        };
        fetchResume();
    }, []);

    if (experiences.length === 0) {
        return (
            <section id="experience" className="relative w-full min-h-[50vh] bg-transparent pt-24 pb-0 px-6 md:px-12 lg:px-20 flex items-center justify-center">
                <div className="text-white/40 font-mono animate-pulse">[ LOADING_EXPERIENCE_DATA... ]</div>
            </section>
        );
    }

    return (
        <section id="experience" className="relative w-full min-h-fit bg-transparent pt-24 pb-0 px-6 md:px-12 lg:px-20">
            <div className="max-w-4xl mx-auto text-center mb-20">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter"
                >
                    Professional <span className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"><ScrambleText text="Experience" /></span>.
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl md:text-2xl text-white/40 leading-relaxed font-light"
                >
                    My journey through code, infrastructure, and cybersecurity.
                </motion.p>
            </div>

            <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row gap-10 items-start pb-20 relative">
                
                {/* Glowing Laser Timeline Background */}
                <div className="hidden lg:block absolute left-[-20px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-30 blur-[1px]" />
                <div className="hidden lg:block absolute left-[-20px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-blue-400 to-transparent" />

                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex-[1.8] w-full min-w-0"
                >
                    <div
                        className="flex md:grid w-full border border-white/10 border-b-0 rounded-t-xl overflow-x-auto scrollbar-hide bg-[#0a0a0a] snap-x"
                        style={{ gridTemplateColumns: `repeat(${experiences.length}, minmax(0, 1fr))` }}
                    >
                        {experiences.map((exp) => (
                            <button
                                key={exp.id}
                                onClick={() => setActiveTabId(exp.id)}
                                className="group relative shrink-0 snap-start px-6 md:px-1 py-4 text-[11px] font-mono transition-colors border-r border-white/10 last:border-r-0 text-white/40 hover:text-white/70 hover:bg-white/5"
                            >
                                {activeTabId === exp.id && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent border-t-2 border-blue-500 shadow-[0_-5px_15px_rgba(59,130,246,0.2)]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className={`relative z-10 flex items-center justify-center gap-2 truncate w-full uppercase tracking-widest transition-colors ${activeTabId === exp.id ? 'text-blue-400 font-bold drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : ''}`}>
                                    <TerminalIcon size={12} className={activeTabId === exp.id ? 'text-blue-400' : 'text-white/20 group-hover:text-white/50'} />
                                    {exp.company}.log
                                </span>
                            </button>
                        ))}
                    </div>

                    <PanelFrame title="WORK_HISTORY_CONSOLE" className="!rounded-t-none border-t-0 hover:border-white/20 transition-colors duration-500">
                        {experiences.map((exp) => {
                            let logoSrc = `https://www.google.com/s2/favicons?domain=${exp.link}&sz=128`;
                            if (exp.link === "8451.com") {
                                logoSrc = `https://cdn.brandfetch.io/8451.com/w/400/h/400`;
                            } else if (exp.link === "pccw.com" || exp.link === "pccwglobal.com") {
                                logoSrc = `/assets/pccw-logo.png`;
                            }

                            return activeTabId === exp.id && (
                                <div key={exp.id} className="group/panel animate-in fade-in duration-500">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                                        <div className="flex items-center gap-5">
                                            {/* Company Icon Avatar */}
                                            <div className="shrink-0 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center relative transition-all duration-500">
                                                {exp.link ? (
                                                    <img 
                                                        src={logoSrc} 
                                                        alt={`${exp.company} logo`} 
                                                        className="w-full h-full object-contain scale-100 relative z-10 opacity-60 group-hover/panel:opacity-100 group-hover/panel:scale-110 group-hover/panel:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-500 grayscale group-hover/panel:grayscale-0" 
                                                    />
                                                ) : (
                                                    <TerminalIcon className="text-white/20 group-hover/panel:text-white group-hover/panel:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-500 relative z-10" size={32} />
                                                )}
                                            </div>

                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="h-[2px] w-8 bg-blue-500/50 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                                                    <span className="text-blue-500/80 font-mono text-sm tracking-[0.2em] uppercase">
                                                        @ <ScrambleText text={exp.company} />
                                                    </span>
                                                </div>
                                                <h3 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500 tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] leading-tight">
                                                    {exp.role}
                                                </h3>
                                            </div>
                                        </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-black/50 border border-white/5 rounded backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.8)]" />
                                        <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest">{exp.period}</span>
                                    </div>
                                </div>
                                <div className="mb-10 space-y-0 relative">
                                    {/* Left timeline axis glow */}
                                    <div className="absolute left-[3px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-blue-500/0 via-blue-500/20 to-blue-500/0 hidden md:block" />
                                    
                                    {(Array.isArray(exp.description) 
                                        ? exp.description 
                                        : exp.description.split('. ').map((s: string) => s.endsWith('.') ? s : s + '.').filter((s: string) => s.length > 2)
                                    ).slice(0, 4).map((bullet: string, i: number) => (
                                        <div 
                                            key={i} 
                                            className="flex gap-5 group"
                                        >
                                            <div className="flex flex-col items-center mt-1.5 shrink-0 z-10">
                                                <div className="w-2.5 h-2.5 rounded-full border border-blue-400 bg-black group-hover:bg-blue-400 group-hover:shadow-[0_0_15px_rgba(59,130,246,1)] transition-all duration-300" />
                                                <div className="w-[1px] h-full bg-blue-500/20 my-1 group-hover:bg-blue-400/80 transition-colors duration-300" />
                                            </div>
                                            <p className="text-[16px] text-white/70 font-light leading-relaxed pb-8 group-hover:text-white transition-colors duration-300">
                                                <span className="text-blue-500 font-mono mr-3 select-none opacity-50 group-hover:opacity-100 transition-opacity">{">"}</span>
                                                {bullet}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-10">
                                    <div>
                                        <p className="text-[11px] font-mono text-white/30 uppercase tracking-[0.3em] mb-5">// APPLIED_STACK</p>
                                        <div className="flex flex-wrap gap-2">
                                            {exp.tags.map((tag: string) => (
                                                <span key={tag} className="px-3 py-1 text-[11px] font-mono bg-blue-500/5 text-blue-300 border border-blue-500/20 rounded hover:bg-blue-500/20 hover:border-blue-500/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-all cursor-default">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <ContributionGraph period={exp.period} />
                                </div>
                            </div>
                        );
                        })}
                    </PanelFrame>
                </motion.div>

                {/* Right Sticky Aside */}
                <motion.aside 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex-1 w-full lg:sticky lg:top-32 space-y-8 min-w-0 z-10"
                >
                    <PanelFrame title="EDUCATION_LOG" className="h-fit hover:border-white/20 transition-colors duration-500 group/edu">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <GraduationCap className="text-cyan-400 shrink-0 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" size={20} />
                                <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-white/70">Academic_History</h3>
                            </div>
                            <span className="px-2 py-0.5 text-[9px] font-mono border border-cyan-500/30 text-cyan-400 rounded bg-cyan-500/10">SYS.EDU</span>
                        </div>
                        <div className="space-y-6 relative">
                            {/* Main timeline line */}
                            <div className="absolute left-[23px] md:left-[27px] top-6 bottom-4 w-[2px] border-l-2 border-dashed border-white/10 group-hover/edu:border-cyan-500/30 transition-colors" />

                            {schools.map((edu, idx) => (
                                <div key={idx} className="group relative flex items-start gap-4 md:gap-5">
                                    {/* University Logo Node */}
                                    <div className="relative z-10 shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#0a0a0a] border-2 border-white/10 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-500 overflow-hidden flex items-center justify-center">
                                        {/* Inner glow */}
                                        <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        {edu.link ? (
                                            <img 
                                                src={`https://www.google.com/s2/favicons?domain=${edu.link}&sz=128`} 
                                                alt={`${edu.school} logo`} 
                                                className="w-full h-full object-cover scale-[1.35] group-hover:scale-[1.5] transition-transform duration-500 grayscale group-hover:grayscale-0 relative z-10" 
                                            />
                                        ) : (
                                            <GraduationCap className="text-white/30 group-hover:text-cyan-400 transition-colors relative z-10" size={24} />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0 pt-1 pb-4">
                                        <h4 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 group-hover:to-cyan-200 transition-colors leading-tight mb-2 tracking-tight">{edu.school}</h4>
                                        <p className="text-cyan-500/80 text-sm font-light mb-3">{edu.degree}</p>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-white/20 group-hover:bg-cyan-500 rounded-full animate-pulse transition-colors" />
                                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{edu.period}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </PanelFrame>

                    <PanelFrame title="CERT_VALIDATION" className="h-fit hover:border-white/20 transition-colors duration-500 group/cert">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <TerminalIcon className="text-blue-500 shrink-0 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" size={20} />
                                <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-white/70">Credentials</h3>
                            </div>
                            <span className="px-2 py-0.5 text-[9px] font-mono border border-blue-500/30 text-blue-400 rounded bg-blue-500/10">SYS.AUTH</span>
                        </div>
                        <div className="grid gap-4">
                            {certificates.map((cert, idx) => {
                                const isInProgress = cert.name.includes("(In Progress)") || cert.date.includes("Expected");
                                const cleanName = cert.name.replace("(In Progress)", "").trim();
                                
                                // Simple vendor slug mapping for Simple Icons CDN
                                const vendorSlug = cleanName.toLowerCase().includes("comptia") ? "comptia" 
                                    : cleanName.toLowerCase().includes("isc2") ? "isc2" 
                                    : "";

                                return (
                                    <div key={idx} className={`relative p-4 rounded-lg bg-[#0a0a0a] border border-white/5 transition-all flex items-center justify-between group cursor-default overflow-hidden ${
                                        isInProgress ? 'hover:border-amber-500/50 hover:bg-amber-950/10' : 'hover:border-green-500/50 hover:bg-green-950/10'
                                    }`}>
                                        {/* Subtly animated background scanline on hover */}
                                        <div className={`absolute inset-0 z-0 bg-gradient-to-b from-transparent to-transparent opacity-0 group-hover:opacity-100 animate-[scan_3s_linear_infinite] pointer-events-none ${
                                            isInProgress ? 'via-amber-500/5' : 'via-green-500/5'
                                        }`} />
                                        
                                        <div className="relative z-10 flex items-center gap-4 min-w-0 pr-4">
                                            {/* Vendor Logo */}
                                            {vendorSlug ? (
                                                <div className={`shrink-0 w-10 h-10 rounded bg-black border border-white/10 flex items-center justify-center p-2 transition-all duration-500 overflow-hidden ${
                                                    isInProgress ? 'group-hover:border-amber-500/50 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'group-hover:border-green-500/50 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]'
                                                }`}>
                                                    <img 
                                                        src={`https://cdn.simpleicons.org/${vendorSlug}/white`} 
                                                        alt="Vendor logo" 
                                                        className="w-full h-full object-contain opacity-40 group-hover:opacity-100 transition-all duration-500 scale-110 group-hover:scale-[1.35] drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" 
                                                    />
                                                </div>
                                            ) : (
                                                <TerminalIcon className={isInProgress ? 'text-amber-500/50' : 'text-green-500/50'} size={24} />
                                            )}

                                            <div className="min-w-0">
                                                <p className="text-sm font-bold text-white transition-colors truncate drop-shadow-[0_0_5px_rgba(255,255,255,0.1)] group-hover:text-white/90">
                                                    {cleanName}
                                                </p>
                                                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">{cert.date}</p>
                                            </div>
                                        </div>

                                        <div className="relative z-10 flex flex-col items-end gap-1.5 shrink-0">
                                            {isInProgress ? (
                                                <>
                                                    <span className="text-[8px] font-mono text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded shadow-[0_0_8px_rgba(245,158,11,0.2)] animate-pulse">PENDING</span>
                                                    <div className="h-1 w-10 bg-white/5 overflow-hidden rounded-full">
                                                        <div className="h-full bg-gradient-to-r from-amber-600 to-amber-400 w-1/2 animate-[pulse_2s_ease-in-out_infinite]" />
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="text-[8px] font-mono text-green-400 border border-green-500/30 px-1.5 py-0.5 rounded shadow-[0_0_8px_rgba(34,197,94,0.2)]">VERIFIED</span>
                                                    <div className="h-1 w-10 bg-white/5 overflow-hidden rounded-full">
                                                        <div className="h-full bg-gradient-to-r from-green-600 to-green-400 w-full shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </PanelFrame>
                </motion.aside>
            </div>
        </section>
    );
}