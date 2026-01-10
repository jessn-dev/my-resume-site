import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import About from '@/components/About';

export default function Home() {
  return (
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <Experience />
        <About />

        {/* Simple Footer */}
        <footer className="py-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Built with Next.js and Tailwind
        </footer>
      </main>
  );
}