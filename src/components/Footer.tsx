"use client";

import { useState, useEffect } from "react";

export default function Footer() {
    const [time, setTime] = useState<string>("");
    const [location, setLocation] = useState<string>("Initializing location...");

    useEffect(() => {
        // 1. Time Logic
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        };
        updateTime();
        const timer = setInterval(updateTime, 1000);

        // 2. Location Logic (IP-based)
        const fetchLocation = async () => {
            try {
                const response = await fetch("https://ipapi.co/json/");
                if (!response.ok) throw new Error("Failed to fetch");
                const data = await response.json();
                // Format: "Chicago, Illinois, United States"
                setLocation(`${data.city}, ${data.region}, ${data.country_name}`);
            } catch (error) {
                console.error("Location fetch failed", error);
                setLocation("Unknown Location");
            }
        };

        fetchLocation();

        return () => clearInterval(timer);
    }, []);

    return (
        <footer className="w-full bg-black py-8 border-t border-slate-900">
            <div className="container mx-auto px-6 text-center">

                {/* Terminal Style Status Line */}
                <div className="font-mono text-xs md:text-sm text-slate-500 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6">

                    {/* Copyright */}
                    <span className="opacity-50">
            &copy; {new Date().getFullYear()} Jesse Ngolab
          </span>

                    <span className="hidden md:inline text-slate-800">|</span>

                    {/* Dynamic Location */}
                    <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
                        {location}
          </span>

                    <span className="hidden md:inline text-slate-800">|</span>

                    {/* Live Time */}
                    <span>{time}</span>
                </div>

            </div>
        </footer>
    );
}