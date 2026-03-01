import { motion } from "framer-motion";
import { useInView } from "./useInView";
import { Flame, Droplets, Bug, Thermometer, DollarSign, Clock, TrendingUp, CheckCircle } from "lucide-react";

const attributes = [
  { icon: Flame, title: "Anti-Fire", desc: "Non-combustible concrete shell — the ultimate desert safety standard." },
  { icon: Droplets, title: "Anti-Mold & Moisture", desc: "100% impermeable to Arizona's extreme monsoon elements." },
  { icon: Bug, title: "Anti-Termite", desc: "Zero wood framing means zero risk from structural pests." },
  { icon: Thermometer, title: "Thermal Performance", desc: "Massive HVAC overhead reduction through high-density insulation." },
];

const stats = [
  { icon: DollarSign, value: "$13", suffix: "/sq ft", label: "Average Savings", desc: "Average residential construction costs" },
  { icon: Clock, value: "14", suffix: "%", label: "Timeline Reduction", desc: "Average reduction across build types" },
  { icon: TrendingUp, value: "+20", suffix: "%", label: "Efficiency", desc: "Increases total project efficiency" },
  { icon: CheckCircle, value: "100", suffix: "+", label: "SABS Projects Delivered", desc: "SABS Technology has delivered 100+ projects in multiple climates and regions" },
];

const ease = [.16, 1, .3, 1] as const;
const accentColor = "#00FF88";

const V2Edge = () => {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="edge" className="relative py-12 md:py-28" style={{ background: "#006B3F" }}>
      <div className="absolute inset-x-0 top-0 h-[40%] pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(0,0,0,.12), transparent)" }} />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        {inView && (
          <>
            <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease }} className="mb-6" style={{ fontSize: "1.25rem", textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(0,255,136,.6)" }}>
              <span className="inline-block w-6 h-px mr-3 align-middle" style={{ background: "rgba(0,255,136,.6)" }} />
              The Edge
            </motion.div>

            <motion.h2 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.08, ease }} className="v2-headline text-4xl md:text-6xl lg:text-7xl mb-6" style={{ color: "var(--v2-white)" }}>
              WE BUILD<br /><span style={{ color: "var(--v2-neon)" }}>SMARTER<span className="v2-neon-period">.</span></span>
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.16, ease }} className="max-w-[550px] mb-20" style={{ fontWeight: 300, fontSize: "1.25rem", color: "rgba(245,245,243,.7)", lineHeight: 1.8 }}>
              Arizona's #1 Strata-trained builder. SABS prefab technology. 300+ skilled tradesmen in-house. When most GCs lose weeks waiting on a sub, we deploy from our own army.
            </motion.p>

            {/* Attribute cards */}
            <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.24, ease }} className="grid grid-cols-1 sm:grid-cols-2 gap-px mb-px">
              {attributes.map((attr) => {
                const Icon = attr.icon;
                return (
                  <div
                    key={attr.title}
                    className="p-6 md:p-8 transition-all duration-500 group"
                    style={{ border: "1px solid rgba(245,245,243,.08)", background: "rgba(0,0,0,.15)" }}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 40px rgba(0,255,136,.12), inset 0 1px 0 ${accentColor}40`}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
                  >
                    <div className="w-14 h-14 flex items-center justify-center mb-5" style={{ border: `1px solid ${accentColor}40` }}>
                      <Icon size={32} style={{ color: accentColor }} />
                    </div>
                    <h4 className="mb-3" style={{ fontSize: "1.25rem", fontWeight: 600, color: accentColor, textTransform: "uppercase" }}>{attr.title}</h4>
                    <p style={{ fontSize: "1.25rem", color: "rgba(245,245,243,.6)", lineHeight: 1.6 }}>{attr.desc}</p>
                  </div>
                );
              })}
            </motion.div>

            {/* Stat cards */}
            <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.32, ease }} className="grid grid-cols-1 sm:grid-cols-2 gap-px mb-20">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="p-6 md:p-8 transition-all duration-500"
                    style={{ border: "1px solid rgba(245,245,243,.08)", background: "rgba(0,0,0,.15)" }}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 40px rgba(0,255,136,.12), inset 0 1px 0 ${accentColor}40`}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
                  >
                    <div className="w-14 h-14 flex items-center justify-center mb-5" style={{ border: `1px solid ${accentColor}40` }}>
                      <Icon size={32} style={{ color: accentColor }} />
                    </div>
                    <div className="v2-headline mb-1" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--v2-white)" }}>
                      {stat.value}<span style={{ fontSize: "0.5em", fontWeight: 400 }}>{stat.suffix}</span>
                    </div>
                    <div className="mb-2" style={{ fontSize: "1.25rem", textTransform: "uppercase", color: "var(--v2-white)", letterSpacing: "0.1em", fontWeight: 600 }}>{stat.label}</div>
                    <div style={{ fontSize: "1.25rem", color: "rgba(245,245,243,.55)", lineHeight: 1.5 }}>{stat.desc}</div>
                  </div>
                );
              })}
            </motion.div>

            {/* Bottom context text */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.4, ease }} className="text-center pt-12" style={{ borderTop: "1px solid rgba(245,245,243,.1)" }}>
              <p className="mb-3" style={{ fontSize: "1.25rem", color: "var(--v2-white)" }}>
                <span style={{ color: accentColor }}>Structural Superiority:</span> Anti-Fire, Anti-Mold, and Anti-Termite protection are standard.
              </p>
              <p className="max-w-2xl mx-auto" style={{ fontSize: "1.25rem", color: "rgba(245,245,243,.55)", lineHeight: 1.7 }}>
                SABS™ technology radically reduces the number of trades required on-site, allowing for total schedule control and unprecedented quality consistency.
              </p>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default V2Edge;
