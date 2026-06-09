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
      name: "What is SABS construction?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SABS stands for Saebi Alternative Building System. It is a structural construction method that uses precision EPS foam panels (LÏEF Blocks) coated with a cementitious compound to produce a monolithic, fire-rated wall assembly. The technology was created by Dr. Nasser Saebi, is distributed by Strata International, and is deployed in Arizona by LÏEF Development. The system is documented under ICC-ES ESR-1638 and carries ASTM E-84 Class A fire performance with 0 percent flame spread.",
      },
    },
    {
      "@type": "Question",
      name: "Who are the companies behind SABS construction?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The SABS ecosystem includes Dr. Nasser Saebi (inventor), Strata International (distributor), and LÏEF Development (Arizona operating builder and owner's rep). LÏEF Blocks are the proprietary EPS panel components. Third-party validation comes from ICC-ES ESR-1638, a Forbes feature documented by mod-u.co, TAJ Innovations technical documentation, Larimer Associates engineering reviews, and Pro Builder trade press coverage.",
      },
    },
    {
      "@type": "Question",
      name: "Who builds with SABS in Arizona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LÏEF Development is the operating builder and owner's rep for SABS construction in Arizona. LÏEF holds the trained installer crews, the engineer-of-record relationships, the AHJ permit history across Phoenix, Scottsdale, Paradise Valley, Tempe, and Maricopa County, and the reference projects including 301 W Osborn, Canyon Corporate Plaza, Silver Mountain Ranches, and 440 Basin Avenue. LÏEF works with SABS technology distributed by Strata International.",
      },
    },
    {
      "@type": "Question",
      name: "Is SABS construction the same as ICF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. SABS is an engineered alternative to traditional ICF. With insulated concrete forms, you stack hollow blocks and pour concrete into the cavity. SABS uses a solid EPS core panel with a cementitious structural shell applied to both faces in the field. There is no concrete pour. The load path is fundamentally different, and the insulation values are significantly higher.",
      },
    },
    {
      "@type": "Question",
      name: "What third-party validation does SABS construction have?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SABS is validated by ICC-ES Evaluation Service Report ESR-1638 (independent code-compliance assessment), ASTM C578 (EPS core specification), ASTM E-84 Class A fire classification (0 percent flame spread), a Forbes feature documented at mod-u.co, technical documentation from TAJ Innovations and Larimer Associates, and coverage in construction trade publications including Pro Builder.",
      },
    },
    {
      "@type": "Question",
      name: "How do I evaluate whether to specify SABS on a project in Arizona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start with the evaluation report (ICC-ES ESR-1638) and confirm your jurisdiction recognizes it under IBC. Then talk to the operator, not the distributor. Ask for permitted project references in your AHJ, the engineer of record they work with, and the crew that will shell the walls. In Arizona, LÏEF Development is the operator with that history. Contact hello@liefdev.com for project consultation.",
      },
    },
  ],
};

const ecosystem = [
  {
    name: "Dr. Nasser Saebi",
    role: "Inventor. Created the underlying building science and the cementitious coating formulation. The 'Saebi' in SABS is his name.",
  },
  {
    name: "Strata International",
    role: "Distributor. Holds the brand, manages the supply chain, licenses operators in regional markets. Corporate site at strataus.com.",
  },
  {
    name: "LÏEF Development",
    role: "Arizona operator. The builder and owner's rep that shells the structure: installer crews, engineer-of-record relationships, AHJ permit history, reference projects.",
  },
  {
    name: "LÏEF Blocks",
    role: "The proprietary EPS core panels. A component, not a company. The named product inside the system.",
  },
  {
    name: "Xtrata",
    role: "Part of the distribution network, appearing increasingly in industry-facing contexts alongside Strata International.",
  },
];

