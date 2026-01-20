import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImage from "@/assets/hero-home.jpg";
import liefLogo from "@/assets/lief-logo-light.png";

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
        <div className="absolute inset-0 bg-gradient-to-b from-tricorn-black/50 via-tricorn-black/30 to-tricorn-black/70" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12"
        style={{ y, opacity }}
      >
        {/* Brand Name - The Hero */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8"
        >
          <span className="font-body text-goldenrod text-sm tracking-[0.4em] uppercase font-medium">
            Arizona's Premier Luxury Builder
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12"
        >
          <img
            src={liefLogo}
            alt="Lïef"
            className="h-[18vw] sm:h-[14vw] md:h-[12vw] lg:h-[10vw] w-auto"
          />
        </motion.div>

        {/* Authority Statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-2xl"
        >
          <p className="font-body text-greek-villa/80 text-xl md:text-2xl leading-relaxed">
            Three decades of uncompromising craft.
            <br />
            <span className="text-goldenrod">300+ in-house trades.</span>
            <br />
            One standard: excellence.
          </p>
        </motion.div>

        {/* The Three Pillars - Subtle Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-20 md:mt-28 flex flex-wrap gap-8 md:gap-16"
        >
          {[
            { number: "30+", label: "Years of Legacy" },
            { number: "300+", label: "In-House Trades" },
            { number: "100%", label: "Vertical Integration" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 + i * 0.15 }}
              className="flex items-baseline gap-3"
            >
              <span className="font-display text-goldenrod text-3xl md:text-4xl font-medium">
                {item.number}
              </span>
              <span className="font-body text-greek-villa/50 text-sm tracking-wide">
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
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
