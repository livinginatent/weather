"use client";
import React, { useState, useEffect, useCallback } from "react";
import { X, Instagram } from "lucide-react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | { [key: string]: any },
      config?: {
        event_category?: string;
        event_label?: string;
        value?: number;
        [key: string]: any;
      }
    ) => void;
  }
}

const Banner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  // Instagram URL for the dentist friend - Replace with actual Instagram handle
  const instagramUrl = "https://www.instagram.com/normsement/";

  // Helper function to send GA events
  const sendGAEvent = useCallback(
    (eventName: string, eventCategory: string, eventLabel: string) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", eventName, {
          event_category: eventCategory,
          event_label: eventLabel,
          page_path: pathname,
        });
      }
    },
    [pathname]
  );

  // Track banner view when component mounts or pathname changes
  useEffect(() => {
    if (isVisible) {
      // Small delay to ensure GA is loaded
      const timer = setTimeout(() => {
        sendGAEvent("banner_view", "ad_banner", "dentist_instagram");
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible, pathname, sendGAEvent]);

  const handleClose = () => {
    sendGAEvent("banner_close", "ad_banner", "dentist_instagram");
    setIsVisible(false);
  };

  const handleClick = () => {
    sendGAEvent("banner_click", "ad_banner", "dentist_instagram");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-2xl z-50 border-t-2 border-white/30">
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-4 max-w-7xl">
        {/* Ad Content */}
           {/* <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 hover:opacity-90 transition-opacity cursor-pointer group"
        > */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 overflow-hidden">
          <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
            <span className="font-bold text-xs sm:text-sm md:text-base lg:text-lg leading-tight  sm:line-clamp-none">
              Reklam üçün əlaqə saxlayın: 0558801868
              <br />
            </span>
            <span className="text-[10px] sm:text-xs md:text-sm opacity-90 hidden sm:block line-clamp-1"></span>
          </div>
        </div>
        {/*   </a> */}

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 active:bg-white/30 touch-manipulation"
          aria-label="Close banner"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};

export default Banner;
