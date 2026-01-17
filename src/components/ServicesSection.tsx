import { motion } from "framer-motion";
import { Compass, Palette, Hammer, Sparkles } from "lucide-react";

const services = [
  {
    icon: Compass,
    title: "Architectural Design",
    description: "Timeless spaces that inspire, evoke emotion, and harmonize beauty with purpose.",
    features: ["Custom Design", "Site Planning", "3D Visualization"],
  },
  {
    icon: Palette,
    title: "Interior Design",
    description: "Elevated interiors that blend luxury, function, and artistry—crafted to inspire.",
    features: ["Material Curation", "Furniture Design", "Art Procurement"],
  },
  {
    icon: Hammer,
    title: "General Construction",
    description: "Precision-built excellence with strict standards, powered by 250+ in-house craftsmen.",
    features: ["Project Management", "Quality Control", "Timeline Guarantee"],
  },
  {
    icon: Sparkles,
    title: "Brand Direction",
    description: "Storytelling-driven branding that creates iconic, enduring brands—not just buildings.",
    features: ["Identity Design", "Marketing Strategy", "Launch Planning"],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-background">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-subtitle">What We Do</span>
          <h2 className="section-title mt-4">Full Vertical Integration</h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto mt-6">
            We handle every aspect of development in-house—design, architecture, 
            construction, and branding—ensuring seamless execution and a cohesive 
            vision from concept to completion.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="h-full p-8 bg-card border border-border hover:border-primary/30 transition-all duration-500 rounded-sm">
                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-sm mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-medium text-foreground mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li 
                      key={feature} 
                      className="font-body text-sm text-foreground/80 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-accent rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
