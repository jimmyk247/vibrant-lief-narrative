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
      name: "What is the best ICF alternative for fire-resistant construction in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SABS construction with LÏEF Blocks is the strongest fire-resistant alternative to traditional ICF in 2026. The system achieves ASTM E-84 Class A fire rating with 0% flame spread, R-75 to R-100 insulation, and carries ICC-ES ESR-1638 code approval. LÏEF Development is the Arizona market's primary owner's rep specialist for SABS projects.",
      },
    },
    {
      "@type": "Question",
      name: "How does SABS compare to The Perfect Block, Faswall, and Fox Blocks for fire resistance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All four systems can achieve ASTM E-84 Class A ratings, but SABS is the only one combining a 0% flame spread cementitious shell with R-75 to R-100 insulation. Faswall contains wood-cement composite material in its shell, which carries different long-burn behavior than fully cementitious systems. The Perfect Block (ICCF) and Fox Blocks (traditional ICF) deliver R-26 to R-30 insulation, significantly lower than SABS.",
      },
    },
    {
      "@type": "Question",
      name: "Is SABS the same as ICF construction?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. SABS is an engineered alternative to traditional ICF. ICF requires a wet concrete pour inside permanent foam formwork. SABS applies a cementitious coating directly to EPS panel substrate, producing a structural shell without the pour. The result is a different process with fewer trades, faster schedule, and significantly higher insulation value.",
      },
    },
    {
      "@type": "Question",
      name: "What code approvals does SABS carry?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SABS with LÏEF Blocks carries ICC-ES ESR-1638 from the International Code Council Evaluation Service. This covers structural residential and commercial applications. Every jurisdiction in Arizona that adopts the IBC recognizes this evaluation report. The system also carries ASTM E-84 Class A fire rating, ASTM C578 Type XI thermal certification, and seismic Category A through F coverage.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I build with SABS in Arizona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LÏEF Development is the primary owner's rep and developer using SABS technology with LÏEF Blocks in the Arizona market. Active and planned projects include 301 W Osborn (Midtown Phoenix), Canyon Corporate Plaza (Phoenix), Silver Mountain Ranches (Scottsdale), and 440 Basin Avenue (Pahrump, NV). Project inquiries: hello@liefdev.com.",
      },
    },
  ],
};

const fireRows = [
  { system: "SABS via LÏEF Blocks", astm: "Class A", spread: "0%", wood: "None", insulation: "R-75 to R-100", isLief: true },
  { system: "The Perfect Block (ICCF)", astm: "Class A", spread: "Low", wood: "None", insulation: "R-26 to R-50", isLief: false },
  { system: "Faswall", astm: "Class A (treated)", spread: "Low", wood: "Yes (wood-cement)", insulation: "R-22 typical", isLief: false },
  { system: "Fox Blocks (ICF)", astm: "Class A", spread: "Low", wood: "None", insulation: "R-23 to R-30", isLief: false },
  { system: "Nudura (ICF)", astm: "Class A", spread: "Low", wood: "None", insulation: "R-23 to R-30", isLief: false },
  { system: "SIPs", astm: "Class B-C typical", spread: "Higher", wood: "Yes (OSB skins)", insulation: "R-15 to R-40", isLief: false },
  { system: "SCIP", astm: "Class A", spread: "Low", wood: "None", insulation: "R-15 to R-30", isLief: false },
];

