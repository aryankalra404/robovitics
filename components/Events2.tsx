"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────

type DeckItem = {
  id: string;
  name: string;
  type: string;
  date: string;
  desc: string;
  status: string;
  img: string;
  details: string;
};

const events: DeckItem[] = [
  {
    id: "MODULE_01",
    name: "ROBOWARS",
    type: "COMBAT ROBOTICS",
    date: "GRAVITAS · VIT ANNUAL FEST",
    desc: "The flagship event of Gravitas. Robot combat where participants from around the globe battle for the RoboWars Champion Title.",
    status: "FLAGSHIP",
    img: "/robowars.png",
    details:
      "Prepare for the ultimate combat robotics showdown. Teams will bring their engineering marvels to battle it out in an enclosed, hazard-filled arena. Sparks will fly, metal will crunch, and only one machine will survive to claim the championship title. Detailed rules, weight classes (15kg, 30kg, 60kg), and technical safety regulations apply for all participating teams.",
  },
  {
    id: "MODULE_02",
    name: "EQUINOX",
    type: "36-HOUR HACKATHON",
    date: "36H · OPEN REGISTRATION",
    desc: "A jam-packed hackathon where participants share ideas and creativity. Mentors and mini workshops with abundant resources throughout.",
    status: "UPCOMING",
    img: "/equinox.png",
    details:
      "Join the most intense 36-hour coding marathon. Gather your team, ideate, and build solutions that tackle real-world problems. With expert mentors, technical workshops, and unlimited coffee, push your limits to create software or hardware prototypes that stand out. Great prizes, networking, and sleep-deprivation guaranteed.",
  },
  {
    id: "MODULE_03",
    name: "VORTEX 360",
    type: "CAD MODELLING HACKATHON",
    date: "POWERED BY AUTODESK",
    desc: "Designers are inspired to let their creative juices flow. 'Design is not just what it looks like — design is how it works.'",
    status: "UPCOMING",
    img: "/vortex.png",
    details:
      "Bring your 3D CAD designs to life. Vortex 360 challenges participants to conceptualize, draft, and render complex mechanical systems under a tight deadline. Judged on creativity, structural integrity, and manufacturability, this is the ultimate proving ground for aspiring mechanical and industrial designers.",
  },
  {
    id: "MODULE_04",
    name: "HANDS ON ROBOTICS",
    type: "ANNUAL WORKSHOP",
    date: "RECURRING · OPEN TO ALL",
    desc: "Learn to design fully functional mobile Arduino robots including Line Followers and Obstacle Avoiders. No prior experience needed.",
    status: "OPEN",
    img: "/hands-on.png",
    details:
      "Get hands-on with real hardware. This comprehensive workshop takes you from absolute beginner to building your first autonomous robot. Learn the basics of embedded C/C++, sensor integration, motor drivers, and chassis assembly. By the end of the session, you'll walk away with your own working machine.",
  },
  {
    id: "MODULE_05",
    name: "CIRCUIT RUSH",
    type: "PCB DESIGN SPRINT",
    date: "48H · TEAMS OF 3",
    desc: "A fast-paced PCB design sprint. Schematic to silkscreen under the clock — only the cleanest routes survive review.",
    status: "UPCOMING",
    img: "/circuit-rush.png",
    details:
      "Circuit Rush pits teams against the clock to design a working PCB from a given spec sheet. Judged on routing efficiency, component placement, and manufacturability. Bring your own EDA tool of choice — KiCad, Eagle, or Altium all welcome. Top boards get fabricated and sent to the winning team.",
  },
];

const outreach: DeckItem[] = [
  {
    id: "FIELD_01",
    name: "SPARK VISIT",
    type: "SCHOOL OUTREACH",
    date: "GOVT. HIGH SCHOOL · VELLORE",
    desc: "Hands-on robotics demos for grade 8-10 students. First contact with circuits, motors, and the joy of things that move.",
    status: "COMPLETED",
    img: "/outreach-spark.png",
    details:
      "Our team spent a full day running mini build stations — simple line-following bots, LED circuits, and a Q&A on what engineering actually looks like day to day. Over 120 students got hands-on time with real hardware, many for the first time. Several have since reached out about robotics clubs at their own schools.",
  },
  {
    id: "FIELD_02",
    name: "CIRCUIT CARAVAN",
    type: "MOBILE WORKSHOP",
    date: "RURAL OUTREACH PROGRAM",
    desc: "We bring the lab to schools without one. A travelling kit of components, breadboards, and patient explanations.",
    status: "COMPLETED",
    img: "/outreach-caravan.png",
    details:
      "Circuit Caravan is our recurring initiative to reach schools without access to a robotics or electronics lab. We pack a portable kit — breadboards, sensors, Arduinos, and tools — and run a half-day session covering basic circuits and a simple build. The goal isn't just exposure, it's giving every student something they built with their own hands to take home.",
  },
  {
    id: "FIELD_03",
    name: "BUILD A BOT",
    type: "WEEKEND MENTORSHIP",
    date: "ONGOING · OPEN APPLICATIONS",
    desc: "A multi-week mentorship where school students design and build their own bot from scratch, guided by our seniors.",
    status: "OPEN",
    img: "/outreach-buildabot.png",
    details:
      "Build a Bot pairs small teams of school students with RoboVITics mentors over several weekends. Students go from a blank sheet to a working autonomous bot, learning CAD basics, simple embedded programming, and assembly along the way. It's our most hands-on outreach format and consistently produces a few future club members each cycle.",
  },
];

