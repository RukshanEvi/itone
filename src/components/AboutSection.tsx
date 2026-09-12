import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Eye, Target } from "lucide-react";

const vision = {
  icon: Eye,
  label: "Vision",
  description:
    "We want every operator, in every market, to be able to launch a casino or sportsbook on technology their players trust and their team never has to worry about.",
};

const mission = {
  icon: Target,
  label: "Mission",
  description:
    "To give operators a platform they can truly build a business on. One that stays up on the busiest night of the year, keeps the regulator satisfied and lets the team update the lobby without waiting on developers.",
};

/*
 * Desktop geometry, drawn in a 1000 x 562.5 viewBox: the same 16:9 as the
 * stage, so the rounded corners never stretch.
 *
 * Vision is a square turned 45° with only its bottom corner on stage. Its
 * right edge is the diagonal (x + y = 755: it leaves the top edge at 75.5%
 * and runs down to the rounded corner at x = 20%); its left edge climbs back
 * to the stage's left side at 63%.
 *
 * Mission needs no shape of its own: the stage itself is solid grey, so
 * everything the red does not cover is the mission side, with no white.
 */
const VISION_SHAPE = "M-20 -20L775 -20L277.8 477.2A110 110 0 0 1 122.2 477.2L-20 335Z";

const c = (token: string, alpha = 1) => `hsl(var(--${token}) / ${alpha})`;

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const VisionIcon = vision.icon;
  const MissionIcon = mission.icon;

  return (
    <section id="about" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-8"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            About Us
          </motion.span>
        </motion.div>

        {/* Stage: stacked cards on small screens, one diagonal composition from lg up.
            On lg the two content blocks go `static`, so their pieces position
            against the stage and sit on the SVG shapes. */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto flex max-w-2xl flex-col lg:block lg:max-w-6xl lg:aspect-[16/9] lg:overflow-hidden lg:rounded-[2rem] lg:bg-border lg:shadow-2xl lg:shadow-foreground/5"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 1000 562.5"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
          >
            <defs>
              <linearGradient id="vm-vision" gradientUnits="userSpaceOnUse" x1="150" y1="520" x2="700" y2="0">
                <stop offset="0%" style={{ stopColor: c("accent-foreground") }} />
                <stop offset="100%" style={{ stopColor: c("primary") }} />
              </linearGradient>
            </defs>
            <path d={VISION_SHAPE} fill="url(#vm-vision)" />
          </svg>

          {/* Vision */}
          <div className="relative z-10 flex flex-col rounded-[2rem] rounded-bl-[5rem] bg-gradient-to-tr from-accent-foreground to-primary px-7 pb-8 pt-10 text-primary-foreground shadow-xl shadow-primary/20 sm:px-10 sm:pt-12 lg:static lg:rounded-none lg:bg-none lg:p-0 lg:shadow-none">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:absolute lg:left-[5.5%] lg:top-[14%] lg:w-[30%]"
            >
              <h3 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold uppercase leading-[0.95] tracking-tight">
                Our <br />
                {vision.label}
              </h3>
              <p className="mt-5 text-base leading-relaxed xl:text-lg">{vision.description}</p>
            </motion.div>

            <div className="mt-10 sm:ml-2 lg:absolute lg:left-[20%] lg:top-[74.5%] lg:ml-0 lg:mt-0 lg:-translate-x-1/2 lg:-translate-y-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <VisionIcon className="h-16 w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24" strokeWidth={1.5} aria-hidden="true" />
              </motion.div>
            </div>
          </div>

          {/* Mission: tucks under the vision card on small screens */}
          <div className="relative -mt-16 flex flex-col rounded-[2rem] rounded-br-[5rem] bg-border px-7 pb-12 pt-24 sm:px-10 lg:static lg:mt-0 lg:rounded-none lg:bg-transparent lg:p-0">
            <div className="flex justify-end lg:absolute lg:left-[82.5%] lg:top-[21%] lg:-translate-x-1/2 lg:-translate-y-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <MissionIcon className="h-14 w-14 text-primary lg:h-16 lg:w-16 xl:h-20 xl:w-20" strokeWidth={1.75} aria-hidden="true" />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 lg:absolute lg:left-[62%] lg:top-[36%] lg:mt-0 lg:w-[31%]"
            >
              <h3 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground">
                Our <br />
                {mission.label}
              </h3>
              <p className="mt-5 text-base leading-relaxed text-foreground/75 xl:text-lg">{mission.description}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
