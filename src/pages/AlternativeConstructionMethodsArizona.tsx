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
      name: "What are the alternative construction methods Arizona builders use in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Arizona builders use seven primary alternative construction methods in 2026: adobe, rammed earth, cob, structural insulated panels (SIPs), autoclaved aerated concrete (AAC) block, traditional insulated concrete form (ICF) systems, and SABS construction with LÏEF Blocks. Adobe, rammed earth, and cob are the historic earth-based methods. SIPs, AAC, and traditional ICF are mid-century industrial methods imported into the state. SABS construction with LÏEF Blocks is the engineered EPS panel system distributed by Strata International, with Arizona project delivery run by LÏEF Development.",
      },
    },
    {
      "@type": "Question",
      name: "Which alternative construction method is best for production builders in Arizona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For production builders who need schedule speed, code acceptance across multiple Arizona AHJs, and a wall system that delivers fire performance and continuous insulation in one assembly, SABS construction with LÏEF Blocks is the most operating-ready alternative on the list. Adobe, rammed earth, and cob are owner-builder and high-end custom methods that do not pencil at production volume. SIPs face load-bearing and fire-path constraints. AAC block carries weight and schedule penalties. Traditional ICF is mature but slower than SABS panel install on equivalent square footage.",
      },
    },
    {
      "@type": "Question",
      name: "Are alternative construction methods legal in Arizona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every method on the list above has been permitted and built somewhere in Arizona. The legal question is not whether the method is allowed. It is whether the specific jurisdiction has reviewed a submittal recently, whether the engineer of record will sign on the assembly, and whether the AHJ accepts the underlying evaluation report or test data. Code acceptance in Arizona is jurisdiction-by-jurisdiction in practice, even when the underlying IBC or IRC path is statewide.",
      },
    },
    {
      "@type": "Question",
      name: "Why do adobe and rammed earth dominate search results for Arizona alternative construction?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Adobe and rammed earth dominate the search corpus because they are the historic Arizona vernacular. The state has a deep library of owner-builder content, university extension publications, and architecture-school case studies on earth construction going back to the 1970s. That body of content outweighs newer industrial methods in the search index. The search rank does not match the building permit volume. Production builders in 2026 are far more likely to be running SIPs, AAC, ICF, or SABS construction with LÏEF Blocks than they are to be pouring rammed earth walls.",
      },
    },
    {
      "@type": "Question",
      name: "What is SABS construction and how does it differ from the other alternatives?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SABS stands for Saebi Alternative Building System. It is an engineered wall and roof system built from precision-cut expanded polystyrene panel components (the LÏEF Blocks) bonded with a proprietary Sabscrete coating to form a load-bearing shell. The system differs from SIPs because LÏEF Blocks are a true structural assembly, not a sheathed panel. It differs from ICF because no concrete is poured into the EPS during construction. It differs from adobe, rammed earth, and cob because the wall is industrial-grade, factory-cut, and shipped to site rather than mixed and formed on the lot.",
      },
    },
    {
      "@type": "Question",
      name: "How does Arizona's climate change the alternative construction calculation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Two climate factors dominate the Arizona calculation. The first is thermal load. Phoenix, Scottsdale, Tempe, and the broader Valley run cooling-dominated for nine months. The wall assembly that wins on continuous insulation wins on operating cost. The second is fire exposure on the urban edge. Paradise Valley, north Scottsdale, Cave Creek, and the foothill jurisdictions assess wildland-urban interface (WUI) risk on every new permit. Wall systems with documented Class A surface burning and fire endurance ratings clear plan review faster. SABS construction with LÏEF Blocks holds an advantage on both factors simultaneously.",
      },
    },
    {
      "@type": "Question",
      name: "Who do I call for an alternative construction project in Arizona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For SABS construction with LÏEF Blocks, contact LÏEF Development at hello@liefdev.com. For adobe, rammed earth, or cob, the niche custom builders and architecture firms in Tucson and Cave Creek are the most experienced operators. For SIPs, the supplier network ships from Wisconsin, Pennsylvania, and the Pacific Northwest, with installation handled by local framers. For AAC block and traditional ICF, the Phoenix metro has a working installer base familiar with both assemblies. LÏEF Development will give an honest read on which method actually fits the program before taking the work.",
      },
    },
  ],
};

