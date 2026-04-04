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
      "L\u00efef Development is vertically integrated. Architecture, engineering, construction, and brand creative all operate under one roof with over 300 skilled tradesmen to execute. What that means for you is fewer delays, lower costs, and a finished product that actually looks like what you envisioned. When builders outsource key phases, timelines slip, budgets inflate, and the original vision gets diluted. With 80% in-house capability, L\u00efef controls the schedule and the quality. The team that designs your project is the same team that engineers it, builds it, and brings it to market.",
  },
  {
    question: "What types of projects does L\u00efef Development take on?",
    answer:
      "From condos to customs to communities. L\u00efef has delivered $500M+ in projects across the full range of premium construction: custom estates, multi-family developments, boutique communities, commercial, hospitality, mixed-use, and adaptive reuse. The same integrated team and the same standard of precision applies whether it is a 10,000 square foot residence or a 200-unit development.",
  },
  {
    question: "What is SABS construction technology?",
    answer:
      "SABS stands for Saebi Alternative Building System, a patented technology that uses EPS foam panels, we call them L\u00efef Blocks, with a high-strength cementitious coating called SABSCRETE to create a single monolithic structure. We also think of it as Safe, Architectural, Balanced, and Sustainable. For you, that means 0% flame spread, 250 MPH wind resistance, R-75 to R-100 insulation, and complete mold and termite immunity. It also means 15-20% cost savings and faster build times compared to traditional methods. L\u00efef is the leading SABS builder in Arizona, and we offer it alongside traditional stick framing and other building methods so you can choose the solution that best fits your project.",
  },
  {
    question: "How does L\u00efef approach design?",
    answer:
      "Every project starts with a problem to solve. Not a style to copy. We start with the needs of the project and the story it needs to tell. From there, our design team led by Scott Meiers with 50+ years across every building type translates that into architecture, and MOR Studio grounds it in science \u2014 how people actually live, work, and move through spaces. We bridge the gap between inspiration and execution with evidence. The result is considered design: built on research, not assumption. That process has produced everything from urban residences to desert modern estates to commercial spaces that perform.",
  },
  {
    question: "Who is behind L\u00efef Development?",
    answer:
      "L\u00efef was built by people who have spent their careers doing the work, not talking about it. Jesse Fowler and Jon Armstrong have delivered $500M+ in projects between them, and that experience shows in how they manage risk, control costs, and keep builds on schedule. Scott Meiers has been designing buildings for over 50 years. There is no building type or challenge he has not worked through, which means fewer surprises and faster solutions when complexity shows up. Jimmy Khounlavong spent 16 years at Nike shaping some of the most recognized product lines alongside other leading brands before bringing that discipline to how L\u00efef thinks about brand, story, and market position. It is the piece most builders miss. The team is also backed by general counsel, investor relations, and a workforce of 300+ skilled tradesmen. That means every decision on your project is informed by decades of experience at the highest level.",
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