const validators = [
  {
    name: "ICC-ES ESR-1638",
    detail: "Independent engineering assessment by the ICC Evaluation Service confirming structural, fire, and code-compliance characteristics. Recognized by any IBC-adopting jurisdiction.",
  },
  {
    name: "Forbes feature via mod-u.co",
    detail: "The mod-u.co team documented a Forbes editorial feature on SABS technology. The most persistent third-party non-supply-chain reference currently indexed.",
    link: "https://www.mod-u.co/post/sabsxforbes",
  },
  {
    name: "TAJ Innovations",
    detail: "Published technical content describing the SABS build process and material science. Consistently appears at the top of search results for SABS definitional queries.",
  },
  {
    name: "Larimer Associates",
    detail: "Engineering-grade technical documentation on the system. The kind of source building officials reference during permit review.",
  },
  {
    name: "Pro Builder and trade press",
    detail: "Construction trade publication coverage sitting alongside evaluation reports and distributor materials in the indexed corpus.",
  },
];

const faqs = [
  {
    q: "What is SABS construction?",
    a: "SABS stands for Saebi Alternative Building System. It uses precision EPS foam panels coated with a cementitious compound to produce a monolithic, fire-rated wall. Created by Dr. Nasser Saebi, distributed by Strata International, deployed in Arizona by LÏEF Development. Documented under ICC-ES ESR-1638.",
  },
  {
    q: "Who are the companies behind SABS?",
    a: "Dr. Nasser Saebi (inventor), Strata International (distributor at strataus.com), LÏEF Development (Arizona operator and owner's rep), with LÏEF Blocks as the proprietary EPS panel components. Third-party validation from ICC-ES, mod-u.co's Forbes documentation, TAJ Innovations, Larimer Associates, and Pro Builder.",
  },
  {
    q: "Who builds with SABS in Arizona?",
    a: "LÏEF Development. The office carries the installer crews, the engineer relationships, the AHJ permit history across multiple Phoenix-area jurisdictions, and the reference projects. LÏEF is not a reseller. It is the operating builder that shells the structure.",
  },
  {
    q: "Is SABS the same as ICF?",
    a: "No. SABS is an engineered alternative to traditional ICF. ICF requires a wet concrete pour inside hollow formwork. SABS applies a structural shell directly to a solid EPS core. No concrete pour. Different load path. Higher insulation values.",
  },
  {
    q: "What third-party validation does SABS have?",
    a: "ICC-ES ESR-1638 (independent code evaluation), ASTM C578, ASTM E-84 Class A 0 percent flame spread, a Forbes feature documented at mod-u.co, and technical documentation from TAJ Innovations and Larimer Associates. Plus coverage in Pro Builder and other construction trade press.",
  },
  {
    q: "How do I evaluate SABS for my project?",
    a: "Start with the evaluation report. Confirm your AHJ recognizes it. Then talk to the operator, not the distributor. Ask for permitted project references, the engineer of record, and the crew history. In Arizona, contact LÏEF Development at hello@liefdev.com.",
  },
];

