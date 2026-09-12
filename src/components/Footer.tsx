import { motion } from "framer-motion";
import { Linkedin, Twitter, Github } from "@/components/SocialIcons";
import { FooterBackdrop, FooterCurve } from "@/components/BackgroundDecor";
import logo from "@/assets/logo.jpg";

const footerLinks = {
  Solutions: [
    "Casino Platform",
    "Sportsbook",
    "Back Office CMS",
    "Player Management",
    "Monitoring & Operations",
    "Payments & Compliance",
  ],
  Services: [
    "Custom Software",
    "Game & Provider Integration",
    "Cloud & Scalability",
    "DevOps & Release Engineering",
    "24/7 Monitoring & Support",
  ],
  Company: ["About Us", "Careers", "Blog", "Contact"],
};

export const Footer = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-primary text-primary-foreground">
      <FooterCurve />
      <FooterBackdrop />
      <div className="container relative z-10 mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#home");
              }}
              className="flex items-center gap-2 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <img src={logo} alt="Itone Logo" className="h-14 w-auto rounded" />
            </motion.a>
            <p className="text-primary-foreground/80 text-sm mb-6 max-w-sm">
              Casino and sportsbook platforms, back office systems and the monitoring
              that keeps them running, built for operators whose sites need to be
              available every hour of every day. We also develop custom software for
              businesses beyond gaming.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Github, href: "#", label: "GitHub" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-primary-foreground mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-primary-foreground/70 text-sm hover:text-primary-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-primary-foreground/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/70 text-sm">
            © {new Date().getFullYear()} Itone Private Limited. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-primary-foreground/70 text-sm hover:text-primary-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-primary-foreground/70 text-sm hover:text-primary-foreground transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
