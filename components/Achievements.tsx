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

          <p className="mb-4 sm:mb-10 font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.25em] text-gray-500">
            RECORDED TENURE // 2024 TO 2025
          </p>

          {/* Grouped Description Block with Left Border */}
          <div className="relative border-l-2 border-[#4FAEF3]/20 pl-4 sm:pl-6 space-y-4 sm:space-y-5">
            <p className="max-w-xl text-[12px] leading-[1.6] sm:leading-[1.8] text-gray-300 md:text-[15px] font-light tracking-wide">
              Honoured with the Best Club – Elite Category award for outstanding technical innovation, impactful initiatives, and sustained contributions to the university community.
            </p>
            <p className="max-w-xl text-[12px] leading-[1.6] sm:leading-[1.8] text-gray-400 md:text-[15px] font-light tracking-wide">
              Celebrating a legacy of innovation, teamwork, and technical excellence built through dedication and impact.
            </p>
          </div>

        </div>

        {/* Right Side: Trophy */}
        <div className="flex flex-shrink-0 flex-col items-center justify-center gap-2 sm:gap-6 order-1 lg:order-2">
          <div className="relative flex h-[90px] w-[90px] sm:h-[200px] sm:w-[200px] items-center justify-center lg:h-[260px] lg:w-[260px]">

            {/* Soft glow behind the trophy */}
            <div className="absolute inset-0 rounded-full bg-[#4FAEF3]/10 blur-[20px] sm:blur-[55px] transition-all duration-700 group-hover:bg-[#4FAEF3]/20" />

            <svg
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-10 h-full w-full drop-shadow-[0_0_25px_rgba(79,174,243,0.6)]"
            >
              <defs>
                <linearGradient id="trophyCup" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4FAEF3" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#4FAEF3" stopOpacity="0.08" />
                </linearGradient>
                <linearGradient id="trophyBase" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4FAEF3" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#2b8cd6" stopOpacity="0.15" />
                </linearGradient>
              </defs>

              <path d="M52 34 C16 34, 10 96, 58 92" fill="none" stroke="#4FAEF3" strokeWidth="4" strokeLinecap="round" />
              <path d="M148 34 C184 34, 190 96, 142 92" fill="none" stroke="#4FAEF3" strokeWidth="4" strokeLinecap="round" />

              <path
                d="M52 22 L148 22 L148 38 Q148 104 100 114 Q52 104 52 38 Z"
                fill="url(#trophyCup)"
                stroke="#4FAEF3"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />

              <path d="M52 22 L148 22" stroke="#4FAEF3" strokeWidth="4" strokeLinecap="round" />

              <path d="M86 114 L86 142 L114 142 L114 114" fill="rgba(79,174,243,0.14)" stroke="#4FAEF3" strokeWidth="3" strokeLinejoin="round" />

              <path d="M66 142 L134 142 L148 166 L52 166 Z" fill="url(#trophyBase)" stroke="#4FAEF3" strokeWidth="3" strokeLinejoin="round" />

              <rect x="44" y="166" width="112" height="14" rx="2" fill="url(#trophyBase)" stroke="#4FAEF3" strokeWidth="3" />

              <path
                d="M100 44 L108 64 L130 68 L108 72 L100 92 L92 72 L70 68 L92 64 Z"
                fill="#4FAEF3"
                className="origin-center animate-pulse"
              />

              <text x="100" y="158" textAnchor="middle" fontSize="14" fontWeight="700" fill="#4FAEF3" fontFamily="monospace" opacity="0.85">
                01
              </text>
            </svg>
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
  level: string;
  description: string;
  imageSrc?: string;
}

