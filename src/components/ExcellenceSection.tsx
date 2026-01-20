import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ExcellenceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={containerRef}
      className="relative bg-succulent-green text-greek-villa py-32 md:py-48 overflow-hidden"
    >
      {/* Subtle Gradient */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{ y: bgY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-goldenrod/20 via-transparent to-transparent" />
      </motion.div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {/* Left - The Story */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <span className="block font-body text-goldenrod text-sm tracking-[0.3em] uppercase mb-6">
              Built to Last
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.02em] leading-[1.1] mb-8">
              Arizona's #1 builder.
              <br />
              <span className="text-goldenrod">SABS certified.</span>
            </h2>
            <p className="font-body text-greek-villa/70 text-lg leading-relaxed mb-8">
              Our partnership with Strata's revolutionary SABS technology isn't
              just a certification—it's validation. We don't just meet
              building codes. We exceed them by generations.
            </p>
            <p className="font-body text-greek-villa/50 text-base leading-relaxed">
              The SABS (Saebi Alternative Building System) represents the most
              advanced construction methodology available. Combined with Lïef's
              execution standards, it produces homes engineered to endure
              centuries.
            </p>
          </motion.div>

          {/* Right - The Proof */}
          <div className="space-y-12">
            {[
              {
                value: "300",
                unit: "year",
                label: "Engineered Lifespan",
                detail: "Built for generations, not decades",
              },
              {
                value: "260",
                unit: "mph",
                label: "Wind Resistance",
                detail: "Hurricane-grade structural integrity",
              },
              {
                value: "50",
                unit: "%",
                label: "Energy Reduction",
                detail: "R-100 insulation as standard",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="flex items-start gap-8 p-8 bg-greek-villa/5 border-l-2 border-goldenrod"
              >
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-5xl md:text-6xl font-bold">
                    {stat.value}
                  </span>
                  <span className="font-body text-goldenrod text-lg">
                    {stat.unit}
                  </span>
                </div>
                <div>
                  <h3 className="font-body text-greek-villa text-sm tracking-[0.15em] uppercase mb-2">
                    {stat.label}
                  </h3>
                  <p className="font-body text-greek-villa/50 text-sm">
                    {stat.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExcellenceSection;
