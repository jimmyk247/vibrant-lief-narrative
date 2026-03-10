import "@/styles/v2.css";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "@/components/v2/useInView";
import { Flame, Droplets, Bug, Thermometer, Shield, Wind, Recycle, Volume2 } from "lucide-react";
import V2Nav from "@/components/v2/V2Nav";
import V2Footer from "@/components/v2/V2Footer";
import logoConcrete from "@/assets/v2/logo-concrete.png";
import liefLogoGreen from "@/assets/v2/lief-logo-green.png";
import osbornImg from "@/assets/v2/301-osborn.png";
import canyonImg from "@/assets/v2/canyon-corporate.jpg";
import silverImg from "@/assets/v2/silver-mountain.jpg";
import basinImg from "@/assets/v2/pahrump-basin.jpg";
import dotsNeon from "@/assets/v2/dots-neon.png";

/* ── PARTNER LOGOS ── */
import logoRitzCarlton from "@/assets/v2/logos/ritz-carlton.png";
import logoDiscovery from "@/assets/v2/logos/discovery-channel.png";
import logoPgaTour from "@/assets/v2/logos/pga-tour.png";
import logoAD from "@/assets/v2/logos/architectural-digest.png";
import logoCobra from "@/assets/v2/logos/shelby.png";
import logoLacma from "@/assets/v2/logos/lacma.png";
import logoHgtv from "@/assets/v2/logos/hgtv.png";
import logoPlanetGreen from "@/assets/v2/logos/planet-green.png";
import logoDiy from "@/assets/v2/logos/diy-network.png";
import logoOakley from "@/assets/v2/logos/oakley.png";
import logoForbes from "@/assets/v2/logos/forbes.png";
import logoMarucci from "@/assets/v2/logos/marucci.png";
import logoBuilder from "@/assets/v2/logos/builder-magazine.png";
import logoFoxRacing from "@/assets/v2/logos/fox.png";
import logoMaya from "@/assets/v2/logos/maya.png";
import logoKW from "@/assets/v2/logos/keller-williams.png";
import logoZillow from "@/assets/v2/logos/zillow.png";
import logoUSNews from "@/assets/v2/logos/us-news.png";
import logoRobbReport from "@/assets/v2/logos/robb-report.png";
import logoLATimes from "@/assets/v2/logos/la-times.png";

/* ── PRESS LOGOS ── */
import logoNBC from "@/assets/v2/logos/nbc.svg";
import logoFoxNews from "@/assets/v2/logos/fox-news.svg";
import logoCBS from "@/assets/v2/logos/cbs.svg";
import logoPBS from "@/assets/v2/logos/pbs.svg";
import logoAZCentral from "@/assets/v2/logos/az-central.svg";
import logoAZFamily from "@/assets/v2/logos/az-family.svg";
import logoABC15 from "@/assets/v2/logos/abc15.svg";
import logoFox10 from "@/assets/v2/logos/fox10.svg";
import logoAZRepublic from "@/assets/v2/logos/arizona-republic.svg";
import logoBizJournal from "@/assets/v2/logos/business-journal.svg";

const ease = [.16, 1, .3, 1] as const;
const accentColor = "#00FF88";

/* ── DATA ── */

const specs = [
  { value: "0%", label: "Flame Spread" },
  { value: "260 MPH", label: "Wind Rating" },
  { value: "R-75 to R-100", label: "Insulation Rating" },
  { value: "100%", label: "Mold & Termite Immune" },
];

const attributes = [
  { icon: Flame, title: "Anti-Fire", desc: "Non-combustible concrete shell with 0% flame spread — the ultimate desert safety standard." },
  { icon: Droplets, title: "Anti-Mold & Moisture", desc: "100% impermeable to Arizona's extreme monsoon elements. Zero moisture intrusion." },
  { icon: Bug, title: "Anti-Termite", desc: "Zero wood framing means zero risk from structural pests. Permanent protection." },
  { icon: Thermometer, title: "Thermal Performance", desc: "R-75 to R-100 insulation rating. Massive HVAC overhead reduction through high-density insulation." },
];

