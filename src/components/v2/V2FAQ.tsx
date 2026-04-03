import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What makes L\u00efef Development different from other luxury home builders in Arizona?",
    answer:
      "L\u00efef Development is vertically integrated, meaning design, engineering, and construction all happen under one roof with 80% in-house capability and over 300 skilled tradesmen. Most builders outsource key phases which creates communication gaps and quality inconsistencies. L\u00efef's single-team approach means the same people who design your home also build it, eliminating the gaps that cost homeowners time and money.",
  },
  {
    question: "What areas in Arizona does L\u00efef Development build in?",
    answer:
      "L\u00efef Development builds custom luxury homes in Scottsdale, Paradise Valley, and the greater Phoenix metropolitan area. The team specializes in residences designed for the Sonoran Desert environment, incorporating sustainable building practices and materials suited to Arizona's unique climate.",
  },
  {
    question: "What is SABS construction technology?",
    answer:
      "SABS stands for Sonoran, Architectural, Balanced, and Sustainable. It is L\u00efef Development's proprietary construction methodology that uses precision-engineered steel framing and automated manufacturing. SABS delivers faster build times, lower costs, and higher structural quality compared to traditional wood-frame construction, with specifications including 0% flame spread, 260 MPH wind rating, R-75 to R-100 insulation, and 100% mold and termite immunity.",
  },
  {
    question: "What design disciplines does L\u00efef Development handle in-house?",
    answer:
      "L\u00efef Development handles 12 core disciplines in-house: architectural design, structural engineering, general construction, custom millwork, electrical systems, plumbing and mechanical, HVAC engineering, interior design, landscape architecture, smart home integration, custom stone and tile, and fine finishing. This complete mastery across every discipline ensures quality control from first sketch to final walkthrough.",
  },
  {
    question: "How experienced is the L\u00efef Development team?",
    answer:
      "The L\u00efef Development leadership team brings over 100 years of combined expertise. Principal Jesse Fowler has 25+ years in design, build, and development with $300M+ in completed projects. The team includes specialists in custom residential building, architectural design spanning 40+ years, business law with over $100M in transactions, and institutional investment banking. The firm employs 300+ in-house skilled tradesmen and construction managers.",
  },
];

const useInView = (threshold = 0.1) => {
  const [inView, setInView] = useState(false);
  const ref = (node: HTMLElement | null) => {
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(node);
  };
  return { ref, inView };
};

const FAQAccordion = ({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) => {
  return (
    <div className="py-6" style={{ borderTop: "1px solid var(--v2-rule)" }}>
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between text-left gap-4 cursor-pointer"
      >
        <span
          style={{
            fontFamily: "var(--v2-font-body)",
            fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
            fontWeight: 500,
            color: "var(--v2-white)",
            lineHeight: 1.4,
          }}
        >
          {item.question}
        </span>
        <span
          className="shrink-0 mt-1 transition-transform duration-300"
          style={{
            color: "var(--v2-neon)",
            fontSize: "1.5rem",
            lineHeight: 1,
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="overflow-hidden"
          >
            <p
              className="pt-4"
              style={{
                fontFamily: "var(--v2-font-body)",
                fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                color: "var(--v2-white)",
                opacity: 0.7,
                lineHeight: 1.7,
                maxWidth: "48rem",
              }}
            >
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const V2FAQ = () => {
  const { ref, inView } = useInView(0.1);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-20 md:py-28" style={{ background: "var(--v2-deep)" }}>
      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease }}
          className="relative mb-12"
        >
          <div
            className="v2-ghost-text absolute top-0 right-0 md:-right-6"
            style={{ fontSize: "min(7vw, 120px)", lineHeight: 1, color: "rgba(0,107,63,.24)" }}
          >
            FAQ
          </div>
          <div className="v2-label mb-6">Common Questions</div>
          <h2
            className="v2-headline text-4xl md:text-6xl lg:text-7xl mb-4"
            style={{ color: "var(--v2-white)" }}
          >
            ANSWERS<span className="v2-neon-period">.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.2, ease }}
        >
          {faqs.map((faq, i) => (
            <FAQAccordion
              key={i}
              item={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default V2FAQ;
