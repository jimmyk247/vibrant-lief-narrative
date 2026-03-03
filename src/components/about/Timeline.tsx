import { motion } from "framer-motion";

const milestones = [
  {
    year: "1993",
    title: "The Beginning",
    description:
      "Founded with a commitment to building homes that honor both craft and client. Our first project—a modest Paradise Valley residence—established the Lïef standard.",
  },
  {
    year: "2001",
    title: "Vertical Integration",
    description:
      "Made the pivotal decision to bring all trades in-house. What seemed unconventional became our greatest competitive advantage—complete quality control from foundation to finish.",
  },
  {
    year: "2008",
    title: "Through the Storm",
    description:
      "While the industry contracted, we invested in our team. Not a single craftsman was let go. This loyalty forged the unbreakable workforce that defines us today.",
  },
  {
    year: "2015",
    title: "300+ Trades Strong",
    description:
      "Reached a milestone that validated our model: over 300 specialized tradespeople under one roof, each a master of their discipline.",
  },
  {
    year: "2020",
    title: "Lïef Blocks Certification",
    description:
      "Became Arizona's first and only builder certified in Lïef Blocks with SABS Technology—homes engineered to endure for 300 years.",
  },
  {
    year: "2024",
    title: "Arizona's #1",
    description:
      "Recognized as Arizona's premier luxury home builder. Three decades of conviction, craft, and uncompromising standards brought to this moment.",
  },
];

const Timeline = () => {
  return (
    <section className="relative bg-tricorn-black py-32 md:py-48 overflow-hidden">
      {/* Background Year */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.02]">
        <span className="font-display text-greek-villa text-[40vw] font-bold">
          30
        </span>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-20 md:mb-32"
        >
          <span className="block font-body text-goldenrod text-sm tracking-[0.3em] uppercase mb-6">
            Our Journey
          </span>
          <h2 className="font-display text-greek-villa text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.02em] leading-[1.05]">
            Three decades of
            <br />
            building excellence.
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-greek-villa/10 md:-translate-x-1/2" />

          {/* Milestones */}
          <div className="space-y-16 md:space-y-24">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative grid md:grid-cols-2 gap-8 md:gap-16 ${
                  index % 2 === 0 ? "" : "md:direction-rtl"
                }`}
              >
                {/* Year Marker */}
                <div
                  className={`absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-goldenrod md:-translate-x-1/2 -translate-x-1/2`}
                />

                {/* Content */}
                <div
                  className={`pl-8 md:pl-0 ${
                    index % 2 === 0
                      ? "md:pr-16 md:text-right"
                      : "md:col-start-2 md:pl-16 md:text-left"
                  }`}
                  style={{ direction: "ltr" }}
                >
                  <span className="block font-display text-goldenrod text-5xl md:text-6xl font-bold mb-4">
                    {milestone.year}
                  </span>
                  <h3 className="font-display text-greek-villa text-2xl md:text-3xl font-bold mb-4">
                    {milestone.title}
                  </h3>
                  <p className="font-body text-greek-villa/60 text-base md:text-lg leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
