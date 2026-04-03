"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useState } from "react";

interface GoogleAnalyticsComponentProps {
  measurementId: string;
}

export default function GoogleAnalyticsComponent({
  measurementId,
}: GoogleAnalyticsComponentProps) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Defer GA loading until after page load or user interaction
    const loadGA = () => {
      setShouldLoad(true);
    };

    // Load on page load (after LCP)
    if (document.readyState === "complete") {
      // Page already loaded, wait a bit for LCP
      const timer = setTimeout(loadGA, 2000);
      return () => clearTimeout(timer);
    } else {
      // Wait for page load
      window.addEventListener("load", () => {
        setTimeout(loadGA, 2000);
      });
    }

    // Also load on user interaction (scroll, click, touch)
    const handleInteraction = () => {
      loadGA();
      // Remove listeners after first interaction
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };

    window.addEventListener("scroll", handleInteraction, { passive: true });
    window.addEventListener("click", handleInteraction, { passive: true });
    window.addEventListener("touchstart", handleInteraction, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  if (!measurementId || !shouldLoad) {
    return null;
  }

  return <GoogleAnalytics gaId={measurementId} />;
}
