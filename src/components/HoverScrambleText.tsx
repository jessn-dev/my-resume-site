"use client";
import { useState, useRef } from "react";

const CHARS = "!<>-_\\\\/[]{}—=+*^?#________";

export default function HoverScrambleText({ text, className = "" }: { text: string, className?: string }) {
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        let iteration = 0;
        const maxIterations = text.length;

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) return text[index];
                        if (text[index] === " ") return " ";
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("")
            );

            if (iteration >= maxIterations) {
                clearInterval(intervalRef.current!);
                setDisplayText(text); // ensure it lands exactly on the text
            }

            iteration += 1 / 3;
        }, 30);
    };

    const handleMouseLeave = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setDisplayText(text);
    };

    return (
        <span 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
            className={`inline-block whitespace-nowrap font-mono ${className}`}
        >
            {displayText}
        </span>
    );
}
