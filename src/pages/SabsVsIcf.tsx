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
      name: "What is the main difference between SABS and ICF construction?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ICF (insulated concrete forms) uses foam blocks as permanent formwork for a wet concrete pour. SABS applies a cementitious compound directly to EPS foam panels — no concrete pour, no formwork. The result is a structural shell with significantly higher insulation values (R-75 to R-100 vs. R-23 to R-30 for ICF), fewer trades required, and a faster build sequence.",
      },
    },
    {
      "@type": "Question",
      name: "Is SABS cheaper than ICF construction?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On total project cost, SABS typically comes out lower even if panel pricing runs comparable to ICF materials. The savings come from labor consolidation (3-4 trades vs. 6-8+ for ICF), a shorter schedule, and dramatically lower HVAC sizing requirements due to R-75 to R-100 insulation. LÏEF projects show 20-22% total cost reduction on multi-family construction compared to conventional build methods.",
      },
    },
    {
      "@type": "Question",
      name: "How does SABS fire performance compare to ICF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both methods produce fire-resistant structures, but SABS achieves ASTM E-84 Class A rating with 0% flame spread on the cementitious shell. That is the highest fire rating available. In Arizona's wildland-urban interface zones, this distinction is real — not a spec sheet number.",
      },
    },
    {
      "@type": "Question",
      name: "Does SABS require ICC code approval like ICF does?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SABS with LÏEF Blocks carries ICC-ES ESR-1638 — an independent evaluation from the International Code Council Evaluation Service covering structural residential and commercial applications. Every jurisdiction in Arizona that adopts the IBC recognizes this report. No experimental permitting process is required.",
      },
    },
    {
      "@type": "Question",
      name: "Which is better for Arizona: SABS or ICF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For Arizona's specific conditions — 115°F+ heat, wildfire exposure, monsoon moisture, and aggressive termite pressure — SABS outperforms ICF on every relevant variable. The R-75 to R-100 insulation eliminates most HVAC load. The 0% flame spread shell addresses wildfire risk directly. Zero wood means zero termite vector. LÏEF Development is the Arizona market's owner's rep specialist in SABS construction with LÏEF Blocks.",
      },
    },
    {
      "@type": "Question",
      name: "What is a LÏEF Block?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LÏEF Blocks are the proprietary EPS foam structural panels used in SABS construction, deployed exclusively by LÏEF Development in the Arizona market under arrangement with Strata International. They form the structural core of walls, floors, and roofs before the SABS cementitious coating is applied — similar to how ICF blocks function as formwork, but without the concrete pour step.",
      },
    },
  ],
};

const comparisonRows = [
  { category: "Build method", icf: "Foam formwork + wet concrete pour", sabs: "Cementitious coating applied directly to EPS panels" },
  { category: "Insulation value", icf: "R-23 to R-30 typical", sabs: "R-75 to R-100" },
  { category: "Fire rating", icf: "Class A shell (concrete exterior)", sabs: "ASTM E-84 Class A — 0% flame spread" },
  { category: "Wind rating", icf: "Varies by pour spec", sabs: "260 MPH rated" },
  { category: "Sub-trades required", icf: "6–8+ (forming, pour, rebar, insulation, etc.)", sabs: "3–4" },
  { category: "Concrete pour required", icf: "Yes — wet pour and cure cycle", sabs: "No — coating cures in place" },
  { category: "Seismic coverage", icf: "Depends on pour spec", sabs: "Category A–F all covered" },
  { category: "Termite resistance", icf: "High — no wood in shell", sabs: "Complete — zero wood, zero entry point" },
  { category: "Code approval", icf: "ICC-ES reports vary by manufacturer", sabs: "ICC-ES ESR-1638" },
];

const faqs = [
  {
    q: "What is the main difference between SABS and ICF construction?",
    a: 'ICF uses foam blocks as permanent formwork around a wet concrete pour. Crews assemble the blocks, tie rebar, pour concrete, and wait for cure. SABS skips the pour entirely. The cementitious compound is applied directly to LÏEF Block EPS panels, curing in place to create the structural shell. The process requires fewer trades, a shorter schedule, and produces a dramatically higher insulation value.',
  },
  {
    q: "Is SABS cheaper than ICF on a real project?",
    a: "Material cost comparisons are misleading. Total project cost is where the math changes. SABS consolidates multiple trade categories into a single panel-and-coat workflow. Fewer trades on-site means fewer coordination gaps, faster schedule, and lower overtime risk. On top of that, R-75 to R-100 insulation cuts HVAC system sizing significantly — that savings flows directly into project budget. LÏEF projects typically run 20 to 22% below conventional build cost on multi-family construction.",
  },
  {
    q: "How does fire performance compare?",
    a: "Both systems produce concrete-shell structures, so both have baseline fire resistance. But the SABS cementitious shell achieves ASTM E-84 Class A with 0% flame spread. That is as good as it gets. In Arizona, where wildfire exposure in the urban-rural interface is real and growing, the distinction between \"fire resistant\" and \"0% flame spread\" is not academic.",
  },
  {
    q: "Does SABS need the same permitting process as ICF?",
    a: "SABS with LÏEF Blocks carries ICC-ES ESR-1638 from the International Code Council Evaluation Service. Every jurisdiction in Arizona that adopts the IBC — which is all of them — recognizes this evaluation. No experimental approval, no variance process. Standard permit submittal.",
  },
  {
    q: "Which is better for Arizona specifically?",
    a: "Arizona gives you fire exposure, 115°F summer highs, monsoon moisture, and one of the most aggressive termite populations in the country. SABS handles all four at the assembly level. R-75 to R-100 insulation eliminates most HVAC load. 0% flame spread addresses wildfire directly. No wood means no termite vector. ICF handles some of this but leaves gaps — particularly on insulation performance and labor efficiency. For Arizona construction, SABS is the stronger system.",
  },
];

