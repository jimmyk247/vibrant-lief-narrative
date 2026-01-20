import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Flame, Droplets, Bug, Thermometer, DollarSign, Clock, TrendingUp, BadgeCheck } from "lucide-react";


const features = [
  {
    icon: Flame,
    title: "Anti-Fire",
    description: "Non-combustible concrete shell—the ultimate desert safety standard.",
  },
  {
    icon: Droplets,
    title: "Anti-Mold & Moisture",
    description: "100% impermeable to Arizona's extreme monsoon elements.",
  },
  {
    icon: Bug,
    title: "Anti-Termite",
    description: "Zero wood framing means zero risk from structural pests.",
  },
  {
    icon: Thermometer,
    title: "Thermal Performance",
    description: "Massive HVAC overhead reduction through high-density insulation.",
  },
];

const stats = [
  {
    icon: DollarSign,
    value: "$13",
    unit: "/sq ft",
    label: "Average Savings",
    detail: "Average residential construction costs",
  },
  {
    icon: Clock,
    value: "14",
    unit: "%",
    label: "Timeline Reduction",
    detail: "Average reduction across build types",
  },
  {
    icon: TrendingUp,
    value: "+20",
    unit: "%",
    label: "Efficiency",
    detail: "Increases total project efficiency",
  },
  {
    icon: BadgeCheck,
    value: "100",
    unit: "+",
    label: "Projects Delivered",
    detail: "Proven track record across residential, commercial, and custom builds",
  },
];

const ExcellenceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={containerRef}
      className="relative bg-tricorn-black text-greek-villa py-32 md:py-48 overflow-hidden"
    >
      {/* Subtle Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-[600px] h-px bg-gradient-to-r from-transparent via-greek-villa/20 to-transparent" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="block font-body text-goldenrod text-sm tracking-[0.3em] uppercase mb-6">
            Built to Last
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.02em] leading-[1.1] mb-8">
            Arizona's #1 builder.
            <br />
            <span className="text-goldenrod">SABS™ certified.</span>
          </h2>
          <p className="font-body text-greek-villa/70 text-lg leading-relaxed max-w-2xl">
            Our partnership with Xtrata's revolutionary SABS™ technology isn't
            just a certification—it's validation. We don't just meet
            building codes. We exceed them by generations.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group border border-greek-villa/20 p-6 md:p-8 transition-all duration-300 hover:border-goldenrod/40 hover:bg-greek-villa/[0.02]"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-greek-villa/10 mb-6 transition-all duration-300 group-hover:bg-goldenrod/20 group-hover:scale-110">
                <feature.icon className="w-6 h-6 text-goldenrod transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-display text-goldenrod text-lg font-bold mb-3 transition-colors duration-300 group-hover:text-goldenrod">
                {feature.title}
              </h3>
              <p className="font-body text-greek-villa/60 text-sm leading-relaxed transition-colors duration-300 group-hover:text-greek-villa/80">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
              viewport={{ once: true }}
              className="group border border-greek-villa/20 p-6 md:p-8 transition-all duration-300 hover:border-goldenrod/40 hover:bg-greek-villa/[0.02]"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-greek-villa/10 mb-6 transition-all duration-300 group-hover:bg-goldenrod/20 group-hover:scale-110">
                <stat.icon className="w-6 h-6 text-goldenrod transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="font-display text-greek-villa text-4xl md:text-5xl font-bold transition-colors duration-300 group-hover:text-goldenrod">
                  {stat.value}
                </span>
                <span className="font-body text-greek-villa/50 text-lg transition-colors duration-300 group-hover:text-goldenrod/70">
                  {stat.unit}
                </span>
              </div>
              <h3 className="font-display text-greek-villa text-base font-bold mb-2 transition-colors duration-300 group-hover:text-greek-villa">
                {stat.label}
              </h3>
              <p className="font-body text-greek-villa/50 text-sm leading-relaxed transition-colors duration-300 group-hover:text-greek-villa/70">
                {stat.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center border-t border-greek-villa/10 pt-12"
        >
          <p className="font-body text-lg md:text-xl leading-relaxed mb-4">
            <span className="text-goldenrod font-medium">Structural Superiority:</span>{" "}
            Anti-Fire, Anti-Mold, and Anti-Termite protection are standard.
          </p>
          <p className="font-body text-greek-villa/50 text-base leading-relaxed max-w-3xl mx-auto">
            SABS™ technology radically reduces the number of trades required on-site, 
            allowing for total schedule control and unprecedented quality consistency.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ExcellenceSection;
