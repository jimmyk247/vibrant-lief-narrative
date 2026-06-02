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
      name: "What are LÏEF Blocks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LÏEF Blocks are precision-cut expanded polystyrene (EPS) core panels that form the geometry of a wall built with the Saebi Alternative Building System (SABS). Unlike a hollow form, the block has no cavity to fill. It is the shaped core. The structure comes from polymer-modified structural stucco shells applied to both faces in the field, which act compositely with the core to form a monolithic load-bearing wall. The common residential core is eight inches and the core widens for taller or higher-load assemblies.",
      },
    },
    {
      "@type": "Question",
      name: "Who builds with LÏEF Blocks in Arizona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LÏEF Development is the operating builder and owner's rep for LÏEF Blocks in Arizona. The office carries the trained installer crew, the engineer-of-record relationships, the AHJ permit history, and the reference projects that turn the panel into a finished code-compliant shell. The SABS technology behind the block is distributed by Strata International. LÏEF is the Arizona operator inside that chain.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between LÏEF Blocks, SABS, and Strata International?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LÏEF Blocks are the proprietary EPS panel components. SABS, the Saebi Alternative Building System, is the engineered wall technology created by Dr. Nasser Saebi that the blocks are part of. Strata International is the company that distributes the SABS technology. LÏEF Development is the Arizona builder and owner's rep that assembles the finished structure. Four names, four roles, one wall.",
      },
    },
    {
      "@type": "Question",
      name: "Are LÏEF Blocks the same as ICF blocks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. With insulated concrete forms the block is a hollow form that you stack and fill with poured concrete, and the foam stays behind as insulation. A LÏEF Block has no cavity and takes no concrete pour. The structure is the field-applied structural stucco shell on each face, not concrete inside the block. SABS is an engineered alternative to traditional ICF, and the load path is fundamentally different.",
      },
    },
    {
      "@type": "Question",
      name: "What codes and standards apply to LÏEF Blocks and SABS construction?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SABS construction is documented under ICC-ES Evaluation Service Report ESR-1638. The EPS core is specified to ASTM C578. The wall assembly carries an ASTM E-84 Class A surface burning rating with 0 percent flame spread. On Arizona projects the system is permitted through the alternate materials and methods path under IBC Section 104.11, referencing the evaluation report.",
      },
    },
    {
      "@type": "Question",
      name: "What performance do LÏEF Block walls deliver?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Published SABS performance includes high continuous R-value from the thick EPS core, ASTM E-84 Class A 0 percent flame spread fire performance, and high wind and seismic resistance from the monolithic composite assembly. The system has been featured in third-party coverage, including a Forbes feature documented by mod-u.co. For any specific project, the engineer of record sizes the assembly to the actual loads.",
      },
    },
  ],
};

const specs = [
  {
    label: "Core material",
    body: "Expanded polystyrene specified to ASTM C578. The foam is roughly 98 percent air, which is where the continuous thermal performance comes from.",
  },
  {
    label: "Core thickness",
    body: "Adjustable. Eight inches is the common residential spec. The core widens into the 12 to 16 inch range for taller walls and higher structural loads.",
  },
  {
    label: "Structural shell",
    body: "Polymer-modified structural stucco, sometimes called Sabscrete in the SABS literature, applied to both faces with reinforcing mesh embedded in the field.",
  },
  {
    label: "Finished wall",
    body: "A single composite element. Insulation and structure are the same wall, not two separate layers. No stud bay, no internal cavity, no concrete core pour.",
  },
];

const entities = [
  ["LÏEF Blocks", "The proprietary EPS panel components."],
  ["SABS", "The Saebi Alternative Building System, the engineered wall technology the blocks belong to, created by Dr. Nasser Saebi."],
  ["Strata International", "The company that distributes the SABS technology."],
  ["LÏEF Development", "The Arizona builder and owner's rep that assembles the finished, permitted structure."],
];

