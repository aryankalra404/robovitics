import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="relative z-50 w-full px-4 py-4 sm:px-6 md:px-12 md:py-8 flex items-center justify-between gap-3">
      
      {/* Scaled Down Logo Section */}
      <Link href="/" className="flex min-w-0 items-center">
        <Image 
          src="/robovitics-logo.png" 
          alt="roboVITics Logo" 
          width={150} 
          height={40} 
          // Reduced height classes here:
          className="h-5 w-auto object-contain sm:h-6 md:h-7 lg:h-8" 
          priority 
        />
      </Link>

      <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-gray-400">
        {['About', 'Domains', 'Events', 'Projects', 'Teams'].map((item) => (
          <Link key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors duration-200">
            {item}
          </Link>
        ))}
      </nav>
      
      <button className="shrink-0 whitespace-nowrap rounded-full bg-white px-3.5 py-2 text-xs font-semibold tracking-wide text-black transition-colors duration-300 hover:bg-[#00E5FF] hover:text-black sm:px-5 sm:py-2.5 sm:text-sm lg:px-6">
        Join<span className="hidden sm:inline"> the Club</span>
      </button>
      
    </header>
  );
}