const INDIVIDUAL_ACHIEVEMENTS: IndividualAchievement[] = [
  { id: '01', name: 'Ryan Fernandes', achievement: "Synapse'26 // Second Place", year: '2026', level: 'NATIONAL', description: "Secured Second Place at Synapse'26, Scaler School of Technology, Bengaluru.", imageSrc: '/a1.jpeg' },
  { id: '02', name: 'Team NeuroVITics', achievement: 'Neurohack Shaastra 2026 // 1st Place', year: '2026', level: 'NATIONAL', description: 'Won 1st Place at Neurohack Shaastra 2026, IIT Madras.', imageSrc: '/a2.jpeg' },
  { id: '03', name: 'Ujaini DE & Aarushi Jha', achievement: "Vinhack'25 // 2nd Place", year: '2025', level: 'NATIONAL', description: "Secured 2nd Place at Vinhack'25." },
  { id: '04', name: 'Mahmood', achievement: "Hackelite'25 // 3rd Place", year: '2025', level: 'NATIONAL', description: "Secured 3rd Place at Hackelite'25, SRM Vadapalani." },
  { id: '05', name: 'Team Sphnix', achievement: "Cosmo Clemch – TechSolctice'26 // 1st Place", year: '2026', level: 'NATIONAL', description: "Won 1st Place in Cosmo Clemch, TechSolctice'26, MIT Bangalore.", imageSrc: '/a5.jpeg' },
  { id: '06', name: 'Team Sphnix', achievement: "RoboRace – TechSolctice'26 // 1st Runner-Up", year: '2026', level: 'NATIONAL', description: "Secured 1st Runner-Up in RoboRace at TechSolctice'26, MIT Bangalore.", imageSrc: '/a6.jpeg' },
  { id: '07', name: 'Team CyberVITics', achievement: "Null OWASP CTF – TechSolctice'26 // 2nd Place", year: '2026', level: 'NATIONAL', description: "Secured 2nd Place in Null OWASP CTF at TechSolctice'26, MIT Bangalore.", imageSrc: '/a7.jpeg' },
  { id: '08', name: 'Member Name 08', achievement: 'Quantum Computing Hack // Finalist', year: '2025', level: 'INTERNATIONAL', description: 'Optimized a quantum circuit for simulating molecular dynamics.' },
  { id: '09', name: 'Member Name 09', achievement: 'Open Source Contribution Award // Winner', year: '2024', level: 'GLOBAL', description: 'Significant contributions to the Linux kernel regarding memory management.' },
  { id: '10', name: 'Member Name 10', achievement: 'RoboWars Alpha // Grand Champion', year: '2024', level: 'NATIONAL', description: 'Dominated the heavyweight combat robotics arena with a pneumatic flipper.' },
  { id: '11', name: 'Member Name 11', achievement: 'NextGen AI Conference // Best Paper', year: '2024', level: 'INTERNATIONAL', description: 'Published groundbreaking research on efficient transformers for mobile devices.' },
];

const DECK_VISIBLE_DEPTH = 3; // how many cards stack visibly behind the active one

