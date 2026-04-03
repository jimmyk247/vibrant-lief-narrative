import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What makes L\u00efef Development different from other builders?",
    answer:
      "L\u00efef Development is vertically integrated. Architecture, engineering, construction, brand, and creative all operate under one roof with 80% in-house capability and over 300 skilled tradesmen. Most builders outsource key phases, which creates gaps between what was envisioned and what gets built. At L\u00efef, the team that designs your project is the same team that engineers it, builds it, and brings it to market. That continuity is what keeps the vision intact from first sketch to final delivery.",
  },
  {
    question: "What types of projects does L\u00efef Development take on?",
    answer:
      "L\u00efef builds across the full spectrum of premium construction. Custom homes from intimate residences to 10,000+ square foot estates. Multi-family developments and boutique communities. Commercial projects including retail, hospitality, and mixed-use. Adaptive reuse and large-scale conversions. Our team has delivered $500M+ in projects across residential, commercial, and community development. Every project gets the same level of precision and care regardless of size or type.",
  },
  {
    question: "What is SABS construction technology?",
    answer:
      "SABS stands for Saebi Alternative Building System, a patented technology that uses EPS foam panels with a high-strength cementitious coating called SABSCRETE to create a monolithic structural system. We also like to think of it as Safe, Architectural, Balanced, and Sustainable. SABS delivers 0% flame spread, 250 MPH wind resistance, R-75 to R-100 insulation, and complete mold and termite immunity, with 15-20% cost savings and faster build times. L\u00efef is the leading SABS builder in Arizona. We offer SABS alongside traditional stick framing and other building methods, so clients get the right system for their project.",
  },
  {
    question: "How does L\u00efef approach design?",
    answer:
      "We do not build buildings for the sake of building them. Every project starts with a question: how will this improve the lives of the people who use it? Our design team, led by Scott Meiers with 50+ years across every building type, works alongside MOR Studio to ground each project in research on how people actually live, work, and move through spaces. The result is considered design. Not a style imposed on a project, but a solution that comes from understanding what the project needs to be. That process has produced everything from Japandi-inspired urban residences to desert modern estates to commercial spaces that perform.",
  },
  {
    question: "Who is behind L\u00efef Development?",
    answer:
      "L\u00efef is led by a team of principals who each bring deep specialization. Jesse Fowler brings 25+ years in development and construction with $500M+ in completed projects. Jon Armstrong brings 15+ years building custom residential and commercial projects across the Phoenix market through Armstrong Construction Group. Scott Meiers brings 50+ years of architectural design across commercial and residential sectors. Jimmy Khounlavong brings 25+ years of brand and product strategy from Nike and global brands, giving L\u00efef an in-house creative capability that most builders lack. The team is backed by general counsel, investor relations, and a network of 300+ skilled tradesmen.",
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
