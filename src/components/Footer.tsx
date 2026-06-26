"use client";

import { useState, useEffect } from "react";
import { Terminal } from "lucide-react";

export default function Footer() {
    const [time, setTime] = useState<string>("");
    const [location, setLocation] = useState<string>("Initializing location...");

    useEffect(() => {
        // 1. Time Logic (Locked to Jesse's Timezone: Central Time)
        const updateTime = () => {
            const now = new Date();
            const chicagoTime = now.toLocaleTimeString([], { 
                timeZone: 'America/Chicago',
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit',
                timeZoneName: 'short'
            });
            setTime(chicagoTime);
        };
        updateTime();
        const timer = setInterval(updateTime, 1000);

        // 2. Location Logic (Static, prevents adblocker fetch errors)
        setLocation("Naperville, IL, United States");

        return () => clearInterval(timer);
    }, []);

    return (
        <footer className="w-full bg-transparent py-8 border-t border-slate-900">
            <div className="container mx-auto px-6 text-center flex flex-col items-center">

                {/* Terminal Style Status Line */}
                <div className="inline-flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 bg-[#0d1117] border border-slate-800 rounded-md px-4 py-2 mb-6 text-[11px] md:text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-2">
                        <Terminal size={14} className="text-green-500 shrink-0" />
                        <span>SYSTEM_STATUS: <span className="text-green-500">ONLINE</span></span>
                    </div>
                    
                    <span className="text-slate-600 hidden md:inline">|</span>
                    
                    <div className="text-blue-400 flex items-center gap-2">
                        <span className="relative flex h-2 w-2 shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        <span>Connection: {location}</span>
                    </div>
                    
                    <span className="text-slate-600 hidden md:inline">|</span>

                    <span>{time}</span>
                    
                    <span className="text-slate-600 hidden md:inline">|</span>

                    {/* Custom Hacker-style Visitor Badge */}
                    <span className="flex items-center h-full">
                        <img 
                            src="https://hits.sh/my-resume-site.jesse.ngolab.svg?style=flat-square&label=VISITORS&color=3b82f6&labelColor=0d1117" 
                            alt="Traffic Tracker" 
                            className="h-[20px] opacity-80 hover:opacity-100 transition-opacity"
                        />
                    </span>
                </div>

                {/* Copyright */}
                <div className="font-mono text-[10px] text-slate-500/50 uppercase tracking-widest">
                    &copy; {new Date().getFullYear()} Jesse Ngolab. All logs secured.
                </div>

            </div>
        </footer>
    );
}