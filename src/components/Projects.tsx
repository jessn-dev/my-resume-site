"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FolderCode, FileText, Github, Cpu } from "lucide-react";
import ScrambleText from "./ScrambleText";
import SpotlightCard from "./SpotlightCard";
import HorizontalScrollWrapper from "./HorizontalScrollWrapper";

// --- GitHub Data Interface ---
interface ProjectData {
    id: string;
    repo: string;
    title: string;
    description: string;
    fullDescription?: string;
    link: string;
    structure: string[];
    topics: string[];
    size: string;
    loading: boolean;
    challenges?: string[];
}

const fallbackProjects: ProjectData[] = [
    {
        id: "sentient",
        repo: "jessn-dev/Sentient",
        title: "Sentient",
        description: "A full-stack financial intelligence platform designed to provide AI-powered stock market predictions.",
        fullDescription: "Sentient is a robust platform integrating various data sources to provide comprehensive financial intelligence and predictions.",
        link: "https://google.com",
        structure: ["src/app/page.tsx", "src/hooks/useMetrics.ts", "api/v1/auth.go"],
        topics: ["Next.js", "TypeScript", "Tailwind", "Python", "FastAPI", "PostgreSQL"],
        size: "4.2 MB",
        loading: false,
        challenges: ["Handling real-time stock market data feeds securely.", "Implementing efficient machine learning models via API."]
    },
    {
        id: "vantage",
        repo: "jessn-dev/VANTAGE",
        title: "VANTAGE",
        description: "A premium, performance-first digital portfolio designed specifically for the modern videographer and photographer.",
        fullDescription: "VANTAGE is highly optimized for performance and aesthetics, utilizing advanced SVG filters and custom video playback mechanics.",
        link: "https://google.com",
        structure: ["scripts/exploit.py", "docker/config.yml", "logs/audit.json"],
        topics: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "Vercel"],
        size: "12.8 MB",
        loading: false,
        challenges: ["Ensuring buttery smooth 60fps animations across devices.", "Optimizing heavy media assets for quick initial load times."]
    }
];

