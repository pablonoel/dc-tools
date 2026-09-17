/**
 * @fileoverview Defines the static navigation configuration for the header tabs.
 */

/** A single primary-navigation entry rendered as a header tab. */
export interface NavItem {
  /** Route id — matches the hash route in app.tsx (`agent` is the default view). */
  id: string;
  /** Human-readable tab label shown in the header. */
  label: string;
  /** Hash href the tab links to, e.g. `#/metrics`. Unused when `postTo` is set. */
  href: string;
  /**
   * External URL to POST to instead of navigating via `href`. Renders the tab
   * as a form submit (new tab) so the target can read `postData` from the
   * request body — a plain `<a href>` can only send a GET.
   */
  postTo?: string;
  /** Form fields sent in the POST body when `postTo` is set. */
  postData?: Record<string, string>;
}

/**
 * Primary navigation tabs, in Figma display order. Nav matches Figma node
 * 3427:16789 (`AppbarDataAgent`) of file kQtUhlVo9eCBoeqvdfAwpz — all four
 * tabs in Figma order: Data Agent → Key metrics dashboard → Data Download
 * Tool → Statistical Variable Explorer.
 */
export const NAV_CONFIG: NavItem[] = [
  { id: "agent", label: "Data Agent", href: "#/agent" },
  { id: "metrics", label: "Key Metrics Dashboard", href: "#/metrics" },
  { id: "download", label: "Data Download Tool", href: "#/download" },
  { id: "statvar", label: "Statistical Variable Explorer", href: "#/statvar" },
  {
    id: "intro",
    label: "Classic Search Demo",
    href: "",
    postTo: "http://localhost:8080/",
    postData: { intro: "true" },
  },
];
