'use client';

import { forwardRef } from 'react';

const CommandGateway = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <>
      <style jsx>{`
        .mwt-roster-portal {
          position: absolute;
          left: 50%;
          top: 50%;
          width: min(86vw, 1180px);
          height: min(72vh, 720px);
          z-index: 16;
          opacity: 0;
          transform-origin: center center;
          will-change: transform, opacity, filter;
          pointer-events: none;
          overflow: hidden;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
        .mwt-portal-frame {
          position: absolute;
          left: 50%;
          top: 42%;
          width: min(78vw, 1080px);
          height: min(58vh, 620px);
          transform: translate(-50%, -50%);
          border: 1px solid rgba(79, 174, 243, 0.4);
          border-radius: 6px;
          background: linear-gradient(rgba(79, 174, 243, 0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79, 174, 243, 0.055) 1px, transparent 1px),
            radial-gradient(circle at center, rgba(79, 174, 243, 0.12), rgba(0, 0, 0, 0) 58%);
          background-size: 34px 34px, 34px 34px, auto;
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.035) inset,
            0 0 64px rgba(79, 174, 243, 0.16);
        }
        .mwt-portal-frame::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          width: min(34vw, 430px);
          aspect-ratio: 1;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(79, 174, 243, 0.2);
          border-radius: 50%;
          background: radial-gradient(
            circle,
            transparent 0 38%,
            rgba(79, 174, 243, 0.08) 39% 40%,
            transparent 41% 57%,
            rgba(79, 174, 243, 0.12) 58% 59%,
            transparent 60%
          );
          box-shadow: 0 0 45px rgba(79, 174, 243, 0.12);
          animation: mwt-reticle 8s linear infinite;
        }
        .mwt-portal-frame::after {
          content: '';
          position: absolute;
          left: 7%;
          right: 7%;
          top: 50%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(79, 174, 243, 0.32), transparent);
          box-shadow: 0 -92px 0 rgba(79, 174, 243, 0.12), 0 92px 0 rgba(79, 174, 243, 0.12);
        }
        .mwt-portal-corner {
          position: absolute;
          width: 54px;
          height: 54px;
          border-color: rgba(79, 174, 243, 0.88);
          filter: drop-shadow(0 0 10px rgba(79, 174, 243, 0.38));
        }
        .mwt-portal-corner.tl {
          left: -1px;
          top: -1px;
          border-left: 2px solid;
          border-top: 2px solid;
        }
        .mwt-portal-corner.tr {
          right: -1px;
          top: -1px;
          border-right: 2px solid;
          border-top: 2px solid;
        }
        .mwt-portal-corner.bl {
          left: -1px;
          bottom: -1px;
          border-left: 2px solid;
          border-bottom: 2px solid;
        }
        .mwt-portal-corner.br {
          right: -1px;
          bottom: -1px;
          border-right: 2px solid;
          border-bottom: 2px solid;
        }
        .mwt-portal-rail {
          position: absolute;
          left: 50%;
          width: min(42vw, 620px);
          height: 28px;
          transform: translateX(-50%);
          border-left: 1px solid rgba(79, 174, 243, 0.35);
          border-right: 1px solid rgba(79, 174, 243, 0.35);
        }
        .mwt-portal-rail.top {
          top: -38px;
          border-top: 1px solid rgba(79, 174, 243, 0.35);
          background: linear-gradient(90deg, transparent, rgba(79, 174, 243, 0.08), transparent);
        }
        .mwt-portal-rail.bottom {
          bottom: -38px;
          border-bottom: 1px solid rgba(79, 174, 243, 0.35);
          background: linear-gradient(90deg, transparent, rgba(79, 174, 243, 0.08), transparent);
        }
        .mwt-portal-node {
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #4faf3;
          box-shadow: 0 0 18px rgba(79, 174, 243, 0.85);
        }
        .mwt-portal-node.n1 {
          left: 12%;
          top: 18%;
        }
        .mwt-portal-node.n2 {
          right: 14%;
          top: 28%;
        }
        .mwt-portal-node.n3 {
          left: 20%;
          bottom: 16%;
        }
        .mwt-portal-node.n4 {
          right: 22%;
          bottom: 20%;
        }
        .mwt-portal-node::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          width: 58px;
          height: 1px;
          transform-origin: left center;
          background: linear-gradient(90deg, rgba(79, 174, 243, 0.48), transparent);
        }
        .mwt-portal-node.n1::after {
          rotate: 24deg;
        }
        .mwt-portal-node.n2::after {
          rotate: 154deg;
        }
        .mwt-portal-node.n3::after {
          rotate: -18deg;
        }
        .mwt-portal-node.n4::after {
          rotate: 202deg;
        }
        .mwt-portal-scan {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: inherit;
        }
        .mwt-portal-scan::before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          top: -20%;
          height: 18%;
          background: linear-gradient(180deg, transparent, rgba(79, 174, 243, 0.18), transparent);
          animation: mwt-scan-sweep 3.6s ease-in-out infinite;
        }
        .mwt-portal-copy {
          position: absolute;
          left: 50%;
          top: calc(42% + min(31vh, 330px));
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          font-family: monospace;
          text-transform: uppercase;
          color: #ffffff;
          text-align: center;
          padding: 0 20px;
        }
        .mwt-portal-copy span {
          font-size: 10px;
          letter-spacing: 0.34em;
          color: rgba(79, 174, 243, 0.9);
        }
        .mwt-portal-copy strong {
          font-size: clamp(18px, 2.6vw, 38px);
          letter-spacing: 0.08em;
          line-height: 0.95;
          text-shadow: 0 0 22px rgba(79, 174, 243, 0.28);
        }
        .mwt-portal-arrow {
          width: 1px;
          height: 42px;
          background: linear-gradient(180deg, rgba(79, 174, 243, 0), rgba(79, 174, 243, 0.95));
          position: relative;
          animation: mwt-arrow 1.3s ease-in-out infinite;
        }
        .mwt-portal-arrow::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -1px;
          width: 9px;
          height: 9px;
          border-right: 1px solid rgba(79, 174, 243, 0.95);
          border-bottom: 1px solid rgba(79, 174, 243, 0.95);
          transform: translateX(-50%) rotate(45deg);
        }
        @keyframes mwt-arrow {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.45;
          }
          50% {
            transform: translateY(8px);
            opacity: 1;
          }
        }
        @keyframes mwt-reticle {
          to {
            rotate: 360deg;
          }
        }
        @keyframes mwt-scan-sweep {
          0%,
          18% {
            translate: 0 -120%;
            opacity: 0;
          }
          42%,
          62% {
            opacity: 1;
          }
          100% {
            translate: 0 720%;
            opacity: 0;
          }
        }
        @media (max-width: 700px) {
          .mwt-portal-frame {
            width: 84vw;
            height: 42vh;
            border-radius: 4px;
          }
          .mwt-portal-frame::before {
            width: 54vw;
          }
          .mwt-portal-corner {
            width: 34px;
            height: 34px;
          }
          .mwt-portal-rail {
            width: 62vw;
            height: 20px;
          }
          .mwt-portal-node {
            width: 5px;
            height: 5px;
          }
          .mwt-portal-copy {
            top: calc(42% + 25vh);
            width: 86vw;
          }
        }
      `}</style>

      <div className="mwt-roster-portal" ref={ref} aria-hidden="true">
        <div className="mwt-portal-frame">
          <span className="mwt-portal-scan" />
          <span className="mwt-portal-corner tl" />
          <span className="mwt-portal-corner tr" />
          <span className="mwt-portal-corner bl" />
          <span className="mwt-portal-corner br" />
          <span className="mwt-portal-rail top" />
          <span className="mwt-portal-rail bottom" />
          <span className="mwt-portal-node n1" />
          <span className="mwt-portal-node n2" />
          <span className="mwt-portal-node n3" />
          <span className="mwt-portal-node n4" />
        </div>
        <div className="mwt-portal-copy">
          <span>Command gateway linked</span>
          <strong>SCROLL DOWN</strong>
          <div className="mwt-portal-arrow" />
        </div>
      </div>
    </>
  );
});

CommandGateway.displayName = 'CommandGateway';
export default CommandGateway;