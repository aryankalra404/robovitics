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
          top: 50%;
          width: min(78vw, 1080px);
          height: min(58vh, 620px);
          transform: translate(-50%, -50%);
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
        @media (max-width: 700px) {
          .mwt-portal-frame {
            width: 84vw;
            height: 42vh;
          }
          .mwt-portal-corner {
            width: 34px;
            height: 34px;
          }
        }
      `}</style>

      <div className="mwt-roster-portal" ref={ref} aria-hidden="true">
        <div className="mwt-portal-frame">
          <span className="mwt-portal-corner tl" />
          <span className="mwt-portal-corner tr" />
          <span className="mwt-portal-corner bl" />
          <span className="mwt-portal-corner br" />
        </div>
      </div>
    </>
  );
});

CommandGateway.displayName = 'CommandGateway';
export default CommandGateway;