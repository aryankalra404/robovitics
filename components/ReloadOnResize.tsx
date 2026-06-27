'use client';

import { useEffect } from 'react';

export default function ReloadOnResize() {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    // Store the initial width
    let currentWidth = window.innerWidth;

    const handleResize = () => {
      // 1. Ignore vertical resizes on mobile caused by the address bar hiding/showing
      if (window.innerWidth === currentWidth) {
        return; 
      }
      currentWidth = window.innerWidth; // Update width for next time

      // 2. Check if the device has a fine pointer (mouse/trackpad -> desktop)
      // If it's a touch device, this will be false.
      const isDesktop = window.matchMedia("(pointer: fine)").matches;
      
      if (!isDesktop) {
        return; 
      }

      clearTimeout(timer);
      timer = setTimeout(() => window.location.reload(), 300);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return null;
}