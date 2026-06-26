"use client";
import React from "react";

export default function CyberGrid() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden [perspective:1000px]">
            {/* Fade out top edge */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-transparent z-10" />
            {/* Fade out bottom edge */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
            
            {/* The 3D Grid */}
            <div 
                className="absolute w-[200%] h-[150%] bottom-[-50%] left-[-50%] border-t border-blue-500/20"
                style={{
                    backgroundImage: 'linear-gradient(rgba(59,130,246,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.15) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                    transform: 'rotateX(75deg)',
                    transformOrigin: 'top center',
                    animation: 'gridMove 5s linear infinite'
                }}
            />
            <style>{`
                @keyframes gridMove {
                    0% { background-position: 0 0; }
                    100% { background-position: 0 60px; }
                }
            `}</style>
        </div>
    );
}
