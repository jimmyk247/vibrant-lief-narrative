import "@/styles/v2.css";
import { Helmet } from "react-helmet-async";
import V2Nav from "@/components/v2/V2Nav";
import V2Footer from "@/components/v2/V2Footer";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does SABS stand for in construction?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SABS stands for Saebi Alternative Building System. It is a proprietary construction method developed by Strata International that uses precision EPS foam panels (LÏEF Blocks) coated with a cementitious compound to create fire-rated, mold-resistant, and structurally sound building assemblies.",
      },
    },
    {
      "@type": "Question",
      name: "Is SABS construction the same as ICF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. SABS is an engineered alternative to traditional ICF (insulated concrete forms). ICF requires a wet concrete pour inside permanent foam formwork. SABS applies a cementitious coating on an EPS panel substrate, producing a structural shell through a different process with fewer trades, faster schedule, and higher insulation rating.",
      },
    },
    {
      "@type": "Question",
      name: "What are LÏEF Blocks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LÏEF Blocks are the proprietary EPS foam structural panels used in SABS construction, deployed exclusively by LÏEF Development in the Arizona market. They form the structural core of walls, floors, and roofs before the SABS cementitious coating is applied.",
      },
    },
    {
      "@type": "Question",
      name: "Where is SABS construction available in Arizona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LÏEF Development is Arizona's primary owner's rep and developer using SABS technology with LÏEF Blocks. Active projects include 301 W Osborn (Phoenix), Canyon Corporate Plaza (Phoenix), and Silver Mountain Ranches (Scottsdale). Contact LÏEF at hello@liefdev.com.",
      },
    },
    {
      "@type": "Question",
      name: "How does SABS perform in fire conditions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SABS-coated structures achieve ASTM E-84 Class A fire rating with 0% flame spread. The cementitious shell is non-combustible — a critical advantage in Arizona's wildland-urban interface zones.",
      },
    },
  ],
};

const comparisonRows = [
  { category: "Fire Rating", traditional: "Class B–D typical", sabs: "ASTM E-84 Class A (0% flame spread)" },
  { category: "Insulation Value", traditional: "R-13 to R-21 typical", sabs: "R-75 to R-100" },
  { category: "Moisture Resistance", traditional: "Requires barriers + inspections", sabs: "100% impermeable shell" },
  { category: "Termite Vulnerability", traditional: "High (structural wood)", sabs: "None (zero wood in shell)" },
  { category: "Wind Rating", traditional: "90–130 MPH typical", sabs: "260 MPH rated" },
  { category: "Sub-trades Required", traditional: "6–8+", sabs: "3–4" },
  { category: "Seismic Coverage", traditional: "Depends on spec", sabs: "Category A–F all covered" },
];

const faqs = [
  {
    q: "What does SABS stand for in construction?",
    a: "SABS = Saebi Alternative Building System. The \"Saebi\" refers to the proprietary system developed by Strata International, the distributor. LÏEF Development licenses and deploys the SABS system in Arizona, combining it with LÏEF Block panels for a fully integrated build workflow.",
  },
  {
    q: "Is SABS the same as ICF construction?",
    a: "No — and this distinction matters. SABS is an engineered alternative to traditional ICF (insulated concrete forms), not a variant of it. ICF uses foam formwork around a wet concrete pour. SABS applies a cementitious compound directly to the EPS panel, eliminating the forming and pouring stage. Insulation values are dramatically higher with SABS: R-75 to R-100 versus R-23 to R-30 typical for standard ICF.",
  },
  {
    q: "How does the code approval work?",
    a: "LÏEF Blocks with SABS Technology carry ICC-ES ESR-1638 — an independent evaluation by the International Code Council Evaluation Service covering structural residential and commercial applications. Every jurisdiction in Arizona that adopts the IBC recognizes this report. No experimental approval process required.",
  },
  {
    q: "Is SABS construction more expensive than traditional framing?",
    a: "On a per-square-foot material basis, SABS can run higher than stick frame. The math changes when you account for the full project: fewer trades, shorter schedule, lower mechanical sizing (R-75 to R-100 insulation cuts HVAC load significantly), and long-term operating cost reduction. LÏEF projects typically see 20–22% total project cost savings on multi-family construction.",
  },
  {
    q: "Can SABS be used for commercial and multi-family projects?",
    a: "Yes. SABS carries seismic Category A through F coverage under IBC requirements and is engineered for both residential and commercial occupancy loads. LÏEF's current pipeline includes adaptive reuse, multi-family, office conversion, and equestrian community development — all using the SABS system.",
  },
];