/* Single dossier card within the stack. `pos` = distance from front (0 = active/front). */
function DossierCard({ log, pos, total, isHovered, onCardClick }: { log: IndividualAchievement; pos: number; total: number; isHovered: boolean; onCardClick: (pos: number) => void }) {
  const isFront = pos === 0;
  // wrap distance the "short way" so a card jumping from 0 -> total-1 (sent to back)
  // and one jumping from total-1 -> 0 (brought to front) both read as a single short hop
  const wrappedPos = pos > total / 2 ? pos - total : pos;
  const depth = Math.min(Math.abs(wrappedPos), DECK_VISIBLE_DEPTH);
  const isBack = wrappedPos < 0;

  // The active card tilts slightly (-1 or 1 degree based on its ID or just a subtle tilt, or 0)
  // The user asked "The active card should tilt slightly before moving". 
  // Let's just give the active card a very subtle floating tilt or no tilt when resting, and tilt cards behind it.
  // Actually, we'll keep the stack tilt. 
  const stackTilt = depth === 0 ? 0 : (depth % 2 === 0 ? -1 : 1) * (2 + depth * 1.5);
  const offscreen = Math.abs(wrappedPos) > DECK_VISIBLE_DEPTH;

  // Fan out effect on hover
  const fanOutY = (isHovered && depth > 0 && !offscreen && !isBack) ? depth * 12 : 0;
  const fanOutX = (isHovered && depth > 0 && !offscreen && !isBack) ? (depth % 2 === 0 ? 15 : -15) : 0;

  return (
    <motion.div
      className="absolute inset-0 cursor-pointer"
      onClick={() => onCardClick(wrappedPos)}
      style={{ zIndex: isBack ? 1 : total - depth }}
      animate={{
        x: fanOutX,
        y: offscreen ? (isBack ? 110 : -20) : depth * 28 + fanOutY,
        scale: offscreen ? 0.75 : 1 - depth * 0.08,
        rotate: offscreen ? (isBack ? 8 : 0) : stackTilt + (isHovered && depth > 0 ? (depth % 2 === 0 ? -2 : 2) : 0),
        opacity: offscreen ? 0 : 1 - depth * 0.25,
      }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-2xl border p-5 sm:p-8 flex flex-col md:flex-row gap-5 md:gap-8 items-center md:items-start justify-between transition-colors duration-500"
        style={{
          background: 'linear-gradient(160deg, rgba(24,26,29,0.97) 0%, rgba(11,11,11,0.99) 100%)',
          backdropFilter: 'blur(20px)',
          borderColor: isFront ? 'rgba(79,174,243,0.5)' : (isHovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)'),
          boxShadow: isFront
            ? '0 24px 60px rgba(0,0,0,0.7), 0 0 45px rgba(79,174,243,0.25)'
            : (isHovered ? '0 15px 35px rgba(0,0,0,0.6)' : '0 10px 26px rgba(0,0,0,0.5)'),
        }}
      >
        {/* Soft top highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4FAEF3]/40 to-transparent opacity-60" />

        {/* Holographic scan line — only plays on the active front card */}
        {isFront && (
          <motion.div
            key={`scan-${log.id}`}
            className="pointer-events-none absolute left-0 right-0 h-12 z-20"
            style={{
              background: 'linear-gradient(rgba(79,174,243,0) 0%, rgba(79,174,243,0.25) 50%, rgba(79,174,243,0) 100%)',
            }}
            initial={{ top: '-15%', opacity: 0.9 }}
            animate={{ top: '105%', opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        )}

        {/* Decorative HUD corners */}
        <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#4FAEF3]/50" />
        <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#4FAEF3]/50" />
        <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#4FAEF3]/50" />
        <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#4FAEF3]/50" />

        {/* Left: Info */}
        <div className="relative z-10 flex-1 flex flex-col justify-center h-full w-full min-w-0">
          <span className="font-mono text-[#4FAEF3] text-[9.5px] sm:text-[11px] tracking-[0.2em] mb-2.5 uppercase">
            {log.level} {'//'} {log.year}
          </span>
          <h3 className="text-white font-sans text-lg sm:text-2xl lg:text-3xl font-bold uppercase tracking-wide mb-4 leading-tight">
            {log.achievement.split('//')[0]}
          </h3>

          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-8 sm:w-12 bg-white/20" />
            <span className="font-mono text-gray-300 text-[10px] sm:text-[12px] tracking-[0.15em] uppercase">
              {log.name}
            </span>
          </div>

          <div className="inline-block border border-[#4FAEF3]/30 bg-[#4FAEF3]/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-sm w-fit mb-4 shadow-[0_0_15px_rgba(79,174,243,0.15)]">
            <span className="font-mono text-[#4FAEF3] text-[9.5px] sm:text-[11px] tracking-[0.1em] uppercase">
              POSITION: {log.achievement.split('//')[1]?.trim() || 'WINNER'}
            </span>
          </div>

          <p className="text-gray-400 text-[11px] sm:text-[13.5px] leading-relaxed max-w-lg font-sans">
            {log.description}
          </p>
        </div>

        {/* Right: Certificate placeholder */}
        <div className="relative z-10 w-full md:w-[36%] aspect-[4/3] rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center overflow-hidden shrink-0">
          {log.imageSrc ? (
            <img src={log.imageSrc} alt={log.achievement.split('//')[0].trim()} className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-3">
              <svg className="w-8 h-8 sm:w-11 sm:h-11 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-white/30">
                NO ATTACHMENT
              </span>
            </div>
          )}
          <span className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/30" />
          <span className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/30" />
          <span className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/30" />
          <span className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/30" />
        </div>
      </div>
    </motion.div>
  );
}

function IndividualLogPanel() {
  const total = INDIVIDUAL_ACHIEVEMENTS.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % total);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);

  const handleCardClick = (wrappedPos: number) => {
    if (wrappedPos === 0) {
      handleNext();
    } else if (wrappedPos > 0) {
      setActiveIndex((prev) => (prev + wrappedPos) % total);
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center">

      {/* Header / controls — no enclosing box, floats directly on the page background */}
      <div className="w-full max-w-[1000px] mx-auto mb-8 sm:mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-sm bg-[#4FAEF3] animate-pulse shadow-[0_0_8px_#4FAEF3]" />
            <span className="font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.2em] text-gray-300 md:text-[12px]">
              MISSION_ARCHIVE // LOG {INDIVIDUAL_ACHIEVEMENTS[activeIndex].id}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="p-2 sm:p-2.5 transition-colors hover:bg-white/5 rounded-md text-[#4FAEF3] border border-white/10 hover:border-[#4FAEF3]/40"
              aria-label="Previous achievement"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <span className="font-mono text-[11px] sm:text-[13px] text-white/50 tracking-widest w-16 text-center">
              {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <button
              onClick={handleNext}
              className="p-2 sm:p-2.5 transition-colors hover:bg-white/5 rounded-md text-[#4FAEF3] border border-white/10 hover:border-[#4FAEF3]/40"
              aria-label="Next achievement"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
        </div>

        {/* Progress nodes */}
        <div className="flex items-center gap-2 sm:gap-2.5 w-full">
          {INDIVIDUAL_ACHIEVEMENTS.map((_, i) => (
            <div
              key={i}
              className={`h-[3px] sm:h-[4px] flex-1 rounded-full transition-all duration-500 ${i === activeIndex
                  ? 'bg-[#4FAEF3] shadow-[0_0_10px_#4FAEF3]'
                  : i < activeIndex
                    ? 'bg-[#4FAEF3]/30'
                    : 'bg-white/10'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Stacked dossier deck */}
      <div 
        className="relative w-full max-w-[1000px] mx-auto pb-10 sm:pb-16"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full h-[370px] sm:h-[340px]">
          {INDIVIDUAL_ACHIEVEMENTS.map((log, i) => {
            const pos = (i - activeIndex + total) % total;
            return <DossierCard key={log.id} log={log} pos={pos} total={total} isHovered={isHovered} onCardClick={handleCardClick} />;
          })}
        </div>
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
        <div className="flex-shrink-0 mb-6 sm:mb-8 md:mb-10">
          <div className="mb-4 sm:mb-6 flex items-start justify-between gap-4">
            <div>
              <span className="mb-2 sm:mb-3 block font-mono text-[9px] uppercase tracking-[0.25em] text-gray-500 sm:text-[11px]">
                <span style={{ color: '#ffffff', fontWeight: 700, marginRight: '8px sm:mr-[10px]' }}>05.</span>
                system.logs // Achievements
              </span>
              <h2
                className="font-sans uppercase text-white"
                style={{ fontSize: 'clamp(24px, 7vw, 64px)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.05 }}
              >
                YEARS OF <span className="text-[#4FAEF3]">RECOGNITION</span>
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