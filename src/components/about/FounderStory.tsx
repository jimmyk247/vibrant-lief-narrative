import { motion } from "framer-motion";

const FounderStory = () => {
  return (
    <section className="relative bg-greek-villa py-32 md:py-48">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left Column - Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-urbane-bronze/10 relative overflow-hidden">
              {/* Placeholder for founder image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-body text-urbane-bronze/30 text-sm tracking-widest uppercase">
                  Founder Portrait
                </span>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-goldenrod/30" />
            </div>
          </motion.div>

          {/* Right Column - Story */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:pt-12"
          >
            <span className="block font-body text-goldenrod text-sm tracking-[0.3em] uppercase mb-6">
              The Founder
            </span>
            <h2 className="font-display text-tricorn-black text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.02em] leading-[1.05] mb-8">
              A legacy built
              <br />
              by hand.
            </h2>

            <div className="space-y-6 font-body text-urbane-bronze/80 text-lg leading-relaxed">
              <p>
                In 1993, with nothing but a worn toolbelt and an unshakeable 
                vision, our founder set out to redefine what luxury home 
                building could mean in the Arizona desert.
              </p>
              <p>
                Where others saw limitations, he saw opportunity. Where the 
                industry chose shortcuts, he chose the longer path—the one 
                that led to homes that would outlast their builders.
              </p>
              <p>
                That founding philosophy remains unchanged: every nail driven, 
                every joint fitted, every finish applied carries the same 
                uncompromising standard that built our first home.
              </p>
              <p className="text-tricorn-black font-medium">
                Three decades later, Lïef stands as proof that conviction, 
                when paired with craft, creates something that endures.
              </p>
            </div>

            {/* Signature */}
            <div className="mt-12 pt-8 border-t border-urbane-bronze/20">
              <div className="flex items-center gap-6">
                <div className="w-16 h-px bg-goldenrod" />
                <div>
                  <p className="font-display text-tricorn-black text-xl italic">
                    "Excellence is not negotiable."
                  </p>
                  <p className="font-body text-urbane-bronze/60 text-sm mt-2">
                    — Founder & CEO
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderStory;