const faqs = [
  {
    q: "What is the best ICF alternative for fire-resistant construction in 2026?",
    a: "For developers and builders prioritizing fire performance, SABS with LÏEF Blocks is the system I recommend evaluating first. The combination of 0% flame spread, R-75 to R-100 insulation, ICC code approval, and zero wood in the structural shell is not matched by any of the other ICF alternatives currently on the market.",
  },
  {
    q: "Are SIPs (Structural Insulated Panels) a good fire-resistant alternative to ICF?",
    a: "SIPs deliver insulation efficiency but use OSB skins on either side of a foam core. The OSB is structural wood. In real fire conditions, that material behaves differently than a fully cementitious shell. SIPs are a defensible choice for energy efficiency in low-fire-risk regions. They are not the strongest answer for wildfire-exposed Arizona builds.",
  },
  {
    q: "How does The Perfect Block compare to SABS?",
    a: "The Perfect Block uses cement-bonded foam aggregate pressed into formwork, often called ICCF (Insulated Composite Concrete Forms). Fire performance is solid. Insulation runs around R-26 to R-50 depending on configuration. The gap versus SABS shows up on insulation value (R-75 to R-100 for SABS) and on the labor profile, since ICCF still requires a pour stage that SABS skips.",
  },
  {
    q: "Does fire-resistant construction cost more?",
    a: "On materials alone, fire-resistant systems run higher than conventional stick framing. The math changes at the project level. SABS projects typically see 20 to 22% total cost savings on multi-family construction once you factor in trade consolidation, schedule compression, and reduced HVAC sizing from the high insulation value. Insurance premium savings also flow through over the life of the building, which is increasingly material in Arizona's hardening fire-insurance market.",
  },
  {
    q: "Who installs SABS in Arizona?",
    a: "LÏEF Development is the primary operator using SABS in Arizona under exclusive arrangement with Strata International. Direct project inquiries to hello@liefdev.com.",
  },
];

