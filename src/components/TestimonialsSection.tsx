import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Lïef didn't just build our home—they understood the life we wanted to live in it. Every detail reflects that vision.",
    author: "Michael & Sarah Chen",
    project: "Vista Residence",
  },
  {
    quote: "The level of craftsmanship and attention to detail exceeded every expectation. This is how homes should be built.",
    author: "The Martinez Family",
    project: "Serenia Estate",
  },
  {
    quote: "From the first sketch to move-in day, the process was seamless. They made building a custom home feel effortless.",
    author: "David Thornton",
    project: "Harmonia Retreat",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-card">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-subtitle">Testimonials</span>
          <h2 className="section-title mt-4">What Our Clients Say</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="p-8 bg-background border border-border rounded-sm h-full flex flex-col">
                <Quote className="w-8 h-8 text-accent/40 mb-6" />
                <blockquote className="font-body text-foreground leading-relaxed flex-grow mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <footer className="pt-6 border-t border-border">
                  <cite className="not-italic">
                    <span className="block font-display text-lg text-foreground">
                      {testimonial.author}
                    </span>
                    <span className="block font-body text-sm text-muted-foreground mt-1">
                      {testimonial.project}
                    </span>
                  </cite>
                </footer>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
