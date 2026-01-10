"use client";

import { useState, useEffect } from "react";
import { philosophyData } from "@/data/resume";

export default function PhilosophyTerminal() {
    const [displayText, setDisplayText] = useState<string[]>([]);
    const [phase, setPhase] = useState(0); // 0: command, 1: output lines, 2: reset

    useEffect(() => {
        // FIX: Initialize as null and handle clearing safely
        let timer: NodeJS.Timeout | null = null;
        let interval: NodeJS.Timeout | null = null;

        const runSequence = () => {
            if (phase === 0) {
                // Type the command
                let i = 0;
                const command = philosophyData.command;
                interval = setInterval(() => {
                    setDisplayText([`$ ${command.slice(0, i + 1)}`]);
                    i++;
                    if (i === command.length) {
                        if (interval) clearInterval(interval);
                        timer = setTimeout(() => setPhase(1), 500);
                    }
                }, 80);
            } else if (phase === 1) {
                // Print output lines
                let lineIdx = 0;
                interval = setInterval(() => {
                    setDisplayText(prev => [...prev, philosophyData.output[lineIdx]]);
                    lineIdx++;
                    if (lineIdx === philosophyData.output.length) {
                        if (interval) clearInterval(interval);
                        timer = setTimeout(() => setPhase(2), 4000); // Pause at end
                    }
                }, 400);
            } else {
                // Reset phase
                timer = setTimeout(() => {
                    setDisplayText([]);
                    setPhase(0);
                }, 1000);
            }
        };

        runSequence();

        // Cleanup function
        return () => {
            if (timer) clearTimeout(timer);
            if (interval) clearInterval(interval);
        };
    }, [phase]);

    return (
        <div className="font-mono text-[10px] md:text-xs leading-relaxed">
            {displayText.map((line, i) => (
                <div
                    key={i}
                    className={`${
                        i === 0
                            ? "text-white"
                            : i === displayText.length - 1 && phase === 1
                                ? "text-green-400 font-bold"
                                : "text-blue-400/80"
                    }`}
                >
                    {line}
                    {i === displayText.length - 1 && (
                        <span className="animate-pulse ml-1 text-white">_</span>
                    )}
                </div>
            ))}
        </div>
    );
}