# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing website for **Itone Private Limited**, a software company built around online gaming. Originally generated with [Lovable](https://lovable.dev); changes pushed to `main` on GitHub sync back into the Lovable editor, and Lovable edits are committed straight to the repo.

**Positioning — copy in every section follows this, so match it when editing content.** The core offering is the iGaming stack: casino platform, sportsbook, back-office CMS, player management, payments/compliance, and 24/7 monitoring — i.e. everything an operator needs to launch *and run* an online casino. The `#products` section is those six modules; `#services` is the engineering around them (custom builds, provider integration, cloud, release engineering, on-call support). General non-gaming software work is real but secondary: it belongs in Services and the About copy, not in the hero. Write for casino operators, not for a general enterprise audience.

**No dashes anywhere in site copy, at the owner's request.** That means em dashes, en dashes and hyphens, including hyphenated words ("Back Office CMS", "on call", "white label", "Ready for Peak Traffic") and the page title and meta descriptions in `index.html`. Rephrase rather than just deleting the dash, and keep the voice human and professional. Phone numbers are written with spaces. Code comments are not site copy and are exempt.

Live app: https://itone.lovable.app

## Commands

```bash
npm i           # install (package-lock.json is authoritative; a stale bun.lockb also exists)
npm run dev     # Vite dev server on http://localhost:8080 (host "::" — not the Vite default 5173)
npm run build   # production build to dist/
npm run build:dev   # build with mode=development (keeps the lovable-tagger plugin active)
npm run lint    # eslint over the repo
npm run preview # serve the built dist/
```

There is no test setup and no typecheck script — `tsc` runs only as part of the editor/IDE. `npm run lint` is the only automated check.

## README caveat

`README.md` is the original **Lovable prompt spec**, not documentation of what was built. It describes Next.js, the Hive animation library, and Iconify Simple Icons — none of which are in this project. It also lists six separate pages; the site is actually a single scrolling page. Treat it as a design brief for tone, copy, and color intent only; verify anything technical against the source.

## Architecture

**Stack:** Vite 5 + React 18 + TypeScript, SWC via `@vitejs/plugin-react-swc`, Tailwind CSS 3, shadcn/ui (Radix), Framer Motion, React Router, TanStack Query.

**Single-page site.** `src/App.tsx` wires the providers (QueryClient → Tooltip → both toasters → BrowserRouter) and defines exactly two routes: `/` → `src/pages/Index.tsx` and `*` → `NotFound`. `Index.tsx` stacks every section in order with animated divider elements between them.

Navigation is **anchor-scroll, not routing**. `Navbar.tsx` holds a `navLinks` array of `#hash` targets and calls `document.querySelector(href).scrollIntoView()`. Each section component owns its own `id` (`#home`, `#about`, `#why-itone`, `#products`, `#services`, `#contact`; `#why-itone` has no nav entry). Adding a nav entry means adding both the `navLinks` item and a matching `id` on a section. The navbar's "Home" link and the footer logo both target `#home`, which `HeroSection` owns — rename or drop that id and both go silently inert, because `scrollToSection` guards on `if (element)` instead of failing. React Router and `src/components/NavLink.tsx` are effectively unused scaffolding — if you add real routes, remember the catch-all `*` must stay last.

**Sections** live flat in `src/components/` (`HeroSection`, `AboutSection`, `WhyChooseSection`, `ProductsSection`, `ServicesSection`, `ContactSection`, `Footer`, `Navbar`). `AboutSection` is the vision and mission block directly after the hero and keeps `#about` for the navbar's About link; `WhyChooseSection` (team, values, the six reasons and the stats bar) was split out of it at the owner's request.

