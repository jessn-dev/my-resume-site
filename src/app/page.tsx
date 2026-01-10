import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import About from '@/components/About';

export default function Home() {
    return (
        <main className="min-h-screen bg-slate-950 selection:bg-blue-500/30">
            <Navbar />
            <Hero />
            <Experience />
            <About />

            {/* Updated Footer */}
            <footer className="py-8 text-center text-sm text-slate-600 bg-slate-950 border-t border-slate-900">
                <p>© {new Date().getFullYear()} jessengolab. All rights reserved.</p>
            </footer>
        </main>
    );
}