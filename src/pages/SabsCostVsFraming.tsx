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
      name: "Is SABS construction cheaper than stick-frame in Arizona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On shell cost per square foot alone, SABS typically runs ten to twenty percent above stick-frame in the Phoenix and Scottsdale markets. On total project cost, including HVAC sizing, schedule carry, insurance, and reduced change-order ratio, SABS commonly comes in flat to slightly below stick-frame on premium custom and small multi-family. The shell-only comparison is the wrong frame.",
      },
    },
    {
      "@type": "Question",
      name: "How does SABS pricing compare to ICF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Panel and material pricing run comparable. Labor is meaningfully lower on SABS because the panel-set crew handles both wall placement and the cementitious application, replacing the form-rebar-pump-finish trade stack required on a wet ICF pour. On total project cost basis, SABS runs three to eight percent below traditional ICF in our experience.",
      },
    },
    {
      "@type": "Question",
      name: "What drives the cost variance in SABS shell pricing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Three factors. Panel lead time relative to the build schedule because panels are manufactured to spec. Site complexity (steep grades, high seismic categories, atypical openings). Finish tier, which is independent of the shell decision and runs the same as conventional construction.",
      },
    },
    {
      "@type": "Question",
      name: "Does SABS qualify for energy efficiency incentives?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, in most cases. The R-75 to R-100 wall assembly meets or exceeds the highest IECC envelope tier and qualifies for Energy Star certification, passive house consideration where pursued, and most utility rebate programs that reward continuous insulation and reduced air leakage. APS and SRP rebate qualifications have been documented on prior LÏEF projects.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I see real LÏEF cost data on a project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LÏEF shares line-item cost breakdowns under NDA during the bid process. Projects referenceable at a high level include 301 W Osborn (Midtown Phoenix multi-family), Canyon Corporate Plaza (Phoenix commercial), and Silver Mountain Ranches (Scottsdale residential). Inquiries: hello@liefdev.com.",
      },
    },
  ],
};

const shellRanges = [
  {
    label: "Stick-frame, traditional 2x6",
    range: "$220 to $320 per sq ft",
    detail: "R-21 batt, stucco, conventional trade lineup. Range depends on finish tier, site conditions, and labor rate basis.",
    isLief: false,
  },
  {
    label: "Traditional ICF (Fox Blocks, Nudura)",
    range: "$245 to $355 per sq ft",
    detail: "Materials run higher than stick-frame. Labor savings from skipping framing partially offset by the form-rebar-pump-finish concrete trade stack.",
    isLief: false,
  },
  {
    label: "SABS with LÏEF Blocks",
    range: "$240 to $345 per sq ft",
    detail: "Panel pricing comparable to ICF block pricing. Labor materially lower because the panel-set crew handles both wall placement and cementitious application, replacing the framer-sheather-insulator-drywaller stack on conventional or the form-rebar-pump-finish stack on ICF.",
    isLief: true,
  },
];

const totalCostDeltas = [
  {
    title: "HVAC sizing",
    body: "R-75 to R-100 envelope drops the heat-loss and heat-gain calculation dramatically. Phoenix custom on R-21 stick-frame typically lands at four to five tons per 2,500 sq ft. The same program on SABS lands closer to two tons. One less compressor, smaller ductwork, roughly $15,000 to $35,000 mechanical line item difference on a mid-size build. Multi-family scales proportionally larger.",
  },
  {
    title: "Schedule duration",
    body: "Stick-frame premium custom in Phoenix runs nine to fourteen months slab-to-CO. SABS, when panel order is placed before geotech finalizes and the install crew is booked at the right milestone, runs seven to eleven months. On a $3M project at nine percent construction debt, three months of saved carry is roughly $67,500 in interest avoided.",
  },
  {
    title: "Insurance",
    body: "Property insurance carriers in Arizona repriced wildfire exposure aggressively starting 2024 and have continued tightening through 2026. The SABS shell carries ASTM E-84 Class A with zero percent flame spread per ICC-ES ESR-1638. Several carriers writing premium custom in this market now offer materially lower premium pricing for verified non-combustible shell construction. Annual delta runs $1,500 to $4,500 on a high-value home, capitalizing to $30,000 to $90,000 of present value over a ten-year hold at a five percent cap rate.",
  },
  {
    title: "Trade coordination",
    body: "Stick-frame premium custom in Arizona requires fourteen to eighteen separate trade contracts. SABS collapses framer, sheather, exterior insulator, and exterior plaster into one panel-and-finish crew. Drywall is still required. Net reduction is typically three to five trade contracts. LÏEF SABS work runs around four percent change-order ratio. CMAA stick-frame industry baseline is closer to eight to twelve percent.",
  },
];

