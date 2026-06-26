"use client";
import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const CHARS = "!<>-_\\\\/[]{}—=+*^?#________";

export default function ScrambleText({ text, className = "" }: { text: string, className?: string }) {
    const [displayText, setDisplayText] = useState(text);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!isInView) return;

        let iteration = 0;
        const maxIterations = text.length;

        const interval = setInterval(() => {
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
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [text, isInView]);

    return (
        <span ref={ref} className={className}>
            {displayText}
        </span>
    );
}
