import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Projects from "@/components/Projects";
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import CommandPalette from '@/components/CommandPalette';
import SpotifyWidget from '@/components/SpotifyWidget';

export default function Home() {
    return (
        <main className="bg-transparent min-h-screen flex flex-col">
            <CustomCursor />
            <CommandPalette />
            <SpotifyWidget />
            <Navbar />
            <Hero />
            <Experience />
            <Projects />
            <About />
            <Contact />
            <Footer />
        </main>
    );
}