"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X } from "lucide-react";
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

  const handleCall = () => {
    sendGAEvent("banner_click", "ad_banner", "dentist_instagram");
    if (typeof window !== "undefined") {
      window.location.href = "tel:+994506344949";
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 sm:hidden">
      <div className="relative w-[90%] max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        {/* Ad Image only */}
        <div className="relative w-full overflow-hidden rounded-xl bg-white shadow-2xl">
          <Image
            src="/Dr Radioloq Rafail Cömərdov.png"
            alt="Dr Radioloq Rafail Cömərdov"
            width={1200}
            height={800}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        {/* Call to action section */}
        <button
          onClick={handleCall}
          className="mt-3 w-full flex items-center justify-center gap-2 rounded-lg bg-blue-500 hover:bg-green-600 text-white text-sm sm:text-base font-semibold py-2 shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          <span>İndi zəng et</span>
        </button>

        {/* Small close button in the top-right corner */}
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 flex items-center gap-1 rounded-sm bg-white text-black px-2 py-1 text-[11px] sm:text-xs shadow-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white/60"
          aria-label="Bağla"
        >
          <span>Bağla</span>
          <X className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
};

export default Banner;
