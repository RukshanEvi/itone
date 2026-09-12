import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { HeaderBackdrop } from "@/components/BackgroundDecor";
import logo from "@/assets/logo.jpg";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#products", label: "Solutions" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

// Custom Button Component
const NavButton = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className="px-6 py-2.5 rounded-xl bg-primary-foreground text-primary font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
  >
    {children}
  </button>
);

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-primary ${
        isScrolled ? "py-3 shadow-lg" : "py-5"
      }`}
    >
      <HeaderBackdrop />

      <div className="container relative z-10 mx-auto px-4 flex items-center justify-between">
        <motion.a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("#home");
          }}
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <img src={logo} alt="Itone Logo" className="h-14 w-auto rounded" />
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="text-primary-foreground/90 hover:text-primary-foreground font-medium transition-colors"
              whileHover={{ y: -2 }}
            >
              {link.label}
            </motion.a>
          ))}
          <NavButton onClick={() => scrollToSection("#contact")}>
            Get Started
          </NavButton>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-primary-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden relative z-10 bg-primary mt-2 mx-4 rounded-lg overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-primary-foreground/90 hover:text-primary-foreground font-medium py-2"
                >
                  {link.label}
                </a>
              ))}
              <NavButton onClick={() => scrollToSection("#contact")}>
                Get Started
              </NavButton>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
