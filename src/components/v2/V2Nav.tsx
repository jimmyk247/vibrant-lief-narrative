import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logoConcrete from "@/assets/v2/logo-concrete.png";

interface NavLink {
  href: string;
  label: string;
  type: "scroll" | "route";
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home", type: "route" },
  { href: "#model", label: "The Model", type: "scroll" },
  { href: "#communities", label: "Projects", type: "scroll" },
  { href: "/liefblocks", label: "LÏEF X SABS", type: "route" },
  { href: "/team", label: "Team", type: "route" },
];

const V2Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [contactHovered, setContactHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is currently in view for scroll-type nav links
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sectionIds = navLinks
      .filter((l) => l.type === "scroll")
      .map((l) => l.href.replace("#", ""));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.05, rootMargin: "-80px 0px -60% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const isLinkActive = (link: NavLink) => {
    if (link.type === "route") {
      if (link.href === "/" && location.pathname === "/") {
        // Home is only active when no scroll section is in view
        return !activeSection;
      }
      return location.pathname === link.href;
    }
    // For scroll links, check if we're on homepage and section is active
    return location.pathname === "/" && activeSection === link.href;
  };

  const handleNav = (link: NavLink) => {
    setMobileOpen(false);
    if (link.type === "route") {
      navigate(link.href);
      window.scrollTo({ top: 0 });
    } else {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const el = document.querySelector(link.href);
          el?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const el = document.querySelector(link.href);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleLogo = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
            onClick={handleLogo}
            style={{ opacity: scrolled ? 1 : 0, transform: scrolled ? "translateY(0)" : "translateY(8px)", pointerEvents: scrolled ? "auto" : "none" }}
          >
            <img src={logoConcrete} alt="Lïef" className="h-6 md:h-7 w-auto block" />
          </button>
          <span
            className="v2-headline hidden lg:flex items-center transition-all duration-500"
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
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((l) => {
            const active = isLinkActive(l);
            const hovered = hoveredLink === l.href;
            return (
              <button
                key={l.href}
                onClick={() => handleNav(l)}
                onMouseEnter={() => setHoveredLink(l.href)}
                onMouseLeave={() => setHoveredLink(null)}
                className="transition-all duration-300"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: active || hovered
                    ? "#00FF88"
                    : scrolled
                      ? "#F5F5F3"
                      : "#777",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {l.label}
              </button>
            );
          })}
          <a
            href="mailto:hello@liefdev.com"
            className="transition-all duration-300"
            onMouseEnter={() => setContactHovered(true)}
            onMouseLeave={() => setContactHovered(false)}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: contactHovered ? "#0a0a0a" : "#00FF88",
              border: "1px solid #00FF88",
              padding: "8px 20px",
              cursor: "pointer",
              background: contactHovered ? "#00FF88" : "transparent",
            }}
          >
            Contact
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden"
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
            className="lg:hidden"
            style={{ background: "rgba(10,10,10,.98)", borderTop: "1px solid rgba(0,255,136,.06)" }}
          >
            <nav className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((l) => (
                <button
                  key={l.href}
                  onClick={() => handleNav(l)}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: isLinkActive(l) ? "#00FF88" : "#F5F5F3",
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
                  fontSize: "1rem",
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
