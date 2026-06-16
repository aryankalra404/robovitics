'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Domains from '@/components/Domains';

export default function Page() {
  const domainsRef = useRef<HTMLDivElement>(null);

  // 1. Tracks overall page scroll (for the progress line and normal gear rotation)
  const { scrollYProgress: overallScroll } = useScroll();
  
  // 2. Tracks specifically when the Domains section enters the screen
  const { scrollYProgress: domainsEnterProgress } = useScroll({
    target: domainsRef,
    // Triggers from the moment the TOP of Domains hits the BOTTOM of the screen,
    // until the TOP of Domains hits the TOP of the screen.
    offset: ["start end", "start start"] 
  });

  // --- THE ORCHESTRATOR ANIMATIONS ---
  
  // Background fades from 87% opacity to 0% as Domains scrolls up
  const bgOpacity = useTransform(domainsEnterProgress, [0, 1], [0.87, 0]);
  
  // Gear translates to the left (-100%) to roll off-screen as Domains comes up
  const gearX = useTransform(domainsEnterProgress, [0, 1], ["0%", "-100%"]);
  
  // Normal gear rotation tied to global scroll
  const gearRotation = useTransform(overallScroll, [0, 1], [0, 720]);
  const gearY = useTransform(overallScroll, [0, 1], ["0%", "50%"]);

  return (
    // FIX: Removed 'overflow-hidden' from the end of this class list so Sticky scroll works again!
    <main className="relative bg-black text-white flex flex-col font-sans selection:bg-gray-300 selection:text-black">
      
      {/* GLOBAL BACKGROUND GRID */}
      <motion.div 
        style={{ opacity: bgOpacity, backgroundImage: "url('/hero-bg.png')" }}
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
      />

      {/* GLOBAL SCROLL PROGRESS LINE */}
      <motion.div 
        style={{ scaleY: overallScroll }}
        className="fixed top-0 right-0 w-1 bg-gray-300 origin-top z-50 shadow-[0_0_15px_#D1D5DB]"
      />

      {/* GLOBAL MASSIVE GEAR */}
      <motion.div
        style={{ rotate: gearRotation, y: gearY, x: gearX }}
        className="fixed -left-40 -bottom-40 z-10 opacity-20 pointer-events-none"
      >
        <svg width="600" height="600" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" stroke="#ffffff"></circle>
          <path stroke="#ffffff" d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </motion.div>

      {/* --- CONTENT DOM TREE --- */}
      
      <div className="relative h-screen flex flex-col justify-between z-20">
        <Navbar />
        <Hero />
        <footer className="relative z-10 w-full p-6 md:px-12 md:py-10 flex flex-col md:flex-row justify-between items-start md:items-end font-mono text-xs md:text-sm text-gray-500 gap-6">
          <div>
            <p>Established in <span className="text-gray-300">2009</span>.</p>
            <p>Evolving ever since.</p>
          </div>
          <div className="text-left md:text-right">
            <p>We're not just another <span className="text-gray-300">tech chapter</span>.</p>
            <p>We're the <span className="text-gray-300">engineers</span> that actually build.</p>
          </div>
        </footer>
      </div>

      <About />

      {/* We wrap Domains in the Ref so Framer Motion knows exactly where it is! */}
      <div ref={domainsRef}>
        <Domains />
      </div>

    </main>
  );
}