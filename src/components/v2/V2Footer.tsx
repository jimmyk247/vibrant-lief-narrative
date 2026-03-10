import logoConcrete from "@/assets/v2/logo-concrete.png";
import dotsConcrete from "@/assets/v2/dots-concrete.png";

const footerLinks = {
  explore: ["Home", "The Model", "Projects", "Lïef x SABS", "Team"],
  partner: ["Developers", "Managing General Contractor", "Distributors"],
};

const V2Footer = () => {
  const handleNav = (label: string) => {
    if (label === "Home") {
      window.location.href = "/";
      return;
    }
    if (label === "Lïef x SABS") {
      window.location.href = "/liefblocks";
      return;
    }
    if (label === "Team") {
      window.location.href = "/team";
      return;
    }
    const map: Record<string, string> = {
      "The Model": "#model",
      Projects: "#communities",
    };
    const target = map[label];
    if (target) document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative" style={{ background: "var(--v2-deep)", borderTop: "1px solid var(--v2-rule)" }}>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <img src={logoConcrete} alt="Lïef" className="h-6 w-auto mb-4" />
            <p className="v2-headline text-sm mb-2" style={{ color: "var(--v2-white)" }}>
              DEVELOPMENT + CONSTRUCTION
            </p>
            <p style={{ fontSize: "1.25rem", color: "var(--v2-neon)" }}>BUILT. DIFFERENT.</p>
            <p className="mt-2" style={{ fontSize: "1.25rem", color: "var(--v2-dim)" }}>Phoenix, Arizona</p>
          </div>

          {/* Explore */}
          <div>
            <h5 className="mb-4" style={{ fontSize: "1.25rem", textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--v2-neon)" }}>Explore</h5>
            <ul className="space-y-3">
              {footerLinks.explore.map((l) => (
                <li key={l}>
                  <button
                    onClick={() => handleNav(l)}
                    style={{ fontSize: "1.25rem", color: "var(--v2-dim)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                    className="hover:text-[#00FF88] transition-colors duration-300"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Partner */}
          <div>
            <h5 className="mb-4" style={{ fontSize: "1.25rem", textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--v2-neon)" }}>Partner</h5>
            <ul className="space-y-3">
              <li>
                <span style={{ fontSize: "1.25rem", color: "var(--v2-dim)" }}>Developers</span>
              </li>
              <li>
                <a href="https://acgarizona.com/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none" }} className="hover:text-[#00FF88] transition-colors duration-300">
                  Managing General Contractor
                </a>
              </li>
              <li>
                <a href="https://www.strataus.com/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none" }} className="hover:text-[#00FF88] transition-colors duration-300">
                  Distributors
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h5 className="mb-4" style={{ fontSize: "1.25rem", textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--v2-neon)" }}>Connect</h5>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@liefdev.com" style={{ fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none" }} className="hover:text-[#00FF88] transition-colors duration-300">
                  hello@liefdev.com
                </a>
              </li>
              <li>
                <a href="#" style={{ fontSize: "1.25rem", color: "var(--v2-dim)", textDecoration: "none" }} className="hover:text-[#00FF88] transition-colors duration-300">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: "1px solid var(--v2-rule)" }}>
          <div>
            <p style={{ fontSize: "1.25rem", color: "var(--v2-dim)" }}>© 2026 Lïef Development + Construction</p>
            <p style={{ fontSize: "1.25rem", color: "var(--v2-dim)", opacity: 0.6, marginTop: "4px" }}>
              A{" "}
              <a href="https://commonground.ventures" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }} className="hover:text-[#00FF88] transition-colors duration-300">
                Common Ground
              </a>{" "}
              venture.
            </p>
          </div>
          <p style={{ fontSize: "1.25rem", color: "var(--v2-dim)", opacity: 0.5 }}>
            Branded by{" "}
            <a href="https://liploicreative.com" target="_blank" rel="noopener noreferrer" style={{ color: "#D4A843", textDecoration: "none" }} className="hover-gold transition-colors duration-300">
              Lip Loi Creative
            </a>
            &nbsp;|&nbsp;Enhanced by{" "}
            <a href="https://apexx.agency" target="_blank" rel="noopener noreferrer" style={{ color: "#8B5CF6", textDecoration: "none" }} className="hover-purple transition-colors duration-300">
              APEXX AI
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default V2Footer;
