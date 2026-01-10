"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CardSwapProps {
    children: React.ReactNode[];
    delay?: number;
    pauseOnHover?: boolean;
}

export default function CardSwap({ children, delay = 4000, pauseOnHover = true }: CardSwapProps) {
    const [cards, setCards] = useState(React.Children.toArray(children));
    const [isHovered, setIsHovered] = useState(false);

    const swap = useCallback(() => {
        setCards((prev) => {
            const [first, ...rest] = prev;
            return [...rest, first];
        });
    }, []);

    useEffect(() => {
        if (pauseOnHover && isHovered) return;
        const interval = setInterval(swap, delay);
        return () => clearInterval(interval);
    }, [delay, pauseOnHover, isHovered, swap]);

    return (
        /* The container now uses a grid to let the first card define the size */
        <div
            className="grid grid-cols-1 grid-rows-1 w-full relative cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={swap}
        >
            <AnimatePresence mode="popLayout">
                {cards.map((card, index) => {
                    if (index > 2) return null;

                    return (
                        <motion.div
                            key={(card as any).key}
                            /* 1/1 forces all cards into the same grid cell */
                            className="grid-in-cell col-start-1 row-start-1 w-full"
                            style={{ gridArea: "1 / 1 / 2 / 2" }}
                            layout
                            initial={{ scale: 0.9, opacity: 0, x: 50 }}
                            animate={{
                                scale: 1 - index * 0.05,
                                opacity: 1 - index * 0.25,
                                zIndex: cards.length - index,
                                y: index * -15,
                                x: index * 10, // Slight horizontal offset for depth
                                rotate: index === 0 ? 0 : index * 1,
                            }}
                            exit={{
                                x: -600,
                                opacity: 0,
                                rotate: -15,
                                transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] }
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 30,
                                mass: 0.6
                            }}
                        >
                            {/* This inner div ensures the card content fills the grid cell area */}
                            <div className="w-full h-full pointer-events-auto">
                                {card}
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}