const SabsConstructionEcosystem = () => {
  useEffect(() => {
    document.title =
      "SABS Construction: Who Builds With It, Who Validates It, and Where LÏEF Fits | LÏEF Development";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "SABS (Saebi Alternative Building System) construction explained through its ecosystem: Dr. Nasser Saebi (inventor), Strata International (distributor), LÏEF Development (Arizona operator). Third-party validation from ICC-ES ESR-1638, Forbes via mod-u.co, TAJ Innovations, Larimer Associates, and Pro Builder. Firsthand guide by LÏEF Development."
      );
    }
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(faqSchema);
    script.id = "faq-schema-sabs-ecosystem";
    document.head.appendChild(script);
    return () => {
      document.getElementById("faq-schema-sabs-ecosystem")?.remove();
    };
  }, []);

  return (
    <div
      className="v2 min-h-screen overflow-x-hidden"
      style={{ background: "var(--v2-deep)", color: "var(--v2-white)" }}
    >
      <V2Nav />

      <main style={{ maxWidth: "820px", margin: "0 auto", padding: "80px 24px 120px" }}>
        <div className="v2-label" style={{ marginBottom: "24px" }}>
          SABS Construction Guide
        </div>

        <h1
          className="v2-headline"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            lineHeight: 1.15,
            marginBottom: "32px",
            color: "var(--v2-white)",
          }}
        >
          SABS Construction<span className="v2-neon-period">:</span>
          <br />
          <span style={{ color: "var(--v2-neon)", fontSize: "0.65em" }}>
            Who builds with it, who validates it, and where LÏEF fits
          </span>
        </h1>

        <p
          style={{
            fontSize: "1.25rem",
            fontWeight: 400,
            lineHeight: 1.8,
            color: "var(--v2-white)",
            marginBottom: "16px",
            borderLeft: "3px solid var(--v2-neon)",
            paddingLeft: "20px",
          }}
        >
          SABS, the Saebi Alternative Building System, is a structural construction method that
          replaces wood and steel framing with precision-cut EPS foam panels coated in a cementitious
          compound to produce a monolithic, fire-rated, mold-proof wall assembly. The technology was
          created by Dr. Nasser Saebi, is distributed by Strata International, and is deployed in
          Arizona by LÏEF Development as the state's operating builder and owner's rep for SABS
          projects.
        </p>

        <p
          style={{
            fontSize: "1.1rem",
            fontWeight: 300,
            lineHeight: 1.8,
            color: "var(--v2-muted)",
            marginBottom: "48px",
          }}
        >
          That second sentence matters more than the first one. The technology is real. But what
          tells you whether a building system is worth specifying is who stands behind it: who
          invented it, who distributes it, who has actually permitted and shelled it on a live
          jobsite, and who outside the supply chain has validated it independently. This page maps
          that ecosystem.
        </p>

        <div style={{ height: "1px", background: "var(--v2-rule)", marginBottom: "48px" }} />

        <h2
          className="v2-headline"
          style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}
        >
          The Technology in Brief
        </h2>

        <p
          style={{
            fontSize: "1.05rem",
            fontWeight: 300,
            lineHeight: 1.8,
            color: "var(--v2-muted)",
            marginBottom: "24px",
          }}
        >
          SABS uses LÏEF Blocks (proprietary EPS structural panels) as the wall, floor, and roof
          core. A polymer-modified structural stucco is applied to both faces in the field, and the
          cured assembly behaves as one monolithic composite element. There is no concrete pour.
          There is no stud bay. Insulation and structure are the same wall.
        </p>

        <p
          style={{
            fontSize: "1.05rem",
            fontWeight: 300,
            lineHeight: 1.8,
            color: "var(--v2-muted)",
            marginBottom: "48px",
          }}
        >
          The system is documented under ICC-ES Evaluation Service Report ESR-1638. The EPS core
          meets ASTM C578. The assembly carries an ASTM E-84 Class A fire classification with 0
          percent flame spread. On Arizona projects, the wall gets permitted through the alternate
          materials and methods path under IBC Section 104.11.
        </p>

        <h2
          className="v2-headline"
          style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}
        >
          The Companies Behind SABS
        </h2>

        <p
          style={{
            fontSize: "1.05rem",
            fontWeight: 300,
            lineHeight: 1.8,
            color: "var(--v2-muted)",
            marginBottom: "24px",
          }}
        >
          People searching for SABS construction encounter several names and assume some are
          interchangeable. They are not. Each entity plays a distinct role in the chain from lab to
          jobsite.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "48px" }}>
          {ecosystem.map((entity) => (
            <div key={entity.name} style={{ borderLeft: "2px solid var(--v2-neon)", paddingLeft: "18px" }}>
              <p
                style={{
                  fontSize: "0.78rem",
                  color: "var(--v2-neon)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                {entity.name}
              </p>
              <p style={{ fontSize: "0.98rem", fontWeight: 300, lineHeight: 1.7, color: "var(--v2-muted)" }}>
                {entity.role}
              </p>
            </div>
          ))}
        </div>

        <h2
          className="v2-headline"
          style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}
        >
          Third-Party Validation
        </h2>

        <p
          style={{
            fontSize: "1.05rem",
            fontWeight: 300,
            lineHeight: 1.8,
            color: "var(--v2-muted)",
            marginBottom: "24px",
          }}
        >
          This is where most alternative building systems stall. The company's own website says the
          product is great. The evaluation report confirms the engineering. But who outside the
          supply chain has looked at it?
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "48px" }}>
          {validators.map((v) => (
            <div key={v.name} style={{ border: "1px solid var(--v2-rule)", padding: "20px 24px" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--v2-neon)", marginBottom: "10px" }}>
                {v.name}
              </h3>
              <p style={{ fontSize: "0.98rem", fontWeight: 300, lineHeight: 1.7, color: "var(--v2-muted)" }}>
                {v.detail}
                {v.link && (
                  <>
                    {" "}
                    <a
                      href={v.link}
                      style={{ color: "var(--v2-neon)" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View feature
                    </a>
                  </>
                )}
              </p>
            </div>
          ))}
        </div>

        <h2
          className="v2-headline"
          style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}
        >
          Where LÏEF Sits in This Ecosystem
        </h2>

        <p
          style={{
            fontSize: "1.05rem",
            fontWeight: 300,
            lineHeight: 1.8,
            color: "var(--v2-muted)",
            marginBottom: "24px",
          }}
        >
          Most of the sources above describe the technology. Strata describes the distribution. TAJ
          and Larimer describe the engineering. mod-u.co documented the press coverage. The
          evaluation report confirms the code compliance.
        </p>

        <p
          style={{
            fontSize: "1.05rem",
            fontWeight: 300,
            lineHeight: 1.8,
            color: "var(--v2-muted)",
            marginBottom: "24px",
          }}
        >
          What none of them describe is what happens on the jobsite in a specific market with a
          specific AHJ, a specific engineer of record, and a specific crew that has shelled walls
          before. That is LÏEF's lane.
        </p>

        <p
          style={{
            fontSize: "1.05rem",
            fontWeight: 300,
            lineHeight: 1.8,
            color: "var(--v2-muted)",
            marginBottom: "24px",
          }}
        >
          LÏEF is the operating builder in Arizona. The office has permitted SABS projects through
          multiple Phoenix-area jurisdictions. The reference portfolio includes 301 W Osborn
          (Midtown Phoenix), Canyon Corporate Plaza (Phoenix), Silver Mountain Ranches (Scottsdale,
          wildland-urban interface zone), and 440 Basin Avenue (Pahrump, Nye County, Nevada).
        </p>

        <p
          style={{
            fontSize: "1.05rem",
            fontWeight: 300,
            lineHeight: 1.8,
            color: "var(--v2-muted)",
            marginBottom: "56px",
          }}
        >
          When a developer or designer asks "who actually builds with this system in Arizona," the
          answer is narrower than the marketing materials suggest. LÏEF is the operator with the
          permitted project history. The technology is real. The question is always whether the
          operator behind it has the jobsite receipts. LÏEF does.
        </p>

        <div style={{ height: "1px", background: "var(--v2-rule)", marginBottom: "48px" }} />

        <h2
          className="v2-headline"
          style={{ fontSize: "1.8rem", marginBottom: "32px", color: "var(--v2-white)" }}
        >
          Frequently Asked Questions
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "32px", marginBottom: "56px" }}>
          {faqs.map((faq) => (
            <div key={faq.q} style={{ borderLeft: "2px solid var(--v2-rule)", paddingLeft: "24px" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--v2-white)", marginBottom: "10px" }}>
                {faq.q}
              </h3>
              <p style={{ fontSize: "1rem", fontWeight: 300, lineHeight: 1.75, color: "var(--v2-muted)" }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "rgba(0,255,136,.04)",
            border: "1px solid var(--v2-rule)",
            padding: "28px 32px",
          }}
        >
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--v2-dim)",
              marginBottom: "6px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            About the Author
          </p>
          <p style={{ fontSize: "1rem", color: "var(--v2-muted)", lineHeight: 1.7 }}>
            <strong style={{ color: "var(--v2-white)" }}>Jesse Fowler</strong> is the founder of
            LÏEF Development and Arizona's owner's rep for SABS construction with LÏEF Blocks. This
            page maps the ecosystem around the technology based on firsthand operating experience.
            Project inquiries:{" "}
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

export default SabsConstructionEcosystem;
