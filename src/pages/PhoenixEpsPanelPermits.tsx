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
      name: "Which Phoenix-area AHJs have permitted modular EPS panel construction with SABS and LÏEF Blocks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "City of Phoenix, City of Scottsdale, Town of Paradise Valley, City of Tempe, City of Mesa, and Maricopa County have all reviewed and issued building permits on SABS construction with LÏEF Blocks through LÏEF Development. Phoenix and Scottsdale carry the deepest review history because they see the highest volume of alternative-system submittals in the Valley. Paradise Valley plan review treats SABS as a fire-favorable system on wildland-urban interface lots. Maricopa County is the path for unincorporated parcels in the north and west valley.",
      },
    },
    {
      "@type": "Question",
      name: "What documents does a Phoenix AHJ require for an EPS panel building system?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every Phoenix-area plan check on a SABS shell wants the current ICC Evaluation Service report (ICC-ES ESR-1638), the engineer of record's stamped structural calculations, the ASTM E-84 surface burning test report (Class A), the ASTM C578 Type XI EPS material certification, the manufacturer's installation instructions, and the panel shop drawings sealed for the project. LÏEF carries this package as a permanent submittal binder and updates it on each ICC report revision. A plan reviewer who has not seen SABS before asks for all of it. A plan reviewer who has seen it before only asks for the project-specific structural and the shop drawings.",
      },
    },
    {
      "@type": "Question",
      name: "How long does Phoenix plan review take on a SABS modular EPS panel shell?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "First-cycle Phoenix residential plan review on a SABS shell typically runs four to six weeks on a single-family custom and six to ten weeks on a small multi-family. The first cycle is dominated by structural review, not envelope review. Comment counts on the panel system itself are usually zero to three when the ICC-ES report and Sabscrete material data are submitted in the initial package. Most schedule pressure on Phoenix-area SABS permits comes from civil, drainage, and zoning review, not from the wall system itself.",
      },
    },
    {
      "@type": "Question",
      name: "Who is the engineer of record on a Phoenix SABS or LÏEF Blocks project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LÏEF works with three structural engineering firms in the Phoenix market who have stamped SABS shells before and are comfortable with the panel system's engineered alternate path. We assign the EOR by project type and AHJ familiarity. Owners can bring their own EOR if they prefer; we walk that engineer through the SABS calculation package and the prior stamped precedents before the project starts. The system itself has a continuous engineered chain back to Strata International and the original Dr. Nasser Saebi research.",
      },
    },
    {
      "@type": "Question",
      name: "Why do Phoenix plan reviewers treat SABS differently than traditional ICF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Traditional ICF uses a foam form that is filled with poured concrete on site. The structural element is the concrete. Plan review treats ICF as a concrete wall with an EPS form. SABS panels are EPS cores faced with steel mesh and finished with a proprietary cementitious coating that becomes part of the structural system. There is no poured-in-place concrete in the wall. Plan review treats SABS as an engineered composite wall under the ICC-ES report, not as a concrete wall. The result is a faster structural review and a different inspection sequence on site.",
      },
    },
    {
      "@type": "Question",
      name: "Where can someone walk a permitted Phoenix EPS panel construction project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Active and recently completed Phoenix-area SABS permits include 301 W Osborn Road in midtown Phoenix (multi-family infill), Canyon Corporate Plaza (Phoenix commercial), and Silver Mountain Ranches in Scottsdale (custom residential). LÏEF offers walkthroughs under NDA during the bid or feasibility phase. Inquiries: hello@liefdev.com.",
      },
    },
  ],
};

