/**
 * Decorative background system.
 *
 * A premium-fintech backdrop built entirely from CSS gradients plus one small
 * inline SVG curve — no image assets, no canvas, no animation loops.
 *
 * Every red tone derives from the theme's `--primary` token, so re-theming the
 * site automatically re-themes the background.
 *
 * Layering (back to front):
 *   1. warm off-white canvas          .decor-canvas
 *   2. centre highlight for depth     .decor-veil
 *   3. faded halftone dot field       .decor-halftone
 *   4. brand bars + curve           <HeaderBackdrop /> / <FooterBackdrop />
 *                                     / <FooterCurve />
 *
 * All layers are inert: aria-hidden and pointer-events-none.
 *
 * Nothing here is hero-specific. The hero draws on the global layers only;
 * its illustration is content, not background, and lives in HeroGlobe.tsx.
 */

/**
 * Viewport-fixed ambient layer. Mounted once, at the top of the page tree, so
 * it sits behind every section. Fixed rather than absolute: the dot field then
 * needs no page-height measurement and never desyncs as content grows.
 */
export const GlobalBackground = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
  >
    <div className="absolute inset-0 decor-canvas" />
    {/* Veil sits *under* the dot field — above it, it washes the dots out */}
    <div className="absolute inset-0 decor-veil" />
    <div className="absolute inset-0 decor-halftone" />
  </div>
);

/**
 * Curved transition into the solid-red footer, so the light canvas meets the
 * red block on a soft diagonal rather than a hard horizontal line.
 * Sits in the footer's own stacking context, directly above its top edge.
 */
/**
 * Depth for the header's solid red bar — the footer's material, recomposed for
 * a wide, short surface. Same darken-only rule: the nav links are white on
 * --primary, so a layer that lights the bar costs contrast.
 *
 * The header is `fixed`, which is already a positioning context, so this needs
 * no `relative` on the header itself — but the header's own rows carry
 * `relative z-10` to stay above it.
 */
export const HeaderBackdrop = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 overflow-hidden"
  >
    <div className="absolute inset-0 decor-header-depth" />
    <div className="absolute inset-0 decor-header-dots" />
  </div>
);

/**
 * Depth for the footer's solid red block: a deepening sweep into the lower
 * corners, an edge vignette, and the same halftone the hero uses, so the
 * footer belongs to the page's composition rather than reading as a flat
 * colour band.
 *
 * Every layer here *darkens*. The footer's text is white on --primary, which
 * measures only 4.8:1, so a layer that lights the ground costs contrast —
 * the deepening ones buy it back (up to ~8:1 in the lower corners).
 *
 * The vignette is centred above the top edge so that edge stays pure
 * --primary and meets <FooterCurve /> without a seam.
 *
 * Sits inside the footer, which is why the footer's own content wrapper
 * carries `relative z-10`.
 */
export const FooterBackdrop = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 overflow-hidden"
  >
    <div className="absolute inset-0 decor-footer-depth" />
    <div className="absolute inset-0 decor-footer-dots" />
  </div>
);

export const FooterCurve = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-x-0 bottom-full h-12 overflow-hidden md:h-20"
  >
    <svg
      className="h-full w-full"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      focusable="false"
    >
      <path
        d="M0,80 C 320,6 760,104 1440,18 L1440,80 Z"
        style={{ fill: "hsl(var(--primary))" }}
      />
    </svg>
  </div>
);
