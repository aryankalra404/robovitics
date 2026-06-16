'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DOMAINS = [
  {
    id: '01',
    sys: 'ELEC',
    title: 'ELECTRICAL',
    sub: 'Circuits & Power Systems',
    color: '#fbbf24',
    signal: [1, 1, 1, 0.8, 0.5],
    uptime: '99.9%',
    icon: (color: string) => (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <polygon
          points="20,3 8,20 17,20 16,33 28,16 19,16"
          stroke={color}
          strokeWidth="1.3"
          strokeLinejoin="round"
          fill={color}
          fillOpacity="0.12"
        />
      </svg>
    ),
  },
  {
    id: '02',
    sys: 'MECH',
    title: 'MECHANICAL',
    sub: 'Design & Fabrication',
    color: '#94a3b8',
    signal: [1, 1, 1, 0.6, 0.3],
    uptime: '98.4%',
    icon: (color: string) => (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="6" stroke={color} strokeWidth="1.3" />
        <circle cx="18" cy="18" r="2" fill={color} opacity="0.8" />
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const r = (deg * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={18 + 8 * Math.cos(r)}
              y1={18 + 8 * Math.sin(r)}
              x2={18 + 13 * Math.cos(r)}
              y2={18 + 13 * Math.sin(r)}
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
            />
          );
        })}
        <circle cx="18" cy="18" r="14" stroke={color} strokeWidth="0.8" strokeOpacity="0.3" />
      </svg>
    ),
  },
  {
    id: '03',
    sys: 'AI_ML',
    title: 'ML & AI',
    sub: 'Machine Learning & Models',
    color: '#a78bfa',
    signal: [1, 1, 1, 0.5, 0.2],
    uptime: '99.2%',
    icon: (color: string) => (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="7" stroke={color} strokeWidth="1.4" />
        <circle cx="18" cy="18" r="2.5" fill={color} opacity="0.9" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
          const r = (deg * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={18 + 9 * Math.cos(r)}
              y1={18 + 9 * Math.sin(r)}
              x2={18 + 14 * Math.cos(r)}
              y2={18 + 14 * Math.sin(r)}
              stroke={color}
              strokeWidth="1"
              opacity={i % 2 === 0 ? '0.7' : '0.3'}
            />
          );
        })}
      </svg>
    ),
  },
  {
    id: '04',
    sys: 'CYBER',
    title: 'CYBERSECURITY',
    sub: 'Systems & Network Defense',
    color: '#f87171',
    signal: [1, 1, 0.9, 0.6, 0.3],
    uptime: '100%',
    icon: (color: string) => (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <path
          d="M18 3 L30 8 L30 18 C30 25 24 31 18 33 C12 31 6 25 6 18 L6 8 Z"
          stroke={color}
          strokeWidth="1.3"
          fill={color}
          fillOpacity="0.1"
          strokeLinejoin="round"
        />
        <path
          d="M12 18 L16 22 L24 14"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: '05',
    sys: 'WEB',
    title: 'WEB DEV',
    sub: 'Frontend & Backend Systems',
    color: '#34d399',
    signal: [1, 1, 0.8, 0.4, 0.1],
    uptime: '97.8%',
    icon: (color: string) => (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="13" stroke={color} strokeWidth="1.3" />
        <ellipse cx="18" cy="18" rx="6" ry="13" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
        <line x1="5" y1="18" x2="31" y2="18" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
        <line x1="7" y1="12" x2="29" y2="12" stroke={color} strokeWidth="0.8" strokeOpacity="0.35" />
        <line x1="7" y1="24" x2="29" y2="24" stroke={color} strokeWidth="0.8" strokeOpacity="0.35" />
      </svg>
    ),
  },
  {
    id: '06',
    sys: 'APP',
    title: 'APP DEV',
    sub: 'Mobile & Cross-Platform',
    color: '#f472b6',
    signal: [1, 1, 0.7, 0.3, 0.1],
    uptime: '98.1%',
    icon: (color: string) => (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <rect x="11" y="2" width="14" height="32" rx="3" stroke={color} strokeWidth="1.3" />
        <line x1="11" y1="7" x2="25" y2="7" stroke={color} strokeWidth="0.8" strokeOpacity="0.5" />
        <line x1="11" y1="29" x2="25" y2="29" stroke={color} strokeWidth="0.8" strokeOpacity="0.5" />
        <circle cx="18" cy="31.5" r="1" fill={color} opacity="0.6" />
        <rect x="15" y="4" width="6" height="1.5" rx="0.75" fill={color} opacity="0.5" />
        <rect x="14" y="13" width="8" height="6" rx="1" stroke={color} strokeWidth="0.9" strokeOpacity="0.7" />
        <line x1="14" y1="22" x2="22" y2="22" stroke={color} strokeWidth="0.8" strokeOpacity="0.4" />
        <line x1="14" y1="24.5" x2="20" y2="24.5" stroke={color} strokeWidth="0.8" strokeOpacity="0.4" />
      </svg>
    ),
  },
];

