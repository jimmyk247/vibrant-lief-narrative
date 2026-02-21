import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useInView } from "./useInView";
import { useRef, useState } from "react";
import dotsNeon from "@/assets/v2/dots-neon.png";

const rows = [
  {
    num: "01",
    label: "VERTICAL INTEGRATION",
    title: "Everything under one roof.",
    body: "While others outsource, we own every step. Design. Engineering. Construction. Interiors. When the same team carries your vision from first sketch to final walkthrough, nothing gets lost in translation.",
    statValue: 100,
    statSuffix: "%",
    statLabel: "IN-HOUSE CAPABILITY",
  },
  {
    num: "02",
    label: "UNRIVALED WORKFORCE",
    title: "An army of masters.",
    body: "Over 300 specialized tradespeople — each an expert in their craft. This isn't a network of subcontractors. This is a dedicated force that builds together, thinks together, and executes with one singular standard.",
    statValue: 300,
    statSuffix: "+",
    statLabel: "SPECIALIZED TRADES",
  },
  {
    num: "03",
    label: "GENERATIONAL EXPERIENCE",
    title: "Three decades of proof.",
    body: "Experience doesn't list on a brochure. It shows in the silence of a perfectly sealed home. In walls that breathe with the desert. In craftsmanship that our grandchildren will inherit. Thirty years of doing it right.",
    statValue: 30,
    statSuffix: "+",
    statLabel: "YEARS OF EXCELLENCE",
  },
];

const ease = [.16, 1, .3, 1] as const;

const ScrollStat = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const counter = useTransform(scrollYProgress, [0, 1], [0, value]);

  useMotionValueEvent(counter, "change", (v) => {
    setDisplay(Math.round(v));
  });

  return (
    <div ref={ref}>
      <span className="v2-headline block" style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", color: "var(--v2-white)", lineHeight: 1 }}>
        {display}{suffix}
      </span>
    </div>
  );
};

const V2Model = () => {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="model" className="relative py-12 md:py-28" style={{ background: "var(--v2-deep)" }}>
      <div className="v2-ghost-text hidden md:block top-20 right-8 text-right" style={{ fontSize: "min(20vw, 250px)", color: "rgba(0,107,63,.24)" }}>MODEL</div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <img src={dotsNeon} alt="" className="w-[176vw] max-w-[1512px] opacity-[0.01]" />
      </div>

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        {inView && (
          <>
            <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0, ease }} className="v2-label mb-6">The Model</motion.div>
            <motion.h2 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.08, ease }} className="v2-headline text-4xl md:text-6xl lg:text-7xl mb-4" style={{ color: "var(--v2-white)" }}>
              ONE TEAM<span className="v2-neon-period">.</span><br />NO GAPS<span className="v2-neon-period">.</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.16, ease }} className="mb-16 max-w-lg" style={{ fontSize: "1.375rem", color: "var(--v2-muted)", fontWeight: 300, lineHeight: 1.7 }}>
              The entire chain, under one roof.
            </motion.p>

            <div className="flex flex-col">
              {rows.map((row, i) => (
                <motion.div
                  key={row.num}
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.24 + i * 0.1, ease }}
                  className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 md:gap-12 items-start py-10 md:py-14"
                  style={{ borderTop: "1px solid var(--v2-rule)" }}
                >
                  <span className="v2-headline" style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)", color: "rgba(0,255,136,.06)", lineHeight: 1 }}>
                    {row.num}
                  </span>

                  <div className="max-w-xl">
                    <span className="v2-label mb-3 block" style={{ fontSize: "1.25rem" }}>{row.label}</span>
                    <h3 className="mb-4" style={{ fontFamily: "var(--v2-font-body)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 400, color: "var(--v2-white)", lineHeight: 1.2 }}>
                      {row.title}
                    </h3>
                    <p style={{ fontSize: "1.25rem", color: "var(--v2-dim)", lineHeight: 1.8 }}>
                      {row.body}
                    </p>
                  </div>

                  <div className="text-right md:min-w-[200px]">
                    <ScrollStat value={row.statValue} suffix={row.statSuffix} />
                    <span className="block mt-2" style={{ fontSize: "1.25rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--v2-muted)" }}>
                      {row.statLabel}
                    </span>
                  </div>
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
