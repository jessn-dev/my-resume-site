"use client";

import { useEffect, useRef, useState } from "react";

// --- 1. DUMMY DATA (Replace with your real experience) ---
const experiences = [
    {
        id: 1,
        role: "Senior Frontend Developer",
        company: "Tech Solutions Inc.",
        period: "2023 - Present",
        description: "Leading the frontend team to build scalable React applications. focused on performance optimization and component library architecture.",
        tags: ["React", "Next.js", "Tailwind", "TypeScript"],
    },
    {
        id: 2,
        role: "UI/UX Designer",
        company: "Creative Studio",
        period: "2021 - 2023",
        description: "Designed intuitive user interfaces for mobile and web apps. Conducted user research and created high-fidelity prototypes in Figma.",
        tags: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    },
    {
        id: 3,
        role: "Cybersecurity Analyst (Intern)",
        company: "SecureNet Systems",
        period: "2020 - 2021",
        description: "Assisted in network vulnerability assessments and penetration testing. Monitored security logs and helped implement firewall rules.",
        tags: ["Network Security", "Linux", "Python", "PenTesting"],
    },
];

// --- 2. REUSABLE ANIMATION COMPONENT ---
// This wrapper handles the "fade in when visible" logic
const ScrollReveal = ({ children, width = "100%" }: { children: React.ReactNode; width?: string }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // When the element is 10% visible, trigger animation
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target); // Only animate once
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return (
        <div
            ref={ref}
            style={{ width }}
            className={`transform transition-all duration-1000 ease-out ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
            }`}
        >
            {children}
        </div>
    );
};

// --- 3. MAIN COMPONENT ---
export default function Experience() {
    return (
        <section id="experience" className="relative min-h-screen w-full bg-black py-20 px-4 text-slate-300">

            <div className="mx-auto max-w-5xl">

                {/* SECTION TITLE */}
                <ScrollReveal>
                    <div className="mb-16 text-center">
                        <h2 className="text-4xl font-black text-white sm:text-5xl">
                            Experience<span className="text-blue-500">.</span>
                        </h2>
                        <div className="mt-4 h-1 w-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                    </div>
                </ScrollReveal>

                {/* TIMELINE CONTAINER */}
                <div className="relative border-l border-slate-800 ml-4 md:ml-0 md:border-none">

                    {/* CENTER LINE (Desktop Only) */}
                    <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-slate-800 md:block"></div>

                    {experiences.map((exp, index) => {
                        const isLeft = index % 2 === 0;

                        return (
                            <div key={exp.id} className={`relative mb-12 flex flex-col md:flex-row ${isLeft ? "md:flex-row-reverse" : ""}`}>

                                {/* 1. DOT ON TIMELINE */}
                                <div className="absolute -left-[21px] top-0 flex h-10 w-10 items-center justify-center rounded-full bg-black border-4 border-slate-900 md:left-1/2 md:-translate-x-1/2">
                                    <div className="h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"></div>
                                </div>

                                {/* 2. SPACER (To push content to the side) */}
                                <div className="hidden w-1/2 md:block"></div>

                                {/* 3. CARD CONTENT */}
                                <div className="ml-8 md:ml-0 md:w-1/2 md:px-10">
                                    <ScrollReveal>
                                        <div className="group relative overflow-hidden rounded-xl bg-slate-900/40 border border-slate-800 p-6 transition-colors hover:border-slate-600/50 hover:bg-slate-900/60">

                                            {/* Hover Glow Effect */}
                                            <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl transition-all group-hover:bg-blue-500/20"></div>

                                            <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-blue-400">
                        {exp.period}
                      </span>
                                            <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                                            <h4 className="mb-4 text-sm font-semibold text-slate-400">{exp.company}</h4>

                                            <p className="mb-4 text-sm leading-relaxed text-slate-400">
                                                {exp.description}
                                            </p>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2">
                                                {exp.tags.map((tag) => (
                                                    <span key={tag} className="rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-slate-300 border border-slate-800">
                            {tag}
                          </span>
                                                ))}
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                </div>

                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}