export default function Projects() {
    const [projects, setProjects] = useState<ProjectData[]>(fallbackProjects);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDynamicProjects = async () => {
            try {
                // 1. Fetch all repositories for the user, sorting by newest created first
                const reposRes = await fetch("https://api.github.com/users/jessn-dev/repos?sort=created&direction=desc&per_page=100");
                if (!reposRes.ok) {
                    console.warn("GitHub API rate limited or unavailable. Using fallback projects.");
                    return;
                }
                const reposJson = await reposRes.json();

                // 2. Filter only repos that have the 'portfolio' tag
                const portfolioRepos = reposJson.filter((repo: any) => 
                    repo.topics && repo.topics.includes("portfolio")
                );

                // If no tagged repos, stick to the fallback data
                if (portfolioRepos.length === 0) {
                    setIsLoading(false);
                    return;
                }

                // 3. For each tagged repo, fetch its file structure
                const dynamicProjects = await Promise.all(
                    portfolioRepos.map(async (repo: any) => {
                        let structure = ["README.md", "package.json", "src/"];
                        try {
                            const treeRes = await fetch(`https://api.github.com/repos/${repo.full_name}/contents`);
                            if (treeRes.ok) {
                                const treeJson = await treeRes.json();
                                if (Array.isArray(treeJson)) {
                                    structure = treeJson.slice(0, 5).map((f: any) => f.name);
                                }
                            }
                        } catch (e) {
                            console.error("Contents fetch error", e);
                        }

                        // Remove 'portfolio' tag so it doesn't show in the UI list
                        const displayTopics = repo.topics.filter((t: string) => t !== "portfolio");

                        return {
                            id: repo.name,
                            repo: repo.full_name,
                            title: repo.name.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase()),
                            description: repo.description || "No description provided.",
                            fullDescription: repo.description || "Detailed case study description goes here for the expanded view.",
                            link: repo.homepage || repo.html_url,
                            structure,
                            topics: displayTopics.length > 0 ? displayTopics : ["TypeScript", "React"],
                            size: `${(repo.size / 1024).toFixed(1)} MB`,
                            loading: false,
                            challenges: ["Implementing reliable GitHub API integration", "Responsive design and premium UI/UX"] // generic fallback
                        };
                    })
                );

                setProjects(dynamicProjects);
            } catch (error) {
                console.warn("GitHub fetch failed, using fallbacks:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDynamicProjects();
    }, []);

    // Function to handle redirection
    const handleRedirect = (repoPath: string) => {
        window.open(`https://github.com/${repoPath}`, "_blank", "noopener,noreferrer");
    };

    const headerContent = (
        <div className="max-w-4xl mx-auto text-center mb-0 md:mb-2">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-5xl md:text-7xl font-black text-white mb-2 tracking-tighter"
            >
                Featured <span className="text-blue-500"><ScrambleText text="Projects" /></span>.
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hidden md:block text-xl text-white/40 font-light font-mono italic"
            >
                {`// hover_to_inspect_files_click_to_expand`}
            </motion.p>
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="md:hidden flex items-center justify-center mt-4"
            >
                <span className="text-xs font-mono text-blue-500 uppercase tracking-widest animate-pulse bg-blue-500/10 px-4 py-2 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                    ← Swipe to explore →
                </span>
            </motion.div>
        </div>
    );

    return (
        <section id="projects" className="relative w-full bg-transparent pt-24 pb-0 px-6 md:px-12 lg:px-20">
            <HorizontalScrollWrapper headerContent={headerContent}>
                <div className="w-max flex gap-6 pb-8 px-2 lg:px-0 h-[500px]">
                    {isLoading ? (
                        <div className="w-full text-center text-white/40 py-10 font-mono animate-pulse shrink-0">
                            [ FETCHING_GITHUB_REPOSITORIES... ]
                        </div>
                    ) : (
                        <>
                            {projects.map((project, idx) => (
                                <TiltCard key={project.id} project={project} index={idx} handleRedirect={handleRedirect} />
                            ))}
                            
                            {/* End of Scroll Giant Cinematic Placeholder */}
                            <div className="flex items-center justify-center shrink-0 w-[85vw] lg:w-[50vw] h-[500px]">
                                <motion.div 
                                    initial={{ opacity: 0, x: 100, filter: "blur(10px)" }}
                                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                    viewport={{ once: false, amount: 0.3 }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="text-center"
                                >
                                    <h3 className="font-black text-5xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-600 tracking-tighter mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                        More <span className="text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]">Pending</span>.
                                    </h3>
                                    <span className="font-mono text-sm lg:text-base text-blue-400 uppercase tracking-[0.4em] block animate-pulse">
                                        // Await_next_deployment
                                    </span>
                                </motion.div>
                            </div>
                        </>
                    )}
                </div>
            </HorizontalScrollWrapper>
        </section>
    );
}

