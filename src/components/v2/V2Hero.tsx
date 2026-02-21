import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import logoGreen from "@/assets/v2/logo-green.png";

const stagger = (i: number) => ({ delay: 0.3 + i * 0.15 });

const V2Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const watermarkY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY < 200);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={ref} className="relative h-screen flex items-center overflow-hidden" style={{ background: "var(--v2-deep)" }}>
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[60%] h-[60%]" style={{ background: "radial-gradient(ellipse at top right, rgba(0,107,63,.12), transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%]" style={{ background: "radial-gradient(ellipse at bottom left, rgba(0,255,136,.04), transparent 70%)" }} />
      </div>

      {/* Ghost watermark logo */}
      <motion.div className="absolute top-20 right-12 pointer-events-none" style={{ y: watermarkY }}>
        <img src={logoGreen} alt="" className="w-[30vw] max-w-[400px] opacity-[0.04]" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ...stagger(0), ease: [.16, 1, .3, 1] }}
          className="v2-label mb-10"
        >
          Development + Construction · Phoenix, AZ
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ...stagger(1), ease: [.16, 1, .3, 1] }}
          className="v2-headline leading-[0.95] mb-8"
          style={{ fontSize: "clamp(5rem, 12vw, 11rem)" }}
        >
          BUILT<span className="v2-neon-period">.</span>
          <br />
          DIFFERENT<span className="v2-neon-period">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ...stagger(2), ease: [.16, 1, .3, 1] }}
          style={{ fontStyle: "italic", fontWeight: 300, fontSize: "1.4rem", color: "var(--v2-muted)", lineHeight: 1.5 }}
        >
          We draw it. We build it. We own it.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ...stagger(3), ease: [.16, 1, .3, 1] }}
          className="mt-4 max-w-[420px]"
          style={{ fontSize: "0.9rem", color: "var(--v2-dim)", lineHeight: 1.7 }}
        >
          Development + Construction consolidated. Concept to concrete. 300 trades, one team, no gaps. Phoenix, AZ.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ...stagger(4), ease: [.16, 1, .3, 1] }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <button
            onClick={() => document.querySelector("#communities")?.scrollIntoView({ behavior: "smooth" })}
            className="transition-all duration-300 hover:brightness-110"
            style={{
              fontFamily: "var(--v2-font-body)",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              fontWeight: 600,
              background: "var(--v2-neon)",
              color: "var(--v2-deep)",
              border: "none",
              padding: "14px 32px",
              cursor: "pointer",
            }}
          >
            View Projects
          </button>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="transition-all duration-300 hover:bg-[#00FF88] hover:text-[#0a0a0a]"
            style={{
              fontFamily: "var(--v2-font-body)",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              fontWeight: 600,
              background: "transparent",
              color: "var(--v2-neon)",
              border: "1px solid var(--v2-neon)",
              padding: "14px 32px",
              cursor: "pointer",
            }}
          >
            Partner With Us
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ opacity: showScroll ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--v2-muted)" }}>Scroll</span>
        <div className="w-px h-16" style={{ background: "linear-gradient(to bottom, var(--v2-neon), transparent)" }} />
      </motion.div>
    </section>
  );
};

export default V2Hero;
