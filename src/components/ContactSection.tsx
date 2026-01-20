import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="relative bg-greek-villa py-32 md:py-48">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-display text-tricorn-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.02em] leading-[1.1] mb-8">
            Ready to begin
            <br />
            <span className="italic font-normal">your legacy?</span>
          </h2>
          <p className="font-body text-urbane-bronze/70 text-lg md:text-xl max-w-xl mx-auto">
            Every exceptional home starts with a conversation.
          </p>
        </motion.div>

        {/* Contact Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <a
            href="mailto:hello@liefdev.com"
            className="group inline-flex items-center gap-4 px-10 py-5 bg-tricorn-black text-greek-villa font-body text-lg tracking-wide hover:bg-urbane-bronze transition-colors duration-500"
          >
            <span>Start a conversation</span>
            <ArrowRight
              size={20}
              className="transform group-hover:translate-x-2 transition-transform duration-300"
            />
          </a>
        </motion.div>

        {/* Subtle Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12"
        >
          <div className="text-center">
            <span className="block font-body text-urbane-bronze/40 text-xs tracking-[0.2em] uppercase mb-2">
              Location
            </span>
            <span className="font-body text-tricorn-black text-sm">
              Phoenix, Arizona
            </span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-urbane-bronze/20" />
          <div className="text-center">
            <span className="block font-body text-urbane-bronze/40 text-xs tracking-[0.2em] uppercase mb-2">
              Email
            </span>
            <a
              href="mailto:hello@liefdev.com"
              className="font-body text-tricorn-black text-sm hover:text-primary transition-colors"
            >
              hello@liefdev.com
            </a>
          </div>
          <div className="hidden sm:block w-px h-8 bg-urbane-bronze/20" />
          <div className="text-center">
            <span className="block font-body text-urbane-bronze/40 text-xs tracking-[0.2em] uppercase mb-2">
              Phone
            </span>
            <a
              href="tel:+18057227598"
              className="font-body text-tricorn-black text-sm hover:text-primary transition-colors"
            >
              (805) 722-7598
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