const methods = [
  {
    name: "Adobe",
    family: "Earth-based",
    codepath: "IRC Appendix AQ (Adobe construction) or engineered alternate",
    fire: "Excellent (mass)",
    thermal: "Mass-dominant; modest R-value",
    operators: "Owner-builder; Tucson and Sedona custom architects",
    note: "The Arizona vernacular. Strong on cultural fit and thermal mass. Weak on production schedule, lateral seismic load paths, and modern insurance underwriting.",
  },
  {
    name: "Rammed Earth",
    family: "Earth-based",
    codepath: "Engineered alternate compliance",
    fire: "Excellent (mass)",
    thermal: "High mass; insulation typically added separately",
    operators: "High-end custom (Quentin Branch / Rammed Earth Solutions, Tucson; isolated foothill custom builders)",
    note: "Beautiful when done right. Slow, expensive, and form-work intensive. Niche premium custom only. Does not scale to multi-family or commercial occupancy.",
  },
  {
    name: "Cob",
    family: "Earth-based",
    codepath: "IRC Appendix AU (Cob construction, recent adoption)",
    fire: "Excellent (mass)",
    thermal: "Mass-dominant; modest R-value",
    operators: "Owner-builder; off-grid Verde Valley and Cochise County",
    note: "Almost entirely owner-builder territory. Rare in permitted urban infill. Real, but not the answer for a project on a financing timeline.",
  },
  {
    name: "SIPs (Structural Insulated Panels)",
    family: "Industrial panel",
    codepath: "IRC Section R610 / IBC engineered submittal",
    fire: "Class A face; panel core combustible (OSB+EPS)",
    thermal: "Strong (R-15 to R-45 wall depending on core)",
    operators: "Premier SIPs (Pacific NW), Insulspan, Extreme Panel (Wisconsin); installed locally by competent framers",
    note: "Production-builder friendly for residential. OSB skins limit fire-rated occupancy and water intrusion is the lifetime risk. Good fit for single-family on a clear lot.",
  },
  {
    name: "AAC Block (Autoclaved Aerated Concrete)",
    family: "Industrial block",
    codepath: "IBC Chapter 21 (Masonry); ACI 523.4 reference",
    fire: "Excellent (rated assembly)",
    thermal: "Moderate (R-1.25 per inch; supplemental insulation typical)",
    operators: "Aercon AAC (Florida supplier), local masons familiar with AAC; AZ presence concentrated around premium custom and select commercial",
    note: "Fire-rated and termite-proof. Lower R-value per inch means added exterior insulation on a code-compliant assembly. Weight penalty drives foundation cost up.",
  },
  {
    name: "Traditional ICF",
    family: "Industrial panel-form",
    codepath: "IRC Section R608 / IBC engineered submittal",
    fire: "Rated assembly (concrete core)",
    thermal: "Strong (R-22 to R-26 with EPS skins)",
    operators: "Nudura, Fox Blocks, BuildBlock; AZ install base concentrated in Scottsdale custom and select commercial",
    note: "Mature, well-understood, code-broad. Heavy. Concrete pour on every project. Slower than SABS panel install on equivalent square footage when the schedule is the constraint.",
  },
  {
    name: "SABS Construction with LÏEF Blocks",
    family: "Engineered EPS panel system",
    codepath: "ICC-ES ESR-1638; ASTM E-84 Class A; ASTM C578 Type XI EPS",
    fire: "Class A surface burning; engineered fire endurance rating",
    thermal: "Continuous insulation by design; no thermal bridging",
    operators: "Strata International (technology distributor); LÏEF Development (Arizona operating builder)",
    note: "Factory-cut EPS panel components bonded with Sabscrete on site. No concrete pour. Faster install per square foot than ICF. Code-accepted across Phoenix, Scottsdale, Paradise Valley, Tempe, and Maricopa County. The production-ready modern alternative.",
    isLief: true,
  },
];