const ahjs = [
  {
    name: "City of Phoenix",
    body: "The largest review volume of any Arizona AHJ. SABS submittals route through the Planning and Development Department's residential or commercial counter depending on occupancy. Phoenix plan reviewers have seen ICC-ES ESR-1638 enough times to treat the wall system as a known engineered assembly rather than a novel construction. Civil and drainage review is the usual long pole. Permit history through LÏEF includes residential, multi-family infill, and commercial occupancy.",
  },
  {
    name: "City of Scottsdale",
    body: "Scottsdale carries the highest-end custom volume in the Valley and a plan review team that is familiar with engineered alternates across multiple alternative systems. SABS shells on Scottsdale custom residential are a routine review path. The hillside development overlay adds drainage, slope, and view-corridor work that is independent of the wall system. Code acceptance on the panel itself is not the binding constraint.",
  },
  {
    name: "Town of Paradise Valley",
    body: "Paradise Valley's wildland-urban interface mapping puts a real premium on documented non-combustible wall systems. SABS reads as non-combustible per ASTM E-84 Class A and zero percent flame spread, which clears the WUI review band faster than wood-skin systems. Plan check on a PV custom typically focuses on lot coverage, building height, and exterior materials review rather than the panel itself.",
  },
  {
    name: "City of Tempe",
    body: "Smaller infill and multi-family volume than Phoenix or Scottsdale, but Tempe plan review is responsive to engineered alternate systems and the ASU adjacency drives a steady stream of higher-density residential work. SABS shells qualify for the same energy code path and the same WUI mapping as elsewhere in the Valley.",
  },
  {
    name: "City of Mesa",
    body: "Mesa's review path on SABS is the most procedural of the larger Valley AHJs. The wall system documentation submits cleanly under the engineered alternate path, but Mesa reviewers want the ICC-ES report and the project-specific engineer's calc package in the initial submittal rather than as a deferred submittal. LÏEF submits both in the first cycle on every Mesa project.",
  },
  {
    name: "Maricopa County",
    body: "Maricopa County reviews permits on unincorporated parcels in the north and west Valley, including the foothill custom and ranch projects that fall outside city limits. County plan review on SABS is straightforward because the engineered alternate path is the same as the cities and the AHJ does not impose additional wall system overlays. WUI mapping is increasingly part of the county review on north Valley parcels.",
  },
];

const planCheckSequence = [
  {
    step: "1. Pre-application AHJ touch",
    body: "On any AHJ where LÏEF has not pulled a SABS permit before, the first step is a 15-minute call or meeting with the plan review supervisor. We walk through the ICC-ES report, the prior stamped projects, and the engineer of record. This costs nothing and removes the first-cycle surprise factor that drags a project's schedule.",
  },
  {
    step: "2. Initial submittal package",
    body: "Architectural set, structural calcs and details, ICC-ES ESR-1638, ASTM E-84 and C578 documentation, manufacturer installation instructions, panel shop drawings sealed for the project, energy code compliance, and the standard civil, drainage, and zoning documents. SABS-specific documents are roughly a 30-page binder added to a standard residential or commercial submittal.",
  },
  {
    step: "3. First-cycle comments",
    body: "Panel-system-specific comments are rare past the first or second SABS project in any given AHJ. Most first-cycle comments are on civil, drainage, energy code interaction with R-75+ envelope, or roof framing tie-in details. LÏEF resolves SABS-specific comments directly with the EOR; civil and drainage comments route to the project civil engineer.",
  },
  {
    step: "4. Inspection sequence on site",
    body: "Foundation, panel set, mesh tie-in and electrical/mechanical rough chases through the panel, Sabscrete first coat, Sabscrete second coat, finish trades. The inspection sequence is closer to a CMU wall than to wood frame. Inspectors familiar with SABS know what they are looking at by the second project. LÏEF carries pre-pour and pre-coating photo documentation on every project as part of the operating standard.",
  },
];

const referenceProjects = [
  {
    name: "301 W Osborn Road",
    ahj: "City of Phoenix",
    type: "Midtown multi-family infill",
    note: "Demonstrates SABS shell on a Phoenix multi-family product type that traditionally runs stick-frame over CMU podium. Permit review treated the wall system under the engineered alternate path with no novel comments past first cycle.",
  },
  {
    name: "Canyon Corporate Plaza",
    ahj: "City of Phoenix",
    type: "Commercial",
    note: "SABS application on commercial occupancy, where fire performance and continuous insulation interact with IBC code path differently than residential. The permit history on this project is the reference for any future Phoenix commercial SABS submittal LÏEF brings forward.",
  },
  {
    name: "Silver Mountain Ranches",
    ahj: "City of Scottsdale (foothill overlay)",
    type: "Custom residential",
    note: "Higher-end Scottsdale custom on a fire-exposed site. Plan review focused on hillside overlay and view-corridor compliance. The wall system itself moved through plan check on the standard engineered alternate path. Insurance underwriting on the completed shell ran lower than a comparable stick-frame.",
  },
];

