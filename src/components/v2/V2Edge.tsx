import { motion } from "framer-motion";
import { useInView } from "./useInView";

const stats = [
  { value: "20–30%", label: "Faster Timelines" },
  { value: "15–25%", label: "Lower Labor Costs" },
  { value: "$56M", label: "Saved · 440 Basin" },
  { value: "#1", label: "Strata Builder · AZ" },
];

const ease = [.16, 1, .3, 1] as const;

const V2Edge = () => {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="edge" className="relative py-32 md:py-44" style={{ background: "#006B3F" }}>
      <div className="absolute inset-x-0 top-0 h-[40%] pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(0,0,0,.12), transparent)" }} />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        {inView && (
          <>
            <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease }} className="mb-6" style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(0,255,136,.6)" }}>
              <span className="inline-block w-6 h-px mr-3 align-middle" style={{ background: "rgba(0,255,136,.6)" }} />
              The Edge
            </motion.div>

            <motion.h2 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.08, ease }} className="v2-headline text-4xl md:text-6xl lg:text-7xl mb-6" style={{ color: "var(--v2-white)" }}>
              WE BUILD<br /><span style={{ color: "var(--v2-neon)" }}>SMARTER<span className="v2-neon-period">.</span></span>
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.16, ease }} className="max-w-[550px] mb-20" style={{ fontWeight: 300, color: "rgba(245,245,243,.5)", lineHeight: 1.8 }}>
              Arizona's #1 Strata-trained builder. SABS prefab technology. 300+ trades in-house. When most GCs lose weeks waiting on a sub, we deploy from our own army.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.24, ease }} className="grid grid-cols-2 md:grid-cols-4" style={{ borderTop: "1px solid rgba(245,245,243,.1)" }}>
              {stats.map((stat, i) => (
                <div key={stat.label} className="py-10 px-6" style={{ borderRight: i < stats.length - 1 ? "1px solid rgba(245,245,243,.1)" : "none" }}>
                  <div className="v2-headline text-2xl md:text-3xl mb-3" style={{ color: "var(--v2-neon)", textShadow: "0 0 30px rgba(0,255,136,.1)" }}>{stat.value}</div>
                  <div style={{ fontSize: "0.6rem", textTransform: "uppercase", color: "rgba(245,245,243,.35)", letterSpacing: "0.1em" }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default V2Edge;
