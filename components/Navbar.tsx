'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroChromeOpacity, setHeroChromeOpacity] = useState(1);
  const navItems = ['About', 'Domains', 'Events'];

  useEffect(() => {
    let frame = 0;

    const updateHeroChrome = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const fadeDistance = Math.min(window.innerHeight * 0.55, 460);
        const opacity = Math.max(0, Math.min(1, 1 - window.scrollY / fadeDistance));
        setHeroChromeOpacity(opacity);
      });
    };

    updateHeroChrome();
    window.addEventListener('scroll', updateHeroChrome, { passive: true });
    window.addEventListener('resize', updateHeroChrome);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateHeroChrome);
      window.removeEventListener('resize', updateHeroChrome);
    };
  }, []);

  const heroChromeStyle = {
    opacity: heroChromeOpacity,
    transform: `translateY(${(1 - heroChromeOpacity) * -10}px)`,
    pointerEvents: heroChromeOpacity > 0.08 ? 'auto' : 'none',
  } as const;
  const navShellStyle = {
    maxWidth: `${760 + heroChromeOpacity * 392}px`,
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-[80] px-3 pt-3 sm:px-6 md:px-10">
      <div
        style={navShellStyle}
        className="relative mx-auto grid grid-cols-[1fr_auto] items-center gap-3 border border-white/[0.09] bg-black/28 px-2.5 py-2 text-white shadow-[0_12px_36px_rgba(0,0,0,0.22)] backdrop-blur-md transition-[max-width] duration-300 ease-out md:grid-cols-[1fr_auto_1fr]"
      >
        <span className="pointer-events-none absolute -left-px -top-px h-2 w-2 border-l border-t border-white/35" />
        <span className="pointer-events-none absolute -right-px -top-px h-2 w-2 border-r border-t border-white/35" />
        <span className="pointer-events-none absolute -bottom-px -left-px h-2 w-2 border-b border-l border-white/22" />
        <span className="pointer-events-none absolute -bottom-px -right-px h-2 w-2 border-b border-r border-white/22" />
        <span className="pointer-events-none absolute left-[22%] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-white/12 to-transparent lg:block" />
        <span className="pointer-events-none absolute right-[22%] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-white/12 to-transparent lg:block" />

        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          style={heroChromeStyle}
          className="hidden min-w-0 items-center justify-self-start transition-[opacity,transform] duration-200 md:flex"
        >
          <Image
            src="/robovitics-logo.png"
            alt="roboVITics Logo"
            width={150}
            height={40}
            className="h-5 w-auto object-contain opacity-90 sm:h-6 md:h-7"
            priority
          />
        </Link>

        <span className="flex items-center gap-2 pl-1 font-mono text-[9px] uppercase tracking-[0.22em] text-white/32 md:hidden">
          <span className="h-1 w-1 rounded-full border border-white/35" />
          NAV
        </span>

        <nav className="hidden items-center gap-0.5 justify-self-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/48 md:flex">
          {navItems.map((item, index) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="group relative px-3 py-1.5 transition-colors duration-200 hover:text-white/88"
            >
              <span className="mr-2 text-white/20">0{index + 1}</span>
              {item}
              <span className="absolute bottom-0 left-3 right-3 h-px origin-left scale-x-0 bg-white/50 transition-transform duration-200 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <Link
          href="#about"
          style={heroChromeStyle}
          className="hidden justify-self-end border border-white/16 bg-white/[0.045] px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/78 transition-[opacity,transform,background-color,border-color,color] duration-200 hover:border-white/35 hover:bg-white/12 hover:text-white sm:inline-flex"
        >
          Join the Club
        </Link>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-8 w-8 shrink-0 items-center justify-center justify-self-end border border-white/12 bg-white/[0.025] text-white/80 transition-colors hover:bg-white/[0.07] md:hidden"
        >
          <span className="sr-only">Menu</span>
          <span className="flex h-3.5 w-4 flex-col justify-between">
            <span className={`block h-px w-full bg-current transition-transform ${menuOpen ? 'translate-y-[6px] rotate-45' : ''}`} />
            <span className={`block h-px w-full bg-current transition-opacity ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`block h-px w-full bg-current transition-transform ${menuOpen ? '-translate-y-[6px] -rotate-45' : ''}`} />
          </span>
        </button>
      </div>

      {menuOpen && (
        <nav className="mx-auto mt-2 max-w-6xl overflow-hidden border border-white/10 bg-black/76 font-mono text-[11px] uppercase tracking-[0.18em] text-gray-200 shadow-[0_18px_50px_rgba(0,0,0,0.32)] backdrop-blur-xl md:hidden">
          {navItems.map((item, index) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between border-b border-white/10 px-4 py-3 transition-colors last:border-b-0 hover:bg-white/10"
            >
              <span>{item}</span>
              <span className="text-white/28">0{index + 1}</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
