import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImage from "@/assets/hero-home.jpg";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={containerRef}
      className="relative h-[100vh] flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <img
          src={heroImage}
          alt="Lïef Development luxury residence"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-tricorn-black/40 via-tricorn-black/20 to-tricorn-black/60"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-[90vw] mx-auto"
        style={{ y, opacity }}
      >
        {/* Main Headline - Massive, Statement Typography */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8"
        >
          <h1 className="font-display text-greek-villa text-[12vw] sm:text-[10vw] md:text-[8vw] leading-[0.9] tracking-[-0.02em] font-medium">
            We don't
            <br />
            build homes.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="font-display text-goldenrod text-[12vw] sm:text-[10vw] md:text-[8vw] leading-[0.9] tracking-[-0.02em] italic font-normal">
            We craft legacies.
          </h2>
        </motion.div>

        {/* Subtle Descriptor */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 md:mt-24"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-greek-villa/40" />
            <span className="font-body text-greek-villa/60 text-sm tracking-[0.3em] uppercase">
              Arizona's Premier Luxury Builder
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - Minimal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-16 bg-gradient-to-b from-greek-villa/60 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
