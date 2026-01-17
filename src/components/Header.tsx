import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled
          ? "bg-greek-villa/95 backdrop-blur-md py-5"
          : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="group">
          <span
            className={`font-display text-2xl tracking-[0.4em] font-medium transition-colors duration-500 ${
              isScrolled ? "text-tricorn-black" : "text-greek-villa"
            }`}
          >
            lïef
          </span>
        </a>

        {/* Desktop - Minimal CTA */}
        <a
          href="#contact"
          className={`hidden md:inline-flex font-body text-sm tracking-wider transition-colors duration-500 ${
            isScrolled
              ? "text-tricorn-black hover:text-primary"
              : "text-greek-villa/80 hover:text-greek-villa"
          }`}
        >
          Contact
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 transition-colors ${
            isScrolled ? "text-tricorn-black" : "text-greek-villa"
          }`}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden bg-greek-villa border-t border-tricorn-black/10"
          >
            <nav className="px-6 py-8 flex flex-col gap-6">
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-body text-tricorn-black text-lg"
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

export default Header;
