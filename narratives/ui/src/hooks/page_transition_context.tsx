/**
 * @fileoverview Full-page fade-to-blank transition used before navigating
 * away to an external URL (e.g. the POST-based "Intro" nav tab), so leaving
 * the app doesn't snap-cut into the next site's blank load.
 */

import { createContext, useContext, useRef, useState, type ReactNode } from "react";

/** Fade duration in ms — kept in sync with the inline `transitionDuration` below. */
const FADE_MS = 300;

interface PageTransitionContextValue {
  /** Fades the page to blank, then submits `form` (same-tab navigation). */
  fadeOutAndSubmit: (form: HTMLFormElement) => void;
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);

/** Wraps the app; renders the fade overlay and exposes `usePageTransition`. */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const [fading, setFading] = useState(false);
  const pendingForm = useRef<HTMLFormElement | null>(null);

  const fadeOutAndSubmit = (form: HTMLFormElement) => {
    pendingForm.current = form;
    setFading(true);
  };

  return (
    <PageTransitionContext.Provider value={{ fadeOutAndSubmit }}>
      {children}
      <div
        aria-hidden="true"
        onTransitionEnd={() => pendingForm.current?.submit()}
        className="fixed inset-0 bg-surface transition-opacity"
        style={{
          opacity: fading ? 1 : 0,
          transitionDuration: `${FADE_MS}ms`,
          pointerEvents: fading ? "auto" : "none",
          zIndex: 9999,
        }}
      />
    </PageTransitionContext.Provider>
  );
}

/** Access the page-fade transition trigger. Must be used within `PageTransitionProvider`. */
export function usePageTransition(): PageTransitionContextValue {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error("usePageTransition must be used within PageTransitionProvider");
  }
  return ctx;
}
