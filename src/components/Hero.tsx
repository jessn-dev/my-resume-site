"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import creativePortrait from "@/public/assets/image_1.png";
import coderPortrait from "@/public/assets/image_2.png";
import StripeGradient from "./ui/StripeGradient";
import { useTypewriter } from "@/hooks/useTypewriter";

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
                setLocation1("Unknown Location");
            }
        };
        fetchLocation();
    }, []);

    useEffect(() => {
        if (!location1 || hasStartedRef.current) return;
        hasStartedRef.current = true;

        const location2 = "Naperville, IL, United States";
        const city = location1.split(",")[0];

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

    if (!location1) return <div className="mt-8 h-24 text-transparent">Loading...</div>;

    return (
        <div className="mt-10 w-full max-w-[720px] rounded-lg border border-slate-800 bg-black/50 p-4 font-mono text-xs md:text-sm text-green-500 shadow-inner backdrop-blur-sm">
            {lines.map((line, idx) => (
                <div key={idx} className="mb-1 last:mb-0 break-words leading-relaxed">
                    <span className="opacity-50 mr-2">{`>`}</span>
                    {line}
                    {idx === lines.length - 1 && <span className="animate-pulse inline-block h-3 w-2 bg-green-500 ml-1 align-middle"></span>}
                </div>
            ))}
        </div>
    );
};

export default function Hero() {
    const [activeSide, setActiveSide] = useState<"left" | "right" | null>(null);
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

    const handleInteraction = useCallback((side: "left" | "right", type: "hover" | "click") => {
        if (type === "hover" && !isMobile) {
            setActiveSide(side);
        } else if (type === "click" && isMobile) {
            setActiveSide((prev) => (prev === side ? null : side));
        }
    }, [isMobile]);

    const handleMouseLeave = () => {
        if (!isMobile) setActiveSide(null);
    };

    const getDesignerClipPath = () => {
        if (activeSide === "left") return "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
        if (activeSide === "right") return "polygon(0 0, 0% 0, 0% 100%, 0 100%)";
        return "polygon(0 0, 55% 0, 45% 100%, 0 100%)";
    };

    return (
        <section id="home" className="relative flex min-h-screen w-full flex-col items-center justify-evenly bg-black overflow-hidden py-10">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <StripeGradient />
            </div>

            <div className="relative z-10 flex w-full flex-col items-center justify-center gap-8 px-6 md:flex-row md:px-12 lg:px-24">
                {/* Designer Side (Left) */}
                <div className={`order-2 flex w-full flex-col items-center gap-6 text-center transition-all duration-700 ease-out md:order-1 md:w-1/3 md:items-end md:text-right ${activeSide === "right" ? "opacity-30 blur-sm scale-95" : "opacity-100 scale-100"}`}>
                    <h2 className={`text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter transition-colors duration-300 drop-shadow-2xl ${activeSide === "left" ? "text-purple-400" : "text-white"}`}>
                        Pixel Pusher.
                    </h2>
                    <p className="max-w-[350px] text-base md:text-lg font-medium leading-relaxed text-slate-400">
                        <i>I'm not a professional; I'm just a hobbyist designer with an Adobe Creative Cloud subscription, creating UI designs that avoid the usual and add strange, delightful surprises.</i>
                    </p>
                </div>

                {/* Portrait Circle Container */}
                <div className="order-1 relative h-[350px] w-[350px] shrink-0 md:order-2 md:h-[500px] md:w-[500px] lg:h-[600px] lg:w-[600px]">
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/40 to-blue-600/40 blur-[60px] transition-opacity duration-700 ${activeSide ? "opacity-100" : "opacity-60"}`}></div>
                    <div className="relative h-full w-full overflow-hidden rounded-full isolate ring-4 ring-white/10 shadow-2xl">
                        <div role="button" tabIndex={0} className="absolute left-0 top-0 z-50 h-full w-1/2 cursor-pointer focus:outline-none" onMouseEnter={() => handleInteraction("left", "hover")} onMouseLeave={handleMouseLeave} onClick={() => handleInteraction("left", "click")}></div>
                        <div role="button" tabIndex={0} className="absolute right-0 top-0 z-50 h-full w-1/2 cursor-pointer focus:outline-none" onMouseEnter={() => handleInteraction("right", "hover")} onMouseLeave={handleMouseLeave} onClick={() => handleInteraction("right", "click")}></div>

                        {/* Coder Image */}
                        <div className="absolute inset-0 z-0 h-full w-full bg-[#0a0a0a]">
                            <Image src={coderPortrait} alt="Coder Portrait" fill className={`object-cover object-top transition-transform duration-700 ease-out ${activeSide === "right" ? "scale-110" : "scale-100"}`} priority />
                        </div>

                        {/* Designer Image with ClipPath */}
                        <div className="absolute inset-0 z-10 h-full w-full bg-[#0a0a0a] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]" style={{ clipPath: getDesignerClipPath(), WebkitClipPath: getDesignerClipPath() }}>
                            <Image src={creativePortrait} alt="Designer Portrait" fill className={`object-cover object-top transition-transform duration-700 ease-out ${activeSide === "left" ? "scale-110" : "scale-100"}`} priority />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Coder Side (Right) */}
                <div className={`order-3 flex w-full flex-col items-center gap-6 text-center transition-all duration-700 ease-out md:w-1/3 md:items-start md:text-left ${activeSide === "left" ? "opacity-30 blur-sm scale-95" : "opacity-100 scale-100"}`}>
                    <h2 className={`text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter transition-colors duration-300 drop-shadow-2xl ${activeSide === "right" ? "text-blue-400" : "text-white"}`}>
                        &lt;FullStack Pancake/&gt;
                    </h2>
                    <p className="text-base md:text-lg font-light leading-relaxed text-slate-400">
                        <span className="italic">
                            I write code
                            {/* NEW: Typing Animation Block */}
                            <code className="mx-2 px-2 py-1 rounded bg-white/[0.03] text-blue-400 font-mono text-sm border border-white/10 inline-flex items-center min-w-[315px]">
                                <span>{codeTypedText}</span>
                                <span className="animate-pulse border-r-2 border-blue-500 h-4 ml-1"></span>
                            </code>
                            that works, build pipelines that scale, and then attempt to <span className="text-[#e30909] font-mono font-bold tracking-tight uppercase">breach</span> them just to prove they're <span className="text-[#39d353] font-mono font-bold tracking-tight uppercase">secure</span>.
                        </span>
                    </p>
                </div>
            </div>

            {/* Google-style Search Bar & Navigation */}
            <div className="relative z-20 flex w-full flex-col items-center px-6">
                <div className="group flex h-14 md:h-16 w-full max-w-[720px] items-center rounded-full border border-gray-500/30 bg-[#202124] px-6 shadow-xl transition-all hover:bg-[#303134] hover:shadow-2xl hover:border-gray-500/50">
                    <div className="pr-4 text-gray-400">
                        <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
                    </div>
                    {/* Maps the search value to your main greeting typewriter */}
                    <input type="text" readOnly value={typedText} className="flex-1 bg-transparent text-lg md:text-xl text-[#e8eaed] outline-none font-sans" aria-label="Search" />
                    <div className="flex items-center gap-5 pl-4 border-l border-gray-600/50 h-8">
                        <svg className="h-6 w-6 cursor-pointer text-[#8ab4f8] hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"></path><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"></path></svg>
                        <svg className="h-6 w-6 cursor-pointer text-[#8ab4f8] hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
                    </div>
                </div>

                <div className="mt-10 flex gap-6">
                    <a href="#experience" className="rounded bg-[#303134] px-8 py-3 text-base font-medium text-[#e8eaed] transition-colors hover:bg-[#3c4043] hover:border hover:border-[#5f6368] focus:outline-none focus:ring-2 focus:ring-blue-500/50">View Work</a>
                    <a href="#contact" className="rounded bg-[#303134] px-8 py-3 text-base font-medium text-[#e8eaed] transition-colors hover:bg-[#3c4043] hover:border hover:border-[#5f6368] focus:outline-none focus:ring-2 focus:ring-blue-500/50">Contact Me</a>
                </div>

                <TerminalLog />
            </div>
        </section>
    );
}