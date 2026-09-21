/**
 * @fileoverview Full-page fade transition, both directions:
 *  - OUT: fades to blank before navigating away (e.g. the "Classic Search
 *    Demo" nav tab), so leaving doesn't snap-cut.
 *  - IN: if this page was itself opened with `?intro=true`, starts blank
 *    and fades the content in on mount — the receiving-side counterpart.
 *
 * A static page can't read the body of the POST that loaded it (the
 * browser doesn't expose that to client JS on a full navigation). To
 * trigger the fade-IN from a POST, the destination's server must do a
 * POST → redirect → GET (PRG): read `intro` off the request body, then
 * 302 to `/?intro=true` so this can pick it up from the query string.
 */

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

/** Fade duration in ms — kept in sync with the inline `transitionDuration` below. */
const FADE_MS = 300;

interface PageTransitionContextValue {
  /** Fades the page to blank, then submits `form` (same-tab navigation). */
  fadeOutAndSubmit: (form: HTMLFormElement) => void;
  /**
   * Anchor `onClick`: for a plain left-click on a cross-origin link, fades to
   * blank then navigates (same-tab). Everything else (hash routes, modified
   * clicks, `target=_blank`) is left to the browser.
   */
  fadeOnClick: (e: MouseEvent<HTMLAnchorElement>) => void;
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);

/** Wraps the app; renders the fade overlay and exposes `usePageTransition`. */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const introRequested = useRef(
    typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("intro") === "true"
  ).current;

  // Start opaque (blank) when `?intro=true` so there's something to fade
  // IN from; otherwise start transparent, as before.
  const [fading, setFading] = useState(introRequested);
  // Runs once the fade-out finishes.
  const pendingNav = useRef<(() => void) | null>(null);

  const fadeOutThen = (nav: () => void) => {
    pendingNav.current = nav;
    setFading(true);
  };

  const fadeOutAndSubmit = (form: HTMLFormElement) => fadeOutThen(() => form.submit());

  const fadeOnClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const a = e.currentTarget;
    if (
      e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey ||
      (a.target && a.target !== "_self") ||
      a.origin === window.location.origin
    ) {
      return;
    }
    e.preventDefault();
    fadeOutThen(() => {
      window.location.href = a.href;
    });
  };

  // Reveal the page a frame after mount so the initial opaque state above
  // actually paints before the opacity transition kicks in.
  useEffect(() => {
    if (!introRequested) return;
    const id = requestAnimationFrame(() => setFading(false));
    return () => cancelAnimationFrame(id);
  }, [introRequested]);

  return (
    <PageTransitionContext.Provider value={{ fadeOutAndSubmit, fadeOnClick }}>
      {children}
      <div
        aria-hidden="true"
        onTransitionEnd={() => pendingNav.current?.()}
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