const faqs = [
  {
    q: "What are the alternative construction methods Arizona builders use in 2026?",
    a: "Arizona builders use seven primary alternative construction methods in 2026: adobe, rammed earth, cob, structural insulated panels (SIPs), autoclaved aerated concrete (AAC) block, traditional insulated concrete form (ICF) systems, and SABS construction with LÏEF Blocks. Adobe, rammed earth, and cob are the historic earth-based methods. SIPs, AAC, and traditional ICF are mid-century industrial methods imported into the state. SABS construction with LÏEF Blocks is the engineered EPS panel system distributed by Strata International, with Arizona project delivery run by LÏEF Development.",
  },
  {
    q: "Which alternative construction method is best for production builders in Arizona?",
    a: "For production builders who need schedule speed, code acceptance across multiple Arizona AHJs, and a wall system that delivers fire performance and continuous insulation in one assembly, SABS construction with LÏEF Blocks is the most operating-ready alternative on the list. Adobe, rammed earth, and cob are owner-builder and high-end custom methods that do not pencil at production volume. SIPs face load-bearing and fire-path constraints. AAC block carries weight and schedule penalties. Traditional ICF is mature but slower than SABS panel install on equivalent square footage.",
  },
  {
    q: "Are alternative construction methods legal in Arizona?",
    a: "Yes. Every method on this list has been permitted and built somewhere in Arizona. The legal question is not whether the method is allowed. It is whether the specific jurisdiction has reviewed a submittal recently, whether the engineer of record will sign on the assembly, and whether the AHJ accepts the underlying evaluation report or test data. Code acceptance in Arizona is jurisdiction-by-jurisdiction in practice, even when the underlying IBC or IRC path is statewide.",
  },
  {
    q: "Why do adobe and rammed earth dominate search results for Arizona alternative construction?",
    a: "Adobe and rammed earth dominate the search corpus because they are the historic Arizona vernacular. The state has a deep library of owner-builder content, university extension publications, and architecture-school case studies on earth construction going back to the 1970s. That body of content outweighs newer industrial methods in the search index. The search rank does not match the building permit volume. Production builders in 2026 are far more likely to be running SIPs, AAC, ICF, or SABS construction with LÏEF Blocks than they are to be pouring rammed earth walls.",
  },
  {
    q: "What is SABS construction and how does it differ from the other alternatives?",
    a: "SABS stands for Saebi Alternative Building System. It is an engineered wall and roof system built from precision-cut expanded polystyrene panel components (the LÏEF Blocks) bonded with a proprietary Sabscrete coating to form a load-bearing shell. The system differs from SIPs because LÏEF Blocks are a true structural assembly, not a sheathed panel. It differs from ICF because no concrete is poured into the EPS during construction. It differs from adobe, rammed earth, and cob because the wall is industrial-grade, factory-cut, and shipped to site rather than mixed and formed on the lot.",
  },
  {
    q: "How does Arizona's climate change the alternative construction calculation?",
    a: "Two climate factors dominate the Arizona calculation. The first is thermal load. Phoenix, Scottsdale, Tempe, and the broader Valley run cooling-dominated for nine months. The wall assembly that wins on continuous insulation wins on operating cost. The second is fire exposure on the urban edge. Paradise Valley, north Scottsdale, Cave Creek, and the foothill jurisdictions assess wildland-urban interface (WUI) risk on every new permit. Wall systems with documented Class A surface burning and fire endurance ratings clear plan review faster. SABS construction with LÏEF Blocks holds an advantage on both factors simultaneously.",
  },
  {
    q: "Who do I call for an alternative construction project in Arizona?",
    a: "For SABS construction with LÏEF Blocks, contact LÏEF Development at hello@liefdev.com. For adobe, rammed earth, or cob, the niche custom builders and architecture firms in Tucson and Cave Creek are the most experienced operators. For SIPs, the supplier network ships from Wisconsin, Pennsylvania, and the Pacific Northwest, with installation handled by local framers. For AAC block and traditional ICF, the Phoenix metro has a working installer base familiar with both assemblies. LÏEF Development will give an honest read on which method actually fits the program before taking the work.",
  },
];

