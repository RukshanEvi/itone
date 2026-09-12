import { ArrowRight, Globe, Activity, ShieldCheck } from "lucide-react";
import { HeroGlobe } from "@/components/HeroGlobe";

// Icons take the brand red, like the icons everywhere else on the site.
const highlights = [
  { icon: Globe, text: "Any currency, any language", tone: "--primary" },
  { icon: Activity, text: "Monitored 24/7", tone: "--primary" },
  { icon: ShieldCheck, text: "Compliance built in", tone: "--primary" },
];

export const HeroSection = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16 lg:pb-20"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 xl:gap-16 items-center">
          {/* Copy */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Casino &amp; Sportsbook Technology
            </span>

            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold text-foreground mb-6 leading-[1.05] tracking-tight">
              Powering iGaming <span className="text-primary">Worldwide</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
              We build the casino and sportsbook platforms that operators rely on every day.
              You get the games, the back office and a team keeping watch around the clock,
              so you can spend your time growing your brand.
            </p>

            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => scrollToSection("#products")}
                className="w-full sm:w-auto px-8 py-4 rounded-xl border border-transparent bg-primary text-primary-foreground font-semibold text-base shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Explore Solutions
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection("#contact")}
                className="w-full sm:w-auto px-8 py-4 rounded-xl border border-border text-foreground font-semibold text-base hover:border-primary hover:text-primary transition-all duration-300 flex items-center justify-center"
              >
                Contact Us
              </button>
            </div>

            <ul className="mt-10 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3">
              {highlights.map(({ icon: Icon, text, tone }) => (
                <li key={text} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Icon className="w-4 h-4" style={{ color: `hsl(var(${tone}))` }} aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* Worldwide globe: decorative, the copy carries the meaning */}
          <div className="mx-auto w-full max-w-[380px] sm:max-w-[540px] lg:max-w-[640px]">
            <HeroGlobe />
          </div>
        </div>
      </div>
    </section>
  );
};
