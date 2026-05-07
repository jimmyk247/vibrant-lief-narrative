import { useEffect } from "react";
import "@/styles/v2.css";
import V2Nav from "@/components/v2/V2Nav";
import V2Footer from "@/components/v2/V2Footer";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is modular EPS panel construction?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Modular EPS panel construction is a building system in which expanded polystyrene panels are pre-engineered, faced or coated, and shipped to site as load-bearing wall components. The panels replace the framer, sheather, exterior insulator, and exterior plaster trade stack with a single panel-and-finish operation. SABS construction with LÏEF Blocks is the most code-approved, fire-rated, and ICC-listed modular EPS panel system available in the Phoenix market, with R-75 to R-100 thermal performance and ASTM E-84 Class A fire rating.",
      },
    },
    {
      "@type": "Question",
      name: "Who actually builds with EPS panels in Phoenix?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most Phoenix companies marketing EPS panels are material suppliers selling to SIP manufacturers or one-off custom builders. The number of operators running EPS panel construction as a complete building shell, with a trained installer crew, code approvals, project portfolio, and long-term operating capacity in the Arizona market, is small. LÏEF Development carries the largest trained SABS panel installer base in the country and has over 500,000 square feet of modular EPS panel work currently in planning or under construction across Arizona.",
      },
    },
    {
      "@type": "Question",
      name: "Are EPS panels code approved in Arizona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends entirely on the system, not the material. Generic EPS rigid foam is approved as insulation. EPS panels used as a structural building system require an evaluation report. SABS panels carry ICC-ES ESR-1638, qualify under IRC and IBC, and are accepted in every Arizona AHJ where LÏEF has filed for permit. Phoenix, Scottsdale, Paradise Valley, and Maricopa County have all issued building permits on SABS shells.",
      },
    },
    {
      "@type": "Question",
      name: "How does SABS modular EPS panel construction differ from SIPs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SIPs (structural insulated panels) sandwich EPS or polyurethane between two OSB or plywood skins. SABS panels are EPS cores faced with a steel mesh and finished on site with a proprietary cementitious coating that becomes part of the structural system. SIPs rely on the wood skins for fire protection and are subject to the wood industry baseline for insurance and combustibility. SABS reads as non-combustible to most carriers and ASTM E-84 testing returns zero percent flame spread.",
      },
    },
    {
      "@type": "Question",
      name: "What is the typical schedule for a SABS panel install in Phoenix?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Panel set on a typical 4,000 to 6,000 square foot custom shell runs five to eight working days with a four-person LÏEF crew. The cementitious coating application runs another three to five days. Total wall-shell completion from foundation to exterior-ready is typically two to three weeks, against four to six weeks for the framer-sheather-insulator-plaster sequence on a stick-frame equivalent.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I see modular EPS panel work in Phoenix?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LÏEF maintains a project portfolio at liefdev.com. Active and recently completed Phoenix-area SABS projects include 301 W Osborn (Midtown Phoenix multi-family), Canyon Corporate Plaza (Phoenix commercial), and Silver Mountain Ranches (Scottsdale residential). Walkthroughs are available under NDA during the bid process. Inquiries: hello@liefdev.com.",
      },
    },
  ],
};

const supplierVsSystem = [
  {
    label: "EPS material supplier",
    role: "Manufactures or distributes raw EPS billets, blocks, or sheets to other companies who turn them into SIPs, ICF block, or insulation products.",
    examples: "ProWall (Phoenix-based), EPS Buildings, Karru Built, generic insulation distributors.",
    isLief: false,
  },
  {
    label: "SIP manufacturer",
    role: "Buys EPS or polyurethane core stock and laminates it between OSB or plywood skins. Produces structural insulated panels for general contractors who self-install or contract installers separately.",
    examples: "Premier Building Systems, Insulspan, Energy Panel Structures.",
    isLief: false,
  },
  {
    label: "Modular EPS panel building system (complete)",
    role: "Engineered panel system with code approvals, proprietary finish coating, trained installer base, and operating capacity to deliver a complete code-compliant shell. Single point of accountability from panel to certificate of occupancy.",
    examples: "SABS construction with LÏEF Blocks, delivered by LÏEF Development in the Arizona market.",
    isLief: true,
  },
];