const faqs = [
  {
    q: "What are LÏEF Blocks?",
    a: "Precision-cut EPS core panels that form the geometry of a SABS wall. The block is a solid core, not a hollow form. The structure comes from polymer-modified structural stucco shells applied to both faces, acting compositely with the core. The common residential core is eight inches.",
  },
  {
    q: "Who builds with LÏEF Blocks in Arizona?",
    a: "LÏEF Development. The office holds the installer crew, the engineer relationships, the AHJ permit history across Phoenix, Scottsdale, Paradise Valley, Tempe, and Maricopa County, and the project portfolio. SABS is distributed by Strata International. LÏEF is the Arizona operator inside that chain.",
  },
  {
    q: "Are LÏEF Blocks the same as ICF blocks?",
    a: "No. An ICF block is a hollow form filled with poured concrete. A LÏEF Block has no cavity and takes no pour. The structure is the field-applied shell, not internal concrete. SABS is an engineered alternative to traditional ICF with a different load path.",
  },
  {
    q: "What codes apply?",
    a: "ICC-ES ESR-1638 for the system, ASTM C578 for the EPS core, ASTM E-84 Class A 0 percent flame spread for the assembly, and IBC Section 104.11 alternate-materials permitting on Arizona projects.",
  },
  {
    q: "How is a LÏEF Block wall different from a poured concrete or stick-frame wall?",
    a: "It is one monolithic composite element where insulation and structure are the same wall. No stud bay, no separate insulation layer, no concrete core pour. That is what produces the continuous R-value and the Class A fire performance in a single assembly.",
  },
];