const stats = [
  { value: "$13", suffix: "/sq ft", label: "Average Savings", desc: "Average residential construction cost savings" },
  { value: "14", suffix: "%", label: "Timeline Reduction", desc: "Average reduction across build types" },
  { value: "+20", suffix: "%", label: "Efficiency", desc: "Increases total project efficiency" },
  { value: "100", suffix: "+", label: "Projects Delivered", desc: "SABS Technology has delivered 100+ projects in multiple climates and regions" },
];

const technicals = [
  { title: "ICC-ES ESR-1638", detail: "Evaluation report covering structural use in residential and commercial applications" },
  { title: "ASTM C578 Type XI", detail: "Standard specification for rigid cellular polystyrene thermal insulation" },
  { title: "ASTM E-84 Class A", detail: "Surface burning characteristics — Class A fire rating for flame spread and smoke development" },
  { title: "STC 52 Sound Rating", detail: "Sound Transmission Class rating exceeding standard wood-frame construction" },
  { title: "Category A–F Seismic", detail: "Engineered for all seismic design categories per IBC requirements" },
  { title: "100% Recyclable", detail: "EPS foam core is fully recyclable — zero construction waste to landfill" },
  { title: "260 MPH Wind Rating", detail: "Exceeds Florida hurricane zone requirements — built for extreme conditions" },
  { title: "R-75 to R-100 Insulation", detail: "Superior thermal envelope far exceeding conventional construction standards" },
];

const technicalIcons = [Shield, Shield, Flame, Volume2, Shield, Recycle, Wind, Thermometer];

const projects = [
  {
    img: osbornImg,
    name: "301 W Osborn",
    type: "Adaptive Reuse",
    desc: "Commercial to residential conversion. 23 luxury urban units with secure parking & conditioned storage. Full SABS build.",
    location: "Midtown, Phoenix AZ",
    status: "SABS Showcase",
  },
  {
    img: canyonImg,
    name: "Canyon Corporate Plaza",
    type: "Office-to-Residential",
    desc: "14-story conversion from commercial office to modern residential. SABS cementitious coating system throughout.",
    location: "Phoenix, AZ",
    status: "In Development",
  },
  {
    img: silverImg,
    name: "Silver Mountain Ranches",
    type: "Equestrian Community",
    desc: "100+ acre equestrian community with luxury custom homes built using LÏEF Blocks with SABS Technology.",
    location: "Scottsdale, AZ",
    status: "In Development",
  },
  {
    img: basinImg,
    name: "440 Basin Avenue",
    type: "Multi-Family",
    desc: "204-unit multi-family development. $56M savings vs. traditional construction methods.",
    location: "Pahrump, NV",
    status: "In Development",
  },
];

const pressOutlets = [
  { name: "NBC", src: logoNBC },
  { name: "Fox News", src: logoFoxNews },
  { name: "CBS", src: logoCBS },
  { name: "PBS", src: logoPBS },
  { name: "AZ Central", src: logoAZCentral },
  { name: "AZ Family", src: logoAZFamily },
  { name: "ABC15", src: logoABC15 },
  { name: "Fox 10", src: logoFox10 },
  { name: "Arizona Republic", src: logoAZRepublic },
  { name: "Business Journal", src: logoBizJournal },
];

const trustLogos = [
  { name: "Ritz-Carlton", src: logoRitzCarlton },
  { name: "Discovery Channel", src: logoDiscovery },
  { name: "PGA Tour", src: logoPgaTour },
  { name: "Architectural Digest", src: logoAD },
  { name: "Cobra", src: logoCobra },
  { name: "LACMA", src: logoLacma },
  { name: "HGTV", src: logoHgtv },
  { name: "Planet Green", src: logoPlanetGreen },
  { name: "DIY Network", src: logoDiy },
  { name: "Oakley", src: logoOakley },
  { name: "Forbes", src: logoForbes },
  { name: "Marucci", src: logoMarucci },
  { name: "Builder", src: logoBuilder },
  { name: "Fox Racing", src: logoFoxRacing },
  { name: "Maya", src: logoMaya },
  { name: "Keller Williams", src: logoKW },
  { name: "Zillow", src: logoZillow },
  { name: "U.S. News", src: logoUSNews },
  { name: "Robb Report", src: logoRobbReport },
  { name: "Los Angeles Times", src: logoLATimes },
];

