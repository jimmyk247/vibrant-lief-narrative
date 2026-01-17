import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const CraftSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const numberOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0.08, 0.15]);

  return (
    <section
      ref={containerRef}
      className="relative bg-background py-32 md:py-48 overflow-hidden"
    >
      {/* Large Background Number */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{ opacity: numberOpacity }}
      >
        <span className="font-display text-[40vw] font-medium text-primary/10">
          250
        </span>
      </motion.div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-24"
        >
          <span className="block font-body text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">
            The Craft
          </span>
          <h2 className="font-display text-foreground text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.02em] leading-[1.1]">
            250 craftsmen.
            <br />
            <span className="text-primary">One vision.</span>
          </h2>
        </motion.div>

        {/* The Story */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="font-body text-foreground/80 text-lg md:text-xl leading-relaxed mb-8">
              We don't outsource. We don't compromise. Every trade—from 
              foundation to finish—works under one roof, guided by one 
              uncompromising standard.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              This vertical integration isn't about control. It's about 
              continuity. When the same hands guide a home from blueprint 
              to completion, every detail speaks the same language.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12"
          >
            {/* Craft Items */}
            {[
              {
                title: "Design & Architecture",
                desc: "Where vision takes form",
              },
              {
                title: "Construction",
                desc: "Where precision becomes structure",
              },
              {
                title: "Interiors",
                desc: "Where life finds its canvas",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="group flex items-start gap-6"
              >
                <div className="w-12 h-px bg-primary/30 mt-3 group-hover:w-20 group-hover:bg-primary transition-all duration-500" />
                <div>
                  <h3 className="font-display text-foreground text-xl md:text-2xl font-medium mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-muted-foreground text-sm">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CraftSection;
