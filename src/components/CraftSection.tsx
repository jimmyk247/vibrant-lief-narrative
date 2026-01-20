import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const capabilities = [
  "Architectural Design",
  "Structural Engineering",
  "General Construction",
  "Custom Millwork",
  "Electrical Systems",
  "Plumbing & Mechanical",
  "HVAC Engineering",
  "Interior Design",
  "Landscape Architecture",
  "Smart Home Integration",
  "Custom Stone & Tile",
  "Fine Finishing",
];

const CraftSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section
      ref={containerRef}
      className="relative bg-tricorn-black py-32 md:py-48 overflow-hidden"
    >
      {/* Scrolling Capabilities Strip */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap"
        style={{ x }}
      >
        <div className="flex gap-8">
          {[...capabilities, ...capabilities].map((cap, i) => (
            <span
              key={i}
              className="font-display text-greek-villa/[0.03] text-[15vw] font-medium tracking-[-0.02em]"
            >
              {cap}
            </span>
          ))}
        </div>
      </motion.div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <span className="block font-body text-goldenrod text-sm tracking-[0.3em] uppercase mb-6">
              Complete Mastery
            </span>
            <h2 className="font-display text-greek-villa text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-0.02em] leading-[1.1] mb-8">
              One company.
              <br />
              Every discipline.
            </h2>
            <p className="font-body text-greek-villa/60 text-lg leading-relaxed max-w-lg">
              From the first line drawn to the final fixture placed, Lïef
              commands every aspect of creation. No handoffs. No compromises.
              No excuses.
            </p>
          </motion.div>

          {/* Right Column - Capability Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="group py-4 border-b border-greek-villa/10"
              >
                <span className="font-body text-greek-villa/70 text-sm tracking-wide group-hover:text-goldenrod transition-colors duration-300">
                  {cap}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CraftSection;