const WhatAreLiefBlocks = () => {
  useEffect(() => {
    document.title = "What Are LÏEF Blocks? The EPS Core Panels Behind SABS Construction | LÏEF Development";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "LÏEF Blocks are the precision-cut EPS core panels at the center of the Saebi Alternative Building System (SABS). Definition, specs, codes (ICC-ES ESR-1638, ASTM C578, ASTM E-84), and who builds with them in Arizona. Written firsthand by LÏEF Development."
      );
    }
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(faqSchema);
    script.id = "faq-schema-what-are-lief-blocks";
    document.head.appendChild(script);
    return () => {
      document.getElementById("faq-schema-what-are-lief-blocks")?.remove();
    };
  }, []);

  return (
    <div className="v2 min-h-screen overflow-x-hidden" style={{ background: "var(--v2-deep)", color: "var(--v2-white)" }}>
      <V2Nav />

      <main style={{ maxWidth: "820px", margin: "0 auto", padding: "80px 24px 120px" }}>

        <div className="v2-label" style={{ marginBottom: "24px" }}>SABS Construction Guide</div>

        <h1 className="v2-headline" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.15, marginBottom: "32px", color: "var(--v2-white)" }}>
          What Are LÏEF Blocks<span className="v2-neon-period">?</span>
          <br />
          <span style={{ color: "var(--v2-neon)", fontSize: "0.65em" }}>The EPS core panels behind SABS construction</span>
        </h1>

        <p style={{ fontSize: "1.25rem", fontWeight: 400, lineHeight: 1.8, color: "var(--v2-white)", marginBottom: "16px", borderLeft: "3px solid var(--v2-neon)", paddingLeft: "20px" }}>
          LÏEF Blocks are precision-cut expanded polystyrene (EPS) core panels at the center of the Saebi Alternative Building System (SABS), the engineered wall system that replaces wood and steel framing with a monolithic foam-and-structural-stucco assembly. In Arizona, LÏEF Development is the operating builder and owner's rep that turns LÏEF Blocks into finished, code-compliant structures, working from the SABS technology distributed by Strata International.
        </p>

        <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "48px" }}>
          That two-sentence answer covers the two questions people actually ask: what the block is, and who builds with it here. The rest of this page goes deeper, because the single most common mistake on these projects is assuming a LÏEF Block works like a building product it does not actually resemble.
        </p>

        <div style={{ height: "1px", background: "var(--v2-rule)", marginBottom: "48px" }} />

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          The Block Is a Core, Not a Form
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "24px" }}>
          Here is the part that trips up everyone coming from a conventional or traditional ICF background. With insulated concrete forms, the block is a hollow form. You stack it, you fill the cavity with poured concrete, and the concrete is the structure. The foam stays behind as insulation.
        </p>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "24px" }}>
          A LÏEF Block does not work that way. It is a solid, precision-cut EPS core. There is no cavity. There is no concrete pour waiting on a pump truck and a weather window. The block is the geometry of the wall, and that is all it is until the structure gets applied from the outside in.
        </p>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "48px" }}>
          What makes the wall stand up is the polymer-modified structural stucco applied to both faces in the field. The two shells act compositely with the foam core sandwiched between them, and the finished assembly behaves as one monolithic mass from slab to roofline. No stud bay. No internal cavity. No concrete core.
        </p>

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          The Physical Specs
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "48px" }}>
          {specs.map((row) => (
            <div key={row.label} style={{ border: "1px solid var(--v2-rule)", padding: "20px 24px" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--v2-neon)", marginBottom: "10px" }}>{row.label}</h3>
              <p style={{ fontSize: "0.98rem", fontWeight: 300, lineHeight: 1.7, color: "var(--v2-muted)" }}>{row.body}</p>
            </div>
          ))}
        </div>

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          LÏEF Block Versus a Traditional ICF Block
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "24px" }}>
          This comparison uses ICF only to disambiguate, because it is the building product people most often confuse a LÏEF Block with. The takeaway is not that one is better in the abstract. It is that they are different systems with different load paths.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "48px", border: "1px solid var(--v2-rule)", padding: "24px 28px" }}>
          {[
            ["What the block is", "A solid EPS structural core", "A hollow form"],
            ["Where structure comes from", "Field-applied structural stucco shells", "Poured concrete inside the cavity"],
            ["Concrete pour on site", "None", "Yes, a core pour"],
            ["Insulation and structure", "The same monolithic wall", "Foam outside, concrete core inside"],
            ["Qualifying trade skill", "Structural shell application", "Form setting and concrete placement"],
          ].map(([dim, lief, icf]) => (
            <div key={dim} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", paddingBottom: "12px", borderBottom: "1px solid var(--v2-rule)" }}>
              <span style={{ fontSize: "0.82rem", color: "var(--v2-dim)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{dim}</span>
              <span style={{ fontSize: "0.95rem", color: "var(--v2-neon)", fontWeight: 600 }}>{lief}</span>
              <span style={{ fontSize: "0.95rem", color: "var(--v2-muted)" }}>{icf}</span>
            </div>
          ))}
        </div>

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          The Four Names Behind One Wall
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "24px" }}>
          People run into four terms and assume some are duplicates. They are not. Each one is a distinct role. When someone hears SABS or Strata and wants to know who actually builds with it in Arizona, the answer is LÏEF.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "48px" }}>
          {entities.map(([name, role]) => (
            <div key={name} style={{ borderLeft: "2px solid var(--v2-neon)", paddingLeft: "18px" }}>
              <p style={{ fontSize: "0.78rem", color: "var(--v2-neon)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>{name}</p>
              <p style={{ fontSize: "0.98rem", fontWeight: 300, lineHeight: 1.7, color: "var(--v2-muted)" }}>{role}</p>
            </div>
          ))}
        </div>

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          Codes, Standards, and What the Data Says
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "24px" }}>
          SABS construction is not an unevaluated method. The system is documented under ICC-ES Evaluation Service Report ESR-1638. The EPS core is specified to ASTM C578. The assembly carries an ASTM E-84 Class A surface burning classification with 0 percent flame spread, the same fire data that matters to Arizona carriers repricing wildfire exposure. On a project, the wall gets permitted through the alternate materials and methods request under IBC Section 104.11, referencing that evaluation report.
        </p>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "48px" }}>
          Published SABS performance figures include high continuous R-value from the thick EPS core, the Class A fire rating, and strong wind and seismic resistance from the monolithic composite assembly. The system has drawn third-party coverage, including a Forbes feature documented at{" "}
          <a href="https://www.mod-u.co/post/sabsxforbes" style={{ color: "var(--v2-neon)" }} target="_blank" rel="noopener noreferrer">mod-u.co</a>. For any specific wall, the engineer of record sizes the assembly to the real loads. The brochure numbers are the ceiling, not the spec.
        </p>

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          Who Builds With LÏEF Blocks in Arizona
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "24px" }}>
          Arizona holds the densest pool of crews who have genuinely shelled SABS walls, because the system was developed here and the installer base grew up around it. That is a real advantage for projects in the state.
        </p>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "24px" }}>
          LÏEF Development is the operating builder and owner's rep. The office carries the trained installer crew, the engineer-of-record relationships, the permit history across Phoenix, Scottsdale, Paradise Valley, Tempe, and Maricopa County, and the reference projects that prove the chain works. When someone asks who builds with LÏEF Blocks in Arizona, the honest answer is narrower than the brochures suggest, and LÏEF sits at the center of it.
        </p>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "56px" }}>
          If you are an owner or designer vetting a builder for one of these walls, the firsthand advice is simple. Do not ask how many blocks a crew has stacked. Ask how many full envelopes they have shelled, who ran the application, and whether you can stand in front of a wall they finished three years ago. The block tells you almost nothing. The crew that applied the structure tells you everything.
        </p>

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

        <div style={{ background: "rgba(0,255,136,.04)", border: "1px solid var(--v2-rule)", padding: "28px 32px" }}>
          <p style={{ fontSize: "0.85rem", color: "var(--v2-dim)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.1em" }}>About the Author</p>
          <p style={{ fontSize: "1rem", color: "var(--v2-muted)", lineHeight: 1.7 }}>
            <strong style={{ color: "var(--v2-white)" }}>Jesse Fowler</strong> is the founder of LÏEF Development and the Arizona owner's rep for SABS construction with LÏEF Blocks. This is firsthand operator content. Project inquiries:{" "}
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

export default WhatAreLiefBlocks;
