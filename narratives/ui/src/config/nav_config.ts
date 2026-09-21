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
    href: "http://localhost:8080/explore?enable_feature=enable_stat_var_autocomplete&intro=true#q=jobs%20in%20texas",
  },
];

/**
 * Derives a route id from a nav href, e.g. `#/metrics` → `metrics`. Used to
 * match a branding-supplied entry against the active hash route, since
 * branding.json carries only `label` and `href`.
 */
function deriveNavId(href: string): string {
  const hashIndex = href.indexOf("#");
  const path = hashIndex >= 0 ? href.slice(hashIndex + 1) : href;
  return path.replace(/^\/+/, "").split("/")[0] ?? "";
}

/**
 * Resolves the header tabs to render, preferring the instance's branding.json
 * `navigation` entries over the shipped defaults.
 *
 * An explicit empty array removes the header menu entirely — a public Data
 * Commons instance ships without one — so this tests for presence rather than
 * length. An absent key still falls back to {@link NAV_CONFIG}, which keeps the
 * four tabs this deployment ships with.
 */
export function resolveNavItems(
  brandingNavigation?: Array<{ label: string; href: string }>,
): NavItem[] {
  if (brandingNavigation === undefined) {
    return NAV_CONFIG;
  }
  return brandingNavigation.map((item) => ({
    id: deriveNavId(item.href),
    label: item.label,
    href: item.href,
  }));
}