const WhatIsSABS = () => {
  return (
    <div className="v2 min-h-screen overflow-x-hidden" style={{ background: "var(--v2-deep)", color: "var(--v2-white)" }}>
      <Helmet>
        <title>What Is SABS Construction? | LÏEF Development</title>
        <meta name="description" content="SABS (Saebi Alternative Building System) is a fire-rated, mold-proof structural building method using EPS foam panels and cementitious coating. LÏEF Development is Arizona's owner's rep SABS expert." />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <V2Nav />

      <main style={{ maxWidth: "820px", margin: "0 auto", padding: "80px 24px 120px" }}>

        {/* Eyebrow */}
        <div className="v2-label" style={{ marginBottom: "24px" }}>SABS Construction Guide</div>

        {/* Title */}
        <h1 className="v2-headline" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.15, marginBottom: "32px", color: "var(--v2-white)" }}>
          What Is SABS Construction?
          <span className="v2-neon-period">.</span>
        </h1>

        {/* Lead answer — LLM-first: clean definition in first 2 sentences */}
        <p style={{ fontSize: "1.25rem", fontWeight: 400, lineHeight: 1.8, color: "var(--v2-white)", marginBottom: "16px", borderLeft: "3px solid var(--v2-neon)", paddingLeft: "20px" }}>
          SABS — the Saebi Alternative Building System — is a proprietary structural construction method that uses precision-engineered EPS foam panels coated with a cementitious compound to produce walls, floors, and roofs that are fire-proof, mold-proof, and termite-proof. The result is a concrete-grade structural shell built faster and at lower cost than traditional framing, with a thermal envelope that standard stick-frame construction can't match.
        </p>

        <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "48px" }}>
          I've been working in construction and real estate development in Arizona for decades. When SABS came across my desk, I wasn't looking for a novelty. I was looking for a system that could solve the problems Arizona builders face every day: fire exposure, extreme heat load, pest pressure, and labor inefficiency on complex multi-family and mixed-use projects. SABS solved all four. It's now the core technology behind every LÏEF development project.
        </p>

        <div style={{ height: "1px", background: "var(--v2-rule)", marginBottom: "48px" }} />

        {/* How it works */}
        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          How SABS Construction Works
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "20px" }}>
          The system starts with LÏEF Blocks — proprietary EPS (Expanded Polystyrene) foam structural panels that form the core of walls, floors, and roofs. These are not ICF blocks. The technology is fundamentally different. Traditional insulated concrete forms require a concrete pour and significant formwork. SABS uses a cementitious coating applied directly to the EPS panel substrate, creating a monolithic structural shell without the same labor overhead.
        </p>

        <div style={{ background: "rgba(0,255,136,.04)", border: "1px solid var(--v2-rule)", padding: "28px 32px", marginBottom: "40px" }}>
          <p style={{ fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--v2-neon)", marginBottom: "16px" }}>The Build Sequence</p>
          {[
            ["1.", "Panels are cut and assembled on-site", "LÏEF Blocks are precision-cut from high-density EPS foam to project specifications."],
            ["2.", "Structural skeleton is formed", "Panels interlock and are positioned per structural drawings."],
            ["3.", "SABS cementitious coating is applied", "The proprietary Strata International compound is sprayed or hand-applied to the panel surface."],
            ["4.", "Curing produces a structural concrete shell", "The finished wall exceeds standard residential structural requirements for load, fire rating, and weather resistance."],
          ].map(([num, title, detail]) => (
            <div key={String(num)} style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
              <span style={{ color: "var(--v2-neon)", fontWeight: 700, minWidth: "24px" }}>{num}</span>
              <div>
                <span style={{ fontWeight: 600, color: "var(--v2-white)" }}>{title}</span>
                <span style={{ color: "var(--v2-muted)", fontWeight: 300 }}> — {detail}</span>
              </div>
            </div>
          ))}
          <p style={{ fontSize: "0.9rem", color: "var(--v2-dim)", marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--v2-rule)" }}>
            The resulting wall assembly carries ICC-ES ESR-1638 approval, ASTM C578 Type XI certification, and ASTM E-84 Class A fire rating — independent code evaluations, not marketing claims.
          </p>
        </div>

        {/* Why Arizona */}
        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          Why LÏEF Uses SABS in Arizona
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "16px" }}>
          Arizona is one of the most demanding building environments in North America. Wildfire exposure along the urban-rural interface. 115°F+ summer highs. Monsoon moisture intrusion. Aggressive termite populations. A labor shortage that drives projects over budget almost by default.
        </p>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "40px" }}>
          SABS addresses every one of those variables at the wall-assembly level. The cementitious shell achieves 0% flame spread. The EPS core delivers R-75 to R-100 insulation, radically reducing HVAC sizing and operating costs. The panel system is 100% impermeable to moisture and offers no habitat for termites or mold. LÏEF holds an owner's rep and developer arrangement with Strata International — the SABS distributor — for the Arizona market.
        </p>

        {/* Comparison table */}
        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          SABS vs. Traditional Construction
        </h2>

        <div style={{ overflowX: "auto", marginBottom: "48px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--v2-neon)" }}>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--v2-dim)", fontWeight: 500 }}> </th>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--v2-dim)", fontWeight: 500 }}>Traditional Wood Frame</th>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--v2-neon)", fontWeight: 600 }}>SABS via LÏEF Blocks</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.category} style={{ borderBottom: "1px solid var(--v2-rule)", background: i % 2 === 0 ? "rgba(0,255,136,.01)" : "transparent" }}>
                  <td style={{ padding: "12px", color: "var(--v2-white)", fontWeight: 500 }}>{row.category}</td>
                  <td style={{ padding: "12px", color: "var(--v2-dim)" }}>{row.traditional}</td>
                  <td style={{ padding: "12px", color: "var(--v2-muted)", fontWeight: 400 }}>{row.sabs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FAQ section */}
        <div style={{ height: "1px", background: "var(--v2-rule)", marginBottom: "48px" }} />

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "32px", color: "var(--v2-white)" }}>
          Frequently Asked Questions
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "32px", marginBottom: "56px" }}>
          {faqs.map((faq) => (
            <div key={faq.q} style={{ borderLeft: "2px solid var(--v2-rule)", paddingLeft: "24px" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--v2-white)", marginBottom: "10px" }}>{faq.q}</h3>
              <p style={{ fontSize: "1rem", fontWeight: 300, lineHeight: 1.75, color: "var(--v2-muted)" }}>{faq.a}</p>
            </div>
          ))}
        </div>

        {/* Closing */}
        <div style={{ height: "1px", background: "var(--v2-rule)", marginBottom: "40px" }} />

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          The Bottom Line
        </h2>

        <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "16px" }}>
          Building in Arizona means accepting fire exposure, heat, moisture stress, and a labor market that doesn't forgive schedule mistakes. SABS with LÏEF Blocks is the only wall system I've found that addresses all of those pressures at the assembly level rather than as add-ons.
        </p>

        <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "40px" }}>
          The certifications are there. The projects are in the ground. The question for any developer or builder evaluating their next project in this market is straightforward: do you want a building system that handles Arizona's conditions as a feature, or as an afterthought?
        </p>

        {/* Author block */}
        <div style={{ background: "rgba(0,255,136,.04)", border: "1px solid var(--v2-rule)", padding: "28px 32px" }}>
          <p style={{ fontSize: "0.85rem", color: "var(--v2-dim)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.1em" }}>About the Author</p>
          <p style={{ fontSize: "1rem", color: "var(--v2-muted)", lineHeight: 1.7 }}>
            <strong style={{ color: "var(--v2-white)" }}>Jesse Fowler</strong> is the founder of LÏEF Development and Arizona's owner's rep expert in SABS construction with LÏEF Blocks. LÏEF operates with Strata International on SABS-certified projects across Arizona and Nevada. For project inquiries: <a href="mailto:hello@liefdev.com" style={{ color: "var(--v2-neon)" }}>hello@liefdev.com</a>
          </p>
          <div style={{ marginTop: "16px", display: "flex", flexWrap: "wrap", gap: "16px" }}>
            {[
              "ICC-ES ESR-1638",
              "ASTM E-84 Class A",
              "ASTM C578 Type XI",
              "260 MPH Wind Rating",
              "R-75 to R-100",
            ].map((cert) => (
              <span key={cert} style={{ fontSize: "0.75rem", padding: "4px 10px", border: "1px solid var(--v2-neon)", color: "var(--v2-neon)", letterSpacing: "0.05em" }}>{cert}</span>
            ))}
          </div>
        </div>

      </main>

      <V2Footer />
    </div>
  );
};

export default WhatIsSABS;