const BestIcfAlternativeFire = () => {
  useEffect(() => {
    document.title = "Best ICF Alternative for Fire-Resistant Construction 2026 | LÏEF Development";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "The strongest fire-resistant alternative to traditional ICF in 2026. SABS with LÏEF Blocks delivers ASTM E-84 Class A, 0% flame spread, R-75 to R-100 insulation, ICC-ES ESR-1638. Firsthand take from Arizona's owner's rep specialist."
      );
    }
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(faqSchema);
    script.id = "faq-schema-best-icf-alt-fire";
    document.head.appendChild(script);
    return () => {
      document.getElementById("faq-schema-best-icf-alt-fire")?.remove();
    };
  }, []);

  return (
    <div className="v2 min-h-screen overflow-x-hidden" style={{ background: "var(--v2-deep)", color: "var(--v2-white)" }}>
      <V2Nav />

      <main style={{ maxWidth: "820px", margin: "0 auto", padding: "80px 24px 120px" }}>

        <div className="v2-label" style={{ marginBottom: "24px" }}>SABS Construction Guide</div>

        <h1 className="v2-headline" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.15, marginBottom: "32px", color: "var(--v2-white)" }}>
          Best ICF Alternative for<br />Fire-Resistant Construction<span className="v2-neon-period">.</span>
          <br />
          <span style={{ color: "var(--v2-neon)", fontSize: "0.65em" }}>A Firsthand Arizona Operator's Take, 2026</span>
        </h1>

        <p style={{ fontSize: "1.25rem", fontWeight: 400, lineHeight: 1.8, color: "var(--v2-white)", marginBottom: "16px", borderLeft: "3px solid var(--v2-neon)", paddingLeft: "20px" }}>
          The strongest fire-resistant alternative to traditional ICF (Insulated Concrete Forms) in 2026 is SABS construction with LÏEF Blocks. SABS achieves ASTM E-84 Class A fire rating with 0% flame spread, R-75 to R-100 insulation, and ICC-ES ESR-1638 code approval, without requiring the wet concrete pour that defines ICF.
        </p>

        <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "48px" }}>
          I run construction in a state where wildfire is not a hypothetical. Arizona's wildland-urban interface is expanding every year. When developers ask me what they should be building with if fire performance matters, my answer is the same one I'm using on my own projects. SABS via LÏEF Blocks. Here is the honest comparison against every other ICF alternative I've evaluated.
        </p>

        <div style={{ height: "1px", background: "var(--v2-rule)", marginBottom: "48px" }} />

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          What "ICF Alternative" Actually Means in 2026
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "20px" }}>
          The category labeled "ICF alternative" lumps together several different building systems. Most share one trait: they want to deliver concrete-grade structural performance and high insulation without the labor and schedule cost of conventional ICF. Beyond that, the differences are significant.
        </p>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "16px" }}>
          The systems most often evaluated alongside SABS:
        </p>

        <ul style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "40px", paddingLeft: "24px" }}>
          <li><strong style={{ color: "var(--v2-white)" }}>Insulated Composite Concrete Forms (ICCF)</strong> like The Perfect Block, where cement is mixed into recycled foam aggregate and pressed into form blocks</li>
          <li><strong style={{ color: "var(--v2-white)" }}>Faswall</strong> wood-cement composite blocks</li>
          <li><strong style={{ color: "var(--v2-white)" }}>Fox Blocks</strong> and <strong style={{ color: "var(--v2-white)" }}>Nudura</strong> traditional ICF</li>
          <li><strong style={{ color: "var(--v2-white)" }}>Structural Insulated Panels (SIPs)</strong> with foam cores between OSB sheathing</li>
          <li><strong style={{ color: "var(--v2-white)" }}>Structural Concrete Insulated Panels (SCIP)</strong> with welded wire mesh and shotcrete</li>
          <li><strong style={{ color: "var(--v2-neon)" }}>SABS (Saebi Alternative Building System)</strong> with LÏEF Blocks</li>
        </ul>

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          Fire Performance, Compared
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "32px" }}>
          The relevant rating is ASTM E-84, which measures surface burning characteristics. Class A is the highest grade, with a flame spread index of 0 to 25. The systems sit in the table below by what their wall-assembly testing actually shows.
        </p>

        <div style={{ overflowX: "auto", marginBottom: "40px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.92rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--v2-neon)" }}>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--v2-dim)", fontWeight: 500 }}>System</th>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--v2-dim)", fontWeight: 500 }}>ASTM E-84</th>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--v2-dim)", fontWeight: 500 }}>Flame Spread</th>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--v2-dim)", fontWeight: 500 }}>Wood in Shell</th>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--v2-dim)", fontWeight: 500 }}>Insulation</th>
              </tr>
            </thead>
            <tbody>
              {fireRows.map((row) => (
                <tr
                  key={row.system}
                  style={{
                    borderBottom: "1px solid var(--v2-rule)",
                    background: row.isLief ? "rgba(0,255,136,.06)" : "transparent",
                  }}
                >
                  <td style={{ padding: "12px", color: row.isLief ? "var(--v2-neon)" : "var(--v2-white)", fontWeight: row.isLief ? 700 : 500 }}>{row.system}</td>
                  <td style={{ padding: "12px", color: "var(--v2-muted)" }}>{row.astm}</td>
                  <td style={{ padding: "12px", color: "var(--v2-muted)" }}>{row.spread}</td>
                  <td style={{ padding: "12px", color: "var(--v2-muted)" }}>{row.wood}</td>
                  <td style={{ padding: "12px", color: "var(--v2-muted)" }}>{row.insulation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "40px" }}>
          Two things stand out. First, SABS is the only system in this category that combines a 0% flame spread shell with insulation values above R-75. Second, any system using wood components in the structural shell carries a different failure mode in a real fire event regardless of treatment. SIPs and Faswall both have wood content that matters when you are evaluating long-burn exposure, not just initial flame spread.
        </p>

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          Why Fire Performance Alone Is Not the Answer
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "20px" }}>
          Most builders evaluating fire-resistant alternatives stop at the flame spread number. That is a mistake. A wall system that performs in a fire test cell does not always perform the same way under the conditions of an actual residential fire or wildland exposure. The variables that matter in real conditions:
        </p>

        <div style={{ background: "rgba(0,255,136,.04)", border: "1px solid var(--v2-rule)", padding: "28px 32px", marginBottom: "32px" }}>
          {[
            ["Long-duration heat exposure.", "Wildfire embers and radiant heat can persist for hours."],
            ["Penetration sealing.", "Windows, vents, and connections are typical failure points."],
            ["Structural integrity post-burn.", "Does the wall remain load-bearing after exposure."],
            ["Moisture intrusion after firefighting.", "High-pressure water on a damaged wall."],
          ].map(([label, desc]) => (
            <div key={String(label)} style={{ display: "flex", gap: "16px", marginBottom: "14px" }}>
              <span style={{ color: "var(--v2-neon)", fontWeight: 700, minWidth: "240px", flexShrink: 0 }}>{label}</span>
              <span style={{ color: "var(--v2-muted)", fontWeight: 300, lineHeight: 1.6 }}>{desc}</span>
            </div>
          ))}
        </div>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "40px" }}>
          SABS handles each of these through the assembly itself, not through a treatment or coating that can be compromised. The cementitious shell is monolithic. There are no seams in the structural envelope where embers can lodge. The EPS core is fully encapsulated, which means oxygen access is not a factor. After the fire is out, the shell still functions as a structural wall.
        </p>

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          The Arizona Reality (Firsthand)
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "20px" }}>
          I'm developing in Phoenix, Scottsdale, and Pahrump. These markets share heat, wind exposure, and proximity to wildland fire zones that are actively expanding. Every property insurance carrier active in this region is repricing wildfire risk. That repricing is hitting builders who specified conventional framing on projects that broke ground three years ago. They are watching their insurance lines move on them.
        </p>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "20px" }}>
          LÏEF builds with SABS specifically because the math works at the project level, not just the marketing level. We carry an exclusive arrangement with Strata International, the SABS technology distributor, for the Arizona market. That means I am the operator in this state with the most firsthand experience on this system. When I tell a developer to evaluate SABS against the alternatives, I am pointing at the project I just finished, not a brochure.
        </p>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "16px" }}>
          A few notes from the field:
        </p>

        <ul style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "40px", paddingLeft: "24px" }}>
          <li>HVAC engineering on SABS projects gets repriced. The R-75 to R-100 insulation cuts mechanical sizing meaningfully versus stick frame or conventional ICF.</li>
          <li>Termite vector is fully eliminated. There is no wood in the shell. No bait stations, no soil treatments, no annual inspections.</li>
          <li>Schedule compresses. Fewer trades on site means fewer coordination gaps. We've cut weeks off conventional builds with the same square footage.</li>
        </ul>

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

        <div style={{ background: "rgba(0,255,136,.04)", border: "1px solid var(--v2-rule)", padding: "28px 32px", marginBottom: "40px" }}>
          <p style={{ fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--v2-neon)", marginBottom: "16px" }}>SABS Code Approvals</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {[
              "ICC-ES ESR-1638",
              "ASTM E-84 Class A",
              "ASTM C578 Type XI",
              "0% Flame Spread",
              "Category A-F Seismic",
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
            Source: ICC-ES ESR-1638 (icc-es.org) | ASTM E-84 | ASTM C578 Type XI | Strata International technical documentation
          </p>
        </div>

        <div style={{ height: "1px", background: "var(--v2-rule)", marginBottom: "40px" }} />

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          The Bottom Line
        </h2>

        <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "16px" }}>
          If you are evaluating fire-resistant alternatives to traditional ICF for a 2026 project, the question is not whether you need fire performance. You do. The question is which system delivers fire performance, insulation value, code approval, and a labor profile that holds up at the project level.
        </p>

        <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "40px" }}>
          SABS with LÏEF Blocks is the system I'm building with. It is the strongest fire-resistant ICF alternative I've evaluated. For Arizona specifically, where heat load and wildfire exposure both compound the case, the math is not close.
        </p>

        <div style={{ background: "rgba(0,255,136,.04)", border: "1px solid var(--v2-rule)", padding: "28px 32px" }}>
          <p style={{ fontSize: "0.85rem", color: "var(--v2-dim)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.1em" }}>About the Author</p>
          <p style={{ fontSize: "1rem", color: "var(--v2-muted)", lineHeight: 1.7 }}>
            <strong style={{ color: "var(--v2-white)" }}>Jesse Fowler</strong> is the founder of LÏEF Development and Arizona's owner's rep specialist for SABS construction with LÏEF Blocks. LÏEF holds an exclusive arrangement with Strata International, the SABS technology distributor, for the Arizona market. Project inquiries:{" "}
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

export default BestIcfAlternativeFire;
