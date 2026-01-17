import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import heroImage from "@/assets/hero-home.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury desert modern home by Lïef Development"
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0"
          style={{ background: "var(--hero-overlay)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="hero-subheadline text-greek-villa/90">
            Arizona's Premier Luxury Builder
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hero-headline text-greek-villa mb-8 max-w-4xl mx-auto"
        >
          Crafting Homes
          <br />
          <span className="italic font-normal">That Endure</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-body text-greek-villa/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light"
        >
          Where Japanese tranquility meets Scandinavian minimalism, 
          nestled in the serenity of the Sonoran Desert.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a 
            href="#projects" 
            className="inline-flex items-center justify-center px-8 py-4 bg-greek-villa text-tricorn-black font-body font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:bg-greek-villa/90 hover:-translate-y-0.5"
          >
            View Our Work
          </a>
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-greek-villa text-greek-villa font-body font-medium tracking-wide uppercase text-sm transition-all duration-300 hover:bg-greek-villa hover:text-tricorn-black"
          >
            Start Your Project
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#metrics"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-greek-villa/70 hover:text-greek-villa transition-colors"
        >
          <span className="text-xs tracking-[0.2em] uppercase font-body">Discover</span>
          <ArrowDown size={20} />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