/* ── CALCULATOR ── */

const projectTypes: Record<string, { traditional: number; liefBlocks: number }> = {
  "Single Family Residential": { traditional: 185, liefBlocks: 145 },
  "Multi-Family Residential": { traditional: 165, liefBlocks: 130 },
  "Commercial Office": { traditional: 200, liefBlocks: 160 },
  "Mixed-Use Development": { traditional: 190, liefBlocks: 150 },
  "Adaptive Reuse / Conversion": { traditional: 175, liefBlocks: 140 },
};

/* ── PAGE ── */

const LiefBlocks = () => {
  const [projectType, setProjectType] = useState("Single Family Residential");
  const [sqft, setSqft] = useState(5000);
  const costs = projectTypes[projectType];
  const totalSavings = (costs.traditional - costs.liefBlocks) * sqft;
  const savingsPercent = Math.round(((costs.traditional - costs.liefBlocks) / costs.traditional) * 100);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);
  const heroY = useTransform(heroScroll, [0, 0.5], [0, 100]);

  const { ref: whatRef, inView: whatInView } = useInView(0.1);
  const { ref: specsRef, inView: specsInView } = useInView(0.1);
  const { ref: statsRef, inView: statsInView } = useInView(0.1);
  const { ref: techRef, inView: techInView } = useInView(0.1);
  const { ref: vidRef, inView: vidInView } = useInView(0.1);
  const { ref: projRef, inView: projInView } = useInView(0.1);
  const { ref: pressRef, inView: pressInView } = useInView(0.1);
  const { ref: calcRef, inView: calcInView } = useInView(0.1);
  const { ref: ctaRef, inView: ctaInView } = useInView(0.1);

  return (
    <div className="v2 min-h-screen overflow-x-hidden">
      <V2Nav />
      <main>

        {/* ════════ HERO ════════ */}
        <section ref={heroRef} className="relative h-screen flex items-center overflow-x-hidden" style={{ background: "var(--v2-deep)" }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[70%] h-[70%]" style={{ background: "radial-gradient(ellipse at top right, rgba(0,107,63,.15), transparent 70%)" }} />
            <div className="absolute bottom-0 left-0 w-[50%] h-[50%]" style={{ background: "radial-gradient(ellipse at bottom left, rgba(0,255,136,.06), transparent 70%)" }} />
          </div>
          <motion.div style={{ opacity: heroOpacity, y: heroY, willChange: "transform, opacity" }} className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease }}>
              <div className="v2-label mb-8">
                Proprietary Building System
              </div>
              <div className="mb-4">
                <img src={liefLogoGreen} alt="Lïef" className="h-[clamp(4.6rem,20.7vw,10.91rem)] md:h-[clamp(5.03rem,13.42vw,10.91rem)] w-auto block mb-[-1rem] md:mb-[-0.15em]" style={{ border: "none", filter: "brightness(0) invert(1)" }} />
                <h1 className="v2-headline leading-[1.1] md:leading-[0.3]" style={{ fontSize: "clamp(36px, 10vw, 80px)", color: "var(--v2-white)" }}>
                  BLOCKS<br className="md:hidden" /><span className="md:inline"> &nbsp;</span><span style={{ color: "var(--v2-neon)" }}>x</span>&nbsp; SABS
                </h1>
              </div>
              <p className="mt-10 max-w-[550px]" style={{ fontWeight: 300, fontSize: "1.1rem", color: "var(--v2-muted)", lineHeight: 1.6 }}>
                Our proprietary EPS foam structural panel system, engineered with SABS cementitious technology. Faster. Stronger. Smarter.
              </p>
              <div className="flex flex-wrap gap-4 mt-10">
                <a
                  href="mailto:hello@liefdev.com"
                  className="inline-block transition-all duration-300 hover:brightness-110"
                  style={{
                    fontFamily: "var(--v2-font-body)", fontSize: "clamp(1rem, 2.5vw, 1.25rem)", textTransform: "uppercase",
                    letterSpacing: "0.14em", fontWeight: 600, background: "var(--v2-neon)",
                    color: "var(--v2-deep)", padding: "10px 24px", textDecoration: "none",
                  }}
                >
                  Get a Quote
                </a>
                <button
                  onClick={() => document.querySelector("#what-section")?.scrollIntoView({ behavior: "smooth" })}
                  className="transition-all duration-300 hover:bg-[#00FF88] hover:text-[#0a0a0a]"
                  style={{
                    fontFamily: "var(--v2-font-body)", fontSize: "clamp(1rem, 2.5vw, 1.25rem)", textTransform: "uppercase",
                    letterSpacing: "0.14em", color: accentColor, border: `1px solid ${accentColor}`,
                    padding: "10px 24px", background: "transparent", cursor: "pointer",
                  }}
                >
                  Learn More
                </button>
              </div>
            </motion.div>
          </motion.div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--v2-dim)" }}>SCROLL</span>
            <div style={{ width: "1px", height: "40px", background: `linear-gradient(to bottom, ${accentColor}, transparent)` }} />
          </div>
        </section>

        {/* ════════ WHAT ARE LÏEF BLOCKS ════════ */}
        <section id="what-section" className="relative py-12 md:py-28" style={{ background: "var(--v2-deep)", borderTop: "1px solid var(--v2-rule)" }}>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <img src={dotsNeon} alt="" className="w-[176vw] max-w-[1512px] opacity-[0.01]" />
          </div>
          <div ref={whatRef} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
            {whatInView && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12 items-center">
                <div>
                  <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease }} className="v2-label mb-6">

                    The Technology
                  </motion.div>
                  <motion.h2 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.08, ease }} className="v2-headline text-3xl md:text-5xl lg:text-6xl mb-6" style={{ color: "var(--v2-white)" }}>
                    WHAT ARE<br /><img src={liefLogoGreen} alt="Lïef" className="inline-block h-[1.3em] w-auto" style={{ verticalAlign: "bottom", marginTop: "-0.25em", marginBottom: "-0.15em", marginRight: "0.12em" }} />BLOCKS<span className="v2-neon-period">?</span>
                  </motion.h2>
                  <motion.p initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.16, ease }} className="mb-6" style={{ fontWeight: 300, fontSize: "1.25rem", color: "var(--v2-muted)", lineHeight: 1.8 }}>
                    LÏEF Blocks are proprietary EPS (Expanded Polystyrene) foam structural panels that form the structural core of walls, floors, and roofs. Once assembled, they're coated with SABS (Saebi Alternative Building System) — a cementitious compound that transforms foam panels into fire-proof, mold-proof, termite-proof concrete structures.
                  </motion.p>
                  <motion.p initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.24, ease }} style={{ fontWeight: 300, fontSize: "1.25rem", color: "var(--v2-muted)", lineHeight: 1.8 }}>
                    As Arizona's premier SABS-certified developer and builder, we offer this advanced building system alongside traditional construction methods — giving our partners the flexibility to choose the right approach for every project.
                  </motion.p>
                </div>

                {/* Visual — block diagram */}
                <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.32, ease }} className="flex justify-center">
                  <div className="w-full max-w-[360px]">
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="transition-all duration-500"
                          style={{
                            aspectRatio: "2/1",
                            border: `1px solid ${accentColor}`,
                            background: "rgba(0,255,136,.05)",
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,255,136,.2)"; e.currentTarget.style.boxShadow = `0 0 20px rgba(0,255,136,.15)`; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,255,136,.05)"; e.currentTarget.style.boxShadow = "none"; }}
                        />
                      ))}
                    </div>
                    <p className="text-center" style={{ fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", color: accentColor }}>
                      EPS Foam Core + SABS Coating = Structural Concrete
                    </p>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </section>

        {/* ════════ SPECS GRID ════════ */}
        <section className="relative py-12 md:py-20" style={{ background: "var(--v2-deep)", borderTop: "1px solid var(--v2-rule)" }}>
          <div ref={specsRef} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
            {specsInView && (
              <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease }} className="grid grid-cols-2 md:grid-cols-4 gap-px">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="p-6 md:p-8 text-center transition-all duration-500"
                    style={{ border: "1px solid var(--v2-rule)", background: "rgba(0,255,136,.02)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.boxShadow = `0 0 30px rgba(0,255,136,.08)`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--v2-rule)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div className="v2-headline mb-2" style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", color: accentColor }}>{spec.value}</div>
                    <div style={{ fontSize: "0.85rem", color: "var(--v2-dim)", letterSpacing: "0.05em" }}>{spec.label}</div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* ════════ ATTRIBUTES + STATS (The Edge style) ════════ */}
        <section className="relative py-12 md:py-28" style={{ background: "#006B3F" }}>
          <div className="absolute inset-x-0 top-0 h-[40%] pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(0,0,0,.12), transparent)" }} />
          <div ref={statsRef} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
            {statsInView && (
              <>
                <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease }} className="mb-6" style={{ fontSize: "1.25rem", textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(0,255,136,.6)" }}>

                  Performance
                </motion.div>

                <motion.h2 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.08, ease }} className="v2-headline text-4xl md:text-6xl lg:text-7xl mb-6" style={{ color: "var(--v2-white)" }}>
                  WE BUILD<br /><span style={{ color: "var(--v2-neon)" }}>SMARTER<span className="v2-neon-period">.</span></span>
                </motion.h2>

                <motion.p initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.16, ease }} className="max-w-[550px] mb-20" style={{ fontWeight: 300, fontSize: "1.25rem", color: "rgba(245,245,243,.7)", lineHeight: 1.8 }}>
                  Arizona's #1 SABS-trained builder. Lïef Blocks with SABS Technology radically reduces the number of trades required on-site, allowing for total schedule control and unprecedented quality consistency.
                </motion.p>

                {/* Attribute cards */}
                <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.24, ease }} className="grid grid-cols-1 sm:grid-cols-2 gap-px mb-px">
                  {attributes.map((attr) => {
                    const Icon = attr.icon;
                    return (
                      <div
                        key={attr.title}
                        className="p-6 md:p-8 transition-all duration-500 group"
                        style={{ border: "1px solid rgba(245,245,243,.08)", background: "rgba(0,0,0,.15)" }}
                        onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 40px rgba(0,255,136,.12), inset 0 1px 0 ${accentColor}40`}
                        onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
                      >
                        <div className="w-14 h-14 flex items-center justify-center mb-5" style={{ border: `1px solid ${accentColor}40` }}>
                          <Icon size={32} style={{ color: accentColor }} />
                        </div>
                        <h4 className="mb-3" style={{ fontSize: "1.25rem", fontWeight: 600, color: accentColor, textTransform: "uppercase" }}>{attr.title}</h4>
                        <p style={{ fontSize: "1.25rem", color: "rgba(245,245,243,.6)", lineHeight: 1.6 }}>{attr.desc}</p>
                      </div>
                    );
                  })}
                </motion.div>

                {/* Stat cards */}
                <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.32, ease }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="p-6 md:p-8 transition-all duration-500"
                      style={{ border: "1px solid rgba(245,245,243,.08)", background: "rgba(0,0,0,.15)" }}
                      onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 40px rgba(0,255,136,.12), inset 0 1px 0 ${accentColor}40`}
                      onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
                    >
                      <div className="v2-headline mb-1" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--v2-white)" }}>
                        {stat.value}<span style={{ fontSize: "0.5em", fontWeight: 400 }}>{stat.suffix}</span>
                      </div>
                      <div className="mb-2" style={{ fontSize: "1rem", textTransform: "uppercase", color: "var(--v2-white)", letterSpacing: "0.1em", fontWeight: 600 }}>{stat.label}</div>
                      <div style={{ fontSize: "0.9rem", color: "rgba(245,245,243,.55)", lineHeight: 1.5 }}>{stat.desc}</div>
                    </div>
                  ))}
                </motion.div>
              </>
            )}
          </div>
        </section>

        {/* ════════ ICC CERTIFIED TECHNICALS ════════ */}
        <section className="relative py-12 md:py-28" style={{ background: "var(--v2-deep)" }}>
          <div className="v2-ghost-text hidden lg:block top-16 right-8" style={{ fontSize: "min(10vw, 140px)", color: "rgba(0,255,136,.04)" }}>CERTIFIED</div>
          <div ref={techRef} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
            {techInView && (
              <>
                <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease }} className="v2-label mb-6">

                  Certified Technicals
                </motion.div>
                <motion.h2 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.08, ease }} className="v2-headline text-4xl md:text-6xl lg:text-7xl mb-6" style={{ color: "var(--v2-white)" }}>
                  ICC/ES<br /><span style={{ color: "var(--v2-neon)" }}>APPROVED<span className="v2-neon-period">.</span></span>
                </motion.h2>
                <motion.p initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.16, ease }} className="max-w-[600px] mb-16" style={{ fontWeight: 300, fontSize: "1.25rem", color: "var(--v2-muted)", lineHeight: 1.8 }}>
                  Every component of the LÏEF Blocks system is tested, certified, and code-compliant. No shortcuts. No workarounds.
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.24, ease }} className="grid grid-cols-1 md:grid-cols-2 gap-px">
                  {technicals.map((tech, i) => {
                    const Icon = technicalIcons[i];
                    return (
                      <div
                        key={tech.title}
                        className="flex items-start gap-5 p-6 md:p-8 transition-all duration-500"
                        style={{ border: "1px solid var(--v2-rule)", background: "rgba(0,255,136,.01)" }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${accentColor}40`; e.currentTarget.style.background = "rgba(0,255,136,.03)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--v2-rule)"; e.currentTarget.style.background = "rgba(0,255,136,.01)"; }}
                      >
                        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center mt-1" style={{ border: `1px solid ${accentColor}30` }}>
                          <Icon size={20} style={{ color: accentColor }} />
                        </div>
                        <div>
                          <h4 className="mb-2" style={{ fontWeight: 600, fontSize: "1.1rem", color: "var(--v2-white)" }}>{tech.title}</h4>
                          <p style={{ fontSize: "0.95rem", color: "var(--v2-dim)", lineHeight: 1.6 }}>{tech.detail}</p>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </>
            )}
          </div>
        </section>

        {/* ════════ VIDEO ════════ */}
        <section className="relative py-12 md:py-28" style={{ background: "var(--v2-deep)", borderTop: "1px solid var(--v2-rule)" }}>
          <div ref={vidRef} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
            {vidInView && (
              <>
                <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease }} className="v2-label mb-6">

                  See It Built
                </motion.div>
                <motion.h2 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.08, ease }} className="v2-headline text-4xl md:text-5xl mb-12" style={{ color: "var(--v2-white)" }}>
                  HOW IT WORKS<span className="v2-neon-period">.</span>
                </motion.h2>

                <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.16, ease }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative w-full" style={{ aspectRatio: "16/9", border: "1px solid var(--v2-rule)", overflow: "hidden" }}>
                    <iframe
                      src="https://www.youtube.com/embed/aQFVqs_XrEY"
                      title="How LÏEF Blocks Work"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                      style={{ border: "none" }}
                    />
                  </div>
                  <div className="relative w-full" style={{ aspectRatio: "16/9", border: "1px solid var(--v2-rule)", overflow: "hidden" }}>
                    <iframe
                      src="https://www.youtube.com/embed/vXAN6usiCGg"
                      title="SABS Build System"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                      style={{ border: "none" }}
                    />
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </section>

        {/* ════════ PROJECTS ════════ */}
        <section className="relative overflow-hidden py-12 md:py-28" style={{ background: "var(--v2-deep)" }}>
          <div className="v2-ghost-text hidden lg:block top-8 right-8 text-right" style={{ fontSize: "min(12vw, 150px)", color: "rgba(0,107,63,.24)" }}>PROJECTS</div>
          <div ref={projRef} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
            {projInView && (
              <>
                <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease }} className="v2-label mb-6">

                  Built With LÏEF Blocks
                </motion.div>
                <motion.h2 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.08, ease }} className="v2-headline text-4xl md:text-6xl lg:text-7xl mb-16" style={{ color: "var(--v2-white)" }}>
                  THE WORK<br /><span style={{ color: "var(--v2-neon)" }}>SPEAKS<span className="v2-neon-period">.</span></span>
                </motion.h2>

                <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.16, ease }} className="grid grid-cols-1 md:grid-cols-2 gap-px">
                  {projects.map((proj) => (
                    <div key={proj.name} className="relative overflow-hidden group" style={{ minHeight: "380px", border: "1px solid var(--v2-rule)" }}>
                      <img src={proj.img} alt={proj.name} className="absolute inset-0 w-full h-full object-cover grayscale brightness-[.4] transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-[.6]" />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,.95) 0%, rgba(10,10,10,.3) 60%, transparent 100%)" }} />
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5" style={{ background: "rgba(0,0,0,.8)", border: `1px solid ${accentColor}`, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: accentColor }}>
                          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: accentColor, display: "inline-block" }} />
                          {proj.status}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 p-8 z-10">
                        <h3 className="v2-headline text-xl md:text-2xl mb-1" style={{ color: "var(--v2-white)" }}>{proj.name}</h3>
                        <p className="mb-2" style={{ fontSize: "0.9rem", color: accentColor, letterSpacing: "0.05em" }}>{proj.type}</p>
                        <p className="max-w-md mb-3" style={{ fontSize: "0.95rem", color: "var(--v2-muted)", lineHeight: 1.6 }}>{proj.desc}</p>
                        <p style={{ fontSize: "0.8rem", color: "var(--v2-dim)" }}>{proj.location}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </>
            )}
          </div>
        </section>

        {/* ════════ AS FEATURED IN ════════ */}
        <section className="relative py-12 md:py-20" style={{ background: "var(--v2-deep)", borderTop: "1px solid var(--v2-rule)" }}>
          <div ref={pressRef} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
            {pressInView && (
              <>
                <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease }} className="v2-label mb-12">As Featured In</motion.div>
                <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.08, ease }} className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-20">
                  {pressOutlets.map((outlet) => (
                    <img
                      key={outlet.name}
                      src={outlet.src}
                      alt={outlet.name}
                      className="v2-press-logo"
                      style={{ height: "48px", width: "auto", objectFit: "contain" }}
                    />
                  ))}
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.16, ease }} className="v2-label mb-10">Trusted By Industry Leaders</motion.div>
                <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.24, ease }} className="flex flex-wrap justify-center items-center gap-10 md:gap-14">
                  {trustLogos.map((logo) => (
                    <img
                      key={logo.name}
                      src={logo.src}
                      alt={logo.name}
                      className="v2-partner-logo"
                      style={{ height: "60px", width: "auto", objectFit: "contain" }}
                    />
                  ))}
                </motion.div>
              </>
            )}
          </div>
        </section>

        {/* ════════ COST CALCULATOR ════════ */}
        <section className="relative py-12 md:py-28" style={{ background: "var(--v2-deep)", borderTop: "1px solid var(--v2-rule)" }}>
          <div ref={calcRef} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
            {calcInView && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
                <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease }}>
                  <div className="v2-label mb-6">Savings Calculator</div>
                  <h2 className="v2-headline text-4xl md:text-6xl lg:text-7xl mb-6" style={{ color: "var(--v2-white)" }}>
                    SEE THE<br /><span style={{ color: "var(--v2-neon)" }}>DIFFERENCE</span><span className="v2-neon-period">.</span>
                  </h2>
                  <p className="max-w-md" style={{ fontWeight: 300, fontSize: "1.25rem", color: "var(--v2-muted)", lineHeight: 1.8 }}>
                    Estimate your project savings with LÏEF Blocks compared to traditional construction.
                  </p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.08, ease }} className="p-8 md:p-10" style={{ border: "1px solid var(--v2-rule)", background: "rgba(0,255,136,.01)" }}>
                  <label className="block mb-2" style={{ fontSize: "0.85rem", color: "var(--v2-dim)", letterSpacing: "0.05em" }}>Project Type</label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full mb-6 p-3 outline-none transition-colors duration-300 focus:border-[#00FF88]"
                    style={{ background: "var(--v2-deep)", border: "1px solid rgba(255,255,255,.15)", color: "var(--v2-white)", fontFamily: "var(--v2-font-body)", fontSize: "1rem" }}
                  >
                    {Object.keys(projectTypes).map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>

                  <label className="block mb-2" style={{ fontSize: "0.85rem", color: "var(--v2-dim)", letterSpacing: "0.05em" }}>
                    Square Footage: <span style={{ color: accentColor, fontWeight: 600 }}>{sqft.toLocaleString()} sq ft</span>
                  </label>
                  <input
                    type="range"
                    min={1000}
                    max={100000}
                    step={500}
                    value={sqft}
                    onChange={(e) => setSqft(Number(e.target.value))}
                    className="w-full mb-8"
                    style={{ accentColor }}
                  />

                  <div className="grid grid-cols-2 gap-6 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,.1)" }}>
                    <div>
                      <div className="v2-headline mb-1" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: accentColor }}>
                        ${totalSavings.toLocaleString()}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "var(--v2-dim)" }}>Estimated Savings</div>
                    </div>
                    <div>
                      <div className="v2-headline mb-1" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: accentColor }}>
                        {savingsPercent}%
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "var(--v2-dim)" }}>Cost Reduction</div>
                    </div>
                  </div>
                  <p className="mt-4" style={{ fontSize: "0.7rem", color: "var(--v2-dim)", fontStyle: "italic", opacity: 0.7 }}>
                    *Estimates based on average project data. Actual savings vary by project scope, location, and specifications.
                  </p>
                </motion.div>
              </div>
            )}
          </div>
        </section>

        {/* ════════ CTA ════════ */}
        <section className="relative py-16 md:py-28" style={{ background: "var(--v2-black)", borderTop: "1px solid var(--v2-rule)" }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px" style={{ height: "100px", background: `linear-gradient(to bottom, ${accentColor}, transparent)` }} />
          <div ref={ctaRef} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center flex flex-col items-center">
            {ctaInView && (
              <>
                <motion.h2 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease }} className="v2-headline mb-6" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", color: "var(--v2-white)", lineHeight: 1.2 }}>
                  BUILD WITH<br />LÏEF BLOCKS<span className="v2-neon-period">.</span>
                </motion.h2>
                <motion.p initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.08, ease }} className="mb-10 max-w-[420px]" style={{ fontWeight: 300, fontSize: "1.3rem", color: "var(--v2-muted)", lineHeight: 1.7 }}>
                  Whether you're a developer, builder, or investor — let's talk about how LÏEF Blocks can transform your next project.
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.16, ease }} className="flex flex-wrap justify-center gap-4">
                  <a
                    href="mailto:hello@liefdev.com"
                    className="inline-block transition-all duration-300 hover:brightness-110"
                    style={{
                      fontFamily: "var(--v2-font-body)", fontSize: "1.1rem", textTransform: "uppercase",
                      letterSpacing: "0.14em", fontWeight: 600, background: accentColor,
                      color: "var(--v2-deep)", padding: "16px 40px", textDecoration: "none",
                    }}
                  >
                    Start a Conversation
                  </a>
                  <a
                    href="tel:+14805551234"
                    className="inline-block transition-all duration-300 hover:bg-[#00FF88] hover:text-[#0a0a0a]"
                    style={{
                      fontFamily: "var(--v2-font-body)", fontSize: "1.1rem", textTransform: "uppercase",
                      letterSpacing: "0.14em", color: accentColor, border: `1px solid ${accentColor}`,
                      padding: "16px 40px", textDecoration: "none",
                    }}
                  >
                    Call Us
                  </a>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.24, ease }} className="flex flex-wrap justify-center gap-12 mt-16">
                  <div className="text-center">
                    <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--v2-dim)", marginBottom: "8px" }}>Email</div>
                    <a href="mailto:hello@liefdev.com" style={{ fontSize: "0.95rem", color: "var(--v2-muted)", textDecoration: "none" }} className="hover:text-[#00FF88] transition-colors">hello@liefdev.com</a>
                  </div>
                  <div className="text-center">
                    <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--v2-dim)", marginBottom: "8px" }}>Location</div>
                    <span style={{ fontSize: "0.95rem", color: "var(--v2-muted)" }}>Phoenix, Arizona</span>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </section>

      </main>
      <V2Footer />
    </div>
  );
};

export default LiefBlocks;
