import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { WhyChooseSection } from "@/components/WhyChooseSection";
import { ProductsSection } from "@/components/ProductsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { GlobalBackground } from "@/components/BackgroundDecor";
import { motion, useScroll } from "framer-motion";

const Index = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative background: canvas, halftone dots, depth.
          The page base colour comes from `body` (index.css) so this stays
          transparent — an opaque background here would paint over the
          negative-z decorative layer and hide it. */}
      <GlobalBackground />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary to-primary/50 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      <Navbar />
      <HeroSection />

      {/* Animated divider */}
      <div className="relative h-16 md:h-24 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
        </motion.div>
      </div>

      <AboutSection />

      <div className="relative h-16 md:h-24 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
        </motion.div>
      </div>

      <WhyChooseSection />

      <div className="relative h-16 md:h-24 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
        </motion.div>
      </div>

      <ProductsSection />
      
      <div className="relative h-16 md:h-24 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
        </motion.div>
      </div>

      <ServicesSection />
      
      <div className="relative h-16 md:h-24 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
        </motion.div>
      </div>

      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
