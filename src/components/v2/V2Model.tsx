import { motion } from "framer-motion";
import { useInView } from "./useInView";

const cards = [
  {
    num: "01",
    title: "DRAW",
    name: "SCOTT MEIERS · 50+ YEARS",
    body: "Still sketches by hand. Architecture and design intent that survives the build — because the architect and builder sit at the same table.",
    accent: "The craft.",
  },
  {
    num: "02",
    title: "BUILD",
    name: "JON ARMSTRONG · 300+ TRADES",
    body: "300+ in-house trades. No subcontractor roulette. Strata SABS prefab. The schedule is controlled, not contracted.",
    accent: "The army.",
  },
  {
    num: "03",
    title: "OWN",
    name: "JESSE FOWLER · $300M+ BUILT",
    body: "$300M+ built. From concept to community — development, construction, brand under one roof. Our name is on every unit.",
    accent: "The conviction.",
  },
];

const ease = [.16, 1, .3, 1] as const;

const V2Model = () => {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="model" className="relative py-32 md:py-44" style={{ background: "var(--v2-deep)" }}>
      <div className="v2-ghost-text top-20 right-8 text-right" style={{ fontSize: "min(20vw, 250px)" }}>MODEL</div>

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        {inView && (
          <>
            <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0, ease }} className="v2-label mb-6">The Model</motion.div>
            <motion.h2 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.08, ease }} className="v2-headline text-4xl md:text-6xl lg:text-7xl mb-4" style={{ color: "var(--v2-white)" }}>
              ONE TEAM<span className="v2-neon-period">.</span><br />NO GAPS<span className="v2-neon-period">.</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.16, ease }} className="mb-16 max-w-lg" style={{ fontSize: "1.1rem", color: "var(--v2-muted)", fontWeight: 300 }}>
              The entire chain, under one roof.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3">
              {cards.map((card, i) => (
                <motion.div
                  key={card.num}
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.24 + i * 0.08, ease }}
                  className="relative flex flex-col v2-hover-line"
                  style={{
                    padding: "3rem 2.5rem",
                    minHeight: "380px",
                    borderRight: i < 2 ? "1px solid var(--v2-rule)" : "none",
                    borderTop: "1px solid var(--v2-rule)",
                  }}
                >
                  <span className="v2-headline mb-4" style={{ fontSize: "4rem", color: "rgba(0,255,136,.04)" }}>{card.num}</span>
                  <h3 className="v2-headline mb-3" style={{ fontSize: "1.5rem", color: "var(--v2-neon)" }}>{card.title}</h3>
                  <span className="mb-4" style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", color: "var(--v2-muted)" }}>{card.name}</span>
                  <p className="flex-1" style={{ fontSize: "0.85rem", color: "var(--v2-dim)", lineHeight: 1.8 }}>{card.body}</p>
                  <p className="mt-6" style={{ fontStyle: "italic", fontWeight: 300, color: "var(--v2-muted)" }}>{card.accent}</p>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default V2Model;
