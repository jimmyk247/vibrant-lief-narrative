import { motion } from "framer-motion";
import { Instagram, Linkedin, Facebook } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-tricorn-black text-greek-villa py-16 md:py-20">
      <div className="container-wide">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Logo & Tagline */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <span className="font-display text-3xl tracking-[0.3em] font-medium">
                lïef
              </span>
              <span className="block text-xs tracking-[0.4em] uppercase font-body text-greek-villa/60 mt-1">
                Development
              </span>
            </div>
            <p className="font-body text-greek-villa/70 leading-relaxed max-w-md">
              Crafting homes that harmonize Japanese tranquility, 
              Scandinavian minimalism, and Sonoran serenity—designed 
              to endure for generations.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-body text-sm uppercase tracking-wider text-greek-villa/50 mb-6">
              Explore
            </h4>
            <nav className="space-y-3">
              <a href="#projects" className="block font-body text-greek-villa/80 hover:text-greek-villa transition-colors">
                Projects
              </a>
              <a href="#services" className="block font-body text-greek-villa/80 hover:text-greek-villa transition-colors">
                Services
              </a>
              <a href="#technology" className="block font-body text-greek-villa/80 hover:text-greek-villa transition-colors">
                Technology
              </a>
              <a href="#contact" className="block font-body text-greek-villa/80 hover:text-greek-villa transition-colors">
                Contact
              </a>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-body text-sm uppercase tracking-wider text-greek-villa/50 mb-6">
              Connect
            </h4>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center border border-greek-villa/20 hover:border-goldenrod hover:text-goldenrod transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center border border-greek-villa/20 hover:border-goldenrod hover:text-goldenrod transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center border border-greek-villa/20 hover:border-goldenrod hover:text-goldenrod transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-greek-villa/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-sm text-greek-villa/50">
            © {currentYear} Lïef Development. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-body text-sm text-greek-villa/50 hover:text-greek-villa transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-body text-sm text-greek-villa/50 hover:text-greek-villa transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
