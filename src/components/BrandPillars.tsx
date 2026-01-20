import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const pillars = [
  {
    number: "01",
    title: "Vertical Integration",
    headline: "Everything under one roof.",
    description:
      "While others outsource, we own every step. Design. Engineering. Construction. Interiors. When the same team carries your vision from first sketch to final walkthrough, nothing gets lost in translation.",
    stat: "100%",
    statLabel: "In-House Capability",
  },
  {
    number: "02",
    title: "Unrivaled Workforce",
    headline: "An army of masters.",
    description:
      "Over 300 specialized tradespeople—each an expert in their craft. This isn't a network of subcontractors. This is a dedicated force that builds together, thinks together, and executes with one singular standard.",
    stat: "300+",
    statLabel: "Specialized Trades",
  },
  {
    number: "03",
    title: "Generational Experience",
    headline: "Three decades of proof.",
    description:
      "Experience doesn't list on a brochure. It shows in the silence of a perfectly sealed home. In walls that breathe with the desert. In craftsmanship that our grandchildren will inherit. Thirty years of doing it right.",
    stat: "30+",
    statLabel: "Years of Excellence",
  },
];

const BrandPillars = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={containerRef} className="relative bg-greek-villa">
      {/* Section Header */}
      <div className="py-24 md:py-32 border-b border-urbane-bronze/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <span className="block font-body text-urbane-bronze/60 text-sm tracking-[0.3em] uppercase mb-6">
              What Defines Us
            </span>
            <h2 className="font-display text-tricorn-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.02em] leading-[1.05] max-w-4xl">
              The difference isn't in what we build.
              <br />
              <span className="text-coral-accent">It's in how we build.</span>
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Pillars */}
      {pillars.map((pillar, index) => (
        <motion.div
          key={pillar.number}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="border-b border-urbane-bronze/10 last:border-b-0"
        >
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
              {/* Number */}
              <div className="md:col-span-1">
                <span className="font-display text-urbane-bronze/30 text-6xl md:text-7xl font-bold">
                  {pillar.number}
                </span>
              </div>

              {/* Content */}
              <div className="md:col-span-6">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="block font-body text-goldenrod text-sm tracking-[0.2em] uppercase mb-4"
                >
                  {pillar.title}
                </motion.span>

                <motion.h3
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="font-display text-tricorn-black text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.02em] leading-[1.1] mb-8"
                >
                  {pillar.headline}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="font-body text-urbane-bronze/70 text-lg md:text-xl leading-relaxed"
                >
                  {pillar.description}
                </motion.p>
              </div>

              {/* Stat */}
              <div className="md:col-span-5 md:text-right">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <span className="block font-display text-tricorn-black text-7xl sm:text-8xl md:text-9xl font-bold tracking-[-0.03em] leading-none">
                    {pillar.stat}
                  </span>
                  <span className="block font-body text-urbane-bronze/50 text-sm tracking-[0.2em] uppercase mt-4">
                    {pillar.statLabel}
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  );
};

export default BrandPillars;
