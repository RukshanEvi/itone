import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Lightbulb,
  Shield,
  TrendingUp,
  Lock,
  Headphones,
  Award,
  Users,
  Heart,
} from "lucide-react";

const story = [
  {
    icon: Users,
    title: "Our Team",
    description:
      "More than 50 engineers, designers and operations specialists who have spent their careers building live gaming platforms, backed by a support team that keeps watch around the clock.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description:
      "Gaming is our specialty, but not our limit. We also build custom software for clients in other industries, and we hold that work to the same standards: integrity, transparency and systems that perform under real pressure.",
  },
];

const values = [
  {
    icon: Shield,
    title: "Always On",
    description: "When a casino goes down, it loses money. Everything we build is designed to stay up.",
  },
  {
    icon: TrendingUp,
    title: "Ready for Peak Traffic",
    description: "Built for the biggest events of the year, not just an ordinary weekday.",
  },
  {
    icon: Lock,
    title: "Compliance Built In",
    description: "Licensing, AML and audit trails are part of the design from day one.",
  },
  {
    icon: Headphones,
    title: "24/7 Operations",
    description: "Engineers on call in every timezone where you take bets.",
  },
  {
    icon: Lightbulb,
    title: "Built Around Operators",
    description: "Designed around the way your team actually works each day.",
  },
  {
    icon: Award,
    title: "Proven Live",
    description: "Over ten years of platforms handling real money in production.",
  },
];

const stats = [
  { value: "99.9%", label: "Platform Uptime" },
  { value: "24/7", label: "Monitoring Coverage" },
  { value: "10+", label: "Years in iGaming" },
  { value: "80+", label: "Operators Served" },
];

// Glass surface with a 3D feel, shared by every card in this section:
// translucent white over the page's glow, blurred, lit along the top edge,
// shaded along the bottom, and lifted by layered shadows. The ::before sheen
// sits behind the card content because of `isolate` plus `before:-z-10`.
const glassCard = [
  "relative isolate overflow-hidden rounded-2xl",
  "border border-card/60",
  "bg-gradient-to-br from-card/65 via-card/45 to-card/30",
  "backdrop-blur-md backdrop-saturate-150 md:backdrop-blur-xl",
  "shadow-[inset_0_1px_0_0_hsl(var(--card)/0.95),inset_0_-1px_0_0_hsl(var(--foreground)/0.06),0_1px_2px_0_hsl(var(--foreground)/0.06),0_10px_20px_-8px_hsl(var(--foreground)/0.12),0_28px_56px_-20px_hsl(var(--primary)/0.18)]",
  "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:-z-10 before:h-1/2 before:bg-gradient-to-b before:from-card/60 before:to-transparent before:content-['']",
].join(" ");

// Deeper lift for the cards that react to hover.
const glassCardHover = [
  "hover:border-primary/30 hover:bg-card/30",
  "hover:shadow-[inset_0_1px_0_0_hsl(var(--card)/0.95),inset_0_-1px_0_0_hsl(var(--foreground)/0.06),0_2px_4px_0_hsl(var(--foreground)/0.06),0_16px_28px_-10px_hsl(var(--foreground)/0.16),0_36px_64px_-22px_hsl(var(--primary)/0.26)]",
].join(" ");

export const WhyChooseSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-itone" className="py-16 md:py-24 relative overflow-x-clip">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 border border-primary/20"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Why Itone
          </motion.span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
              Itone
            </span>
            ?
          </h2>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Operators stay with us because the platform keeps running when it matters most,
            and the people behind it answer when you call.
          </p>
        </motion.div>

        {/* Main content - Two column layout */}
        <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 md:mb-16">
          {/* Brand wordmark behind the cards, for the glass to blur: crisp in the
              gaps, frosted under the cards. Centred on this grid, so it stays clear
              of the heading above and the stats row below.
              Styled as a quiet outline: a thin --primary stroke over a barely there
              fill, with slightly open tracking so the outlines do not crowd.
              lg and up: the vw size makes the word span the full screen width,
              capped at 42rem so on very wide screens the letters do not grow tall
              enough to reach the heading or stats. The section's overflow-x-clip
              trims the scrollbar's worth of overhang.
              Below lg the cards stack full width and would hide a horizontal word,
              so it runs vertically down the stack, capped at 18rem so its length
              stays inside the grid at every width. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 rotate-90 lg:rotate-0 select-none whitespace-nowrap text-[length:min(100vw,18rem)] lg:text-[length:min(33.8vw,42rem)] font-extrabold leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-primary/[0.05] to-transparent [-webkit-text-stroke:1.5px_hsl(var(--primary)/0.2)] lg:[-webkit-text-stroke-width:2px]"
          >
            ITONE
          </span>

          {/* Left - Team & values */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {story.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className={`${glassCard} flex-1 p-6 md:p-8`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">{title}</h3>
                </div>
                <p className="text-foreground/80 leading-relaxed text-sm md:text-base">
                  {description}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Right - Core values grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-3 md:gap-4"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`${glassCard} ${glassCardHover} group p-4 md:p-5 transition-all duration-300`}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <value.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground text-sm md:text-base mb-1">{value.title}</h4>
                <p className="text-xs md:text-sm text-foreground/80 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className={`${glassCard} ${glassCardHover} text-center p-4 md:p-6 transition-all duration-300`}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary/70 mb-1">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-foreground/75">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
