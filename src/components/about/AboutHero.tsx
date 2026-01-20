import { motion } from "framer-motion";

const AboutHero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-urbane-bronze overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-goldenrod/30 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-32 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span className="block font-body text-goldenrod text-sm tracking-[0.4em] uppercase mb-6">
            Our Story
          </span>
          <h1 className="font-display text-greek-villa text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.02em] leading-[0.95] mb-8">
            Built on
            <br />
            conviction.
          </h1>
          <p className="font-body text-greek-villa/70 text-xl md:text-2xl max-w-2xl leading-relaxed">
            For over three decades, Lïef has been Arizona's benchmark for 
            uncompromising craftsmanship and visionary home building.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