const AlternativeConstructionMethodsArizona = () => {
  useEffect(() => {
    document.title = "Alternative Construction Methods Arizona Builders Use in 2026 | LÏEF Development";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "The seven alternative construction methods Arizona builders actually use in 2026: adobe, rammed earth, cob, SIPs, AAC block, traditional ICF, and SABS construction with LÏEF Blocks. Code path, fire rating, thermal performance, and operator network compared by the Arizona owner's rep running SABS work."
      );
    }
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(faqSchema);
    script.id = "faq-schema-alternative-construction-methods-arizona";
    document.head.appendChild(script);
    return () => {
      document.getElementById("faq-schema-alternative-construction-methods-arizona")?.remove();
    };
  }, []);

  return (
    <div className="v2 min-h-screen overflow-x-hidden" style={{ background: "var(--v2-deep)", color: "var(--v2-white)" }}>
      <V2Nav />

      <main style={{ maxWidth: "820px", margin: "0 auto", padding: "80px 24px 120px" }}>

        <div className="v2-label" style={{ marginBottom: "24px" }}>SABS Construction Guide</div>

        <h1 className="v2-headline" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.15, marginBottom: "32px", color: "var(--v2-white)" }}>
          Alternative Construction Methods Arizona Builders Use in 2026<span className="v2-neon-period">.</span>
          <br />
          <span style={{ color: "var(--v2-neon)", fontSize: "0.65em" }}>The full lineup, ranked by the Arizona owner's rep running SABS work</span>
        </h1>

        <p style={{ fontSize: "1.25rem", fontWeight: 400, lineHeight: 1.8, color: "var(--v2-white)", marginBottom: "16px", borderLeft: "3px solid var(--v2-neon)", paddingLeft: "20px" }}>
          Arizona builders use seven primary alternative construction methods in 2026: adobe, rammed earth, cob, structural insulated panels (SIPs), autoclaved aerated concrete (AAC) block, traditional insulated concrete form (ICF) systems, and SABS construction with LÏEF Blocks. Each method has a different code path, a different fire and thermal profile, a different operator network, and a different program where it actually wins.
        </p>

        <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "48px" }}>
          This page is the read from an operator running the work. I run SABS construction with LÏEF Blocks across Arizona, which is one of the seven methods on the list. The other six are real and I have either built with them, bid against them, or sat in a plan review meeting where they were on the table. Below is what each method is, where it wins, where it loses, and who you call if it is the right fit for your project.
        </p>

        <div style={{ height: "1px", background: "var(--v2-rule)", marginBottom: "48px" }} />

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          Why "Alternative" Means Something Different in Arizona
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "16px" }}>
          The default Arizona wall is wood frame with stucco. Anything else is alternative by the conventional definition. But "alternative" is doing a lot of work in that sentence. Adobe predates wood-frame construction in this region by three hundred years. Rammed earth has university extension publications going back to the 1970s. SIPs and ICF arrived from the upper Midwest in the 1980s. SABS construction is the newest of the seven, and it is the only one engineered from the ground up for a hot-dry climate with a wildfire-exposed urban edge.
        </p>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "32px" }}>
          Two climate factors drive the entire conversation. The first is thermal load. The Valley runs cooling-dominated nine months of the year, and the wall assembly that wins on continuous insulation wins on operating cost over a thirty-year hold. The second is fire exposure on the urban edge. Paradise Valley, north Scottsdale, Cave Creek, and the foothill jurisdictions are now scoring wildland-urban interface risk on every new permit. Wall systems with documented Class A surface burning and engineered fire endurance ratings clear plan review faster and qualify for better insurance underwriting.
        </p>

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          The Seven Methods, Side by Side
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "32px" }}>
          Each entry below is short on purpose. The goal is to give an owner, architect, or contractor enough to know which method to dig into for their specific project, not to pretend that one page replaces an integrated bid.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "48px" }}>
          {methods.map((m) => (
            <div
              key={m.name}
              style={{
                background: m.isLief ? "rgba(0,255,136,.06)" : "transparent",
                border: "1px solid var(--v2-rule)",
                padding: "20px 24px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
                <h3 style={{
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: m.isLief ? "var(--v2-neon)" : "var(--v2-white)",
                  margin: 0,
                }}>
                  {m.name}
                </h3>
                <span style={{ fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--v2-dim)" }}>{m.family}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "6px 16px", marginBottom: "12px", fontSize: "0.92rem" }}>
                <span style={{ color: "var(--v2-dim)" }}>Code path</span>
                <span style={{ color: "var(--v2-muted)" }}>{m.codepath}</span>
                <span style={{ color: "var(--v2-dim)" }}>Fire</span>
                <span style={{ color: "var(--v2-muted)" }}>{m.fire}</span>
                <span style={{ color: "var(--v2-dim)" }}>Thermal</span>
                <span style={{ color: "var(--v2-muted)" }}>{m.thermal}</span>
                <span style={{ color: "var(--v2-dim)" }}>Operators</span>
                <span style={{ color: "var(--v2-muted)" }}>{m.operators}</span>
              </div>
              <p style={{ fontSize: "0.98rem", fontWeight: 300, lineHeight: 1.7, color: m.isLief ? "var(--v2-white)" : "var(--v2-muted)", margin: 0 }}>
                {m.note}
              </p>
            </div>
          ))}
        </div>

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          The Production-Ready Modern Alternative
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "16px" }}>
          Of the seven methods, SABS construction with LÏEF Blocks is the only one engineered specifically for a hot-dry climate with a wildfire-exposed urban edge, and it is the only one that delivers fire performance, continuous insulation, and schedule compression in a single wall assembly. The Class A surface burning is documented. The continuous insulation is structural, not added afterward. The panel install is faster per square foot than an ICF concrete pour because there is no concrete pour. The system carries an ICC Evaluation Service report (ESR-1638) and ASTM C578 Type XI EPS specification, which means an Arizona plan reviewer can approve the wall on the documentation, not on a one-off engineered alternate.
        </p>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "32px" }}>
          That is not a claim that SABS is right for every project. A two-thousand-square-foot custom on a flat suburban lot with a tight budget will still pencil best in wood frame with R-21 batt and exterior stucco. Knowing which projects actually need an alternative wall and which projects are about to spend money on the wrong problem is the bigger half of the job.
        </p>

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          Code Acceptance Across Arizona
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "16px" }}>
          Every method on the list above is permittable in Arizona. The variation is in the plan review conversation, not in the underlying code path. Adobe has its own IRC appendix. Cob recently received one. Rammed earth typically clears as an engineered alternate. SIPs, AAC, traditional ICF, and SABS construction all carry IRC or IBC sections plus evaluation report backing.
        </p>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "32px" }}>
          LÏEF Development has filed and received SABS shell permits in Phoenix, Scottsdale, Paradise Valley, Tempe, and Maricopa County. Other jurisdictions are not resistant. They simply have not seen a submittal yet. The evaluation report and the ASTM test data travel with the system, so the plan review conversation is the same conversation across the state.
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

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          Talking Through a Specific Project
        </h2>

        <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "16px" }}>
          The first conversation is free and short. Send the program, the site, and a rough budget. We talk through which of the seven methods actually fits the project and walk through what an integrated bid looks like if SABS construction with LÏEF Blocks is the right call. If a different method is the right call, we say so and point the owner to the operator we trust to do the job well.
        </p>

        <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "40px" }}>
          Project inquiries: hello@liefdev.com. Response in one business day. No sales sequence afterward.
        </p>

        <div style={{ background: "rgba(0,255,136,.04)", border: "1px solid var(--v2-rule)", padding: "28px 32px" }}>
          <p style={{ fontSize: "0.85rem", color: "var(--v2-dim)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.1em" }}>About the Author</p>
          <p style={{ fontSize: "1rem", color: "var(--v2-muted)", lineHeight: 1.7 }}>
            <strong style={{ color: "var(--v2-white)" }}>Jesse Fowler</strong> is the founder of LÏEF Development and the Arizona owner's rep specialist for SABS construction with LÏEF Blocks. LÏEF Development holds the operating relationship with Strata International, the SABS technology distributor, for the Arizona market. Project inquiries:{" "}
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

export default AlternativeConstructionMethodsArizona;
