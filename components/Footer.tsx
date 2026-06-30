"use client";

import { motion } from "framer-motion";
import { ArrowUp, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

// Custom icons to replace missing lucide-react exports
const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Custom Medium icon to match Lucide style
const MediumIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <ellipse cx="6" cy="12" rx="5" ry="5" />
    <ellipse cx="15" cy="12" rx="2.5" ry="5" />
    <ellipse cx="20" cy="12" rx="1" ry="5" />
  </svg>
);

const socialLinks = [
  { icon: XIcon, href: "https://x.com/RoboVITics_HQ", name: "X" },
  { icon: InstagramIcon, href: "https://www.instagram.com/robovitics/", name: "Instagram" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/company/robovitics/", name: "LinkedIn" },
  { icon: GithubIcon, href: "https://github.com/RoboVITics", name: "GitHub" },
  { icon: MediumIcon, href: "#", name: "Medium" },
];

const ACCENT = "#4FAEF3";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const CornerAccents = () => (
  <>
    <span className="pointer-events-none absolute -left-[1px] -top-[1px] h-3 w-3 border-l border-t border-[#4FAEF3] shadow-[0_0_14px_rgba(79,174,243,0.85)] group-hover:shadow-[0_0_20px_rgba(79,174,243,1)] group-hover:brightness-125 transition-all duration-300" />
    <span className="pointer-events-none absolute -right-[1px] -top-[1px] h-3 w-3 border-r border-t border-[#4FAEF3] shadow-[0_0_14px_rgba(79,174,243,0.85)] group-hover:shadow-[0_0_20px_rgba(79,174,243,1)] group-hover:brightness-125 transition-all duration-300" />
    <span className="pointer-events-none absolute -bottom-[1px] -left-[1px] h-3 w-3 border-b border-l border-[#4FAEF3] shadow-[0_0_14px_rgba(79,174,243,0.85)] group-hover:shadow-[0_0_20px_rgba(79,174,243,1)] group-hover:brightness-125 transition-all duration-300" />
    <span className="pointer-events-none absolute -bottom-[1px] -right-[1px] h-3 w-3 border-b border-r border-[#4FAEF3] shadow-[0_0_14px_rgba(79,174,243,0.85)] group-hover:shadow-[0_0_20px_rgba(79,174,243,1)] group-hover:brightness-125 transition-all duration-300" />
  </>
);

export default function Footer() {
  const scrollToTop = () => {
    const hero = document.getElementById("hero") ?? document.body;
    hero.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer id="footer" className="relative bg-background pt-16 md:pt-20 overflow-hidden border-t border-white/5 flex flex-col">

      <div className="container mx-auto px-6 relative z-10 max-w-7xl pb-4">
        {/* Top Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-12">
          
          {/* Left Column (Typography + Location) */}
          <div className="flex flex-col h-full justify-start mt-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] xl:text-[3.5rem] font-heading font-bold text-white mb-4 tracking-tighter leading-tight whitespace-nowrap">
                Innovate. Build. Inspire
              </h2>
              <p className="text-muted text-lg sm:text-xl font-light leading-relaxed">
                The official Robotics Club of VIT
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex items-center gap-2"
            >
              <MapPin className="w-5 h-5 text-[#4FAEF3]" />
              <p className="text-white text-lg font-medium tracking-wide">
                VIT Vellore, <span className="text-muted font-light">Tamil Nadu, India</span>
              </p>
            </motion.div>
          </div>

          {/* Right Column - Redesigned */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
            className="flex flex-col gap-8"
          >
            {/* Row 1 - Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.a
                href="mailto:robovitics@vit.ac.in"
                variants={fadeUp}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group p-6 border border-white/10 bg-white/[0.02] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_0_20px_rgba(79,174,243,0.15)] relative"
              >
                <CornerAccents />
                <div className="absolute inset-0 bg-gradient-to-br from-[#4FAEF3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex flex-col">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-5 h-5 text-muted group-hover:text-[#4FAEF3] transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(79,174,243,0.8)]" />
                    <p className="text-muted text-xs font-semibold uppercase tracking-widest m-0">
                      Email
                    </p>
                  </div>
                  <p className="text-white text-sm sm:text-base font-light break-all">
                    robovitics@vit.ac.in
                  </p>
                </div>
              </motion.a>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group p-6 border border-white/10 bg-white/[0.02] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_0_20px_rgba(79,174,243,0.15)] relative"
              >
                <CornerAccents />
                <div className="absolute inset-0 bg-gradient-to-br from-[#4FAEF3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex flex-col">
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="w-5 h-5 text-muted group-hover:text-[#4FAEF3] transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(79,174,243,0.8)]" />
                    <p className="text-muted text-xs font-semibold uppercase tracking-widest m-0">
                      Phone
                    </p>
                  </div>
                  <p className="text-white text-sm sm:text-base font-light">
                    +91 XXXXX XXXXX
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Row 2 - Social Section */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="border-t border-white/10 pt-6"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <p className="text-muted text-xs font-semibold uppercase tracking-widest">
                  Connect
                </p>
                <div className="flex justify-center items-center gap-4 sm:gap-6 flex-wrap">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/[0.02] text-muted hover:text-white transition-all duration-300 hover:border-[#4FAEF380] hover:shadow-[0_0_20px_-5px_rgba(79,174,243,0.4)]"
                      aria-label={social.name}
                    >
                      <span
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#4FAEF3]/10"
                      />
                      <social.icon className="w-5 h-5 relative z-10 group-hover:text-[#4FAEF3] transition-colors duration-300" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Row 3 - Footer Utility */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-white/10"
            >
              <p className="text-muted text-xs font-light tracking-widest uppercase order-2 sm:order-1 mt-6 sm:mt-0">
                Est. 2010
              </p>

              <motion.button
                onClick={scrollToTop}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="group flex items-center gap-4 px-6 py-4 border border-white/10 bg-white/[0.02] transition-all duration-300 hover:shadow-[0_0_20px_rgba(79,174,243,0.15)] order-1 sm:order-2 relative"
              >
                <CornerAccents />
                <div className="absolute inset-0 bg-gradient-to-br from-[#4FAEF3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-white text-xs font-semibold tracking-widest uppercase relative z-10">
                  Back to Top
                </span>
                <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white/20 group-hover:border-[#4FAEF3] bg-white/5 transition-all duration-300 relative z-10 group-hover:shadow-[0_0_14px_rgba(79,174,243,0.4)]">
                  <ArrowUp className="w-4 h-4 text-white group-hover:text-[#4FAEF3] group-hover:-translate-y-1 group-hover:drop-shadow-[0_0_8px_rgba(79,174,243,0.8)] transition-all duration-300" />
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Branding (Logo + Copyright) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-full flex flex-col items-center justify-end pointer-events-none mt-auto"
      >
        <div className="w-full max-w-7xl px-4 md:px-8 flex flex-col">
          {/* Large Logo */}
          <img
            src="/robovitics-logo.png"
            alt="RoboVITics"
            className="w-full h-auto object-bottom block"
          />

          {/* Copyright */}
          <div className="w-full text-left mt-2 mb-6 md:mb-8">
            <p className="text-muted text-xs font-light tracking-wide uppercase">
              © 2026 RoboVITics, VIT Vellore.
            </p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}