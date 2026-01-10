import Link from 'next/link';
import Image from 'next/image';
// MAKE SURE THIS PATH POINTS TO YOUR NEW TRANSPARENT PNG
import logo from '@/public/assets/jbn-logo-transparent.png';

export default function Navbar() {
    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Experience', href: '#experience' },
        { name: 'About', href: '#about' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
            <div className="container mx-auto flex h-20 items-center justify-between px-6">
                <div className="flex items-center">
                    <Link href="#home">
                        {/* The Next/Image component handles transparency automatically.
               Once the source image is transparent, it will sit perfectly
               on top of the dark navbar background.
            */}
                        <Image
                            src={logo}
                            alt="JBN Logo"
                            width={80}  // Adjust size as needed
                            height={40} // Adjust size as needed, keeping aspect ratio
                            className="h-auto w-auto font-bold transition-all hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                            priority // Useful for LCP (Largest Contentful Paint) since it's above the fold
                        />
                    </Link>
                </div>

                <ul className="flex items-center gap-8">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className="text-sm font-medium text-slate-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all"
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}