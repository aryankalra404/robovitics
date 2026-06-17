'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  const fullSubtitleText = "The Official Robotics Club of VIT Vellore";
  const [typedSubtitle, setTypedSubtitle] = useState("");

  useEffect(() => {
    let subtitleIndex = 0;
    
    // Removed the 1000ms setTimeout wrapper; typing starts immediately
    const typingInterval = setInterval(() => {
      setTypedSubtitle(fullSubtitleText.substring(0, subtitleIndex + 1));
      subtitleIndex++;
      if (subtitleIndex === fullSubtitleText.length) {
        clearInterval(typingInterval);
      }
    }, 40);
    
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-24 w-full max-w-[1600px] mx-auto gap-8 lg:gap-12 pb-12 lg:pb-0">
      
      {/* LEFT SIDE: Logo & Text Container */}
      <div className="relative z-20 w-full lg:w-[60%] flex flex-col justify-center pointer-events-auto pt-20 lg:pt-0">
        
        {/* Instantly Visible Logo */}
        <div className="mb-6 lg:mb-8 w-full max-w-[80vw] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[750px]">
          <h1 className="sr-only">ROBOVITICS</h1> 
          <Image 
            src="/robovitics-logo.png" 
            alt="roboVITics Logo" 
            width={800} 
            height={200} 
            className="w-full h-auto object-contain"
            priority
          />
        </div>
        
        {/* Animated Subtitle Container */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }} 
          className="text-base md:text-xl lg:text-xl xl:text-2xl text-gray-300 font-mono flex items-center h-10 whitespace-nowrap"
        >
          <span className="text-gray-300 font-bold mr-3">{'>'}</span>
          <span>{typedSubtitle}</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            className="inline-block flex-shrink-0 w-3 md:w-4 h-5 md:h-7 bg-gray-300 ml-2 translate-y-[1px] md:translate-y-0.5 shadow-[0_0_8px_#D1D5DB]"
          />
        </motion.div>
      </div>

      {/* RIGHT SIDE: Massive Bot Image */}
      <div className="relative z-20 w-full lg:w-[40%] h-[45vh] md:h-[60vh] lg:h-[80vh] max-h-[950px] mt-8 lg:mt-0 pointer-events-none flex justify-end">
        {/* Instantly Visible Bot */}
        <div className="relative w-full h-full scale-110 lg:scale-[1.3] xl:scale-[1.45] translate-x-[10%] origin-center">
          <Image 
            src="/bot.png" 
            alt="roboVITics Bot Mascot" 
            fill
            className="object-contain object-center lg:object-right drop-shadow-[0_0_30px_rgba(209,213,219,0.15)] opacity-80"
            priority
          />
        </div>
      </div>
    </div>
  );
}