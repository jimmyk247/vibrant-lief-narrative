import { motion } from "framer-motion";
import { useInView } from "./useInView";
import dotsGreen from "@/assets/v2/dots-green.png";

const ease = [.16, 1, .3, 1] as const;

const V2CTA = () => {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="contact" className="relative py-32 md:py-44" style={{ background: "var(--v2-black)" }}>
      {/* Thin neon line from top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px" style={{ height: "100px", background: "linear-gradient(to bottom, var(--v2-neon), transparent)" }} />

      {/* Centered leaf dots watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img src={dotsGreen} alt="" className="w-[196vw] max-w-[1680px] opacity-[0.02]" />
      </div>

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        {inView && (
          <>
            <motion.h2 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease }} className="v2-headline mb-6" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", color: "var(--v2-white)" }}>
              LET'S<br />BUILD<span className="v2-neon-period">.</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.08, ease }} className="mb-10 max-w-[380px]" style={{ fontWeight: 300, fontSize: "1.3rem", color: "var(--v2-muted)", lineHeight: 1.7 }}>
              Whether you're an investor, a developer, or a future homeowner — we'd like to hear from you.
            </motion.p>
            <motion.a
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.16, ease }}
              href="mailto:hello@liefdev.com"
              className="inline-block transition-all duration-300 hover:brightness-110"
              style={{
                fontFamily: "var(--v2-font-body)", fontSize: "1.25rem", textTransform: "uppercase",
                letterSpacing: "0.14em", fontWeight: 600, background: "var(--v2-neon)",
                color: "var(--v2-deep)", padding: "16px 40px", textDecoration: "none",
              }}
            >
              Start a Conversation
            </motion.a>
          </>
        )}
      </div>
    </section>
  );
};

export default V2CTA;
