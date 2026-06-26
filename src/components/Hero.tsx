"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTypewriter } from "@/hooks/useTypewriter";
import HologramImage from "./HologramImage";
import ScrambleText from "./ScrambleText";
import SpotlightCard from "./SpotlightCard";
import Magnetic from "./Magnetic";
import CyberGrid from "./CyberGrid";
import TechOrbit from "./TechOrbit";
import Vortex from "./Vortex";

// --- TERMINAL LOG COMPONENT ---
const TerminalLog = () => {
    const [lines, setLines] = useState<string[]>([]);
    const [location1, setLocation1] = useState<string | null>(null);
    const hasStartedRef = useRef(false);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const res = await fetch("https://ipapi.co/json/");
                if (!res.ok) throw new Error("Failed");
                const data = await res.json();
                setLocation1(`${data.city}, ${data.region}, ${data.country_name}`);
            } catch (error) {
                setLocation1("Encrypted Proxy / Unknown IP");
            }
        };
        fetchLocation();
    }, []);

    useEffect(() => {
        if (!location1 || hasStartedRef.current) return;
        hasStartedRef.current = true;

        const location2 = "Naperville, IL, United States";
        const city = location1.includes("Proxy") ? "behind that proxy" : location1.split(",")[0];

        const messages = [
            `🤖 Connection detected from ---> [${location1}].`,
            `🤖 Session established ---> [${location2}].`,
            `Thanks for stopping by all the way from ${city}. Access Granted. Don't worry, I promise I'm not running Wireshark on this session... mostly. 😅`
        ];

        let currentLine = 0;
        let currentChar = 0;
        let currentText = "";

        const typeLine = () => {
            if (currentLine >= messages.length) return;
            const targetLine = messages[currentLine];

            if (currentChar < targetLine.length) {
                currentText += targetLine[currentChar];
                setLines(prev => {
                    const newLines = [...prev];
                    newLines[currentLine] = currentText;
                    return newLines;
                });
                currentChar++;
                setTimeout(typeLine, 30);
            } else {
                currentLine++;
                currentChar = 0;
                currentText = "";
                if (currentLine < messages.length) {
                    setLines(prev => [...prev, ""]);
                    setTimeout(typeLine, 500);
                }
            }
        };

        setLines([""]);
        typeLine();
    }, [location1]);

    if (!location1) return (
        <div className="mt-10 w-full max-w-[720px] h-24 rounded-lg border border-slate-800 bg-black/50 p-4 shadow-inner backdrop-blur-sm flex flex-col justify-center gap-3">
            <div className="h-2 w-1/3 bg-slate-800 rounded animate-pulse"></div>
            <div className="h-2 w-1/2 bg-slate-800 rounded animate-pulse delay-75"></div>
            <div className="h-2 w-1/4 bg-slate-800 rounded animate-pulse delay-150"></div>
        </div>
    );

    return (
        <SpotlightCard className="mt-10 w-full max-w-[720px] rounded-lg border border-slate-800 bg-black/50 p-4 font-mono text-xs md:text-sm text-green-500 shadow-inner backdrop-blur-sm">
            {lines.map((line, idx) => (
                <div key={idx} className="mb-1 last:mb-0 break-words leading-relaxed">
                    <span className="opacity-50 mr-2">{`>`}</span>
                    {line}
                    {idx === lines.length - 1 && <span className="animate-pulse inline-block h-3 w-2 bg-green-500 ml-1 align-middle"></span>}
                </div>
            ))}
        </SpotlightCard>
    );
};

