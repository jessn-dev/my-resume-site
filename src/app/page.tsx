import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import About from '@/components/About';
import Footer from '@/components/Footer'; // <--- Import Footer

export default function Home() {
    return (
        <main className="bg-black min-h-screen flex flex-col">
            {/* NavBar */}
            <Navbar />
            {/* Homepage*/}
            <Hero />
            {/* Experiences*/}
            <Experience />
            {/* About */}
            <About />
            {/* --- DYNAMIC FOOTER --- */}
            <Footer />
        </main>
    );
}