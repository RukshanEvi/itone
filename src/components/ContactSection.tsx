import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, ArrowRight, Sparkles } from "lucide-react";
import { Linkedin, Twitter, Github, Facebook } from "@/components/SocialIcons";
import { useToast } from "@/hooks/use-toast";

const services = [
  "Casino Platform",
  "Sportsbook",
  "Back Office CMS",
  "Player Management",
  "Monitoring & Operations",
  "Payments & Compliance",
  "Custom Software",
  "Not Sure Yet",
];

// Custom Input Component
const CustomInput = ({
  label,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}) => (
  <div className="relative">
    <label className="text-sm font-medium text-foreground mb-2 block">
      {label}
      {required && <span className="text-primary ml-1">*</span>}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3.5 rounded-xl bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
    />
  </div>
);

// Custom Select Component
const CustomSelect = ({
  label,
  placeholder,
  options,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) => (
  <div className="relative">
    <label className="text-sm font-medium text-foreground mb-2 block">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3.5 rounded-xl bg-background/50 border border-border/50 text-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 appearance-none cursor-pointer"
    >
      <option value="" disabled className="text-muted-foreground">
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option} value={option} className="text-foreground bg-background">
          {option}
        </option>
      ))}
    </select>
    <div className="absolute right-4 top-[42px] pointer-events-none">
      <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
);

// Custom Textarea Component
const CustomTextarea = ({
  label,
  placeholder,
  required = false,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}) => (
  <div className="relative">
    <label className="text-sm font-medium text-foreground mb-2 block">
      {label}
      {required && <span className="text-primary ml-1">*</span>}
    </label>
    <textarea
      placeholder={placeholder}
      required={required}
      rows={4}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3.5 rounded-xl bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
    />
  </div>
);

// Contact Info Card
const ContactCard = ({
  icon: Icon,
  title,
  lines,
  delay,
}: {
  icon: typeof Mail;
  title: string;
  lines: string[];
  delay: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, x: 5 }}
      className="group flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/40 transition-all duration-300"
    >
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        {lines.map((line, i) => (
          <p key={i} className="text-muted-foreground text-sm">
            {line}
          </p>
        ))}
      </div>
    </motion.div>
  );
};

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent",
        description: "Thank you for reaching out. We will get back to you within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/15 to-primary/5 text-primary text-sm font-semibold mb-6 border border-primary/30"
          >
            <Sparkles className="w-4 h-4" />
            Get In Touch
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Let's Get Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
              Platform Live
            </span>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Whether you are launching a new brand, moving an existing one or simply need
            a back office that works for your team, tell us where you stand and we will
            show you the way forward.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
          {/* Contact Form - Takes 3 columns */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="relative rounded-3xl p-8 md:p-10 bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-xl border border-border/50 overflow-hidden"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/30 rounded-tl-xl" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/30 rounded-tr-xl" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/30 rounded-bl-xl" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/30 rounded-br-xl" />

              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <CustomInput
                    label="Name"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={(value) => setFormData({ ...formData, name: value })}
                  />
                  <CustomInput
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={formData.email}
                    onChange={(value) => setFormData({ ...formData, email: value })}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <CustomInput
                    label="Phone"
                    type="tel"
                    placeholder="+1 555 000 0000"
                    value={formData.phone}
                    onChange={(value) => setFormData({ ...formData, phone: value })}
                  />
                  <CustomInput
                    label="Company"
                    placeholder="Company name"
                    value={formData.company}
                    onChange={(value) => setFormData({ ...formData, company: value })}
                  />
                </div>

                <CustomSelect
                  label="Service Interest"
                  placeholder="Select a service"
                  options={services}
                  value={formData.service}
                  onChange={(value) => setFormData({ ...formData, service: value })}
                />

                <CustomTextarea
                  label="Message"
                  placeholder="Tell us about your project..."
                  required
                  value={formData.message}
                  onChange={(value) => setFormData({ ...formData, message: value })}
                />

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full py-4 px-8 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold text-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {/* Shine effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Contact Info - Takes 2 columns */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <ContactCard
              icon={Mail}
              title="Email"
              lines={["contact@itone.com", "support@itone.com"]}
              delay={0.3}
            />
            <ContactCard
              icon={Phone}
              title="Phone"
              lines={["+1 555 123 4567", "+1 555 987 6543"]}
              delay={0.4}
            />

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="p-5 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/50"
            >
              <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {[
                  { icon: Linkedin, href: "https://www.linkedin.com/company/itonesrilanka/posts/?feedView=all", label: "LinkedIn" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Github, href: "#", label: "GitHub" },
                  {icon:Facebook, href:"https://www.facebook.com/itone.biz",label:"Facebook"}
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center hover:from-primary hover:to-primary/80 hover:text-primary-foreground text-primary transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick response badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
            >
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">Quick Response:</span> We typically reply within 24 hours
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
