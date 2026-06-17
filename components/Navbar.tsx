import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="relative z-50 w-full p-6 md:px-12 md:py-8 flex items-center justify-between">
      
      {/* Scaled Down Logo Section */}
      <Link href="/" className="flex items-center">
        <Image 
          src="/robovitics-logo.png" 
          alt="roboVITics Logo" 
          width={150} 
          height={40} 
          // Reduced height classes here:
          className="h-6 md:h-7 lg:h-8 w-auto object-contain" 
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
      
      <button className="px-6 py-2.5 bg-white text-black hover:bg-[#00E5FF] hover:text-black transition-colors duration-300 rounded-full font-semibold text-sm tracking-wide">
        Join the Club
      </button>
      
    </header>
  );
}