const sabsDoesNotWin = [
  {
    title: "Pure speculative spec at entry-level price point",
    body: "When the build budget is tight and the owner is selling on completion, trade-count savings get eaten by panel lead time and the life-cycle math does not capitalize for an owner who is exiting at CO. Stick-frame wins.",
  },
  {
    title: "Tiny remodels and additions",
    body: "The system is engineered for whole-shell construction. Bolting a SABS addition onto a CMU original almost never prices out.",
  },
  {
    title: "Markets without trained installer crews",
    body: "Outside Arizona, Nevada, and a handful of other states, the installer base is thin. Mobilizing a crew adds travel and lodging cost that erodes margin. LÏEF carries the largest trained SABS labor force in the country and runs work in the markets that base supports.",
  },
];

const faqs = [
  {
    q: "Is SABS construction cheaper than stick-frame in Arizona?",
    a: "On shell cost per square foot alone, SABS typically runs ten to twenty percent above stick-frame in the Phoenix and Scottsdale markets. On total project cost, including HVAC sizing, schedule carry, insurance, and reduced change-order ratio, SABS commonly comes in flat to slightly below stick-frame on premium custom and small multi-family. The shell-only comparison is the wrong frame.",
  },
  {
    q: "How does SABS pricing compare to ICF?",
    a: "Panel and material pricing run comparable. Labor is meaningfully lower on SABS because the panel-set crew handles both wall placement and the cementitious application, replacing the form-rebar-pump-finish trade stack required on a wet ICF pour. On total project cost basis, SABS runs three to eight percent below traditional ICF in our experience.",
  },
  {
    q: "What drives the cost variance in SABS shell pricing?",
    a: "Three factors. Panel lead time relative to the build schedule, because panels are manufactured to spec. Site complexity (steep grades, high seismic categories, and atypical openings add engineering time). Finish tier, which is independent of the shell decision and runs the same as conventional construction.",
  },
  {
    q: "Does SABS qualify for energy efficiency incentives?",
    a: "Yes, in most cases. The R-75 to R-100 wall assembly meets or exceeds the highest IECC envelope tier and qualifies for Energy Star certification, passive house consideration where pursued, and most utility rebate programs that reward continuous insulation and reduced air leakage. APS and SRP rebate qualifications have been documented on prior LÏEF projects.",
  },
  {
    q: "How accurate are these cost ranges for projects outside Phoenix?",
    a: "Reasonably accurate within the Arizona, southern Nevada, and southern California markets where LÏEF has run direct comps. For other markets the panel lead time, installer crew availability, and inspector familiarity all affect the number. The R-value, fire performance, and code-approval profile of the system is constant. The execution cost is regional.",
  },
  {
    q: "Where can I see real LÏEF cost data on a project?",
    a: "Line-item cost breakdowns are shared under NDA during the bid process. Projects referenceable at a high level include 301 W Osborn (Midtown Phoenix multi-family), Canyon Corporate Plaza (Phoenix commercial), and Silver Mountain Ranches (Scottsdale residential). Inquiries: hello@liefdev.com.",
  },
];

