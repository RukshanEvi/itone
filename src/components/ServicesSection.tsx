import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import illustrations
import devImg from "@/assets/service-development.png";
import apiImg from "@/assets/service-api.png";
import cloudImg from "@/assets/service-cloud.png";
import devopsImg from "@/assets/service-devops.png";
import supportImg from "@/assets/service-support.png";

const services = [
  {
    title: "Custom Software Development",
    description: "Tailored platforms and internal tools built from the ground up, for gaming operators and for businesses in other industries.",
    image: devImg,
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
  },
  {
    title: "Game & Provider Integration",
    description: "We connect game studios, odds feeds and payment providers to your platform, and keep every integration running smoothly.",
    image: apiImg,
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
  },
  {
    title: "Cloud & Scalability",
    description: "Infrastructure that handles a championship final or a jackpot surge without anyone needing to watch the dashboards.",
    image: cloudImg,
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
  },
  {
    title: "DevOps & Release Engineering",
    description: "Automated pipelines and careful deployments, so updates go live without taking your lobby offline.",
    image: devopsImg,
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
  },
  {
    title: "24/7 Monitoring & Support",
    description: "A dedicated team watching uptime, transactions and alerts around the clock, in every timezone you operate in.",
    image: supportImg,
    color: "from-primary/20 to-primary/10",
    borderColor: "border-primary/30",
  },
];

// Hook to get visible count based on screen size
const useVisibleCount = () => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 640) {
        setCount(1);
      } else if (window.innerWidth < 1024) {
        setCount(2);
      } else {
        setCount(3);
      }
    };

    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  return count;
};

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const visibleCount = useVisibleCount();

  const maxIndex = Math.max(0, services.length - visibleCount);

  const slideNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const slidePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(slideNext, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, slideNext]);

  // Reset index when visible count changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleCount, maxIndex, currentIndex]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section id="services" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/15 to-primary/5 text-primary text-sm font-semibold mb-6 border border-primary/30"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Our Services
          </motion.span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">
            Building and Running{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
              Live Platforms
            </span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg px-4">
            Gaming is our specialty, but the engineering behind it serves any industry. We
            handle integrations, scaling, safe releases and support around the clock for
            every client we work with.
          </p>
        </motion.div>

        {/* Slider */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Floating Navigation Buttons */}
          <motion.button
            onClick={slidePrev}
            style={{ y: "-50%" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute -left-2 sm:-left-4 lg:-left-16 top-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-shadow duration-300"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
          </motion.button>

          <motion.button
            onClick={slideNext}
            style={{ y: "-50%" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute -right-2 sm:-right-4 lg:-right-16 top-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-shadow duration-300"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
          </motion.button>

          {/* Cards Container */}
          <div className="overflow-hidden mx-6 sm:mx-8 lg:mx-0">
            <motion.div
              className="flex gap-4 md:gap-6"
              animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  className="flex-shrink-0"
                  style={{ width: `calc(${100 / visibleCount}% - ${((visibleCount - 1) * 16) / visibleCount}px)` }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className={`group h-full rounded-2xl bg-gradient-to-br ${service.color} backdrop-blur-sm border ${service.borderColor} hover:border-primary/50 transition-all duration-300 overflow-hidden`}>
                    {/* Image Section */}
                    <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden bg-background/50">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                    </div>

                    {/* Content Section */}
                    <div className="p-5 md:p-6">
                      <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-8 h-2.5 bg-primary"
                    : "w-2.5 h-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-4 max-w-xs mx-auto">
            <div className="h-1 bg-muted-foreground/20 rounded-full overflow-hidden">
              <motion.div
                key={currentIndex}
                className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: isAutoPlaying ? "100%" : "0%" }}
                transition={{ duration: 4, ease: "linear" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
