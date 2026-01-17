import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import vistaImage from "@/assets/project-vista.jpg";

const FeaturedProject = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.2, 1]);
  const textY = useTransform(scrollYProgress, [0.2, 0.5], [100, 0]);

  return (
    <section ref={containerRef} className="relative bg-tricorn-black">
      {/* Full-bleed Image */}
      <div className="relative h-[90vh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
          <img
            src={vistaImage}
            alt="Vista Residence by Lïef Development"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-tricorn-black via-tricorn-black/20 to-transparent" />
        </motion.div>

        {/* Project Info Overlay */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-8 md:p-16"
          style={{ y: textY }}
        >
          <div className="max-w-[1400px] mx-auto">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="block font-body text-goldenrod text-sm tracking-[0.3em] uppercase mb-4"
            >
              Featured Work
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="font-display text-greek-villa text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-[-0.02em] mb-6"
            >
              Vista
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="font-body text-greek-villa/70 text-lg md:text-xl max-w-xl leading-relaxed mb-8"
            >
              A sanctuary of light and infinite horizon. 8,400 square feet 
              where architecture dissolves into the landscape.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <span className="font-body text-greek-villa/40 text-sm tracking-wider">
                Paradise Valley, Arizona
              </span>
              <span className="text-greek-villa/20">•</span>
              <span className="font-body text-greek-villa/40 text-sm tracking-wider">
                2024
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* View More Projects Link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-12 border-t border-greek-villa/10"
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-16">
          <a
            href="#projects"
            className="group inline-flex items-center gap-4 font-body text-greek-villa text-lg tracking-wide hover:text-goldenrod transition-colors duration-500"
          >
            <span>Explore all projects</span>
            <ArrowRight
              size={20}
              className="transform group-hover:translate-x-2 transition-transform duration-300"
            />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturedProject;