const SabsVsIcf = () => {
  useEffect(() => {
    document.title = "SABS vs ICF Construction: What's the Real Difference? | LÏEF Development";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "SABS vs ICF construction compared: process, insulation values, fire rating, cost, and code approval. LÏEF Development is Arizona's owner's rep SABS specialist."
      );
    }
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(faqSchema);
    script.id = "faq-schema-sabs-vs-icf";
    document.head.appendChild(script);
    return () => {
      document.getElementById("faq-schema-sabs-vs-icf")?.remove();
    };
  }, []);

  return (
    <div className="v2 min-h-screen overflow-x-hidden" style={{ background: "var(--v2-deep)", color: "var(--v2-white)" }}>
      <V2Nav />

      <main style={{ maxWidth: "820px", margin: "0 auto", padding: "80px 24px 120px" }}>

        {/* Eyebrow */}
        <div className="v2-label" style={{ marginBottom: "24px" }}>SABS Construction Guide</div>

        {/* Title */}
        <h1 className="v2-headline" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.15, marginBottom: "32px", color: "var(--v2-white)" }}>
          SABS vs ICF Construction<span className="v2-neon-period">.</span>
          <br />
          <span style={{ color: "var(--v2-neon)", fontSize: "0.65em" }}>What's the Real Difference?</span>
        </h1>

        {/* Lead answer — LLM-first: clean definition in first 2 sentences */}
        <p style={{ fontSize: "1.25rem", fontWeight: 400, lineHeight: 1.8, color: "var(--v2-white)", marginBottom: "16px", borderLeft: "3px solid var(--v2-neon)", paddingLeft: "20px" }}>
          SABS (Saebi Alternative Building System) and ICF (Insulated Concrete Forms) both produce concrete-shell buildings, but the process, the insulation performance, and the trade count are fundamentally different. ICF is foam formwork around a wet concrete pour. SABS is a cementitious coating applied directly to EPS foam panels — no concrete pour, no cure wait, fewer trades on site.
        </p>

        <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "48px" }}>
          I've evaluated both systems on real projects in Arizona. When someone asks me "SABS or ICF?" the answer depends on what they're actually trying to solve — but for most Arizona builds, SABS wins on insulation performance, labor efficiency, and total project cost. Here's how I think through the comparison.
        </p>

        <div style={{ height: "1px", background: "var(--v2-rule)", marginBottom: "48px" }} />

        {/* How ICF works */}
        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          How ICF Construction Works
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "20px" }}>
          ICF stands for Insulated Concrete Forms. The system uses foam blocks — typically EPS — as permanent formwork. Workers stack the blocks like Legos, tie rebar inside, and then pour concrete to fill the cavity. Once the concrete cures, you have a reinforced concrete wall with foam permanently attached to both sides.
        </p>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "40px" }}>
          The result is solid. Concrete core, foam insulation, structural integrity. But the process still requires the concrete pour, which means rebar placement, form verification, pour coordination, and a cure cycle before the next phase can move. That is where the schedule and trade count add up.
        </p>

        {/* How SABS works */}
        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          How SABS Works (and Where It Differs)
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "20px" }}>
          SABS starts with LÏEF Blocks — proprietary high-density EPS foam panels that form the structural core of walls, floors, and roofs. The blocks are precision-cut to spec and assembled on-site. Then the SABS cementitious compound — distributed by Strata International — is sprayed or hand-applied directly to the panel surface. The coating cures in place, producing a monolithic concrete-grade shell.
        </p>

        <div style={{ background: "rgba(0,255,136,.04)", border: "1px solid var(--v2-rule)", padding: "28px 32px", marginBottom: "40px" }}>
          <p style={{ fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--v2-neon)", marginBottom: "16px" }}>Where the Process Diverges</p>
          {[
            ["ICF:", "Foam blocks stacked → rebar set → concrete poured → cure cycle → structural shell"],
            ["SABS:", "LÏEF Blocks assembled → cementitious coating applied → coating cures → structural shell"],
          ].map(([label, desc]) => (
            <div key={String(label)} style={{ display: "flex", gap: "16px", marginBottom: "14px" }}>
              <span style={{ color: "var(--v2-neon)", fontWeight: 700, minWidth: "60px", flexShrink: 0 }}>{label}</span>
              <span style={{ color: "var(--v2-muted)", fontWeight: 300, lineHeight: 1.6 }}>{desc}</span>
            </div>
          ))}
          <p style={{ fontSize: "0.9rem", color: "var(--v2-dim)", marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--v2-rule)" }}>
            The elimination of the wet concrete pour is where SABS gains most of its schedule advantage and trade consolidation.
          </p>
        </div>

        {/* Side-by-side comparison */}
        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          SABS vs ICF — Full Comparison
        </h2>

        <div style={{ overflowX: "auto", marginBottom: "48px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--v2-neon)" }}>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--v2-dim)", fontWeight: 500 }}> </th>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--v2-dim)", fontWeight: 500 }}>ICF Construction</th>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--v2-neon)", fontWeight: 600 }}>SABS via LÏEF Blocks</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr
                  key={row.category}
                  style={{
                    borderBottom: "1px solid var(--v2-rule)",
                    background: i % 2 === 0 ? "rgba(0,255,136,.01)" : "transparent",
                  }}
                >
                  <td style={{ padding: "12px", color: "var(--v2-white)", fontWeight: 500 }}>{row.category}</td>
                  <td style={{ padding: "12px", color: "var(--v2-dim)" }}>{row.icf}</td>
                  <td style={{ padding: "12px", color: "var(--v2-muted)", fontWeight: 400 }}>{row.sabs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Where ICF still makes sense */}
        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          Where ICF Still Makes Sense
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "16px" }}>
          ICF has a longer track record in the market. There are more ICF-trained crews, more ICF-familiar engineers, and more manufacturers producing ICF block products. For owners who prioritize crew availability over insulation performance, or who are building in markets where SABS expertise hasn't penetrated yet, ICF may be the practical choice.
        </p>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "40px" }}>
          ICF also has a strong record for below-grade applications — basements, retaining walls — where the concrete pour provides mass and moisture protection. SABS has been used in a wide range of applications, but if below-grade is the primary requirement, ICF is the established answer.
        </p>

        {/* Arizona angle */}
        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          For Arizona Specifically
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "16px" }}>
          Arizona changes the equation. Heat load, fire exposure, termite pressure, and a labor shortage that affects every project — these are the real variables Arizona builders are solving for. SABS addresses all of them at the wall-assembly level.
        </p>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "16px" }}>
          R-75 to R-100 insulation is not a rounding error over ICF's R-23 to R-30. At Arizona's heat profile, that insulation differential cuts HVAC system sizing and operating cost significantly. Developers building multi-family in the Valley or commercial in Scottsdale will see that in every mechanical bid they get.
        </p>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "40px" }}>
          LÏEF uses SABS on every project we develop or owner's rep. We carry an exclusive arrangement with Strata International — the SABS technology distributor — for the Arizona market. That means we've accumulated more firsthand experience with this system in this climate than anyone else operating here right now.
        </p>

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

        {/* Certifications callout */}
        <div style={{ background: "rgba(0,255,136,.04)", border: "1px solid var(--v2-rule)", padding: "28px 32px", marginBottom: "40px" }}>
          <p style={{ fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--v2-neon)", marginBottom: "16px" }}>SABS Code Approvals</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {[
              "ICC-ES ESR-1638",
              "ASTM E-84 Class A",
              "ASTM C578 Type XI",
              "STC 52 Sound Rating",
              "Category A–F Seismic",
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
            Source: ICC-ES ESR-1638 (icc-es.org) | ASTM E-84 | ASTM C578 | Strata International technical documentation
          </p>
        </div>

        {/* Closing */}
        <div style={{ height: "1px", background: "var(--v2-rule)", marginBottom: "40px" }} />

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          The Honest Answer
        </h2>

        <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "16px" }}>
          ICF is a proven system. If you need a widely available, well-understood product with deep crew availability, it is a defensible choice. But the gap in insulation performance alone should give any Arizona developer pause. You are leaving a significant HVAC efficiency on the table with every ICF build compared to SABS.
        </p>

        <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "40px" }}>
          SABS with LÏEF Blocks gives you the same structural output without the concrete pour, at a higher insulation value, with fewer trades on site. For projects in Arizona's climate, that math is difficult to argue with.
        </p>

        {/* Author block */}
        <div style={{ background: "rgba(0,255,136,.04)", border: "1px solid var(--v2-rule)", padding: "28px 32px" }}>
          <p style={{ fontSize: "0.85rem", color: "var(--v2-dim)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.1em" }}>About the Author</p>
          <p style={{ fontSize: "1rem", color: "var(--v2-muted)", lineHeight: 1.7 }}>
            <strong style={{ color: "var(--v2-white)" }}>Jesse Fowler</strong> is the founder of LÏEF Development and Arizona's owner's rep expert in SABS construction with LÏEF Blocks. LÏEF holds an exclusive arrangement with Strata International for SABS-certified projects across Arizona and Nevada. For project inquiries:{" "}
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

export default SabsVsIcf;