function DomainCard({
  domain,
  addToRefs,
}: {
  domain: (typeof DOMAINS)[0];
  addToRefs: (el: HTMLDivElement | null) => void;
}) {
  const { id, sys, title, sub, color, signal, uptime, icon } = domain;

  return (
    <div
      ref={addToRefs}
      className="absolute"
      style={{ width: '15.5vw', minWidth: '180px', maxWidth: '240px' }}
    >
      <div
        style={{
          padding: '1.5px',
          background: `linear-gradient(145deg, ${color} 0%, ${color}30 40%, ${color}60 100%)`,
          borderRadius: '8px',
          boxShadow: `0 0 20px ${color}20, 0 0 50px ${color}08`,
          position: 'relative',
        }}
      >
        {/* Corner bolts */}
        {[
          { top: '-5px', left: '-5px' },
          { top: '-5px', right: '-5px' },
          { bottom: '-5px', left: '-5px' },
          { bottom: '-5px', right: '-5px' },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              ...pos,
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#050505',
              border: `1.5px solid ${color}`,
              boxShadow: `0 0 5px ${color}80`,
              zIndex: 10,
            }}
          />
        ))}

        {/* Card body */}
        <div
          style={{
            background: 'linear-gradient(160deg, #111118 0%, #0a0a0f 60%, #08080d 100%)',
            borderRadius: '7px',
            padding: '15px 15px 13px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top accent bar */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: `linear-gradient(90deg,transparent,${color},${color}80,transparent)`,
              borderRadius: '7px 7px 0 0',
            }}
          />

          {/* Inner glow */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(ellipse 80% 50% at 50% -10%,${color}10 0%,transparent 70%)`,
              pointerEvents: 'none',
            }}
          />

          {/* Circuit trace */}
          <svg
            style={{
              position: 'absolute',
              top: '3px',
              left: 0,
              width: '100%',
              height: '2px',
              overflow: 'visible',
              pointerEvents: 'none',
            }}
          >
            <line x1="8%" y1="1" x2="92%" y2="1" stroke={`${color}20`} strokeWidth="1" />
            <line
              x1="8%"
              y1="1"
              x2="92%"
              y2="1"
              stroke={color}
              strokeWidth="1.5"
              opacity="0.9"
              strokeDasharray="25 200"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;-225"
                dur="2s"
                repeatCount="indefinite"
              />
            </line>
          </svg>

          <div style={{ position: 'relative', zIndex: 2 }}>
            {/* Top row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '10px',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    marginBottom: '2px',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      background: color,
                      boxShadow: `0 0 6px ${color}`,
                      animation: 'pdot 2s ease-in-out infinite',
                    }}
                  />
                  <span
                    style={{
                      fontSize: '8px',
                      letterSpacing: '0.14em',
                      color: `${color}CC`,
                      fontFamily: 'monospace',
                    }}
                  >
                    SYS.{sys}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '8px',
                    color: `${color}40`,
                    letterSpacing: '0.08em',
                    fontFamily: 'monospace',
                  }}
                >
                  MODULE_{id}
                </span>
              </div>
              <div
                style={{
                  padding: '5px',
                  border: `1px solid ${color}30`,
                  borderRadius: '4px',
                  background: `${color}0D`,
                }}
              >
                {icon(color)}
              </div>
            </div>

            {/* Title */}
            <div style={{ marginBottom: '10px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  marginBottom: '3px',
                }}
              >
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderTop: `2px solid ${color}`,
                    borderLeft: `2px solid ${color}`,
                    flexShrink: 0,
                  }}
                />
                <h3
                  style={{
                    margin: 0,
                    fontSize: 'clamp(11px,1vw,15px)',
                    fontWeight: '700',
                    color: '#ffffff',
                    letterSpacing: '0.12em',
                    fontFamily: 'monospace',
                  }}
                >
                  {title}
                </h3>
              </div>
              <p
                style={{
                  margin: 0,
                  paddingLeft: '11px',
                  fontSize: '8px',
                  color: `${color}70`,
                  letterSpacing: '0.04em',
                  fontFamily: 'monospace',
                }}
              >
                {sub}
              </p>
            </div>

            {/* Divider */}
            <div
              style={{
                height: '1px',
                background: `linear-gradient(90deg,${color}50,${color}10,transparent)`,
                marginBottom: '9px',
              }}
            />

            {/* Stats */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <div
                  style={{
                    fontSize: '6px',
                    color: `${color}50`,
                    letterSpacing: '0.12em',
                    fontFamily: 'monospace',
                    marginBottom: '3px',
                  }}
                >
                  SIGNAL
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
                  {signal.map((s, i) => (
                    <div
                      key={i}
                      style={{
                        width: '3px',
                        height: `${6 + i * 2.5}px`,
                        background: color,
                        opacity: s,
                        borderRadius: '1px',
                      }}
                    />
                  ))}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div
                  style={{
                    fontSize: '6px',
                    color: `${color}50`,
                    letterSpacing: '0.12em',
                    fontFamily: 'monospace',
                    marginBottom: '2px',
                  }}
                >
                  UPTIME
                </div>
                <div
                  style={{
                    fontSize: 'clamp(15px,1.3vw,19px)',
                    fontWeight: '700',
                    color: color,
                    fontFamily: 'monospace',
                    textShadow: `0 0 12px ${color}70`,
                  }}
                >
                  {uptime}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Domains() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const sectionLabelRef = useRef<HTMLDivElement>(null);
  cardsRef.current = [];

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(cardsRef.current, {
        x: '0vw',
        y: '0vh',
        scale: 0.82,
        rotationY: 0,
        opacity: 1,
        transformPerspective: 1000,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=4500',
          scrub: 1.2,
          pin: true,
        },
      });

      // PHASE 1 — deploy with Y-axis flip
      tl.to(cardsRef.current, {
        x: (i) => ['-25vw', '-15vw', '-5vw', '5vw', '15vw', '25vw'][i],
        y: (i) => ['12vh', '-10vh', '8vh', '-8vh', '10vh', '-12vh'][i],
        rotation: (i) => [-7, -4, -1, 1, 4, 7][i],
        rotationY: (i) => [-20, -12, -4, 4, 12, 20][i],
        scale: 0.85,
        duration: 1.2,
        ease: 'power2.out',
      });

      // Settle rotationY
      tl.to(cardsRef.current, {
        rotationY: 0,
        duration: 0.4,
        ease: 'power1.out',
      });

      // PHASE 2 — horizontal row
      tl.to(cardsRef.current, {
        x: (i) =>
          ['-38.75vw', '-23.25vw', '-7.75vw', '7.75vw', '23.25vw', '38.75vw'][i],
        y: '0vh',
        rotation: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power2.inOut',
      });

      // PHASE 2.5 — heading fades out
      tl.to(
        [headingRef.current, eyebrowRef.current, sectionLabelRef.current],
        {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: 'power2.in',
        },
        '<0.3'
      );

      // PHASE 3 — blast off
      tl.to(cardsRef.current, {
        x: (i) =>
          ['-160vw', '-96vw', '-32vw', '32vw', '96vw', '160vw'][i],
        y: (i) => ['-12vh', '8vh', '-6vh', '6vh', '-8vh', '12vh'][i],
        rotationY: (i) => [-40, -24, -8, 8, 24, 40][i],
        scale: 3,
        opacity: (i) => (i === 2 || i === 3 ? 0 : 1),
        duration: 1.5,
        ease: 'power2.in',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @keyframes pdot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.6); }
        }
      `}</style>

      <section
        id="domains"
        ref={sectionRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center"
        style={{ background: '#050505' }}
      >
        {/* Grid background — matches roboVITics site */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Subtle radial vignette */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.7) 100%)',
          }}
        />

        {/* Section label — top-left, matches site style */}
        <div
          ref={sectionLabelRef}
          className="absolute z-20 pointer-events-none"
          style={{ top: '10%', left: '6%' }}
        >
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '11px',
              letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.35)',
              textTransform: 'uppercase',
            }}
          >
            <span style={{ color: '#ffffff', fontWeight: 700, marginRight: '8px' }}>02.</span>
            SYSTEM.LOGS // DOMAINS
          </span>
        </div>

        {/* Main heading — centered upper area */}
        <div
          className="absolute z-20 flex flex-col items-center pointer-events-none"
          style={{
            top: '18%',
            left: '50%',
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            ref={eyebrowRef}
            style={{
              fontSize: '9px',
              letterSpacing: '0.35em',
              color: 'rgba(255,255,255,0.2)',
              fontFamily: 'monospace',
              marginBottom: '12px',
              display: 'block',
              textTransform: 'uppercase',
            }}
          >
            ▶ SECTOR_MAP // DOMAINS
          </span>
          <h2
            ref={headingRef}
            style={{
              margin: 0,
              fontSize: 'clamp(32px,4.5vw,72px)',
              fontWeight: '900',
              color: '#ffffff',
              letterSpacing: '-0.01em',
              fontFamily: '"Inter", "Arial Black", sans-serif',
              textTransform: 'uppercase',
              lineHeight: 1,
              textAlign: 'center',
            }}
          >
            DOMAINS AT{' '}
            <span style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 900 }}>
              ROBOVITICS.
            </span>
          </h2>
          <div
            style={{
              marginTop: '14px',
              width: '50%',
              height: '1px',
              background:
                'linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)',
            }}
          />
        </div>

        {/* Cards layer */}
        <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
          {DOMAINS.map((domain) => (
            <DomainCard key={domain.id} domain={domain} addToRefs={addToRefs} />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-20">
          <span
            style={{
              fontSize: '8px',
              letterSpacing: '0.25em',
              color: 'rgba(255,255,255,0.12)',
              fontFamily: 'monospace',
              textTransform: 'uppercase',
            }}
          >
            SCROLL TO DEPLOY ↓
          </span>
        </div>
      </section>
    </>
  );
}