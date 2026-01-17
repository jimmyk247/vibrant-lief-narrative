import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PhilosophySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.1, 0.3], [100, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100vh] flex items-center justify-center bg-greek-villa py-32"
    >
      <motion.div
        className="max-w-[1200px] mx-auto px-6 text-center"
        style={{ opacity, y }}
      >
        {/* Philosophy Statement */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="font-display text-tricorn-black text-[6vw] sm:text-[4.5vw] md:text-[3.5vw] leading-[1.2] tracking-[-0.01em] font-normal"
        >
          Where <span className="italic">Japanese tranquility</span> meets{" "}
          <span className="italic">Scandinavian precision</span>—
          <br className="hidden md:block" />
          nestled in the soul of the <span className="italic">Sonoran Desert</span>.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          viewport={{ once: true }}
          className="w-24 h-px bg-urbane-bronze/30 mx-auto my-16 origin-left"
        />

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="font-body text-urbane-bronze/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
        >
          Every line, every material, every shadow is deliberate.
          <br />
          We create spaces that breathe, endure, and transcend.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default PhilosophySection;