// --- TILT CARD SUBCOMPONENT ---
function TiltCard({ project, index, handleRedirect }: { project: any, index: number, handleRedirect: any }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="perspective-1000 w-[85vw] lg:w-[450px] shrink-0 snap-center h-[500px]"
        >
            <SpotlightCard className="h-full">
                <motion.div
                    layoutId={project.id}
                    onClick={() => handleRedirect(project.repo)}
                    className="group relative flex flex-col rounded-xl border border-white/10 bg-black overflow-hidden cursor-pointer shadow-[0_0_30px_rgba(0,0,0,0.8)] h-full"
                >
                    {/* Animated Glow Border on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />
                    
                    {/* Faint Dotted Background Grid */}
                    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />

                    {/* Header */}
                    <div className="relative flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#0a0a0a] z-20">
                        <div className="flex items-center gap-3">
                            <FolderCode size={16} className="text-blue-500 drop-shadow-[0_0_5px_rgba(59,130,246,0.8)]" />
                            <span className="text-[11px] font-mono text-white/50 uppercase tracking-widest">{project.title}.git</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono text-white/30 uppercase">
                                {project.loading ? "fetching..." : project.size}
                            </span>
                            <Github size={14} className="text-white/30 group-hover:text-white transition-colors" onClick={(e) => {
                                e.stopPropagation();
                                handleRedirect(project.repo);
                            }} />
                        </div>
                    </div>

                    <div className="relative p-8 flex flex-col h-full overflow-hidden z-10 bg-gradient-to-b from-blue-950/10 to-transparent">
                        
                        {/* RESTORED HOVER EFFECT: Terminal Overlay */}
                        <div className="absolute inset-0 z-30 bg-black/95 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center backdrop-blur-sm">
                            <p className="text-[10px] font-mono text-blue-500 mb-4 uppercase tracking-[0.2em] shadow-blue-500/50">
                                {`> Inspecting_Directory...`}
                            </p>
                            <div className="space-y-3 font-mono text-xs text-white/60">
                                {project.structure.map((file: string, fIdx: number) => (
                                    <div key={fIdx} className="flex items-center gap-3 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300" style={{ transitionDelay: `${fIdx * 50}ms` }}>
                                        <FileText size={14} className="text-white/20" />
                                        <span>{file}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 pt-4 border-t border-white/10 text-[10px] font-mono text-green-400 animate-pulse drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]">
                                [ CLICK TO INITIALIZE CLONE ]
                            </div>
                        </div>

                        {/* Default View Content */}
                        <div className="z-10 transition-all duration-500 group-hover:scale-95 group-hover:opacity-10 flex flex-col h-full relative">
                            {/* Massive Background Icon Watermark */}
                            <div className="absolute -top-10 -right-10 opacity-[0.03] z-0 pointer-events-none rotate-12">
                                <Cpu size={250} />
                            </div>

                            <div className="relative z-10 flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="h-[2px] w-8 bg-blue-500/50 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                                    <span className="text-[9px] font-mono text-green-400/80 tracking-[0.2em] uppercase border border-green-500/30 px-2 py-0.5 rounded shadow-[0_0_10px_rgba(74,222,128,0.1)]">
                                        SYS.ONLINE
                                    </span>
                                </div>
                                {/* Artificial Network Activity Graph */}
                                <div className="hidden md:flex items-end gap-[2px] h-6 opacity-50">
                                    {[40, 70, 40, 90, 60, 100, 30].map((h, i) => (
                                        <div 
                                            key={i} 
                                            className="w-1 bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.5)]" 
                                            style={{ 
                                                height: `${h}%`,
                                                animation: `pulse ${1 + (i * 0.2)}s ease-in-out infinite alternate`
                                            }} 
                                        />
                                    ))}
                                </div>
                            </div>
                            
                            <h3 className="relative z-10 text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500 mb-2 tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                                {project.title}
                            </h3>
                            
                            {/* Artificial Hardware Metrics - ANIMATED */}
                            <div className="relative z-10 flex items-center gap-6 mb-6 text-[10px] font-mono text-slate-500">
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-500/50 uppercase tracking-widest">CPU</span>
                                    <div className="flex gap-[2px]">
                                        {[1,2,3,4,5].map(i => (
                                            <div 
                                                key={i} 
                                                className={`w-1.5 h-2.5 rounded-[1px] transition-colors ${i <= 3 ? 'bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.5)]' : 'bg-white/10'}`} 
                                                style={i === 3 ? { animation: 'pulse 1s steps(2, end) infinite' } : {}}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-purple-500/50 uppercase tracking-widest">MEM</span>
                                    <div className="flex gap-[2px]">
                                        {[1,2,3,4,5].map(i => (
                                            <div 
                                                key={i} 
                                                className={`w-1.5 h-2.5 rounded-[1px] transition-colors ${i <= 4 ? 'bg-purple-500 shadow-[0_0_5px_rgba(168,85,247,0.5)]' : 'bg-white/10'}`} 
                                                style={i === 4 ? { animation: 'pulse 1.5s steps(2, end) infinite' } : {}}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10 mb-8 pl-4">
                                <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-gradient-to-b from-blue-500 via-blue-500/50 to-transparent shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                                <p className="text-slate-400 text-sm md:text-[15px] font-light leading-relaxed line-clamp-3">
                                    {project.description}
                                </p>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mt-auto mb-6">
                                {project.topics.map((tag: string) => (
                                    <span key={tag} className="px-3 py-1 text-[10px] font-mono bg-blue-500/5 text-blue-300 border border-blue-500/30 rounded hover:bg-blue-500/20 hover:border-blue-500/80 hover:shadow-[0_0_10px_rgba(59,130,246,0.4)] transition-all cursor-default">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-auto text-[10px] font-mono text-blue-500 uppercase tracking-widest animate-pulse z-20 transition-opacity duration-300 group-hover:opacity-0">
                            [ TARGET LOCKED // CLICK TO ACCESS ]
                        </div>
                    </div>
                </motion.div>
            </SpotlightCard>
        </motion.div>
    );
}
