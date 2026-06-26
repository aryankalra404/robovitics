'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ------------------------------------------------------------------ */
/* Background
/* ------------------------------------------------------------------ */
function AchievementsBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#0d0d0d]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg,rgba(255,255,255,0.035) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      {([
        [10, 14], [72, 10], [88, 55], [16, 78],
      ] as [number, number][]).map(([lp, tp], i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${lp}%`, top: `${tp}%`, width: 5, height: 5,
            background: 'rgba(255,255,255,0.25)',
            boxShadow: '0 0 6px rgba(255,255,255,0.15)',
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Toggle (Condensed for Mobile)
/* ------------------------------------------------------------------ */
type View = 'club' | 'individual';

function ViewToggle({ view, setView }: { view: View; setView: (v: View) => void }) {
  const items: { key: View; label: string }[] = [
    { key: 'club', label: 'CLUB ACHIEVEMENT' },
    { key: 'individual', label: 'INDIVIDUAL LOGS' },
  ];

  return (
    <div
      className="relative flex w-full flex-row sm:w-auto sm:inline-flex items-center gap-1 rounded-md p-1 shadow-2xl"
      style={{ background: 'rgba(20,20,20,0.6)', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)' }}
    >
      {items.map((item) => {
        const active = view === item.key;
        return (
          <button
            key={item.key}
            onClick={() => setView(item.key)}
            className="relative flex-1 sm:w-auto px-2 py-2.5 sm:px-6 sm:py-2 font-mono text-[8.5px] sm:text-[11px] uppercase tracking-[0.08em] sm:tracking-[0.15em] transition-all duration-300 text-center"
            style={{ color: active ? '#ffffff' : 'rgba(255,255,255,0.4)' }}
          >
            {active && (
              <motion.span
                layoutId="activeTab"
                className="absolute inset-0 rounded-[4px]"
                style={{ background: 'rgba(79,174,243,0.15)', border: '1px solid rgba(79,174,243,0.3)' }}
              />
            )}
            <span className="relative z-10 drop-shadow-md">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Club Achievement Plaque (Tightened for Mobile)
/* ------------------------------------------------------------------ */
function ClubAchievementPlaque({ certificateImageSrc }: { certificateImageSrc?: string }) {
  return (
    <div className="group relative h-auto min-h-[300px] w-full overflow-hidden rounded-2xl transition-all duration-500 border border-white/5 bg-white/[0.02] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:bg-white/[0.03] hover:border-white/10 hover:shadow-[0_16px_48px_rgba(79,174,243,0.1)]">
      
      {/* Soft Top Highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4FAEF3]/30 to-transparent opacity-50" />

      <div className="relative z-20 flex h-full flex-col gap-6 p-5 sm:p-10 md:p-12 lg:flex-row lg:items-center lg:gap-16">
        
        {/* Left Side: Typography */}
        <div className="flex min-w-0 flex-1 flex-col justify-center text-left order-2 lg:order-1">
          
          <div className="mb-3 sm:mb-6 inline-flex items-center gap-3">
             <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4FAEF3] shadow-[0_0_8px_#4FAEF3]" />
             <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-[#4FAEF3]/80">
               ACHIEVEMENT_LOG // 01
             </span>
          </div>

          <h3 className="mb-2 sm:mb-4 font-sans uppercase leading-[1.05] text-white" style={{ fontSize: 'clamp(26px, 7vw, 52px)', fontWeight: 900, letterSpacing: '-0.02em' }}>
            BEST CLUB <br className="hidden sm:block" />
            <span className="text-[#4FAEF3] md:text-white md:bg-clip-text md:text-transparent md:bg-gradient-to-r md:from-[#4FAEF3] md:to-[#2b8cd6]">
              ELITE CATEGORY
            </span>
          </h3>
          
          <p className="mb-5 sm:mb-10 font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.25em] text-gray-500">
            RECORDED TENURE // 2024 TO 2025
          </p>

          {/* Grouped Description Block with Left Border */}
          <div className="relative border-l-2 border-[#4FAEF3]/20 pl-4 sm:pl-6 space-y-3 sm:space-y-5">
            <p className="max-w-xl text-[12px] leading-[1.6] sm:leading-[1.8] text-gray-300 md:text-[15px] font-light tracking-wide">
              Awarded for exceptional technical innovation, sustained ecosystem impact, and engineering excellence across the university network. 
            </p>
            <p className="max-w-xl text-[12px] leading-[1.6] sm:leading-[1.8] text-gray-400 md:text-[15px] font-light tracking-wide">
              Anchored by <span className="text-[#4FAEF3] font-medium">Robowars</span>, the premier combat robotics league, solidifying a legacy of dominance.
            </p>
          </div>

        </div>

        {/* Right Side: Abstract Digital Artifact */}
        <div className="flex flex-shrink-0 flex-col items-center justify-center gap-4 sm:gap-6 order-1 lg:order-2">
          {/* Much smaller container on mobile */}
          <div className="relative flex h-[130px] w-[130px] sm:h-[240px] sm:w-[240px] items-center justify-center lg:h-[280px] lg:w-[280px]">
            
            <div className="absolute inset-0 rounded-full bg-[#4FAEF3]/5 blur-[25px] sm:blur-[40px] transition-all duration-700 group-hover:bg-[#4FAEF3]/10" />
            
            <div className="absolute inset-4 animate-[spin_20s_linear_infinite] rounded-full border border-dashed border-[#4FAEF3]/20" />
            <div className="absolute inset-8 animate-[spin_15s_linear_infinite_reverse] rounded-full border border-white/5" />
            
            {/* Tighter central graphic */}
            <div className="relative z-10 flex h-[85px] w-[85px] sm:h-[150px] sm:w-[150px] items-center justify-center rounded-2xl border border-white/10 bg-black/40 p-2 sm:p-4 backdrop-blur-md shadow-[inset_0_0_20px_rgba(79,174,243,0.1)] lg:h-[170px] lg:w-[170px]">
              <svg 
                viewBox="0 0 200 200" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-full w-full drop-shadow-[0_0_15px_rgba(79,174,243,0.5)]"
              >
                <circle cx="100" cy="100" r="90" stroke="rgba(79,174,243,0.15)" strokeWidth="2" strokeDasharray="4 12" className="origin-center animate-[spin_20s_linear_infinite]" />
                <circle cx="100" cy="100" r="75" stroke="rgba(79,174,243,0.3)" strokeWidth="1" strokeDasharray="30 10" className="origin-center animate-[spin_15s_linear_infinite_reverse]" />
                
                <path d="M100 20 L160 50 L140 130 L100 180 L60 130 L40 50 Z" fill="rgba(79,174,243,0.05)" stroke="#4FAEF3" strokeWidth="2" strokeLinejoin="round" />
                
                <path d="M100 20 L100 180" stroke="#4FAEF3" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M40 50 L100 80 L160 50" stroke="#4FAEF3" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M60 130 L100 80 L140 130" stroke="#4FAEF3" strokeWidth="1.5" strokeLinejoin="round" />
                
                <path d="M100 60 L105 75 L120 80 L105 85 L100 100 L95 85 L80 80 L95 75 Z" fill="#4FAEF3" className="origin-center animate-pulse shadow-[0_0_15px_#4FAEF3]" />
                
                <path d="M30 30 L20 30 L20 40" stroke="#4FAEF3" strokeWidth="2" fill="none" />
                <path d="M170 30 L180 30 L180 40" stroke="#4FAEF3" strokeWidth="2" fill="none" />
                <path d="M30 170 L20 170 L20 160" stroke="#4FAEF3" strokeWidth="2" fill="none" />
                <path d="M170 170 L180 170 L180 160" stroke="#4FAEF3" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>

          {certificateImageSrc && (
            <a 
              href={certificateImageSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-[4px] border border-white/10 bg-white/5 px-4 py-2 sm:px-5 sm:py-2.5 transition-colors hover:bg-white/10 hover:border-[#4FAEF3]/50"
            >
              <span className="font-mono text-[8.5px] sm:text-[10px] uppercase tracking-[0.2em] text-gray-300 group-hover/btn:text-white">
                VIEW DOCUMENT
              </span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 group-hover/btn:text-[#4FAEF3]">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
        </div>

      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Individual Achievements 
/* ------------------------------------------------------------------ */
interface IndividualAchievement {
  id: string;
  name: string;
  achievement: string;
  year: string;
}

const INDIVIDUAL_ACHIEVEMENTS: IndividualAchievement[] = [
  { id: '01', name: 'Member Name 01', achievement: 'Competition Title // Position', year: '2026' },
  { id: '02', name: 'Member Name 02', achievement: 'Competition Title // Position', year: '2026' },
  { id: '03', name: 'Member Name 03', achievement: 'Competition Title // Position', year: '2026' },
  { id: '04', name: 'Member Name 04', achievement: 'Competition Title // Position', year: '2026' },
  { id: '05', name: 'Member Name 05', achievement: 'Competition Title // Position', year: '2026' },
  { id: '06', name: 'Member Name 06', achievement: 'Event Title // Position', year: '2025' },
  { id: '07', name: 'Member Name 07', achievement: 'Event Title // Position', year: '2025' },
  { id: '08', name: 'Member Name 08', achievement: 'Event Title // Position', year: '2025' },
  { id: '09', name: 'Member Name 09', achievement: 'Event Title // Position', year: '2024' },
  { id: '10', name: 'Member Name 10', achievement: 'Event Title // Position', year: '2024' },
];

function LogRow({ data }: { data: IndividualAchievement }) {
  return (
    <div className="group relative flex w-full flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 border-b border-white/[0.04] px-4 py-3 sm:px-6 sm:py-4 transition-all duration-200 hover:bg-white/[0.03]">
      <span
        className="absolute left-0 top-0 h-full w-[2px] scale-y-0 bg-[#4FAEF3] shadow-[0_0_8px_#4FAEF3] transition-transform duration-200 group-hover:scale-y-100"
        style={{ transformOrigin: 'center' }}
      />
      
      <div className="flex items-center justify-between sm:hidden w-full mb-0.5">
          <div className="flex items-center gap-3">
              <span className="w-5 flex-shrink-0 font-mono text-[9px] text-[#4FAEF3]/60">
                {data.id}
              </span>
              <span className="flex-shrink-0 font-mono text-[8px] text-emerald-500/80 group-hover:text-emerald-400">
                [OK]
              </span>
          </div>
          <span className="flex-shrink-0 font-mono text-[8px] text-gray-500 group-hover:text-[#4FAEF3]/80 transition-colors">
            {data.year}
          </span>
      </div>

      <span className="hidden sm:block w-8 flex-shrink-0 font-mono text-[11px] text-[#4FAEF3]/60">
        {data.id}
      </span>
      <span className="hidden sm:block w-12 flex-shrink-0 font-mono text-[10px] text-emerald-500/80 group-hover:text-emerald-400">
        [OK]
      </span>

      <div className="flex flex-col sm:flex-row sm:items-center min-w-0 flex-1">
          <span className="truncate text-[12px] font-medium text-gray-200 tracking-wide sm:w-[150px] md:text-[13.5px]">
            {data.name}
          </span>
          <span className="truncate text-[10px] sm:text-[11.5px] text-gray-400 md:text-[13px] group-hover:text-white transition-colors tracking-wide mt-0.5 sm:mt-0">
            {data.achievement}
          </span>
      </div>

      <span className="hidden sm:block flex-shrink-0 font-mono text-[10px] text-gray-500 group-hover:text-[#4FAEF3]/80 transition-colors">
        {data.year}
      </span>
    </div>
  );
}

function IndividualLogPanel() {
  const half = Math.ceil(INDIVIDUAL_ACHIEVEMENTS.length / 2);
  const colA = INDIVIDUAL_ACHIEVEMENTS.slice(0, half);
  const colB = INDIVIDUAL_ACHIEVEMENTS.slice(half);

  return (
    <div className="relative flex h-auto max-h-[60vh] sm:max-h-[600px] w-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      
      <div className="flex flex-shrink-0 flex-row items-center justify-between border-b border-white/[0.05] bg-black/20 px-4 py-4 sm:px-8 sm:py-5">
        <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-sm bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
            <span className="font-mono text-[8.5px] sm:text-[10px] uppercase tracking-[0.2em] text-gray-300 md:text-[11px]">
              RECORDS.DAT
            </span>
        </div>
        <span className="font-mono text-[8.5px] sm:text-[10px] tracking-[0.1em] text-[#4FAEF3]/80 md:text-[11px]">
          10/10 LOADED
        </span>
      </div>

      <div className="hidden lg:grid grid-cols-2 divide-x divide-white/[0.05] border-b border-white/[0.05] bg-black/10 font-mono text-[9px] uppercase tracking-[0.2em] text-gray-500">
          <div className="flex items-center gap-4 px-6 py-3">
              <span className="w-8">ID</span>
              <span className="w-12">STATUS</span>
              <span className="w-[150px]">OPERATIVE</span>
              <span className="flex-1">DIRECTIVE</span>
              <span>CYCLE</span>
          </div>
          <div className="flex items-center gap-4 px-6 py-3">
              <span className="w-8">ID</span>
              <span className="w-12">STATUS</span>
              <span className="w-[150px]">OPERATIVE</span>
              <span className="flex-1">DIRECTIVE</span>
              <span>CYCLE</span>
          </div>
      </div>

      <div className="grid min-h-[300px] flex-1 grid-cols-1 divide-y divide-white/[0.05] overflow-y-auto lg:grid-cols-2 lg:divide-x lg:divide-y-0">
        <div className="flex flex-col">
          <div className="lg:hidden">
              {INDIVIDUAL_ACHIEVEMENTS.map((item) => <LogRow key={item.id} data={item} />)}
          </div>
          <div className="hidden lg:flex flex-col">
             {colA.map((item) => <LogRow key={item.id} data={item} />)}
          </div>
        </div>
        <div className="hidden lg:flex flex-col">
          {colB.map((item) => <LogRow key={item.id} data={item} />)}
        </div>
      </div>

      <div className="flex flex-shrink-0 items-center justify-center gap-2 border-t border-white/[0.05] bg-black/20 py-3 sm:py-4">
        <span className="font-mono text-[8.5px] sm:text-[10px] uppercase tracking-[0.2em] text-gray-500 md:text-[11px]">
          EOF // END OF FILE
        </span>
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
          className="inline-block h-2 sm:h-3 w-1 sm:w-1.5 bg-[#4FAEF3]/80 align-[-0.15em]"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main export 
/* ------------------------------------------------------------------ */
export default function Achievements({
  clubCertificateImageSrc = '/achievements/elite-club-2024.jpeg',
}: {
  clubCertificateImageSrc?: string;
}) {
  const [view, setView] = useState<View>('club');

  return (
    <section
      id="achievements"
      className="relative flex min-h-screen w-full flex-col bg-transparent px-4 sm:px-10 py-16 sm:py-20 md:px-16 lg:px-24"
    >
      <AchievementsBackground />

      <div className="relative z-10 flex flex-1 w-full flex-col mx-auto max-w-[1400px]">
        
        {/* Header Block */}
        <div className="flex-shrink-0 mb-6 sm:mb-10 md:mb-14">
            <div className="mb-4 sm:mb-6 flex items-start justify-between gap-4">
              <div>
                  <span className="mb-2 sm:mb-3 block font-mono text-[9px] uppercase tracking-[0.25em] text-gray-500 sm:text-[11px]">
                  <span style={{ color: '#ffffff', fontWeight: 700, marginRight: '8px sm:mr-[10px]' }}>06.</span>
                  SYSTEM.LOGS // ACHIEVEMENTS
                  </span>
                  <h2
                  className="font-sans uppercase text-white"
                  style={{ fontSize: 'clamp(24px, 7vw, 64px)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.05 }}
                  >
                  YEARS OF <span className="text-[#4FAEF3]">RECOGNITION.</span>
                  </h2>
              </div>
            </div>

            <div className="flex w-full sm:w-auto">
                <ViewToggle view={view} setView={setView} />
            </div>
        </div>

        {/* Content Block */}
        <div className="flex flex-1 flex-col justify-start sm:justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-full"
            >
              {view === 'club' ? (
                <ClubAchievementPlaque certificateImageSrc={clubCertificateImageSrc} />
              ) : (
                <IndividualLogPanel />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}