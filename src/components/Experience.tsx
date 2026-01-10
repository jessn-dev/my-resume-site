"use client";

import { motion, Variants } from "framer-motion"; // <--- 1. Import Variants
import { Briefcase, Calendar } from "lucide-react";

export default function Experience() {
    // ... (keep your jobs array exactly as it is) ...
    const jobs = [
        // ... same data ...
        {
            company: "Tech Giant Corp",
            role: "Senior Full Stack Engineer",
            period: "2023 - Present",
            description: "Spearheaded the migration of a legacy monolith to a microservices architecture using Next.js and Go. Reduced build times by 40% and improved system reliability.",
            skills: ["React", "Go", "AWS", "Docker"]
        },
        {
            company: "FinTech Startup",
            role: "Software Developer II",
            period: "2020 - 2023",
            description: "Designed and implemented secure payment gateways handling $1M+ daily transactions. Led the internal security audit and penetration testing initiatives.",
            skills: ["Node.js", "PostgreSQL", "Redis", "Cybersecurity"]
        },
        {
            company: "Creative Agency",
            role: "Frontend Developer",
            period: "2018 - 2020",
            description: "Developed pixel-perfect, interactive web experiences for Fortune 500 clients. Specialized in complex animations and accessibility compliance (WCAG 2.1).",
            skills: ["Vue.js", "GSAP", "Sass"]
        },
    ];

    // 2. Add ': Variants' type annotation to both objects
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { x: -50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        },
    };

    return (
        // ... (rest of the component remains exactly the same) ...
        <section id="experience" className="py-24 bg-slate-950 text-slate-300 overflow-hidden">
            <div className="container mx-auto px-4 max-w-4xl">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl font-bold text-white mb-4">Professional Journey</h2>
                    <div className="h-1 w-24 bg-blue-500 mx-auto rounded-full"></div>
                </motion.div>

                {/* Timeline Container */}
                <motion.div
                    className="relative space-y-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* The Vertical Glowing Line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-slate-900 hidden md:block"></div>

                    {jobs.map((job, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="relative flex flex-col md:flex-row gap-8 group"
                        >
                            {/* Timeline Dot (Desktop only) */}
                            <div className="absolute left-4 -translate-x-1/2 mt-1.5 h-4 w-4 rounded-full border-4 border-slate-950 bg-blue-500 hidden md:block z-10 shadow-[0_0_10px_rgba(59,130,246,0.5)] group-hover:scale-125 transition-transform"></div>

                            {/* Content Card */}
                            <div className="ml-0 md:ml-12 w-full p-6 rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/80 hover:border-blue-500/30 transition-all duration-300 backdrop-blur-sm">

                                <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-4 gap-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                            {job.role}
                                        </h3>
                                        <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
                                            <Briefcase className="w-4 h-4" />
                                            <span>{job.company}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-slate-500 text-sm font-mono bg-slate-950/50 px-3 py-1 rounded-full border border-slate-800">
                                        <Calendar className="w-3 h-3" />
                                        {job.period}
                                    </div>
                                </div>

                                <p className="text-slate-400 leading-relaxed mb-6">
                                    {job.description}
                                </p>

                                {/* Tech Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {job.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-2.5 py-0.5 text-xs font-medium rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20"
                                        >
                      {skill}
                    </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}