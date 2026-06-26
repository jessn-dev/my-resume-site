"use client";
import { useState, useEffect } from "react";
import { Search, FileText, Briefcase, Mail, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { playHoverSound } from "@/utils/audio";

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const navigate = (id: string) => {
        setIsOpen(false);
        setSearch("");
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-[15vh] px-4">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="relative w-full max-w-2xl bg-[#0d1117] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        <div className="flex items-center px-4 py-4 border-b border-white/10">
                            <Search size={20} className="text-blue-500 mr-3" />
                            <input 
                                autoFocus
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Type a command or search..."
                                className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm placeholder:text-white/20"
                            />
                            <div className="text-[10px] font-mono text-white/30 border border-white/10 px-2 py-1 rounded bg-black/50">ESC</div>
                        </div>
                        <div className="p-2 space-y-1">
                            <button onMouseEnter={playHoverSound} onClick={() => navigate("home")} className="w-full flex items-center justify-between px-4 py-3 hover:bg-blue-500/10 text-slate-300 hover:text-blue-400 text-sm font-mono transition-colors rounded-lg text-left group">
                                <span className="flex items-center gap-3"><Home size={16} /> Navigate Home</span>
                                <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">Jump to Top</span>
                            </button>
                            <button onMouseEnter={playHoverSound} onClick={() => navigate("experience")} className="w-full flex items-center justify-between px-4 py-3 hover:bg-blue-500/10 text-slate-300 hover:text-blue-400 text-sm font-mono transition-colors rounded-lg text-left group">
                                <span className="flex items-center gap-3"><Briefcase size={16} /> View Experience</span>
                                <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">Jump to Timeline</span>
                            </button>
                            <button onMouseEnter={playHoverSound} onClick={() => navigate("projects")} className="w-full flex items-center justify-between px-4 py-3 hover:bg-blue-500/10 text-slate-300 hover:text-blue-400 text-sm font-mono transition-colors rounded-lg text-left group">
                                <span className="flex items-center gap-3"><FileText size={16} /> View Projects</span>
                                <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">Jump to Repos</span>
                            </button>
                            <button onMouseEnter={playHoverSound} onClick={() => navigate("contact")} className="w-full flex items-center justify-between px-4 py-3 hover:bg-blue-500/10 text-slate-300 hover:text-blue-400 text-sm font-mono transition-colors rounded-lg text-left group">
                                <span className="flex items-center gap-3"><Mail size={16} /> Contact Me</span>
                                <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">Jump to Form</span>
                            </button>
                            <button onMouseEnter={playHoverSound} onClick={() => window.open("/Jesse_Ngolab_Resume.pdf", "_blank")} className="w-full flex items-center justify-between px-4 py-3 hover:bg-green-500/10 text-slate-300 hover:text-green-400 text-sm font-mono transition-colors rounded-lg text-left group">
                                <span className="flex items-center gap-3"><FileText size={16} /> Download Resume</span>
                                <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">PDF Format</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
