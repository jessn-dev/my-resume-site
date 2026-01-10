"use client";

import { useState, useMemo, useEffect } from "react";
import { experiences, schools, certificates } from "@/data/resume";
import { GraduationCap, Settings, Terminal as TerminalIcon } from "lucide-react";

// --- 1. SHARED UI: PANEL FRAME ---
const PanelFrame = ({ title, children, className = "" }: any) => (
    <div className={`relative flex flex-col rounded-xl border border-white/10 bg-[#0d1117] overflow-hidden w-full min-w-0 ${className}`}>
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-black/20 shrink-0">
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]/20 border border-[#ff5f56]/40" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]/20 border border-[#ffbd2e]/40" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]/20 border border-[#27c93f]/40" />
            </div>
            <span className="text-[11px] font-mono text-white/40 uppercase tracking-[0.2em] font-medium">
                {title}
            </span>
            <Settings size={14} className="text-white/20" />
        </div>
        <div className="flex-1 pt-6 px-8 md:px-12 pb-10 overflow-y-auto custom-scrollbar min-w-0">
            {children}
        </div>
    </div>
);

// --- 2. GITHUB STYLE CONTRIBUTION GRAPH ---
const ContributionGraph = ({ period }: { period: string }) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["", "Mon", "", "Wed", "", "Fri", ""];

    const { weeks } = useMemo(() => {
        const totalWeeks = 52; // Full year view to match GitHub
        const generatedWeeks = [];
        const seedBase = period.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

        for (let i = 0; i < totalWeeks; i++) {
            const dayValues = Array.from({ length: 7 }, (_, j) => {
                const rand = (Math.sin(seedBase + i * 10 + j) * 10000) % 1;
                // Specific sparse logic to match your reference image
                return Math.abs(rand) > 0.96 ? 4 : Math.abs(rand) > 0.92 ? 2 : Math.abs(rand) > 0.88 ? 1 : 0;
            });
            generatedWeeks.push({ days: dayValues });
        }
        return { weeks: generatedWeeks };
    }, [period]);

    return (
        <div className="mt-10 rounded-lg border border-white/5 bg-[#0d1117] p-6 w-full overflow-hidden">
            <div className="flex flex-col gap-2">
                {/* Month Labels */}
                <div className="flex text-[10px] text-white/40 font-mono pl-8 mb-1">
                    {months.map((m) => (
                        <div key={m} className="flex-1 text-left">{m}</div>
                    ))}
                </div>

                <div className="flex gap-3">
                    {/* Day Labels */}
                    <div className="flex flex-col justify-between text-[10px] text-white/40 font-mono h-[85px] py-1">
                        {days.map((d, i) => <div key={i} className="h-[10px]">{d}</div>)}
                    </div>

                    {/* The Grid */}
                    <div className="flex-1 overflow-x-auto scrollbar-hide">
                        <div className="grid grid-flow-col gap-[3px] auto-cols-max">
                            {weeks.map((week, wIdx) => (
                                <div key={wIdx} className="grid grid-rows-7 gap-[3px]">
                                    {week.days.map((level, dIdx) => (
                                        <div
                                            key={dIdx}
                                            className={`h-[10px] w-[10px] rounded-[2px] ${
                                                level === 4 ? "bg-[#39d353]" :
                                                    level === 2 ? "bg-[#26a641]" :
                                                        level === 1 ? "bg-[#0e4429]" : "bg-[#161b22]"
                                            }`}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-white/30">
                    <span>Learn how we count contributions</span>
                    <div className="flex items-center gap-1.5">
                        <span>Less</span>
                        <div className="h-[10px] w-[10px] rounded-[2px] bg-[#161b22]" />
                        <div className="h-[10px] w-[10px] rounded-[2px] bg-[#0e4429]" />
                        <div className="h-[10px] w-[10px] rounded-[2px] bg-[#26a641]" />
                        <div className="h-[10px] w-[10px] rounded-[2px] bg-[#39d353]" />
                        <span>More</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 3. MAIN COMPONENT ---
export default function Experience() {
    const [activeTabId, setActiveTabId] = useState(0);

    return (
        <section id="experience" className="relative w-full min-h-fit bg-black pt-24 pb-0 px-6 md:px-12 lg:px-20">
            <div className="max-w-4xl mx-auto text-center mb-20">
                <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                    Professional <span className="text-blue-500">Experience</span>.
                </h2>
                <p className="text-xl md:text-2xl text-white/40 leading-relaxed font-light">
                    My journey through code, infrastructure, and cybersecurity.
                </p>
            </div>

            <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row gap-10 items-start pb-20">
                <div className="flex-[1.8] w-full min-w-0">
                    <div
                        className="grid w-full border border-white/10 border-b-0 rounded-t-xl overflow-hidden bg-black/40"
                        style={{ gridTemplateColumns: `repeat(${experiences.length}, minmax(0, 1fr))` }}
                    >
                        {experiences.map((exp) => (
                            <button
                                key={exp.id}
                                onMouseEnter={() => setActiveTabId(exp.id)}
                                className={`px-1 py-4 text-[11px] font-mono transition-all border-r border-white/10 last:border-r-0 ${
                                    activeTabId === exp.id
                                        ? "bg-[#0d1117] text-blue-400 shadow-[inset_0_2px_0_#3b82f6]"
                                        : "text-white/30 hover:bg-white/5"
                                }`}
                            >
                                <span className="truncate w-full block text-center uppercase tracking-widest">{exp.company}.log</span>
                            </button>
                        ))}
                    </div>

                    <PanelFrame title="WORK_HISTORY_CONSOLE" className="!rounded-t-none border-t-0">
                        {experiences.map((exp) => (
                            <div key={exp.id} className={`${activeTabId === exp.id ? "block" : "hidden"} animate-in fade-in duration-500`}>
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                                    <div>
                                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">{exp.role}</h3>
                                        <span className="text-blue-500/80 font-mono text-base tracking-wide">@ {exp.company}</span>
                                    </div>
                                    <span className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[12px] font-mono text-white/40">{exp.period}</span>
                                </div>
                                <p className="text-[17px] text-white/50 font-light leading-relaxed mb-10 border-l border-white/10 pl-8">{exp.description}</p>
                                <div className="space-y-10">
                                    <div>
                                        <p className="text-[11px] font-mono text-white/30 uppercase tracking-[0.3em] mb-5">// APPLIED_STACK</p>
                                        <div className="flex flex-wrap gap-3">
                                            {exp.tags.map(tag => (
                                                <span key={tag} className="px-4 py-1.5 text-[12px] font-mono bg-white/[0.03] text-white/60 border border-white/10 rounded-md">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <ContributionGraph period={exp.period} />
                                </div>
                            </div>
                        ))}
                    </PanelFrame>
                </div>

                {/* Right Sticky Aside */}
                <aside className="flex-1 w-full lg:sticky lg:top-32 space-y-8 min-w-0">
                    <PanelFrame title="EDUCATION_LOG" className="h-fit">
                        <div className="flex items-center gap-3 mb-8">
                            <GraduationCap className="text-purple-400 shrink-0" size={20} />
                            <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-slate-500">Academic_History</h3>
                        </div>
                        <div className="space-y-8">
                            {schools.map((edu, idx) => (
                                <div key={idx} className="group border-l border-slate-800 pl-6 relative">
                                    <div className="absolute -left-[1px] top-1.5 h-3 w-3 bg-slate-900 border border-slate-700 rounded-full group-hover:border-purple-500 transition-colors" />
                                    <h4 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors leading-tight mb-1">{edu.school}</h4>
                                    <p className="text-slate-400 text-sm font-light mb-3">{edu.degree}</p>
                                    <span className="text-[10px] font-mono text-slate-600">{edu.period}</span>
                                </div>
                            ))}
                        </div>
                    </PanelFrame>

                    <PanelFrame title="CERT_VALIDATION" className="h-fit">
                        <div className="flex items-center gap-3 mb-8">
                            <TerminalIcon className="text-green-400 shrink-0" size={20} />
                            <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-slate-500">Credentials</h3>
                        </div>
                        <div className="grid gap-4">
                            {certificates.map((cert, idx) => (
                                <div key={idx} className="p-4 rounded-xl bg-black/40 border border-slate-800/50 hover:border-green-500/30 transition-all flex items-center justify-between group">
                                    <div className="min-w-0">
                                        <p className="text-sm font-bold text-white group-hover:text-green-400 transition-colors truncate">{cert.name}</p>
                                        <p className="text-[10px] font-mono text-slate-600 mt-1 uppercase">{cert.date}</p>
                                    </div>
                                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e] shrink-0" />
                                </div>
                            ))}
                        </div>
                    </PanelFrame>
                </aside>
            </div>
        </section>
    );
}