export default function Hero() {
    const [isMobile, setIsMobile] = useState(false);

    // Typing state for the code snippet
    const [codeTypedText, setCodeTypedText] = useState("");
    const codeFullText = "while(alive) { drink(coffee); code(); }";

    const typedText = useTypewriter("Hi, I'm Jesse Ngolab");

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Logic for the code block typing animation
    useEffect(() => {
        let i = 0;
        const startTimeout = setTimeout(() => {
            const typingInterval = setInterval(() => {
                setCodeTypedText(codeFullText.slice(0, i));
                i++;
                if (i > codeFullText.length) {
                    clearInterval(typingInterval);
                }
            }, 60);
            return () => clearInterval(typingInterval);
        }, 1000); // Starts slightly after page load

        return () => clearTimeout(startTimeout);
    }, []);


    return (
        <section id="home" className="relative flex min-h-screen w-full flex-col items-center justify-evenly bg-transparent overflow-hidden py-10">
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <CyberGrid />
                <Vortex />
                <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen animate-[pulse_8s_ease-in-out_infinite]" />
                <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen animate-[pulse_10s_ease-in-out_infinite_reverse]" />
            </div>

            <div className="relative z-10 grid w-full grid-cols-1 xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-12 xl:gap-12 px-6 md:px-12 lg:px-16 max-w-[1920px] mx-auto min-h-[80vh]">
                
                {/* Left Text: Pixel Pusher */}
                <div className="order-2 xl:order-1 flex flex-col items-center xl:items-start text-center xl:text-left gap-6 z-20 justify-self-end w-full">
                    <h1 className="text-6xl md:text-7xl lg:text-[6rem] xl:text-[7rem] 2xl:text-[8rem] font-black tracking-tighter drop-shadow-2xl text-purple-400 leading-[0.9]">
                        Pixel<br className="hidden xl:block" /> Pusher.
                    </h1>
                    <p className="max-w-[400px] text-lg font-medium leading-relaxed text-slate-400 italic">
                        "I'm not a professional; I'm just a hobbyist designer with an Adobe Creative Cloud subscription, creating UI designs that avoid the usual and add strange, delightful surprises."
                    </p>
                </div>

                {/* Center Hologram Image with Tech Orbit */}
                <div className="order-1 xl:order-2 relative shrink-0 w-full xl:w-[520px] flex justify-center items-center mt-8 xl:mt-0 z-0 justify-self-center pointer-events-none">
                    <div className="relative w-[350px] lg:w-[450px] xl:w-[520px] h-[350px] lg:h-[450px] xl:h-[520px] flex justify-center items-center pointer-events-auto">
                        <TechOrbit>
                            <HologramImage />
                        </TechOrbit>
                    </div>
                </div>

                {/* Right Text: FullStack Pancake */}
                <div className="order-3 xl:order-3 flex flex-col items-center xl:items-end text-center xl:text-right gap-6 z-20 justify-self-start w-full">
                    <h2 className="text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] 2xl:text-[7.5rem] font-black tracking-tighter drop-shadow-2xl text-blue-400 leading-[0.9]">
                        {"<FullStack"}<br className="hidden xl:block" />{"Pancake/>"}
                    </h2>
                    <p className="max-w-[500px] text-lg font-light leading-relaxed text-slate-400">
                        I write code
                        {/* NEW: Typing Animation Block */}
                        <code className="mx-2 px-2 py-1 rounded bg-white/[0.03] text-blue-400 font-mono text-sm border border-white/10 inline-flex items-center min-w-[280px]">
                            <span>{codeTypedText}</span>
                            <span className="animate-pulse border-r-2 border-blue-500 h-4 ml-1"></span>
                        </code>
                        that works, build pipelines that scale, and then attempt to <span className="text-[#e30909] font-mono font-bold tracking-tight uppercase">breach</span> them just to prove they're <span className="text-[#39d353] font-mono font-bold tracking-tight uppercase">secure</span>.
                    </p>
                </div>

            </div>

            {/* Google-style Search Bar & Navigation */}
            <div className="relative z-20 flex w-full flex-col items-center px-6" aria-hidden="true">
                <div className="group flex h-14 md:h-16 w-full max-w-[720px] items-center rounded-full border border-gray-500/30 bg-[var(--color-surface-100)] px-6 shadow-xl transition-all hover:bg-[var(--color-surface-200)] hover:shadow-2xl hover:border-gray-500/50">
                    <div className="pr-4 text-gray-400">
                        <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
                    </div>
                    {/* Maps the search value to your main greeting typewriter */}
                    <div className="flex-1 flex items-center overflow-hidden h-full" aria-label="Search" role="searchbox">
                        <span className="text-lg md:text-xl text-[#e8eaed] font-sans whitespace-nowrap">{typedText}</span>
                        <span className="animate-pulse w-[2px] h-6 bg-blue-500 ml-1"></span>
                    </div>
                    <div className="flex items-center gap-5 pl-4 border-l border-gray-600/50 h-8">
                        <svg className="h-6 w-6 cursor-pointer text-[#8ab4f8] hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"></path><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"></path></svg>
                        <svg className="h-6 w-6 cursor-pointer text-[#8ab4f8] hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
                    </div>
                </div>

                <div className="mt-10 flex gap-6">
                    <Magnetic>
                        <a href="#experience" className="rounded border border-transparent bg-[var(--color-surface-200)] px-8 py-3 text-base font-medium text-[#e8eaed] transition-colors hover:bg-[var(--color-surface-300)] hover:border-[#5f6368] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50">View Work</a>
                    </Magnetic>
                    <Magnetic>
                        <a href="#contact" className="rounded border border-transparent bg-[var(--color-surface-200)] px-8 py-3 text-base font-medium text-[#e8eaed] transition-colors hover:bg-[var(--color-surface-300)] hover:border-[#5f6368] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50">Contact Me</a>
                    </Magnetic>
                </div>

                <TerminalLog />
            </div>
        </section>
    );
}