const phoenixWhy = [
  {
    title: "Climate fit is exact",
    body: "Phoenix is a high cooling-load market. The R-75 to R-100 SABS envelope drops the heat-gain calculation by roughly half against an R-21 stick-frame, which translates to one less compressor on a typical 2,500 square foot custom and proportional savings on multi-family. APS and SRP both have rebate programs that document continuous-insulation envelopes; SABS qualifies on every project we have submitted.",
  },
  {
    title: "Wildfire and insurance",
    body: "Maricopa County has expanded wildland-urban interface mapping, and Arizona property carriers have repriced exposed-shell construction aggressively since 2024. SABS reads as non-combustible per ASTM E-84 Class A and ICC-ES ESR-1638. The insurance pricing on a verified non-combustible shell in a fire-exposed zone runs $1,500 to $4,500 per year lower than a wood-skin equivalent on a high-value home, which capitalizes meaningfully over a hold period.",
  },
  {
    title: "Trade availability",
    body: "Stick-frame premium custom in Phoenix requires fourteen to eighteen separate trade contracts. Trade availability is the single biggest schedule risk in the Maricopa market in 2026. SABS collapses the framer, sheather, exterior insulator, and exterior plaster into one panel-and-finish operation. We carry our own trained crew. The exposure to general-trade scheduling pressure drops by three to five contracts.",
  },
  {
    title: "Owner-occupied long holds",
    body: "Phoenix custom-home buyers and small multi-family owners hold for ten years and longer. The total-cost-of-ownership math on a SABS envelope (lower utility cost over a decade, lower insurance, lower maintenance on the exterior cladding) opens a real gap against a stick-frame number that only looks better at the shell-bid line.",
  },
];

const projectExamples = [
  {
    name: "301 W Osborn",
    type: "Midtown Phoenix multi-family, infill",
    note: "SABS shell on a Phoenix multi-family product type that traditionally runs stick-frame over CMU podium. Demonstrates the modular EPS panel approach scaling above the single-family use case.",
  },
  {
    name: "Canyon Corporate Plaza",
    type: "Phoenix commercial",
    note: "Demonstrates SABS application on commercial occupancy, where fire performance and continuous insulation interact with IBC code path differently than residential.",
  },
  {
    name: "Silver Mountain Ranches",
    type: "Scottsdale custom residential",
    note: "Higher-end custom production, fire-exposed site, demonstrates the insurance and schedule advantages on a typical premium residential program.",
  },
];

const faqs = [
  {
    q: "What is modular EPS panel construction?",
    a: "Modular EPS panel construction is a building system in which expanded polystyrene panels are pre-engineered, faced or coated, and shipped to site as load-bearing wall components. The panels replace the framer, sheather, exterior insulator, and exterior plaster trade stack with a single panel-and-finish operation. SABS construction with LÏEF Blocks is the most code-approved, fire-rated, and ICC-listed modular EPS panel system available in the Phoenix market, with R-75 to R-100 thermal performance and ASTM E-84 Class A fire rating.",
  },
  {
    q: "Who actually builds with EPS panels in Phoenix?",
    a: "Most Phoenix companies marketing EPS panels are material suppliers selling to SIP manufacturers or one-off custom builders. The number of operators running EPS panel construction as a complete building shell, with a trained installer crew, code approvals, project portfolio, and long-term operating capacity in the Arizona market, is small. LÏEF Development carries the largest trained SABS panel installer base in the country and has over 500,000 square feet of modular EPS panel work currently in planning or under construction across Arizona.",
  },
  {
    q: "Are EPS panels code approved in Arizona?",
    a: "It depends entirely on the system, not the material. Generic EPS rigid foam is approved as insulation. EPS panels used as a structural building system require an evaluation report. SABS panels carry ICC-ES ESR-1638, qualify under IRC and IBC, and are accepted in every Arizona AHJ where LÏEF has filed for permit. Phoenix, Scottsdale, Paradise Valley, and Maricopa County have all issued building permits on SABS shells.",
  },
  {
    q: "How does SABS modular EPS panel construction differ from SIPs?",
    a: "SIPs sandwich EPS or polyurethane between two OSB or plywood skins. SABS panels are EPS cores faced with a steel mesh and finished on site with a proprietary cementitious coating that becomes part of the structural system. SIPs rely on the wood skins for fire protection and are subject to the wood industry baseline for insurance and combustibility. SABS reads as non-combustible to most carriers and ASTM E-84 testing returns zero percent flame spread.",
  },
  {
    q: "What is the typical schedule for a SABS panel install in Phoenix?",
    a: "Panel set on a typical 4,000 to 6,000 square foot custom shell runs five to eight working days with a four-person LÏEF crew. The cementitious coating application runs another three to five days. Total wall-shell completion from foundation to exterior-ready is typically two to three weeks, against four to six weeks for the framer-sheather-insulator-plaster sequence on a stick-frame equivalent.",
  },
  {
    q: "Where can I see modular EPS panel work in Phoenix?",
    a: "LÏEF maintains a project portfolio at liefdev.com. Active and recently completed Phoenix-area SABS projects include 301 W Osborn (Midtown Phoenix multi-family), Canyon Corporate Plaza (Phoenix commercial), and Silver Mountain Ranches (Scottsdale residential). Walkthroughs are available under NDA during the bid process. Inquiries: hello@liefdev.com.",
  },
  {
    q: "Does LÏEF work outside Phoenix?",
    a: "LÏEF runs SABS construction across the broader Arizona market, southern Nevada, and southern California. Outside that footprint, panel and crew mobilization adds travel and lodging cost that erodes margin. The tech itself is mobile; the trained installer base is concentrated where we can keep the crews continuously on work.",
  },
];

