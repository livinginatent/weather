"use client";
import React, { useCallback } from "react";
import { usePathname } from "next/navigation";

const CONTACT_EMAIL = "suleyman.eminbeyli@gmail.com";

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | { [key: string]: unknown },
      config?: {
        event_category?: string;
        event_label?: string;
        value?: number;
        [key: string]: unknown;
      }
    ) => void;
  }
}

const Banner = () => {
  const pathname = usePathname();

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

  const handleEmailClick = () => {
    sendGAEvent("banner_email_click", "site_for_sale", CONTACT_EMAIL);
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-slate-900/95 px-3 py-1.5 text-center text-[11px] leading-tight text-white shadow-[0_-2px_12px_rgba(0,0,0,0.12)] backdrop-blur-sm sm:text-xs"
      role="status"
    >
      <span className="whitespace-nowrap sm:mr-1.5">Sayt satılır</span>
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        onClick={handleEmailClick}
        className="text-sky-300 underline decoration-sky-300/50 underline-offset-2 transition-colors hover:text-sky-200 hover:decoration-sky-200"
      >
        {CONTACT_EMAIL}
      </a>
    </div>
  );
};

export default Banner;
