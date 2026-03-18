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
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  // Instagram URL for the dentist friend - Replace with actual Instagram handle
  const instagramUrl = "https://www.instagram.com/normsement/";

  const STORAGE_KEY_LAST_SHOWN = "ad_banner_last_shown_at_v1";
  const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;

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

  // Decide whether banner should be shown (once per 2 weeks per browser/user)
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY_LAST_SHOWN);
      const lastShownAt = raw ? Number(raw) : 0;
      const isExpired =
        !Number.isFinite(lastShownAt) || Date.now() - lastShownAt >= TWO_WEEKS_MS;

      if (isExpired) {
        window.localStorage.setItem(STORAGE_KEY_LAST_SHOWN, String(Date.now()));
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    } catch {
      // If storage is blocked/unavailable, fall back to showing the banner.
      setIsVisible(true);
    }
  }, []);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
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
          className="mt-3 w-full flex items-center justify-center gap-2 rounded-lg bg-blue-500 hover:bg-green-600 text-white text-sm sm:text-base font-semibold py-2 shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-300 md:hidden"
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
