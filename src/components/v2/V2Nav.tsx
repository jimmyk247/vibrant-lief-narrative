import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logoConcrete from "@/assets/v2/logo-concrete.png";

const navLinks = [
  { href: "#model", label: "The Model" },
  { href: "#communities", label: "Communities" },
  { href: "#edge", label: "The Edge" },
  { href: "#team", label: "Team" },
];

const V2Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(10,10,10,.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,255,136,.06)" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        <div className="flex items-center gap-6">
          <button
            className="flex items-center transition-all duration-500"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ opacity: scrolled ? 1 : 0, transform: scrolled ? "translateY(0)" : "translateY(8px)", pointerEvents: scrolled ? "auto" : "none" }}
          >
            <img src={logoConcrete} alt="Lïef" className="h-6 md:h-7 w-auto block" />
          </button>
          <span
            className="v2-headline hidden md:flex items-center transition-all duration-500"
            style={{
              fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
              color: "var(--v2-neon)",
              lineHeight: 1,
              letterSpacing: "0.02em",
              height: "28px",
              opacity: scrolled ? 1 : 0,
              transform: scrolled ? "translateY(0)" : "translateY(8px)",
            }}
          >
            BUILT<span className="v2-neon-period">.</span> DIFFERENT<span className="v2-neon-period">.</span>
          </span>
        </div>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="transition-colors duration-300 hover:text-[#00FF88]"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.25rem",
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: scrolled ? "#00FF88" : "#777",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {l.label}
            </button>
          ))}
          <a
            href="mailto:hello@liefdev.com"
            className="transition-all duration-300 hover:bg-[#00FF88] hover:text-[#0a0a0a]"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1.25rem",
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: scrolled ? "#0a0a0a" : "#00FF88",
              border: "1px solid #00FF88",
              padding: "8px 20px",
              cursor: "pointer",
              background: scrolled ? "#00FF88" : "transparent",
            }}
          >
            Contact
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
          style={{ color: "#F5F5F3" }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
            style={{ background: "rgba(10,10,10,.98)", borderTop: "1px solid rgba(0,255,136,.06)" }}
          >
            <nav className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((l) => (
                <button
                  key={l.href}
                  onClick={() => handleNav(l.href)}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1.25rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "#F5F5F3",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  {l.label}
                </button>
              ))}
              <a
                href="mailto:hello@liefdev.com"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1.25rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: "#00FF88",
                  textDecoration: "none",
                  textAlign: "left",
                }}
              >
                Contact
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default V2Nav;
