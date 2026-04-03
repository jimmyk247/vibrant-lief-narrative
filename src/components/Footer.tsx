import { motion } from "framer-motion";
import liefLogoLight from "@/assets/lief-logo-light.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-tricorn-black text-greek-villa py-16">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src={liefLogoLight}
              alt="Lïef"
              className="h-6 md:h-8 w-auto"
            />
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-body text-greek-villa/40 text-sm"
          >
            © {currentYear} Lïef Development. Crafting legacies in Arizona.
          </motion.p>

          {/* Branded By */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="font-body text-greek-villa/40 text-sm"
          >
            Branded by{" "}
            <a href="https://liploicreative.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" style={{ color: "#D4A843" }}>
              Lip Loi Creative
            </a>
            {" "}|{" "}Enhanced by{" "}
            <a href="https://commonground.ventures" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" style={{ color: "#8B5CF6" }}>
              Common Ground
            </a>
          </motion.p>

          {/* Minimal Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex items-center gap-8"
          >
            <a
              href="#"
              className="font-body text-greek-villa/40 text-sm hover:text-greek-villa transition-colors duration-300"
            >
              Instagram
            </a>
            <a
              href="#"
              className="font-body text-greek-villa/40 text-sm hover:text-greek-villa transition-colors duration-300"
            >
              LinkedIn
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