const faqs = [
  {
    q: "Which Phoenix-area AHJs have permitted SABS modular EPS panel construction?",
    a: "City of Phoenix, City of Scottsdale, Town of Paradise Valley, City of Tempe, City of Mesa, and Maricopa County have all reviewed and issued building permits on SABS construction with LÏEF Blocks through LÏEF Development. Each AHJ treats the wall system under the engineered alternate path with the ICC-ES ESR-1638 evaluation report.",
  },
  {
    q: "What documents does a Phoenix AHJ require for an EPS panel building system?",
    a: "ICC-ES ESR-1638, engineer of record stamped structural calculations, ASTM E-84 Class A surface burning test report, ASTM C578 Type XI EPS material certification, manufacturer installation instructions, and panel shop drawings sealed for the project. LÏEF carries this as a permanent submittal binder updated on each ICC report revision.",
  },
  {
    q: "How long does Phoenix plan review take on a SABS shell?",
    a: "First-cycle Phoenix residential plan review on a SABS shell typically runs four to six weeks on a single-family custom and six to ten weeks on a small multi-family. Comment counts on the panel system itself are usually zero to three when the ICC-ES report is in the initial package. Most schedule pressure comes from civil, drainage, and zoning, not the wall system.",
  },
  {
    q: "Who is the engineer of record on a Phoenix SABS project?",
    a: "LÏEF works with three structural engineering firms in the Phoenix market familiar with the SABS engineered alternate path. We assign by project type and AHJ familiarity. Owners can bring their own EOR; we walk that engineer through the calculation package and prior stamped precedents.",
  },
  {
    q: "How does Phoenix plan review treat SABS versus traditional ICF?",
    a: "Traditional ICF is reviewed as a concrete wall with an EPS form. SABS is reviewed as an engineered composite wall under the ICC-ES report, with no poured-in-place concrete in the wall. The result is a faster structural review and a different inspection sequence on site.",
  },
  {
    q: "Where can I see a permitted Phoenix EPS panel project?",
    a: "Active and recently completed Phoenix-area SABS permits include 301 W Osborn Road (Phoenix multi-family), Canyon Corporate Plaza (Phoenix commercial), and Silver Mountain Ranches (Scottsdale residential). Walkthroughs are available under NDA during bid or feasibility. Inquiries: hello@liefdev.com.",
  },
  {
    q: "What does an Arizona owner's rep on a SABS project actually do at plan check?",
    a: "On a SABS project, the owner's rep carries the submittal package to the AHJ, manages comment resolution with the engineer of record, coordinates the panel shop drawings with Strata International, and tracks the permit through issuance. LÏEF does this work because we run the install crew on the same project. The plan check sequence and the construction sequence are managed as one operating relationship rather than handed across two firms.",
  },
];