// ─────────────────────────────────────────────────────────────────────────
// LAYOUT
// ─────────────────────────────────────────────────────────────────────────

type Pos = { x: number; y: number; rot: number };

function getDeckPositions(count: number): Pos[] {
  const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
  const vh = typeof window !== "undefined" ? window.innerHeight : 900;
  const isMobile = vw < 768;

  if (count === 4) {
    const gx = vw * (isMobile ? 0.34 : 0.22);
    const gy = vh * (isMobile ? 0.16 : 0.22);
    return [
      { x: -gx, y: -gy, rot: 0 },
      { x: gx, y: -gy, rot: 0 },
      { x: -gx, y: gy, rot: 0 },
      { x: gx, y: gy, rot: 0 },
    ];
  }

  const spread = isMobile ? 0.86 : 0.74;
  const arcWidth = vw * spread;
  const radiusY = vh * (isMobile ? 0.1 : 0.13);
  const maxRot = count > 4 ? 6 : 4;
  const verticalStagger = vh * (isMobile ? 0.045 : 0.05);

  const positions: Pos[] = [];
  const mid = (count - 1) / 2;

  for (let i = 0; i < count; i++) {
    const offsetFromMid = i - mid;
    const t = mid === 0 ? 0 : offsetFromMid / mid;

    const x = offsetFromMid * (arcWidth / Math.max(count - 1, 1));
    const y = Math.abs(t) * radiusY;
    const stagger =
      count > 4
        ? i % 2 === 0
          ? -verticalStagger * 0.4
          : verticalStagger * 0.4
        : 0;
    const rot = t * maxRot;

    positions.push({ x, y: y + stagger, rot });
  }

  return positions;
}

// ─────────────────────────────────────────────────────────────────────────
// SHARED VISUAL BITS
// ─────────────────────────────────────────────────────────────────────────

function Screw() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <circle
        cx="5"
        cy="5"
        r="3.7"
        fill="#070809"
        stroke="rgba(235,238,242,0.34)"
        strokeWidth="0.8"
      />
      <circle cx="5" cy="5" r="1.5" fill="rgba(235,238,242,0.28)" />
      <line
        x1="2.7"
        y1="5"
        x2="7.3"
        y2="5"
        stroke="rgba(235,238,242,0.5)"
        strokeWidth="0.8"
        strokeLinecap="square"
      />
    </svg>
  );
}

const STATUS_LIT = ["OPEN", "REGISTRATIONS OPEN", "FLAGSHIP", "COMPLETED"];

type Mode = "events" | "outreach";

// ─────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────

