import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Dices,
  Trophy,
  LayoutDashboard,
  Check,
  Users,
  Activity,
  ShieldCheck,
} from "lucide-react";

const products = [
  {
    icon: Dices,
    title: "Casino Platform",
    description:
      "A complete online casino with game aggregation, lobby, bonuses and jackpots, ready to launch under your licence.",
    features: [
      "Game aggregation and lobby",
      "Bonus and free spins engine",
      "Jackpots and tournaments",
      "Multiple currencies and languages",
      "RNG provider integration",
      "Turnkey or white label",
    ],
    gradient: "from-primary to-primary/70",
  },
  {
    icon: Trophy,
    title: "Sportsbook",
    description:
      "Betting before and during every match, with live odds, automated risk management and cash out built in.",
    features: [
      "Upcoming and live event markets",
      "Live odds feed integration",
      "Bet builder and cash out",
      "Automated risk management",
      "Virtual sports",
      "Live streaming integration",
    ],
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: LayoutDashboard,
    title: "Back Office CMS",
    description:
      "The content system your casino team uses every day to manage the lobby, promotions and campaigns, with no need to wait for a release.",
    features: [
      "Lobby and banner management",
      "Game catalogue control",
      "Promotion and campaign builder",
      "Content for multiple brands",
      "Localisation workflows",
      "Access control by role",
    ],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "Player Management",
    description:
      "Onboarding, segmentation and retention, with responsible gaming controls built into every step.",
    features: [
      "KYC and onboarding flows",
      "Player segmentation",
      "CRM and campaign automation",
      "Responsible gaming tools",
      "VIP and loyalty tiers",
      "Account and session history",
    ],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Activity,
    title: "Monitoring & Operations",
    description:
      "Full visibility across your platform, day and night, so issues are resolved before your players ever notice them.",
    features: [
      "Live operations dashboards",
      "Uptime and latency monitoring",
      "Alerting and escalation",
      "Transaction reconciliation",
      "Incident response",
      "Capacity planning",
    ],
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: ShieldCheck,
    title: "Payments & Compliance",
    description:
      "Cashier, wallets and the reporting your licence requires, all connected from the start rather than added later.",
    features: [
      "PSP and wallet integrations",
      "Deposits, withdrawals and payouts",
      "AML and fraud screening",
      "Regulatory reporting",
      "Location and age verification",
      "Full audit trails",
    ],
    gradient: "from-slate-500 to-zinc-600",
  },
];

export const ProductsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="products" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4">
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
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Platform Modules
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Everything It Takes to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
              Run an Online Casino
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Casino, sportsbook, back office, player management, payments and operations.
            Take the complete platform, or add individual modules to the systems you already run.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative"
            >
              {/* Card glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} />
              
              <div className="relative h-full rounded-2xl p-6 bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-xl border border-border/50 group-hover:border-primary/40 transition-all duration-300 overflow-hidden">
                {/* Top accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="flex items-start gap-4 mb-5">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${product.gradient} p-[2px] flex-shrink-0`}>
                    <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                      <product.icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {product.description}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2.5 mb-5">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-foreground/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
