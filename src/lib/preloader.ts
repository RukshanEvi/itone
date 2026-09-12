/**
 * Fades out the static preloader that index.html paints before the script
 * bundle arrives, then removes it from the DOM. Called once, after the app's
 * first commit (see App.tsx).
 *
 * It waits briefly for web fonts so the page is not revealed mid font swap,
 * but never longer than FONT_WAIT_MS: the preloader must not hold the site
 * back on a slow connection.
 */
const FONT_WAIT_MS = 600;
const FADE_MS = 400; // matches the opacity transition on #preloader in index.html

export const hidePreloader = () => {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  const fontsReady = document.fonts?.ready ?? Promise.resolve();
  const fontTimeout = new Promise((resolve) => setTimeout(resolve, FONT_WAIT_MS));

  Promise.race([fontsReady, fontTimeout]).then(() => {
    preloader.classList.add("is-hidden");
    // Removed on a timer rather than on transitionend, which never fires when
    // the transition is switched off (reduced motion) or the tab is hidden.
    setTimeout(() => preloader.remove(), FADE_MS);
  });
};
