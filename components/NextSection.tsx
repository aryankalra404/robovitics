'use client';

import { useEffect, useRef } from 'react';

interface NextSectionProps {
  gearRef: React.RefObject<HTMLDivElement | null>;
}

const FACULTY = Array.from({ length: 4 }, (_, index) => ({
  name: `Faculty ${index + 1}`,
  role: index === 0 ? 'Faculty Coordinator' : 'Faculty Mentor',
}));

const BOARD = Array.from({ length: 24 }, (_, index) => ({
  name: `Board ${String(index + 1).padStart(2, '0')}`,
  role: [
    'Chairperson',
    'Vice Chairperson',
    'Technical Lead',
    'Operations Lead',
    'Design Lead',
    'Events Lead',
  ][index % 6],
}));

export default function NextSection({ gearRef }: NextSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const rosterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number | null = null;
    let targetProgress = 0;
    let renderedProgress = 0;

    const clamp = (value: number) => Math.max(0, Math.min(1, value));
    const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

    const render = () => {
      if (!panelRef.current) {
        rafId = null;
        return;
      }

      renderedProgress += (targetProgress - renderedProgress) * 0.12;

      if (Math.abs(targetProgress - renderedProgress) < 0.001) {
        renderedProgress = targetProgress;
      }

      const panelEase = easeOutCubic(clamp(renderedProgress / 0.72));
      const xOffset = (1 - panelEase) * 100;
      panelRef.current.style.transform = `translate3d(${xOffset}vw, 0, 0)`;

      if (rosterRef.current) {
        const facultyReveal = easeOutCubic(clamp((renderedProgress - 0.72) / 0.12));
        const boardReveal = easeOutCubic(clamp((renderedProgress - 0.84) / 0.12));
        rosterRef.current.style.opacity = '1';
        rosterRef.current.style.setProperty('--faculty-reveal', `${facultyReveal}`);
        rosterRef.current.style.setProperty('--board-reveal', `${boardReveal}`);
        rosterRef.current.style.setProperty('--faculty-lift', `${(1 - facultyReveal) * 24}px`);
        rosterRef.current.style.setProperty('--board-lift', `${(1 - boardReveal) * 24}px`);
        rosterRef.current.style.transform = 'translate3d(0, 0, 0)';
      }

      if (renderedProgress !== targetProgress) {
        rafId = requestAnimationFrame(render);
      } else {
        rafId = null;
      }
    };

    const requestRender = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(render);
      }
    };

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollableDistance = containerRef.current.offsetHeight - windowHeight;

      targetProgress = clamp(-rect.top / totalScrollableDistance);
      requestRender();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [gearRef]);

  return (
    <>
      <style jsx>{`
        .horizontal-container {
          position: relative;
          height: 420vh;
          margin-top: -300vh;
          z-index: 10;
          pointer-events: none;
        }

        .sticky-viewport {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
        }

        .sliding-panel {
          width: 100vw;
          height: 100vh;
          background: #0d0d0d;
          border-left: 1px solid rgba(79, 174, 243, 0.3);
          box-shadow: -20px 0 60px rgba(0, 0, 0, 0.8);
          transform: translate3d(100vw, 0, 0);
          will-change: transform;
          pointer-events: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .mwt-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .roster {
          position: relative;
          z-index: 10;
          width: min(1180px, calc(100% - 32px));
          min-height: 235vh;
          padding: 7vh 0 18vh;
          opacity: 0;
          --faculty-reveal: 0;
          --board-reveal: 0;
          --faculty-lift: 24px;
          --board-lift: 24px;
          will-change: transform, opacity;
        }

        .section-block {
          margin-bottom: 64px;
          opacity: var(--board-reveal);
          transform: translate3d(0, var(--board-lift), 0);
          transition: none;
        }

        .faculty-block {
          margin-bottom: 44px;
          opacity: var(--faculty-reveal);
          transform: translate3d(0, var(--faculty-lift), 0);
        }

        .section-head {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 26px;
          border-bottom: 1px solid rgba(79, 174, 243, 0.22);
          padding-bottom: 16px;
        }

        .section-kicker {
          font-family: monospace;
          font-size: 11px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(79, 174, 243, 0.78);
        }

        .section-title {
          font-family: "Inter", "Arial Black", sans-serif;
          font-size: clamp(40px, 6vw, 86px);
          font-weight: 900;
          line-height: 0.9;
          margin: 8px 0 0;
          color: #fff;
          text-transform: uppercase;
        }

        .section-count {
          font-family: monospace;
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.38);
          position: relative;
        }

        .roster-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 22px;
        }

        .faculty-grid {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        .board-grid {
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 18px;
        }

        .roster-card {
          position: relative;
          aspect-ratio: 0.78;
          overflow: hidden;
          clip-path: polygon(12% 0, 88% 0, 100% 12%, 100% 88%, 88% 100%, 12% 100%, 0 88%, 0 12%);
          border: 1px solid rgba(79, 174, 243, 0.32);
          background:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px),
            radial-gradient(circle at 50% 42%, rgba(79,174,243,0.26), transparent 38%),
            #080b0e;
          background-size: 18px 18px, 18px 18px, auto, auto;
          box-shadow: inset 0 0 30px rgba(79,174,243,0.08), 0 18px 45px rgba(0,0,0,0.35);
        }

        .board-card {
          aspect-ratio: 0.82;
        }

        .photo-placeholder {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
        }

        .avatar-core {
          width: 42%;
          aspect-ratio: 1;
          border-radius: 999px;
          border: 2px solid rgba(79,174,243,0.55);
          background:
            radial-gradient(circle at 50% 34%, rgba(255,255,255,0.82) 0 8%, transparent 9%),
            radial-gradient(circle at 50% 72%, rgba(255,255,255,0.58) 0 22%, transparent 23%),
            rgba(79,174,243,0.1);
          box-shadow: 0 0 28px rgba(79,174,243,0.22);
          opacity: 0.9;
        }

        .card-copy {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          padding: 16px 16px 26px;
          background: linear-gradient(180deg, rgba(0,0,0,0.82), rgba(0,0,0,0));
        }

        .card-name {
          display: block;
          font-family: "Inter", "Arial Black", sans-serif;
          font-size: clamp(16px, 1.7vw, 22px);
          font-weight: 900;
          line-height: 1;
          color: #fff;
          text-transform: uppercase;
        }

        .board-card .card-name {
          font-size: clamp(13px, 1vw, 16px);
        }

        .card-role {
          display: block;
          margin-top: 7px;
          font-family: monospace;
          font-size: 10px;
          letter-spacing: 0.16em;
          line-height: 1.4;
          color: rgba(79,174,243,0.9);
          text-transform: uppercase;
        }

        .corner {
          position: absolute;
          width: 18px;
          height: 18px;
          border-color: rgba(79,174,243,0.86);
          filter: drop-shadow(0 0 6px rgba(79,174,243,0.45));
        }

        .corner.tl { top: 10px; left: 10px; border-top: 2px solid; border-left: 2px solid; }
        .corner.tr { top: 10px; right: 10px; border-top: 2px solid; border-right: 2px solid; }
        .corner.bl { bottom: 10px; left: 10px; border-bottom: 2px solid; border-left: 2px solid; }
        .corner.br { bottom: 10px; right: 10px; border-bottom: 2px solid; border-right: 2px solid; }

        @media (max-width: 900px) {
          .horizontal-container {
            height: 500vh;
          }

          .roster {
            width: min(640px, calc(100% - 28px));
            padding-top: 10vh;
          }

          .roster-grid,
          .board-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>

      <div className="horizontal-container" ref={containerRef}>
        <div className="sticky-viewport">
          <div className="sliding-panel" ref={panelRef}>
            <div className="mwt-grid" />
            <div className="roster" ref={rosterRef}>
              <section className="section-block faculty-block">
                <div className="section-head">
                  <div>
                    <span className="section-kicker">Guidance Protocol</span>
                    <h2 className="section-title">Faculty</h2>
                  </div>
                  <span className="section-count">04 Profiles</span>
                </div>
                <div className="roster-grid faculty-grid">
                  {FACULTY.map((member) => (
                    <article className="roster-card" key={member.name}>
                      <div className="photo-placeholder"><div className="avatar-core" /></div>
                      <div className="card-copy">
                        <span className="card-name">{member.name}</span>
                        <span className="card-role">{member.role}</span>
                      </div>
                      <span className="corner tl" /><span className="corner tr" />
                      <span className="corner bl" /><span className="corner br" />
                    </article>
                  ))}
                </div>
              </section>

              <section className="section-block">
                <div className="section-head">
                  <div>
                    <span className="section-kicker">Command Matrix</span>
                    <h2 className="section-title">Board</h2>
                  </div>
                  <span className="section-count">24 Profiles</span>
                </div>
                <div className="roster-grid board-grid">
                  {BOARD.map((member) => (
                    <article className="roster-card board-card" key={member.name}>
                      <div className="photo-placeholder"><div className="avatar-core" /></div>
                      <div className="card-copy">
                        <span className="card-name">{member.name}</span>
                        <span className="card-role">{member.role}</span>
                      </div>
                      <span className="corner tl" /><span className="corner tr" />
                      <span className="corner bl" /><span className="corner br" />
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
