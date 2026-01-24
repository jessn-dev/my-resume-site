import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Projects from "@/components/Projects";
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
    return (
        <main className="bg-black min-h-screen flex flex-col">
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