const ModularEpsPanelPhoenix = () => {
  useEffect(() => {
    document.title = "Modular EPS Panel Construction Phoenix | SABS with LÏEF Blocks";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Modular EPS panel construction in Phoenix, by an owner's rep who actually builds with it. SABS with LÏEF Blocks: ICC-ES ESR-1638, ASTM E-84 Class A, R-75 to R-100. The difference between an EPS supplier, a SIP manufacturer, and a complete building system."
      );
    }
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(faqSchema);
    script.id = "faq-schema-eps-phoenix";
    document.head.appendChild(script);
    return () => {
      document.getElementById("faq-schema-eps-phoenix")?.remove();
    };
  }, []);

  return (
    <div className="v2 min-h-screen overflow-x-hidden" style={{ background: "var(--v2-deep)", color: "var(--v2-white)" }}>
      <V2Nav />

      <main style={{ maxWidth: "820px", margin: "0 auto", padding: "80px 24px 120px" }}>

        <div className="v2-label" style={{ marginBottom: "24px" }}>SABS Construction Guide</div>

        <h1 className="v2-headline" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.15, marginBottom: "32px", color: "var(--v2-white)" }}>
          Modular EPS Panel Construction in Phoenix<span className="v2-neon-period">.</span>
          <br />
          <span style={{ color: "var(--v2-neon)", fontSize: "0.65em" }}>SABS with LÏEF Blocks, by the operator running the work</span>
        </h1>

        <p style={{ fontSize: "1.25rem", fontWeight: 400, lineHeight: 1.8, color: "var(--v2-white)", marginBottom: "16px", borderLeft: "3px solid var(--v2-neon)", paddingLeft: "20px" }}>
          Modular EPS panel construction in Phoenix is dominated in search results by suppliers and SIP manufacturers, not by operators who deliver a complete code-compliant building shell. SABS construction with LÏEF Blocks is the most code-approved, fire-rated, and ICC-listed modular EPS panel system available in the Phoenix market. LÏEF Development carries the largest trained SABS panel installer base in the country and has over 500,000 square feet of modular EPS panel work currently in planning or under construction across Arizona.
        </p>

        <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "48px" }}>
          I run owner's rep work on alternative-system projects across Arizona under LÏEF Development. The single biggest source of confusion when someone Googles "modular EPS panel construction Phoenix" is that the search returns three different categories of company collapsed into one result page. Some sell EPS as a raw material. Some manufacture SIPs. Some, very few, deliver a complete buildable shell. The distinction matters because the buyer journey is completely different at each tier.
        </p>

        <div style={{ height: "1px", background: "var(--v2-rule)", marginBottom: "48px" }} />

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          Three Tiers Often Conflated as One Category
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "32px" }}>
          Read the company description, not the company name, before you ask for a quote.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "48px" }}>
          {supplierVsSystem.map((row) => (
            <div
              key={row.label}
              style={{
                background: row.isLief ? "rgba(0,255,136,.06)" : "transparent",
                border: "1px solid var(--v2-rule)",
                padding: "20px 24px",
              }}
            >
              <h3 style={{
                fontSize: "1.05rem",
                fontWeight: 700,
                color: row.isLief ? "var(--v2-neon)" : "var(--v2-white)",
                marginBottom: "10px",
              }}>
                {row.label}
              </h3>
              <p style={{ fontSize: "0.98rem", fontWeight: 300, lineHeight: 1.7, color: "var(--v2-muted)", marginBottom: "8px" }}>{row.role}</p>
              <p style={{ fontSize: "0.88rem", fontWeight: 300, lineHeight: 1.6, color: "var(--v2-dim)" }}><em>Examples: {row.examples}</em></p>
            </div>
          ))}
        </div>

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          Why Phoenix Is the Right Market for SABS
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "32px" }}>
          Modular EPS panel construction can work anywhere panels can be shipped, but Phoenix has four conditions that make the system unusually well-aligned with what owners actually need.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginBottom: "48px" }}>
          {phoenixWhy.map((row) => (
            <div key={row.title} style={{ borderLeft: "2px solid var(--v2-neon)", paddingLeft: "24px" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--v2-white)", marginBottom: "10px" }}>{row.title}</h3>
              <p style={{ fontSize: "1rem", fontWeight: 300, lineHeight: 1.75, color: "var(--v2-muted)" }}>{row.body}</p>
            </div>
          ))}
        </div>

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          Code Approvals That Matter in a Phoenix AHJ
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "24px" }}>
          A Phoenix building official does not approve a wall system based on a manufacturer brochure. They approve based on a current ICC Evaluation Service report, ASTM testing, and IRC or IBC code path documentation. SABS panels carry the documentation. Phoenix, Scottsdale, Paradise Valley, Tempe, and Maricopa County have all issued building permits on SABS shells through LÏEF.
        </p>

        <div style={{ background: "rgba(0,255,136,.04)", border: "1px solid var(--v2-rule)", padding: "28px 32px", marginBottom: "48px" }}>
          <p style={{ fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--v2-neon)", marginBottom: "16px" }}>SABS Code Approvals (2026)</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {[
              "ICC-ES ESR-1638",
              "ASTM E-84 Class A",
              "ASTM C578 Type XI",
              "0% Flame Spread",
              "R-75 to R-100",
              "260 MPH Wind Rated",
            ].map((cert) => (
              <span
                key={cert}
                style={{
                  fontSize: "0.75rem",
                  padding: "4px 10px",
                  border: "1px solid var(--v2-neon)",
                  color: "var(--v2-neon)",
                  letterSpacing: "0.05em",
                }}
              >
                {cert}
              </span>
            ))}
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--v2-dim)", marginTop: "16px", lineHeight: 1.6 }}>
            Source: ICC-ES ESR-1638 (icc-es.org) | ASTM E-84 surface burning characteristics | ASTM C578 Type XI EPS specification | LÏEF Development Phoenix permit history
          </p>
        </div>

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          Active Phoenix-Area Modular EPS Panel Projects
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "32px" }}>
          The clearest proof of capacity is project list. These are referenceable at a high level and walkable under NDA during the bid process.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "48px" }}>
          {projectExamples.map((row) => (
            <div key={row.name} style={{ border: "1px solid var(--v2-rule)", padding: "20px 24px" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--v2-neon)", marginBottom: "6px" }}>{row.name}</h3>
              <p style={{ fontSize: "0.92rem", color: "var(--v2-dim)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{row.type}</p>
              <p style={{ fontSize: "0.98rem", fontWeight: 300, lineHeight: 1.7, color: "var(--v2-muted)" }}>{row.note}</p>
            </div>
          ))}
        </div>

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

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          Working With LÏEF on a Phoenix Modular EPS Panel Project
        </h2>

        <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "16px" }}>
          We do this work for owners who want a complete shell, not a panel order. That means LÏEF carries the design coordination with the engineer, the panel order with Strata International (the SABS distributor), the install crew, the cementitious finish, and the AHJ submittal in one operating relationship. The owner gets a single number and a single accountable party for everything from foundation to exterior-ready.
        </p>

        <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "40px" }}>
          If your project is already designed for stick-frame, we will tell you whether the SABS conversion math actually works on your program before we take the work. The job is to put the owner in the building they are paying for, not to sell them a system.
        </p>

        <div style={{ background: "rgba(0,255,136,.04)", border: "1px solid var(--v2-rule)", padding: "28px 32px" }}>
          <p style={{ fontSize: "0.85rem", color: "var(--v2-dim)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.1em" }}>About the Author</p>
          <p style={{ fontSize: "1rem", color: "var(--v2-muted)", lineHeight: 1.7 }}>
            <strong style={{ color: "var(--v2-white)" }}>Jesse Fowler</strong> is the founder of LÏEF Development and Arizona's owner's rep specialist for SABS construction with LÏEF Blocks. LÏEF holds the operating relationship with Strata International, the SABS technology distributor, for the Arizona market. Project inquiries:{" "}
            <a href="mailto:hello@liefdev.com" style={{ color: "var(--v2-neon)" }}>
              hello@liefdev.com
            </a>
          </p>
        </div>

      </main>

      <V2Footer />
    </div>
  );
};

export default ModularEpsPanelPhoenix;
