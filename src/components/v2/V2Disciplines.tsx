import { motion } from "framer-motion";
import { useInView } from "./useInView";

const disciplines = [
  ["Architectural Design", "Structural Engineering"],
  ["General Construction", "Custom Millwork"],
  ["Electrical Systems", "Plumbing & Mechanical"],
  ["HVAC Engineering", "Interior Design"],
  ["Landscape Architecture", "Smart Home Integration"],
  ["Custom Stone & Tile", "Fine Finishing"],
];

const ease = [.16, 1, .3, 1] as const;

const V2Disciplines = () => {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="relative py-32 md:py-44" style={{ background: "var(--v2-deep)" }}>
      <div className="v2-ghost-text top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ fontSize: "min(14vw, 200px)" }}>
        Total Systems
      </div>

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        {inView && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-0 items-start">
            {/* Left — copy */}
            <div className="mb-12 md:mb-0 md:sticky md:top-32">
              <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0, ease }} className="v2-label mb-6">
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
                style={{ fontSize: "0.9rem", color: "var(--v2-dim)", lineHeight: 1.8 }}
              >
                From the first line drawn to the final fixture placed, Lief commands every aspect of creation. No handoffs. No compromises. No excuses.
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
                      className="py-5"
                      style={{ borderBottom: "1px solid var(--v2-rule)" }}
                    >
                      <span style={{ fontSize: "0.85rem", color: "var(--v2-muted)", fontWeight: 400 }}>{d}</span>
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