**The vision and mission block recreates a reference slide the owner supplied** (a diagonal two-shape composition, in the site's own colours). From `lg` up it is a 16:9 stage with an inline SVG behind the text: a red rounded diamond whose right edge is the diagonal (vision), laid on a stage that is itself solid grey (mission). The owner asked for the mission side to be grey completely, so the reference's white wedge and separate mission shape were dropped; the grey is the opaque `--border` token (`bg-border`), opaque so the page's dots cannot tint it, and the mobile mission card uses the same. The text and icons are ordinary HTML, absolutely positioned in `%` against the stage. The two content wrappers switch to `lg:static` so their children position against the stage, which is also why nothing on those wrappers may take a `transform` (it would become the containing block); animation lives on the inner pieces. Below `lg` the same markup is two stacked cards, the mission card tucked under the vision card. Because the desktop text sits at fixed `%` positions over fixed shapes, **longer copy can run into the diagonal or the eye icon**: re-check at 1024px after editing either description. The vision shape's darker end is `--accent-foreground` (a deeper red), and the mission text is `text-foreground/75` rather than `muted-foreground`, which fails AA on the grey. Each is a self-contained module exporting a **named** component (not default) that declares its own content as a local `const` array of objects at the top of the file — product cards, service entries, feature lists, tech names. Content edits go into those arrays, not into JSX.

**`BackgroundDecor.tsx`** owns the entire background visual system — a premium-fintech composition of pure CSS gradients plus one small inline SVG (no image assets, no canvas, no animation). It exports four pieces, each `aria-hidden` and `pointer-events-none`:

- `GlobalBackground` — viewport-`fixed` ambient layer mounted once in `Index.tsx`: warm off-white canvas → depth veil → halftone dot field. (A pink/red glow layer, `.decor-glow`, used to sit between canvas and veil; the owner had it removed, so don't reintroduce a red haze here.) Layer order matters; the veil must stay *under* the dots or it washes them out.
- `FooterCurve` — curved transition from the light canvas into the solid-red footer; positioned `bottom-full` inside the footer, which is why `<footer>` carries `relative`.
- `FooterBackdrop` — depth for the footer's solid `--primary` block: corner pooling, an edge vignette, and the page's halftone. `absolute inset-0` inside the footer, which is why the footer's content wrapper carries `relative z-10`.
- `HeaderBackdrop` — the same material on the header's solid `--primary` bar, recomposed for a wide, short surface: a grounding band on the bottom edge, a soft frame at the far ends, and a fainter halftone. `absolute inset-0` inside the `fixed` header, which is why both the header's row *and* its mobile menu carry `relative z-10`.

The header and footer are the same material and share `--decor-shade`, but not their gradients: the footer's corner pooling resolves to nothing across ~90px of header height, and the header's grounding band is anchored in **px, not %**, because the header changes height (96px at rest, 80px scrolled, several hundred with the mobile menu open) and a percentage band would thicken with it.

The visual tuning lives in the `.decor-*` utility classes in `index.css` (including the mobile `max-width: 767px` overrides that tighten the dot grid).

**The hero** (`HeroSection.tsx`) is a split layout: copy left, `HeroGlobe` right, stacking copy-first on mobile. It uses the global background layers only; there is no hero-specific backdrop. It carries `pt-28` to clear the fixed 96px navbar: keep that padding on the hero rather than padding whatever section follows it. **Hero copy uses no dashes** (em dashes or hyphens) **and a plain, human voice**, at the owner's request; keep it that way when editing.

**`HeroGlobe.tsx`** is the illustration, and the owner's brief for it is specifically **worldwide**: the globe is the subject, not a backdrop. (A bare wireframe globe was rejected as too minimal; a dashboard-style product scene after it was rejected for not leading with the worldwide idea.) It draws a dotted-halftone globe, colour-coded network arcs between iGaming hubs, and four module cards (Casino, Sportsbook, Payments, Monitoring) pinned to hubs. Before editing it:

- **Land comes from `heroGlobeLand.ts`**: hand-simplified `[lon, lat]` coastline rings, with `WATER` rings (Black Sea, Caspian) subtracted afterwards. They are good to a degree or two, not survey data, and only the hemisphere facing the viewer (centred 20°N 10°E) has to read correctly. Fix a wrong-looking coast by editing its ring; there is deliberately no map dependency.
- **Everything is computed once at module load**: land sampling (rows 2.4° apart, each row's count scaled by cos(lat) so spacing stays even over the sphere), the orthographic projection, and the arcs, which are true great circles lifted off the surface in 3D. A lifted arc point is hidden only when it is behind the centre plane *and* inside the disc, which is what lets long arcs curve over the limb.
- **The ~1,400 land dots are three `<path>`s**, one per depth band, not individual circles. The bands fade and shrink toward the limb, which is most of what makes the globe read as round.
- **The globe does not rotate.** Turning it would mean re-projecting every dot every frame. Motion is `.globe-flow` (a pulse travelling each arc, relying on `pathLength={100}`), `.globe-pulse` (hub rings) and `.globe-orbit` (orbit dashes drifting), at the end of `index.css`. All stop under `prefers-reduced-motion`.
- **The body circle is opaque on purpose**: the orbit's back half is drawn before it and the front half after, so the body hides the ring's far side.
- **Colour is the site's own palette only, from tokens, never hex**: `--primary` red leads, the land deepens toward `--foreground` charcoal at the far edge, arcs alternate red and charcoal, and cards use the site's usual `--primary` icon on a `/0.12` tint. The owner asked for it to match the site rather than be colourful; an earlier version with violet/emerald/amber accents (`--illus-*` tokens, since deleted) was rejected. Set via `style`, because `var()` is unreliable in SVG presentation attributes.
- **Hubs are real coordinates but deliberately unlabelled**: naming cities would read as a claim about where Itone operates. The cards name modules, not places.
- It is `aria-hidden`: decorative, with the headline carrying the meaning.

A lesson kept from an earlier hero that masked decorative rings around centred copy: **mask in `rem` against the copy column's width, not in `%` of the element.** A percentage mask has to clear the *corner* of the copy block, which depends on section height and on how many lines the headline wraps to — measured across viewports that requirement swung from 53% to 77% and **was not monotonic in width** (1024px needed a bigger hole than 768px), so no fixed percentage was safe.

**Two rules govern both brand backdrops, and both are easy to break by accident:**

1. **Every layer must darken, never lighten.** White on `--primary` measures only **4.80:1** — barely over AA — so any layer that lights these surfaces spends contrast they cannot spare. The `--decor-shade` layers instead buy contrast back: white reaches ~6.8–8.2:1 in the footer's lower corners, and the `/70` copyright links go from 2.97:1 to roughly 4.0–4.7:1. A "subtle glow" at 0.11 white alpha drops white text to 4.23:1; one was prototyped in the footer and removed for exactly this reason.
2. **The footer's top edge must stay pure `--primary`.** `FooterCurve` is filled with flat `hsl(var(--primary))` and sits directly above it, so anything that tints that edge shows up as a seam along the curve. The vignette is therefore centred at `50% -12%` — above the element — and the halftone mask peaks at `18%` rather than at the edge, because a mask at full strength on the edge draws a visible line where the texture starts.

**Two pre-existing contrast shortfalls on these surfaces**, neither introduced nor fixed by the backdrops: the navbar's `text-primary-foreground/90` links measure **4.12:1** on plain `--primary`, and the footer's `/70` link and `/80` body text measure **2.97:1** and **3.51:1**. All three are under AA. The backdrops lift them only where the deepening actually lands. Raising those three alphas is the fix; do *not* try to fix them by deepening the ground under the text, because a gradient behind a glyph gives different ratios at its top and bottom.

**Stacking gotcha:** the decorative layers sit at `-z-10` and neither `Index.tsx`'s root div nor the sections create a stacking context, so they all paint in the *root* stacking context. Giving the root div an opaque background (it previously had `bg-background`) paints over the whole decorative layer and hides it completely. The page's base colour therefore comes from `body` in `index.css`, and the root div stays transparent.

**`src/components/ui/`** is the stock shadcn/ui set installed by the generator. Nothing outside that folder currently imports from it — the sections hand-roll their inputs, selects, and buttons inline (see `CustomInput` / `CustomSelect` / `NavButton`). Prefer the shadcn primitives for new work, but match the surrounding file's style when editing an existing section.

## Styling conventions

- **All colors are HSL CSS variables** defined in `src/index.css` under `:root` and `.dark`, mapped to Tailwind names in `tailwind.config.ts`. Use `bg-primary`, `text-muted-foreground`, `hsl(var(--primary) / 0.5)` etc. Never hard-code hex or literal colors in components — every red in the background system derives from `--primary`, so re-theming the site re-themes the background. Inside SVG, set colors via `style={{ stopColor: ... }}` rather than presentation attributes; `var()` is unreliable in SVG presentation attributes.
- Decorative-only tokens: `--decor-canvas`, `--decor-dot`, `--decor-veil` and `--decor-shade` are consumed by `BackgroundDecor.tsx` (through the `.decor-*` utilities), plus `--decor-canvas` by the preloader in `index.html`, so it fades out into the same colour. The hero illustration and its highlight icons use the theme tokens directly. The theme tokens proper were left untouched.
- Brand primary is red: `--primary: 0 72% 51%`.
- A `.dark` palette exists in CSS but nothing toggles it — `next-themes` is installed and unused, and there is no theme switcher.
- Glassmorphism is done inline (`bg-card/80 backdrop-blur-md border-border/30`) even though `.glass` and `.glass-subtle` component classes exist in `index.css`. Both patterns are present; the inline form is what the sections actually use.
- Scroll-reveal animation is Framer Motion, not the CSS keyframes: the standard idiom is `useRef` + `useInView(ref, { once: true, margin: "-100px" })` driving `initial`/`animate` on `motion` elements. The `animate-fade-up` / `animate-scale-in` utilities in `index.css` are leftovers.
- Icons are **lucide-react**, despite the README asking for Iconify.

## Notable state

- The contact form in `ContactSection.tsx` has **no backend**. `handleSubmit` fakes a 1s delay, fires a toast, and clears the fields. Wiring it to a real endpoint is unimplemented work, not a regression.
- `index.html` metadata is now Itone's own; the Lovable placeholders are gone, and so is the scaffold's `public/favicon.ico`. The tab icon is `public/logo.jpg`, referenced explicitly via `<link rel="icon">` (previously nothing referenced an icon at all, so browsers auto-discovered `/favicon.ico` — which is why the Lovable mark showed in the tab). `og:image` is a `TODO`: it points at the square logo as a stand-in and needs a purpose-made 1200x630 image at an absolute URL.
- **Preloader**: static markup and a small inline `<style>` in `index.html`, so it paints before the script bundle arrives; `hidePreloader()` in `src/lib/preloader.ts` fades and removes it from `App.tsx`'s first `useEffect`. The owner's brief was that it must not affect performance, so: no library, no extra request (it reuses `/logo.jpg`, the tab icon), only transform and opacity animate, and there is **no minimum display time**. The only wait is for web fonts, capped at 600ms. Its colours are `hsl(var(--token, fallback))` because in dev the stylesheet only exists once the JS runs; keep those fallbacks in sync with `index.css`. It is removed on a timer, not `transitionend` (which never fires under reduced motion or in a hidden tab), and a `<noscript>` rule hides it when JS is off.
- `src/App.css` is a leftover CRA-style stylesheet that nothing imports; `src/main.tsx` imports only `index.css`.
- TypeScript is deliberately loose: `strict: false`, `noImplicitAny: false`, `noUnusedLocals: false` in `tsconfig.app.json`, and `@typescript-eslint/no-unused-vars` is off. Don't assume type errors will catch mistakes.
- `@` resolves to `./src` — configured in both `vite.config.ts` and `tsconfig.app.json`; changing one requires changing the other.
