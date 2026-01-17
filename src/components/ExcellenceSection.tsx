import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stats = [
  {
    value: "300",
    unit: "years",
    label: "Designed lifespan",
    detail: "Engineered to outlast generations",
  },
  {
    value: "260",
    unit: "mph",
    label: "Wind resistance",
    detail: "Hurricane-grade structural integrity",
  },
  {
    value: "50",
    unit: "%",
    label: "Energy savings",
    detail: "R-100 insulation standard",
  },
];

const ExcellenceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={containerRef}
      className="relative bg-urbane-bronze text-greek-villa py-32 md:py-48 overflow-hidden"
    >
      {/* Subtle Gradient Overlay */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ y: bgY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-goldenrod/10 via-transparent to-transparent" />
      </motion.div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24 md:mb-32"
        >
          <span className="block font-body text-goldenrod text-sm tracking-[0.3em] uppercase mb-6">
            The Standard
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-0.02em] leading-[1.1] max-w-3xl">
            Arizona's only builder certified in{" "}
            <span className="text-goldenrod">SABS technology.</span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-px bg-greek-villa/10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-urbane-bronze p-10 md:p-16"
            >
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-display text-6xl md:text-7xl lg:text-8xl font-medium text-greek-villa">
                  {stat.value}
                </span>
                <span className="font-body text-goldenrod text-lg md:text-xl tracking-wide">
                  {stat.unit}
                </span>
              </div>
              <h3 className="font-body text-greek-villa text-sm tracking-[0.2em] uppercase mb-3">
                {stat.label}
              </h3>
              <p className="font-body text-greek-villa/50 text-sm leading-relaxed">
                {stat.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 flex items-center gap-8"
        >
          <div className="w-20 h-px bg-goldenrod/30" />
          <p className="font-body text-greek-villa/60 text-sm tracking-wide max-w-md">
            Built using the revolutionary SABS (Saebi Alternative Building System) by Strata—
            the most advanced construction methodology available today.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ExcellenceSection;