export default function Events() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

  const eventCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const outreachCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [mode, setMode] = useState<Mode>("events");
  const modeRef = useRef<Mode>("events");
  const [introDone, setIntroDone] = useState(false);
  const introDoneRef = useRef(false);
  const isSwapping = useRef(false);

  const [selectedItem, setSelectedItem] = useState<DeckItem | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [slideDir, setSlideDir] = useState<"next" | "prev">("next");

  const carouselRef = useRef<HTMLDivElement>(null);
  const prevItemId = useRef<string | null>(null);
  const isSlideAnimating = useRef(false);

  const activeList = mode === "events" ? events : outreach;

  useEffect(() => {
    introDoneRef.current = introDone;
  }, [introDone]);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  // ── Modal close ──────────────────────────────────────────────────────────
  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedItem(null);
      setIsClosing(false);
      prevItemId.current = null;
    }, 300);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSlideAnimating.current || !selectedItem) return;
    setSlideDir("next");
    const idx = activeList.findIndex((ev) => ev.id === selectedItem.id);
    setSelectedItem(activeList[(idx + 1) % activeList.length]);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSlideAnimating.current || !selectedItem) return;
    setSlideDir("prev");
    const idx = activeList.findIndex((ev) => ev.id === selectedItem.id);
    setSelectedItem(activeList[(idx - 1 + activeList.length) % activeList.length]);
  };

  // ── Modal slide transition ───────────────────────────────────────────────
  useEffect(() => {
    if (!selectedItem || !carouselRef.current) return;

    const incomingId = selectedItem.id;
    const outgoingId = prevItemId.current;

    const slides = Array.from(
      carouselRef.current.querySelectorAll(".ev-slide-item")
    ) as HTMLElement[];
    const incomingNode = slides.find((el) => el.dataset.id === incomingId);
    const outgoingNode = slides.find((el) => el.dataset.id === outgoingId);

    if (!outgoingId || outgoingId === incomingId) {
      slides.forEach((slide) => {
        if (slide.dataset.id === incomingId) {
          gsap.set(slide, { x: "0%", autoAlpha: 1 });
        } else {
          gsap.set(slide, { autoAlpha: 0 });
        }
      });
      prevItemId.current = incomingId;
      return;
    }

    if (incomingNode && outgoingNode) {
      isSlideAnimating.current = true;
      const xInStart = slideDir === "next" ? "100%" : "-100%";
      const xOutEnd = slideDir === "next" ? "-100%" : "100%";

      gsap.set(incomingNode, { x: xInStart, autoAlpha: 1 });
      gsap.to(outgoingNode, {
        x: xOutEnd,
        duration: 0.6,
        ease: "power3.inOut",
        onComplete: () => gsap.set(outgoingNode, { autoAlpha: 0 }),
      });
      gsap.to(incomingNode, {
        x: "0%",
        duration: 0.6,
        ease: "power3.inOut",
        onComplete: () => {
          isSlideAnimating.current = false;
        },
      });
    }

    prevItemId.current = incomingId;
  }, [selectedItem, slideDir]);

  // ── Shadows ──────────────────────────────────────────────────────────────
  const baseShadow =
    "inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -1px 0 rgba(0,0,0,0.75), 0 0 0 1px rgba(0,0,0,0.75), 8px 10px 20px rgba(0,0,0,0.55)";
  const glowShadow = `${baseShadow}, 0 0 40px rgba(255,255,255,0.12), 0 0 90px rgba(255,255,255,0.07), 0 0 160px rgba(200,220,255,0.05)`;

  // ── Stack: collapse cards into resting pile ──────────────────────────────
  const stackCards = useCallback(
    (cards: HTMLDivElement[], opts?: { instant?: boolean }) => {
      cards.forEach((card, i) => {
        const depth = cards.length - 1 - i;
        const vars = {
          x: 0,
          y: depth * 12,
          rotateZ: 0,
          scale: 1 - depth * 0.04,
          rotateX: 0,
          zIndex: i + 1,
          opacity: 1,
          transformOrigin: "center bottom",
        };
        if (opts?.instant) gsap.set(card, vars);
        const styledBg = card.querySelector<HTMLElement>(".ev-styled-bg");
        const highlights = card.querySelector<HTMLElement>(".ev-highlights");
        const inner = card.querySelector<HTMLElement>(".ev-inner");
        if (opts?.instant) {
          if (styledBg)
            gsap.set(styledBg, { opacity: 0, boxShadow: baseShadow });
          if (highlights) gsap.set(highlights, { opacity: 0 });
          if (inner) gsap.set(inner, { opacity: 0 });
        }
      });
    },
    [baseShadow]
  );

  // ── Scroll-intro deploy (unchanged) ─────────────────────────────────────
  const deployCardsIntro = useCallback(
    (cards: HTMLDivElement[], onDone?: () => void) => {
      const positions = getDeckPositions(cards.length);
      const tl = gsap.timeline({ onComplete: onDone });
      const peelOrder = [...cards.keys()].reverse();

      peelOrder.forEach((cardIdx, peelStep) => {
        const card = cards[cardIdx];
        const pos = positions[cardIdx];
        const t = peelStep * 0.11;

        tl.to(
          card,
          { rotateX: 18, y: "-=60", duration: 0.16, ease: "power2.in" },
          t
        );
        tl.to(
          card,
          {
            x: pos.x,
            y: pos.y,
            rotateZ: pos.rot,
            rotateX: 0,
            scale: 1,
            duration: 0.32,
            ease: "power3.out",
          },
          t + 0.14
        );
        tl.to(
          card,
          { y: pos.y + 8, duration: 0.07, ease: "power1.out" },
          t + 0.4
        );
        tl.to(
          card,
          { y: pos.y, duration: 0.07, ease: "power1.in" },
          t + 0.47
        );

        const styledBg = card.querySelector<HTMLElement>(".ev-styled-bg");
        const highlights = card.querySelector<HTMLElement>(".ev-highlights");
        const inner = card.querySelector<HTMLElement>(".ev-inner");
        const flash = card.querySelector<HTMLElement>(".ev-flash");

        if (styledBg) {
          tl.to(
            styledBg,
            { opacity: 1, duration: 0.18, ease: "power2.inOut" },
            t + 0.1
          );
          tl.to(
            styledBg,
            { boxShadow: glowShadow, duration: 0.35, ease: "power2.out" },
            t + 0.4
          );
        }
        if (highlights)
          tl.to(highlights, { opacity: 1, duration: 0.18 }, t + 0.18);
        if (inner)
          tl.to(
            inner,
            { opacity: 1, duration: 0.16, ease: "power1.out" },
            t + 0.42
          );
        if (flash)
          tl.fromTo(
            flash,
            { opacity: 0.9 },
            { opacity: 0, duration: 0.18, ease: "power2.out" },
            t + 0.36
          );
      });

      return tl;
    },
    [glowShadow]
  );

  // ── Toggle retract: arc-slide cards OUT to one side ──────────────────────
  const retractCardsToggle = useCallback(
    (
      cards: HTMLDivElement[],
      direction: "left" | "right",
      onDone?: () => void
    ) => {
      const tl = gsap.timeline({ onComplete: onDone });
      const vw =
        typeof window !== "undefined" ? window.innerWidth : 1440;

      // Cards exit one at a time, staggered, with a slight arc rotation
      cards.forEach((card, i) => {
        const t = i * 0.045;
        const xOut = direction === "left" ? -vw * 0.9 : vw * 0.9;
        // Arc feel: rotate as if sweeping around a wheel pivot below the deck
        const rotOut = direction === "left" ? -22 : 22;

        tl.to(
          card,
          {
            x: xOut,
            rotateZ: rotOut,
            scale: 0.82,
            duration: 0.38,
            ease: "power3.in",
          },
          t
        );

        const styledBg = card.querySelector<HTMLElement>(".ev-styled-bg");
        const highlights = card.querySelector<HTMLElement>(".ev-highlights");
        const inner = card.querySelector<HTMLElement>(".ev-inner");
        const flash = card.querySelector<HTMLElement>(".ev-flash");

        if (flash)
          tl.fromTo(
            flash,
            { opacity: 0 },
            { opacity: 0.5, duration: 0.08, ease: "power1.in" },
            t
          );
        if (styledBg)
          tl.to(styledBg, { opacity: 0, duration: 0.2 }, t + 0.04);
        if (highlights)
          tl.to(highlights, { opacity: 0, duration: 0.14 }, t);
        if (inner) tl.to(inner, { opacity: 0, duration: 0.14 }, t);
        if (flash)
          tl.to(flash, { opacity: 0, duration: 0.1 }, t + 0.12);
      });

      return tl;
    },
    []
  );

  // ── Toggle deploy: arc-slide cards IN from the opposite side ─────────────
  const deployCardsToggle = useCallback(
    (
      cards: HTMLDivElement[],
      direction: "left" | "right",
      onDone?: () => void
    ) => {
      const positions = getDeckPositions(cards.length);
      const tl = gsap.timeline({ onComplete: onDone });
      const vw =
        typeof window !== "undefined" ? window.innerWidth : 1440;

      // Incoming side is opposite of outgoing direction
      const xStart = direction === "left" ? vw * 0.9 : -vw * 0.9;
      const rotStart = direction === "left" ? 22 : -22;

      // Stagger inward: cards arrive one after another, landing into arc positions
      cards.forEach((cardIdx, peelStep) => {
        // use forEach index as peelStep — reversed for nicer cascade
        void peelStep;
      });

      const peelOrder = [...cards.keys()].reverse();

      peelOrder.forEach((cardIdx, peelStep) => {
        const card = cards[cardIdx];
        const pos = positions[cardIdx];
        const t = peelStep * 0.06;

        // Pre-position off-screen before animating in
        gsap.set(card, {
          x: xStart,
          y: pos.y,
          rotateZ: rotStart,
          rotateX: 0,
          scale: 0.82,
          opacity: 1,
        });

        // Sweep into final arc position
        tl.to(
          card,
          {
            x: pos.x,
            y: pos.y,
            rotateZ: pos.rot,
            scale: 1,
            duration: 0.44,
            ease: "power3.out",
          },
          t
        );
        // Tiny settle bounce
        tl.to(
          card,
          { y: pos.y + 7, duration: 0.07, ease: "power1.out" },
          t + 0.4
        );
        tl.to(
          card,
          { y: pos.y, duration: 0.07, ease: "power1.in" },
          t + 0.47
        );

        const styledBg = card.querySelector<HTMLElement>(".ev-styled-bg");
        const highlights = card.querySelector<HTMLElement>(".ev-highlights");
        const inner = card.querySelector<HTMLElement>(".ev-inner");
        const flash = card.querySelector<HTMLElement>(".ev-flash");

        if (styledBg) {
          tl.to(
            styledBg,
            { opacity: 1, duration: 0.2, ease: "power2.inOut" },
            t + 0.08
          );
          tl.to(
            styledBg,
            { boxShadow: glowShadow, duration: 0.3, ease: "power2.out" },
            t + 0.3
          );
        }
        if (highlights)
          tl.to(highlights, { opacity: 1, duration: 0.18 }, t + 0.16);
        if (inner)
          tl.to(
            inner,
            { opacity: 1, duration: 0.16, ease: "power1.out" },
            t + 0.3
          );
        if (flash)
          tl.fromTo(
            flash,
            { opacity: 0.7 },
            { opacity: 0, duration: 0.16, ease: "power2.out" },
            t + 0.36
          );
      });

      return tl;
    },
    [glowShadow]
  );

  // ── Toggle handler ────────────────────────────────────────────────────────
  const handleToggle = useCallback(
    (nextMode: Mode) => {
      if (nextMode === mode || isSwapping.current || !introDone) return;
      isSwapping.current = true;

      // events → outreach sweeps LEFT; outreach → events sweeps RIGHT
      const direction: "left" | "right" =
        nextMode === "outreach" ? "left" : "right";

      const currentCards = (
        mode === "events" ? eventCardsRef.current : outreachCardsRef.current
      ).filter(Boolean) as HTMLDivElement[];

      // Toggle press feedback
      if (toggleRef.current) {
        gsap.fromTo(
          toggleRef.current,
          { scale: 1 },
          { scale: 0.97, duration: 0.08, yoyo: true, repeat: 1 }
        );
      }

      // Swap label text mid-transition
      if (labelRef.current) {
        gsap.to(labelRef.current, {
          opacity: 0,
          duration: 0.15,
          onComplete: () => {
            if (labelRef.current) {
              labelRef.current.textContent =
                nextMode === "events"
                  ? "SYSTEM.LOGS // EVENTS"
                  : "SYSTEM.LOGS // OUTREACH";
            }
            gsap.to(labelRef.current, { opacity: 1, duration: 0.25 });
          },
        });
      }

      retractCardsToggle(currentCards, direction, () => {
        setMode(nextMode);
        modeRef.current = nextMode;

        requestAnimationFrame(() => {
          const incomingCards = (
            nextMode === "events"
              ? eventCardsRef.current
              : outreachCardsRef.current
          ).filter(Boolean) as HTMLDivElement[];

          deployCardsToggle(incomingCards, direction, () => {
            isSwapping.current = false;
          });
        });
      });
    },
    [mode, introDone, retractCardsToggle, deployCardsToggle]
  );

  // ── Initial scroll-driven intro ───────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const title = titleRef.current;
    if (!section || !pin || !title) return;

    const cards = eventCardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    stackCards(cards, { instant: true });
    gsap.set(title, { zIndex: 10, opacity: 1, y: 0 });

    const positions = getDeckPositions(cards.length);
    const peelOrder = [...cards.keys()].reverse();

    const tl = gsap.timeline({ paused: true });
    tl.to(title, { opacity: 0, y: -28, duration: 0.08, ease: "power2.in" }, 0.1);

    peelOrder.forEach((cardIdx, peelStep) => {
      const card = cards[cardIdx];
      const pos = positions[cardIdx];
      const t = 0.18 + peelStep * (0.7 / cards.length);

      tl.to(
        card,
        { rotateX: 18, y: "-=60", duration: 0.07, ease: "power2.in" },
        t
      );
      tl.to(
        card,
        {
          x: pos.x,
          y: pos.y,
          rotateZ: pos.rot,
          rotateX: 0,
          scale: 1,
          duration: 0.13,
          ease: "power3.out",
        },
        t + 0.07
      );
      tl.to(
        card,
        { y: pos.y + 8, duration: 0.03, ease: "power1.out" },
        t + 0.18
      );
      tl.to(
        card,
        { y: pos.y, duration: 0.03, ease: "power1.in" },
        t + 0.21
      );

      const styledBg = card.querySelector<HTMLElement>(".ev-styled-bg");
      const highlights = card.querySelector<HTMLElement>(".ev-highlights");
      const inner = card.querySelector<HTMLElement>(".ev-inner");
      const flash = card.querySelector<HTMLElement>(".ev-flash");

      if (styledBg) {
        tl.to(
          styledBg,
          { opacity: 1, duration: 0.15, ease: "power2.inOut" },
          t + 0.05
        );
        tl.to(
          styledBg,
          { boxShadow: glowShadow, duration: 0.3, ease: "power2.out" },
          t + 0.22
        );
      }
      if (highlights)
        tl.to(highlights, { opacity: 1, duration: 0.15 }, t + 0.1);
      if (inner)
        tl.to(
          inner,
          { opacity: 1, duration: 0.08, ease: "power1.out" },
          t + 0.22
        );
      if (flash)
        tl.fromTo(
          flash,
          { opacity: 0.9 },
          { opacity: 0, duration: 0.12, ease: "power2.out" },
          t + 0.18
        );
    });

    if (toggleRef.current) {
      gsap.set(toggleRef.current, {
        opacity: 0,
        y: 14,
        pointerEvents: "none",
      });
      tl.to(
        toggleRef.current,
        { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.1, ease: "power2.out" },
        0.96
      );
    }

    stRef.current = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${typeof window !== "undefined" ? window.innerHeight * 4 : 3600}`,
      scrub: 1.2,
      pin: pin,
      anticipatePin: 1,
      animation: tl,
      onUpdate: (self) => {
        const progress = self.progress;

        if (progress >= 0.999 && !introDoneRef.current) {
          introDoneRef.current = true;
          setIntroDone(true);
        }

        if (progress < 0.85 && introDoneRef.current) {
          introDoneRef.current = false;
          setIntroDone(false);

          if (isSwapping.current) {
            gsap.killTweensOf([
              ...eventCardsRef.current,
              ...outreachCardsRef.current,
            ]);
            isSwapping.current = false;
          }

          const outreachCards = outreachCardsRef.current.filter(
            Boolean
          ) as HTMLDivElement[];
          const eventCards = eventCardsRef.current.filter(
            Boolean
          ) as HTMLDivElement[];

          if (modeRef.current === "outreach") {
            stackCards(outreachCards, { instant: true });
            stackCards(eventCards, { instant: true });
          }

          if (modeRef.current !== "events") {
            modeRef.current = "events";
            setMode("events");
          }

          if (toggleRef.current) {
            gsap.set(toggleRef.current, {
              opacity: 0,
              y: 14,
              pointerEvents: "none",
            });
          }
          if (labelRef.current) {
            labelRef.current.textContent = "SYSTEM.LOGS // EVENTS";
            gsap.set(labelRef.current, { opacity: 1 });
          }
        }
      },
      onRefresh: () => {
        if (!introDoneRef.current) return;
        const pos = getDeckPositions(cards.length);
        cards.forEach((card, i) => {
          gsap.set(card, { x: pos[i].x, y: pos[i].y, rotateZ: pos[i].rot });
        });
      },
    });

    return () => {
      stRef.current?.kill();
      stRef.current = null;
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Card renderer ─────────────────────────────────────────────────────────
  const renderCard = (item: DeckItem, i: number, isOutreach: boolean) => (
    <div
      key={item.id}
      ref={(el) => {
        if (isOutreach) outreachCardsRef.current[i] = el;
        else eventCardsRef.current[i] = el;
      }}
      className="absolute inset-0 select-none overflow-visible rounded-[4px] group cursor-pointer"
      style={{
        willChange: "transform, box-shadow",
        color: "#f1f3f5",
        perspective: "1000px",
      }}
      onClick={() => setSelectedItem(item)}
    >
      <div className="ev-hint-flipper relative w-full h-full [transform-style:preserve-3d]">
        <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          {/* Front Face */}
          <div
            className="absolute inset-0 [backface-visibility:hidden] rounded-[4px]"
            style={{
              background: "#0a0a0a",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "16px 20px 18px",
            }}
          >
            <div
              className="ev-styled-bg absolute rounded-[4px] pointer-events-none"
              style={{
                top: -1,
                right: -1,
                bottom: -1,
                left: -1,
                background: `linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(165deg, rgba(255,255,255,0.11), rgba(255,255,255,0.02) 38%, rgba(0,0,0,0.35)), rgba(28,30,34,0.95)`,
                backgroundSize: "18px 18px, 18px 18px, auto, auto",
                border: "1px solid rgba(235,238,242,0.28)",
              }}
            />
            <span className="absolute z-10" style={{ top: "5px", left: "6px" }}>
              <Screw />
            </span>
            <span
              className="absolute z-10"
              style={{ top: "5px", right: "6px" }}
            >
              <Screw />
            </span>
            <span
              className="absolute z-10"
              style={{ bottom: "5px", left: "6px" }}
            >
              <Screw />
            </span>
            <span
              className="absolute z-10"
              style={{ bottom: "5px", right: "6px" }}
            >
              <Screw />
            </span>

            <div className="ev-highlights absolute inset-0 pointer-events-none z-10">
              <span
                style={{
                  position: "absolute",
                  top: "-1px",
                  left: "18px",
                  width: "36px",
                  height: "1px",
                  background: "rgba(255,255,255,0.7)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  bottom: "-1px",
                  right: "18px",
                  width: "36px",
                  height: "1px",
                  background: "rgba(255,255,255,0.4)",
                }}
              />
            </div>
            <div
              className="ev-flash pointer-events-none absolute inset-0 opacity-0 rounded-[4px] z-20"
              style={{ border: "1px solid rgba(255,255,255,0.85)" }}
            />

            <div className="ev-inner relative z-30 flex h-full flex-col">
              <div className="mb-2 mt-[-2px] text-center">
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "8px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(235,238,242,0.34)",
                    textShadow: "0 0 10px rgba(180,205,255,0.14)",
                  }}
                >
                  {item.id}
                </span>
              </div>
              <h3
                className="text-center"
                style={{
                  margin: "0 0 4px",
                  fontFamily: '"Inter", "Arial Black", sans-serif',
                  fontWeight: "900",
                  fontSize: "20px",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "rgba(245,247,250,0.9)",
                  textShadow: "0 0 16px rgba(255,255,255,0.18)",
                  lineHeight: 1.1,
                }}
              >
                {item.name}
              </h3>
              <p
                className="text-center"
                style={{
                  margin: "0 0 10px",
                  fontFamily: "monospace",
                  fontSize: "9px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(168,176,188,0.62)",
                }}
              >
                {item.type}
              </p>
              <div
                style={{
                  height: "1px",
                  margin: "0 8px 12px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(235,238,242,0.42) 30%, rgba(235,238,242,0.42) 70%, transparent)",
                  boxShadow: "0 0 10px rgba(180,205,255,0.16)",
                }}
              />
              <p
                className="font-mono text-[10px] leading-[1.65]"
                style={{ color: "rgba(235,238,242,0.65)" }}
              >
                {item.desc}
              </p>
              <div
                className="mt-auto flex items-center justify-between"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                  paddingTop: 10,
                }}
              >
                <span className="font-mono text-[8.5px] tracking-[0.1em] text-white/30">
                  {item.date}
                </span>
                {STATUS_LIT.includes(item.status) ? (
                  <span
                    className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.08em] text-white/90"
                    style={{
                      border: "1px solid rgba(255,255,255,0.45)",
                      padding: "2px 7px",
                      borderRadius: "2px",
                    }}
                  >
                    <span className="ev-blink inline-block h-[4px] w-[4px] rounded-full bg-white" />
                    {item.status}
                  </span>
                ) : (
                  <span
                    className="font-mono text-[8px] uppercase tracking-[0.08em] text-white/30"
                    style={{
                      border: "1px solid rgba(255,255,255,0.11)",
                      padding: "2px 7px",
                      borderRadius: "2px",
                    }}
                  >
                    {item.status}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Back Face */}
          <div
            className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#0a0a0a] rounded-[4px] overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="relative w-full h-full flex flex-col">
              <img
                src={item.img}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <span className="font-mono text-white text-[10px] tracking-[0.2em] border border-white/40 px-5 py-2.5 backdrop-blur-sm rounded bg-black/30">
                  {isOutreach ? "VIEW GALLERY" : "VIEW EVENT"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <section ref={sectionRef} className="bg-[#0d0d0d]">
      <div
        ref={pinRef}
        className="relative flex h-screen w-full items-center justify-center overflow-hidden"
      >
        {/* Background grid */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.035) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        {(
          [[8, 9], [66, 14], [15, 58], [80, 47], [44, 78]] as [
            number,
            number
          ][]
        ).map(([lp, tp], i) => (
          <div
            key={i}
            className="pointer-events-none absolute rounded-full bg-white/25"
            style={{
              left: `${lp}%`,
              top: `${tp}%`,
              width: 5,
              height: 5,
              boxShadow: "0 0 6px rgba(255,255,255,0.15)",
            }}
          />
        ))}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="8%"
            y1="9%"
            x2="66%"
            y2="14%"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1"
          />
          <line
            x1="66%"
            y1="14%"
            x2="80%"
            y2="47%"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1"
          />
          <line
            x1="15%"
            y1="58%"
            x2="44%"
            y2="78%"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1"
          />
        </svg>

        {/* Section label */}
        <div
          className="absolute z-20 pointer-events-none"
          style={{ top: "10%", left: "6%" }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "11px",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.35)",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{ color: "#ffffff", fontWeight: 700, marginRight: "8px" }}
            >
              03.
            </span>
            <span ref={labelRef}>SYSTEM.LOGS // EVENTS</span>
          </span>
        </div>

        <div
          style={{
            perspective: "1100px",
            perspectiveOrigin: "50% 50%",
            position: "relative",
            width: "100vw",
            height: "100vh",
          }}
        >
          {/* Title */}
          <div
            ref={titleRef}
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center"
            style={{ zIndex: 10, top: "-6%" }}
          >
            <span
              style={{
                fontSize: "9px",
                letterSpacing: "0.35em",
                color: "rgba(255,255,255,0.2)",
                fontFamily: "monospace",
                marginBottom: "12px",
                display: "block",
                textTransform: "uppercase",
              }}
            >
              ▶ SECTOR_MAP // EVENTS
            </span>
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(32px,5.5vw,72px)",
                fontWeight: "900",
                color: "#ffffff",
                letterSpacing: "-0.01em",
                fontFamily: '"Inter", "Arial Black", sans-serif',
                textTransform: "uppercase",
                lineHeight: 1,
                textAlign: "center",
              }}
            >
              EVENTS AT{" "}
              <span style={{ color: "#4FAEF3", fontWeight: 900 }}>
                ROBOVITICS.
              </span>
            </h2>
            <div
              style={{
                marginTop: "14px",
                width: "30%",
                height: "1px",
                background:
                  "linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)",
              }}
            />
          </div>

          {/* EVENTS deck */}
          <div
            ref={deckRef}
            className="absolute"
            style={{
              width: 320,
              height: 230,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              visibility:
                mode === "events" ||
                (isSwapping.current && modeRef.current === "events")
                  ? "visible"
                  : "hidden",
              pointerEvents:
                mode === "events" && !isSwapping.current ? "auto" : "none",
            }}
          >
            {events.map((ev, i) => renderCard(ev, i, false))}
          </div>

          {/* OUTREACH deck */}
          <div
            className="absolute"
            style={{
              width: 320,
              height: 230,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              visibility:
                mode === "outreach" ||
                (isSwapping.current && modeRef.current === "outreach")
                  ? "visible"
                  : "hidden",
              pointerEvents:
                mode === "outreach" && !isSwapping.current ? "auto" : "none",
            }}
          >
            {outreach.map((ov, i) => renderCard(ov, i, true))}
          </div>

          {/* Toggle */}
          <div
            ref={toggleRef}
            className="absolute left-1/2 z-40 flex -translate-x-1/2 items-center gap-0 overflow-hidden rounded-[3px]"
            style={{
              bottom: "9%",
              border: "1px solid rgba(235,238,242,0.28)",
              background: "rgba(10,10,11,0.85)",
              backdropFilter: "blur(6px)",
              boxShadow: baseShadow,
            }}
          >
            <button
              type="button"
              onClick={() => handleToggle("events")}
              className="relative font-mono uppercase transition-colors duration-200"
              style={{
                fontSize: "10px",
                letterSpacing: "0.16em",
                padding: "9px 18px",
                color: mode === "events" ? "#0a0a0a" : "rgba(235,238,242,0.45)",
                background: mode === "events" ? "#4FAEF3" : "transparent",
                fontWeight: 700,
              }}
            >
              EVENTS
            </button>
            <span
              style={{
                width: 1,
                alignSelf: "stretch",
                background: "rgba(235,238,242,0.16)",
              }}
            />
            <button
              type="button"
              onClick={() => handleToggle("outreach")}
              className="relative font-mono uppercase transition-colors duration-200"
              style={{
                fontSize: "10px",
                letterSpacing: "0.16em",
                padding: "9px 18px",
                color:
                  mode === "outreach" ? "#0a0a0a" : "rgba(235,238,242,0.45)",
                background: mode === "outreach" ? "#4FAEF3" : "transparent",
                fontWeight: 700,
              }}
            >
              OUTREACH
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-xl p-4 md:p-8"
          style={{
            animation: isClosing
              ? "ev-fade-out 0.3s ease-in forwards"
              : "ev-fade-in 0.3s ease-out forwards",
          }}
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-2xl h-[85vh] max-h-[600px] md:mx-16"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: isClosing
                ? "ev-modal-exit 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards"
                : "ev-modal-entry 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          >
            <button
              className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 z-[10010] flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-black/60 text-white/70 hover:bg-black/90 hover:text-white hover:scale-110 active:scale-90 transition-all duration-200 ease-out border border-white/20 backdrop-blur-md shadow-lg"
              onClick={handlePrev}
            >
              <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 z-[10010] flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-black/60 text-white/70 hover:bg-black/90 hover:text-white hover:scale-110 active:scale-90 transition-all duration-200 ease-out border border-white/20 backdrop-blur-md shadow-lg"
              onClick={handleNext}
            >
              <svg
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <div className="absolute inset-0 bg-[#0a0a0a] border border-white/20 rounded-xl shadow-2xl shadow-[#4FAEF3]/10 overflow-hidden">
              <button
                className="absolute top-4 right-4 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white/70 hover:bg-black/80 hover:text-white active:scale-90 transition-all duration-200 ease-out border border-white/10 backdrop-blur-md"
                onClick={handleCloseModal}
              >
                ✕
              </button>

              <div className="relative w-full h-full" ref={carouselRef}>
                {activeList.map((item) => (
                  <div
                    key={item.id}
                    data-id={item.id}
                    className="ev-slide-item absolute inset-0 w-full h-full flex flex-col invisible"
                  >
                    <div className="relative h-[40%] md:h-[45%] w-full flex-shrink-0 bg-neutral-900 border-b border-white/10 overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                    </div>

                    <div className="p-6 md:p-8 relative z-10 flex-grow flex flex-col">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-[10px] tracking-[0.2em] text-[#4FAEF3] uppercase border border-[#4FAEF3]/30 px-2 py-1 rounded bg-[#4FAEF3]/5">
                          {item.id}
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.1em] text-white/40 uppercase">
                          {item.status}
                        </span>
                      </div>

                      <h2
                        className="text-3xl md:text-4xl font-black text-white tracking-wide mb-1"
                        style={{
                          fontFamily: '"Inter", "Arial Black", sans-serif',
                        }}
                      >
                        {item.name}
                      </h2>

                      <h3 className="font-mono text-xs md:text-sm tracking-widest text-white/50 mb-4 uppercase">
                        {item.type} // {item.date}
                      </h3>

                      <div className="w-full h-[1px] bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-5" />

                      <div className="space-y-3 md:space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                        <p className="font-mono text-xs md:text-sm text-white/80 leading-relaxed">
                          {item.desc}
                        </p>
                        <p className="font-mono text-[10px] md:text-xs text-white/50 leading-relaxed">
                          {item.details}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .ev-blink { animation: ev-blink-kf 1.1s step-start infinite; }
        @keyframes ev-blink-kf { 0%,100%{opacity:1} 50%{opacity:0} }

        @keyframes ev-fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes ev-fade-out { 0% { opacity: 1; } 100% { opacity: 0; } }

        @keyframes ev-modal-entry {
          0% { opacity: 0; transform: scale(0.95) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes ev-modal-exit {
          0% { opacity: 1; transform: scale(1) translateY(0); }
          100% { opacity: 0; transform: scale(0.95) translateY(20px); }
        }

        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>
    </section>
  );
}