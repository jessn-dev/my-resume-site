"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FolderCode, FileText, Cpu, Github, Globe } from "lucide-react";

// --- GitHub Data Interface ---
interface GitHubData {
    structure: string[];
    topics: string[];
    size: string;
    loading: boolean;
}

const projects = [
    {
        id: "sentient",
        repo: "jessn-dev/Sentient",
        title: "Sentient",
        description: "A full-stack financial intelligence platform designed to provide AI-powered stock market predictions.",
        link: "https://google.com",
        fallback: {
            structure: ["src/app/page.tsx", "src/hooks/useMetrics.ts", "api/v1/auth.go"],
            topics: ["Next.js", "TypeScript", "Tailwind", "Recharts", "FastAPI", "Python 3.12", "SQLModel", "Pydantic", "Pandas", "Meta's Prophet Engine", "Alpaca Markets", "Yahoo Finance", "Finviz", "FRED", "SQLite (default local)", "Supabase (PostgreSQL)", "Supabase Auth", "Redis (via Upstash)", "QStash (Cron jobs)", "Docker"],
            size: "4.2 MB"
        }
    },
    {
        id: "vantage",
        repo: "jessn-dev/VANTAGE",
        title: "VANTAGE",
        description: "A premium, performance-first digital portfolio designed specifically for the modern videographer and photographer.",
        link: "https://google.com",
        fallback: {
            structure: ["scripts/exploit.py", "docker/config.yml", "logs/audit.json"],
            topics: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "HLS.js", "Next/Image", "SVG Filters", "Vercel", "GitHub"],
            size: "12.8 MB"
        }
    }
];

export default function Projects() {
    const [repoData, setRepoData] = useState<Record<string, GitHubData>>({});

    useEffect(() => {
        const fetchGitHubData = async () => {
            const dataMap: Record<string, GitHubData> = {};

            projects.forEach(p => {
                dataMap[p.id] = { ...p.fallback, loading: true };
            });
            setRepoData({ ...dataMap });

            for (const project of projects) {
                try {
                    const repoRes = await fetch(`https://api.github.com/repos/${project.repo}`);
                    if (!repoRes.ok) throw new Error("Rate limited");
                    const repoJson = await repoRes.json();

                    const treeRes = await fetch(`https://api.github.com/repos/${project.repo}/contents`);
                    const treeJson = await treeRes.json();

                    const structure = Array.isArray(treeJson)
                        ? treeJson.slice(0, 5).map((f: any) => f.name)
                        : project.fallback.structure;

                    setRepoData(prev => ({
                        ...prev,
                        [project.id]: {
                            size: `${(repoJson.size / 1024).toFixed(1)} MB`,
                            topics: repoJson.topics?.length ? repoJson.topics : project.fallback.topics,
                            structure: structure,
                            loading: false
                        }
                    }));
                } catch (e) {
                    setRepoData(prev => ({
                        ...prev,
                        [project.id]: { ...prev[project.id], loading: false }
                    }));
                }
            }
        };
        fetchGitHubData();
    }, []);

    // Function to handle redirection
    const handleRedirect = (repoPath: string) => {
        window.open(`https://github.com/${repoPath}`, "_blank", "noopener,noreferrer");
    };

    return (
        <section id="projects" className="relative w-full bg-black py-24 px-6 md:px-12 lg:px-20">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                    Deployed <span className="text-blue-500">Projects</span>.
                </h2>
                <p className="text-xl text-white/40 font-light font-mono italic">{`// hover_to_inspect_click_to_open_repo`}</p>
            </div>

            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project) => {
                    const data = repoData[project.id] || { ...project.fallback, loading: true };

                    return (
                        <motion.div
                            key={project.id}
                            onClick={() => handleRedirect(project.repo)}
                            whileHover={{ y: -5 }}
                            className="group relative flex flex-col rounded-xl border border-white/10 bg-[#0d1117] overflow-hidden cursor-pointer hover:border-blue-500/50 transition-all duration-500 h-[400px]"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-black/20 z-20">
                                <div className="flex items-center gap-3">
                                    <FolderCode size={16} className="text-blue-500" />
                                    <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest">{project.title}.git</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-mono text-white/20 uppercase">
                                        {data.loading ? "fetching..." : data.size}
                                    </span>
                                    <Github size={14} className="text-white/20 group-hover:text-white transition-colors" />
                                </div>
                            </div>

                            <div className="relative p-8 flex flex-col h-full overflow-hidden">
                                {/* RESTORED HOVER EFFECT: Terminal Overlay */}
                                <div className="absolute inset-0 z-10 bg-[#0d1117]/95 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center">
                                    <p className="text-[10px] font-mono text-blue-500 mb-4 uppercase tracking-[0.2em]">
                                        {`> SOURCE_DIR_SCAN:`}
                                    </p>
                                    <div className="space-y-3 font-mono text-xs text-white/60">
                                        {data.structure.map((file, fIdx) => (
                                            <div key={fIdx} className="flex items-center gap-3">
                                                <FileText size={14} className="text-white/20" />
                                                <span>{file}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-white/5 text-[10px] font-mono text-green-500 animate-pulse">
                                        [ CLICK TO INITIALIZE GITHUB_REDIRECT ]
                                    </div>
                                </div>

                                {/* Default View Content */}
                                <div className="z-0 transition-all duration-500 group-hover:scale-95 group-hover:opacity-10">
                                    <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">{project.title}</h3>
                                    <p className="text-slate-400 text-base font-light mb-6 line-clamp-3">{project.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {data.topics.map(tag => (
                                            <span key={tag} className="px-3 py-1 text-[10px] font-mono bg-white/[0.03] text-white/40 border border-white/10 rounded-md">{tag}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-auto flex items-center justify-between z-20">
                                    <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest animate-pulse">
                                        [ Open Repository ]
                                    </span>
                                    <div className="flex gap-4">
                                        <Globe size={16} className="text-white/20 hover:text-blue-400" onClick={(e) => {
                                            e.stopPropagation(); // Prevents GitHub redirect
                                            window.open(project.link, "_blank");
                                        }} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}