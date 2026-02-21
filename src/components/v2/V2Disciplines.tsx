import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "./useInView";
import { useRef } from "react";

const disciplines = [
  ["Architectural Design", "Structural Engineering"],
  ["General Construction", "Custom Millwork"],
  ["Electrical Systems", "Plumbing & Mechanical"],
  ["HVAC Engineering", "Interior Design"],
  ["Landscape Architecture", "Smart Home Integration"],
  ["Custom Stone & Tile", "Fine Finishing"],
];

const allDisciplines = disciplines.flat();
const ghostText = allDisciplines.join(" · ") + " · " + allDisciplines.join(" · ");

const ease = [.16, 1, .3, 1] as const;

const V2Disciplines = () => {
  const { ref, inView } = useInView(0.1);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const ghostX = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section ref={sectionRef} className="relative py-12 md:py-28 overflow-hidden" style={{ background: "var(--v2-green)" }}>
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none"
        style={{
          x: ghostX,
          fontFamily: "'Archivo Black', sans-serif",
          textTransform: "uppercase",
          fontSize: "min(10vw, 140px)",
          color: "rgba(0,50,25,.15)",
        }}
      >
        {ghostText}
      </motion.div>

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        {inView && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-0 items-start">
            {/* Left — copy */}
            <div className="mb-12 md:mb-0 md:sticky md:top-32">
              <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0, ease }} className="mb-6" style={{ fontSize: "1.25rem", textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(0,255,136,.7)" }}>
                <span className="inline-block w-6 h-px mr-3 align-middle" style={{ background: "rgba(0,255,136,.7)" }} />
                Complete Mastery
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.08, ease }}
                className="mb-6"
                style={{ fontFamily: "var(--v2-font-body)", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 400, color: "var(--v2-white)", lineHeight: 1.15 }}
              >
                One company.<br />Every discipline.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.16, ease }}
                className="max-w-md"
                style={{ fontSize: "1.25rem", color: "rgba(245,245,243,.7)", lineHeight: 1.8 }}
              >
                From the first line drawn to the final fixture placed, Lïef commands every aspect of creation. No handoffs. No compromises. No excuses.
              </motion.p>
            </div>

            {/* Right — discipline grid */}
            <div className="grid grid-cols-2 gap-x-8">
              {disciplines.map((pair, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.06, ease }}
                  className="col-span-2 grid grid-cols-2 gap-x-8"
                >
                  {pair.map((d) => (
                    <div
                      key={d}
                      className="py-6"
                      style={{ borderBottom: "1px solid rgba(255,255,255,.12)" }}
                    >
                      <span style={{ fontSize: "1.25rem", color: "rgba(245,245,243,.8)", fontWeight: 400 }}>{d}</span>
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default V2Disciplines;