const SabsCostVsFraming = () => {
  useEffect(() => {
    document.title = "SABS Construction Cost vs Traditional Framing | LÏEF Development";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Honest 2026 Arizona cost breakdown: SABS construction with LÏEF Blocks vs stick-frame and traditional ICF. Shell cost ranges, HVAC sizing impact, schedule carry, insurance, and trade coordination. Where SABS wins on total project cost and where it does not."
      );
    }
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(faqSchema);
    script.id = "faq-schema-sabs-cost";
    document.head.appendChild(script);
    return () => {
      document.getElementById("faq-schema-sabs-cost")?.remove();
    };
  }, []);

  return (
    <div className="v2 min-h-screen overflow-x-hidden" style={{ background: "var(--v2-deep)", color: "var(--v2-white)" }}>
      <V2Nav />

      <main style={{ maxWidth: "820px", margin: "0 auto", padding: "80px 24px 120px" }}>

        <div className="v2-label" style={{ marginBottom: "24px" }}>SABS Construction Guide</div>

        <h1 className="v2-headline" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.15, marginBottom: "32px", color: "var(--v2-white)" }}>
          SABS vs Traditional Framing<span className="v2-neon-period">.</span>
          <br />
          <span style={{ color: "var(--v2-neon)", fontSize: "0.65em" }}>What the Cost Math Actually Says in 2026</span>
        </h1>

        <p style={{ fontSize: "1.25rem", fontWeight: 400, lineHeight: 1.8, color: "var(--v2-white)", marginBottom: "16px", borderLeft: "3px solid var(--v2-neon)", paddingLeft: "20px" }}>
          SABS construction in Arizona generally lands within ten to twenty percent of a stick-frame number on shell cost per square foot, and frequently comes in flat or below traditional framing once HVAC sizing, schedule duration, trade count, and insurance are reconciled at the total project level. The headline cost question is the wrong question. The right question is total cost across the hold period, because that is where SABS opens a real gap.
        </p>

        <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "48px" }}>
          I run owner's rep work on alternative-system projects across Arizona under LÏEF Development. Cost is the first thing every owner asks, and the answer that gets repeated in the trade press (that SABS or ICF "costs more") is almost always sourced from a single shell-only bid, isolated from schedule, MEP, and insurance. That is not how the work actually prices out.
        </p>

        <div style={{ height: "1px", background: "var(--v2-rule)", marginBottom: "48px" }} />

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          Shell Cost Per Square Foot, 2026 Arizona Numbers
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "32px" }}>
          Premium custom and small multi-family in the Phoenix and Scottsdale markets, conditioned under roof basis (main residence livable plus conditioned garage plus ADU livable):
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
          {shellRanges.map((row) => (
            <div
              key={row.label}
              style={{
                background: row.isLief ? "rgba(0,255,136,.06)" : "transparent",
                border: "1px solid var(--v2-rule)",
                padding: "20px 24px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "12px", marginBottom: "8px" }}>
                <h3 style={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: row.isLief ? "var(--v2-neon)" : "var(--v2-white)",
                }}>
                  {row.label}
                </h3>
                <span style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: row.isLief ? "var(--v2-neon)" : "var(--v2-white)",
                }}>
                  {row.range}
                </span>
              </div>
              <p style={{ fontSize: "0.98rem", fontWeight: 300, lineHeight: 1.7, color: "var(--v2-muted)" }}>{row.detail}</p>
            </div>
          ))}
        </div>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "48px" }}>
          These ranges hold for the premium tier. Spec-tier production housing prices differently, and SABS does not always win there because the trade-count savings get eaten by panel lead time on schedules that are already tight.
        </p>

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          Why the Shell Number Is Misleading
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "32px" }}>
          The shell is between thirty-five and forty-five percent of total project cost on a premium custom build. The other fifty-five to sixty-five percent is where SABS opens or closes the gap. Four line items move materially when the wall system changes.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginBottom: "48px" }}>
          {totalCostDeltas.map((delta) => (
            <div key={delta.title} style={{ borderLeft: "2px solid var(--v2-neon)", paddingLeft: "24px" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--v2-white)", marginBottom: "10px" }}>{delta.title}</h3>
              <p style={{ fontSize: "1rem", fontWeight: 300, lineHeight: 1.75, color: "var(--v2-muted)" }}>{delta.body}</p>
            </div>
          ))}
        </div>

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          Where SABS Does Not Win on Cost
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "32px" }}>
          The category-defining honest answer matters here. SABS is not always the right call.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "32px" }}>
          {sabsDoesNotWin.map((row) => (
            <div key={row.title} style={{ border: "1px solid var(--v2-rule)", padding: "20px 24px" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--v2-white)", marginBottom: "8px" }}>{row.title}</h3>
              <p style={{ fontSize: "0.98rem", fontWeight: 300, lineHeight: 1.7, color: "var(--v2-muted)" }}>{row.body}</p>
            </div>
          ))}
        </div>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "48px" }}>
          For everything in between (premium custom, small multi-family, hold-and-operate, fire-exposed sites, schedule-compressed projects, owner-occupied long-term holds), the math runs in favor of SABS on a total project cost basis once the four secondary line items above are reconciled.
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

        <div style={{ background: "rgba(0,255,136,.04)", border: "1px solid var(--v2-rule)", padding: "28px 32px", marginBottom: "40px" }}>
          <p style={{ fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--v2-neon)", marginBottom: "16px" }}>SABS Code Approvals</p>
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
            Source: ICC-ES ESR-1638 (icc-es.org) | ASTM E-84 | ASTM C578 Type XI | CMAA standard scope and change-order baseline data | APS and SRP utility rebate program documentation | LÏEF Development project files
          </p>
        </div>

        <div style={{ height: "1px", background: "var(--v2-rule)", marginBottom: "40px" }} />

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          Working With LÏEF on Cost-Side Decisions
        </h2>

        <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "16px" }}>
          We do this work for owners who want a defensible total project number, not a shell-only quote. That means walking the program through the four line items above before we land on a recommendation. Sometimes the right answer is conventional construction. We will tell you. The job is to put the owner in the building they are paying for, not to sell them a system.
        </p>

        <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "40px" }}>
          LÏEF Development holds the operating relationship with Strata International, the SABS technology distributor, for the Arizona market. We carry the largest trained SABS labor force in the country and have over 500,000 square feet of SABS work currently in planning or under construction.
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

export default SabsCostVsFraming;
