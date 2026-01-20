import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import liefOsbornImage from "@/assets/lief-osborn.jpg";
import liefLogoLight from "@/assets/lief-logo-light.png";

const FeaturedProject = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1]);

  return (
    <section ref={containerRef} className="relative bg-tricorn-black">
      {/* Section Intro */}
      <div className="py-20 md:py-28 border-b border-greek-villa/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
          >
            <div>
              <span className="block font-body text-goldenrod text-sm tracking-[0.3em] uppercase mb-4">
                The Work
              </span>
              <h2 className="font-display text-greek-villa text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.02em] leading-[1.1]">
                Where vision becomes reality.
              </h2>
            </div>
            <p className="font-body text-greek-villa/50 text-base max-w-md leading-relaxed">
              Each project is a testament to what's possible when experience,
              craftsmanship, and uncompromising standards converge.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative h-[80vh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
          <img
            src={liefOsbornImage}
            alt="Lïef Osborn by Lïef Development"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-tricorn-black via-tricorn-black/10 to-transparent" />
        </motion.div>

        {/* Project Info */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-8"
            >
              <div>
                <div className="flex items-baseline gap-4 mb-4">
                  <img 
                    src={liefLogoLight} 
                    alt="Lïef" 
                    className="h-12 sm:h-14 md:h-16 w-auto"
                  />
                  <span className="font-display text-greek-villa text-5xl sm:text-6xl md:text-7xl font-bold tracking-[-0.02em]">
                    Osborn
                  </span>
                </div>
                <p className="font-body text-greek-villa/60 text-lg max-w-lg">
                  40,000 square feet of architectural precision. Midtown Phoenix.
                </p>
              </div>
              <div className="flex items-center gap-3 text-greek-villa/40">
                <span className="font-body text-sm tracking-wider">2026</span>
                <span>•</span>
                <span className="font-body text-sm tracking-wider">
                  Phoenix, AZ
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* View All Link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-12 border-t border-greek-villa/10"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-4 font-body text-greek-villa text-lg tracking-wide hover:text-goldenrod transition-colors duration-500"
          >
            <span>View all projects</span>
            <ArrowRight
              size={20}
              className="transform group-hover:translate-x-2 transition-transform duration-300"
            />
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturedProject;