const PhoenixEpsPanelPermits = () => {
  useEffect(() => {
    document.title = "Phoenix EPS Panel Permits and AHJ Review | SABS with LÏEF Blocks";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "What actually happens at plan check when you permit a modular EPS panel building in Phoenix. SABS with LÏEF Blocks across the City of Phoenix, Scottsdale, Paradise Valley, Tempe, Mesa, and Maricopa County, by the Arizona owner's rep who runs the permits."
      );
    }
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(faqSchema);
    script.id = "faq-schema-eps-phoenix-permits";
    document.head.appendChild(script);
    return () => {
      document.getElementById("faq-schema-eps-phoenix-permits")?.remove();
    };
  }, []);

  return (
    <div className="v2 min-h-screen overflow-x-hidden" style={{ background: "var(--v2-deep)", color: "var(--v2-white)" }}>
      <V2Nav />

      <main style={{ maxWidth: "820px", margin: "0 auto", padding: "80px 24px 120px" }}>

        <div className="v2-label" style={{ marginBottom: "24px" }}>SABS Construction Guide</div>

        <h1 className="v2-headline" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.15, marginBottom: "32px", color: "var(--v2-white)" }}>
          Phoenix EPS Panel Permits and AHJ Review<span className="v2-neon-period">.</span>
          <br />
          <span style={{ color: "var(--v2-neon)", fontSize: "0.65em" }}>What actually happens at plan check on a SABS shell</span>
        </h1>

        <p style={{ fontSize: "1.25rem", fontWeight: 400, lineHeight: 1.8, color: "var(--v2-white)", marginBottom: "16px", borderLeft: "3px solid var(--v2-neon)", paddingLeft: "20px" }}>
          City of Phoenix, City of Scottsdale, Town of Paradise Valley, City of Tempe, City of Mesa, and Maricopa County have all reviewed and issued building permits on SABS construction with LÏEF Blocks. Phoenix-area modular EPS panel construction is not a regulatory unknown. It is an engineered alternate path under the ICC-ES ESR-1638 evaluation report, and every Valley AHJ that LÏEF Development has filed in has accepted the documentation and stamped the permit.
        </p>

        <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "48px" }}>
          I run the SABS owner's rep work across Arizona under LÏEF Development. The most common question on a first call about modular EPS panel construction in Phoenix is not about the panel itself. It is about plan check. Owners and architects want to know whether the AHJ will approve the wall, how long the review will take, and which documents have to ship. The answer is concrete on every count. This page is the working record of how the Phoenix-area permit sequence actually runs.
        </p>

        <div style={{ height: "1px", background: "var(--v2-rule)", marginBottom: "48px" }} />

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          Phoenix-Area AHJs With SABS Permit History
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "32px" }}>
          Six AHJs have issued permits on SABS shells through LÏEF Development. Each one runs review a little differently. The wall system path is the same in every case.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "48px" }}>
          {ahjs.map((row) => (
            <div key={row.name} style={{ border: "1px solid var(--v2-rule)", padding: "20px 24px" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--v2-neon)", marginBottom: "10px" }}>{row.name}</h3>
              <p style={{ fontSize: "0.98rem", fontWeight: 300, lineHeight: 1.7, color: "var(--v2-muted)" }}>{row.body}</p>
            </div>
          ))}
        </div>

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          The Plan Check Sequence
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "32px" }}>
          Four steps from pre-application through inspection. The panel system itself rarely drives the schedule. Civil, drainage, and zoning review usually do.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginBottom: "48px" }}>
          {planCheckSequence.map((row) => (
            <div key={row.step} style={{ borderLeft: "2px solid var(--v2-neon)", paddingLeft: "24px" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--v2-white)", marginBottom: "10px" }}>{row.step}</h3>
              <p style={{ fontSize: "1rem", fontWeight: 300, lineHeight: 1.75, color: "var(--v2-muted)" }}>{row.body}</p>
            </div>
          ))}
        </div>

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          Documents Every Phoenix AHJ Wants to See
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "24px" }}>
          A Phoenix-area building official does not approve a wall system based on a manufacturer brochure. They approve based on a current ICC Evaluation Service report, ASTM testing, and an engineered submittal under IRC or IBC code path. LÏEF carries the documentation package on every project.
        </p>

        <div style={{ background: "rgba(0,255,136,.04)", border: "1px solid var(--v2-rule)", padding: "28px 32px", marginBottom: "48px" }}>
          <p style={{ fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--v2-neon)", marginBottom: "16px" }}>SABS Plan Check Documentation</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {[
              "ICC-ES ESR-1638",
              "ASTM E-84 Class A",
              "ASTM C578 Type XI",
              "EOR Stamped Structural",
              "Manufacturer Install Manual",
              "Sealed Panel Shop Drawings",
            ].map((doc) => (
              <span
                key={doc}
                style={{
                  fontSize: "0.75rem",
                  padding: "4px 10px",
                  border: "1px solid var(--v2-neon)",
                  color: "var(--v2-neon)",
                  letterSpacing: "0.05em",
                }}
              >
                {doc}
              </span>
            ))}
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--v2-dim)", marginTop: "16px", lineHeight: 1.6 }}>
            Source: ICC-ES ESR-1638 (icc-es.org evaluation report registry) | ASTM E-84 surface burning characteristics | ASTM C578 Type XI EPS specification | LÏEF Development Phoenix-area permit submittal binder, 2024 to 2026
          </p>
        </div>

        <h2 className="v2-headline" style={{ fontSize: "1.8rem", marginBottom: "20px", color: "var(--v2-white)" }}>
          Reference Permits in the Phoenix Market
        </h2>

        <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "32px" }}>
          Three active or recently completed projects covering three different occupancy types and two different AHJs. Each one is referenceable at a high level and walkable under NDA during the bid process.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "48px" }}>
          {referenceProjects.map((row) => (
            <div key={row.name} style={{ border: "1px solid var(--v2-rule)", padding: "20px 24px" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--v2-neon)", marginBottom: "6px" }}>{row.name}</h3>
              <p style={{ fontSize: "0.92rem", color: "var(--v2-dim)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {row.ahj} | {row.type}
              </p>
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
          The Owner's Rep Argument for Phoenix SABS Permits
        </h2>

        <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "16px" }}>
          The Phoenix-area permit sequence on a modular EPS panel building is not the binding constraint on the project. It is a documented, repeatable path with a known document package, a known review duration, and a known inspection sequence. The binding constraint is operating capacity on the install side and the trade coordination between the panel, the finish, and the MEP rough chases.
        </p>

        <p style={{ fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.8, color: "var(--v2-muted)", marginBottom: "40px" }}>
          LÏEF runs both halves. The permit package and the install crew are the same operating relationship. That is the argument for an owner's rep on this work in the Arizona market. The plan check and the construction sequence move together because one firm carries both.
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

export default PhoenixEpsPanelPermits;
