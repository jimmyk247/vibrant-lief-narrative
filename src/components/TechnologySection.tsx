import { motion } from "framer-motion";
import { Wind, Thermometer, Clock, Volume2, Shield, Leaf } from "lucide-react";

const features = [
  {
    icon: Wind,
    stat: "260",
    unit: "MPH",
    label: "Wind Resistance",
    description: "Hurricane-grade durability tested to withstand extreme weather conditions.",
  },
  {
    icon: Thermometer,
    stat: "R-100",
    unit: "",
    label: "Insulation Rating",
    description: "Superior thermal performance that dramatically reduces energy consumption.",
  },
  {
    icon: Clock,
    stat: "300",
    unit: "yr",
    label: "Designed Lifespan",
    description: "Built to endure for generations, far exceeding conventional construction.",
  },
  {
    icon: Volume2,
    stat: "52",
    unit: "STC",
    label: "Sound Rating",
    description: "Recording studio-level soundproofing for ultimate privacy and peace.",
  },
  {
    icon: Shield,
    stat: "0",
    unit: "",
    label: "Flame Spread Index",
    description: "Zero flame spread rating provides unparalleled fire safety protection.",
  },
  {
    icon: Leaf,
    stat: "98%",
    unit: "",
    label: "Air Composition",
    description: "Sustainable EPS technology that's 98% air, minimizing environmental impact.",
  },
];

const TechnologySection = () => {
  return (
    <section id="technology" className="py-24 md:py-32 bg-urbane-bronze text-greek-villa overflow-hidden">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row gap-16 lg:gap-24"
        >
          {/* Left Column - Content */}
          <div className="lg:w-1/3">
            <span className="text-sm uppercase tracking-[0.25em] text-goldenrod font-body font-medium">
              Technology
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mt-4 mb-6">
              The SABS
              <br />
              Advantage
            </h2>
            <div className="w-16 h-px bg-goldenrod/50 mb-6" />
            <p className="font-body text-greek-villa/80 leading-relaxed mb-8">
              As Arizona's first and only builder certified in the revolutionary 
              SABS (Saebi Alternative Building System) by Strata, we deliver 
              homes that transcend conventional construction in every measurable way.
            </p>
            <p className="font-body text-greek-villa/80 leading-relaxed">
              This isn't about building different—it's about building 
              <span className="text-goldenrod font-medium"> better</span>. 
              Faster construction. Superior performance. Generational longevity.
            </p>
          </div>

          {/* Right Column - Stats Grid */}
          <div className="lg:w-2/3">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="group p-6 border border-greek-villa/20 hover:border-goldenrod/50 rounded-sm transition-all duration-300"
                >
                  <feature.icon className="w-5 h-5 text-goldenrod mb-4" />
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="font-display text-3xl font-medium text-greek-villa">
                      {feature.stat}
                    </span>
                    <span className="font-body text-sm text-goldenrod">
                      {feature.unit}
                    </span>
                  </div>
                  <h3 className="font-body text-sm uppercase tracking-wider text-greek-villa/60 mb-3">
                    {feature.label}
                  </h3>
                  <p className="font-body text-sm text-greek-villa/70 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologySection;
