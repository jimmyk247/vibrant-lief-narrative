import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface MetricProps {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
}

const AnimatedMetric = ({ value, suffix, label, delay = 0 }: MetricProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const startTime = Date.now() + delay;
      
      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        
        if (elapsed < 0) {
          requestAnimationFrame(animate);
          return;
        }
        
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.floor(easeOut * value));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="metric-value text-primary">
        {displayValue}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="metric-label mt-3">{label}</div>
    </motion.div>
  );
};

const MetricsSection = () => {
  const metrics = [
    { value: 250, suffix: "+", label: "In-House Craftsmen" },
    { value: 300, suffix: "yr", label: "Built to Last" },
    { value: 50, suffix: "%", label: "Energy Savings" },
    { value: 1, suffix: "st", label: "In Arizona" },
  ];

  return (
    <section id="metrics" className="py-24 md:py-32 bg-background">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-subtitle">The Numbers</span>
          <h2 className="section-title mt-4">Excellence Quantified</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {metrics.map((metric, index) => (
            <AnimatedMetric
              key={metric.label}
              value={metric.value}
              suffix={metric.suffix}
              label={metric.label}
              delay={index * 150}
            />
          ))}
        </div>

        {/* SABS Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-card border border-border rounded-sm">
            <span className="text-sm font-body text-muted-foreground">
              Arizona's #1 Builder using the
            </span>
            <span className="text-sm font-display font-semibold text-primary">
              SABS System by Strata
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MetricsSection;
