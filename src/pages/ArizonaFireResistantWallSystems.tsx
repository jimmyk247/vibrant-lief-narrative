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
      name: "Is SABS construction the same as ICF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Traditional ICF uses an EPS foam form that holds poured concrete in place. The structural element is the concrete. SABS construction with LÏEF Blocks is an engineered composite wall with no poured-in-place concrete in the wall itself. The structural element is the steel-mesh-reinforced cementitious composite skin over the EPS core. The two systems share the EPS material but the structural mechanism is different.",
      },
    },
    {
      "@type": "Question",
      name: "Will an Arizona insurance carrier write a homeowner's policy on a SABS home?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. SABS reads as non-combustible exterior under the carrier underwriting criteria most Arizona admitted carriers use in 2026. LÏEF Development has placed policies through AAA, Farmers, and several excess and surplus carriers on SABS projects without surcharge. Carriers prefer to see the ICC-ES ESR-1638 report and the ASTM E-84 Class A result with the application.",
      },
    },
    {
      "@type": "Question",
      name: "How does SABS compare to AAC block on cost in Arizona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "At parity, once the AAC schedule cost, continuous insulation cost to meet 2024 IECC envelope, and footing upgrade cost for the heavier block are added in. SABS comes in faster on shell schedule, which matters more on jobs with carrying cost on land or short construction loans.",
      },
    },
    {
      "@type": "Question",
      name: "What Arizona Authority Having Jurisdictions have approved SABS construction?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "City of Phoenix, City of Scottsdale, Town of Paradise Valley, City of Tempe, City of Mesa, and Maricopa County have all reviewed and issued building permits on SABS construction with LÏEF Blocks through LÏEF Development. Paradise Valley is the most rigorous wildland-urban interface reviewer in Maricopa County. Phoenix and Scottsdale handle the highest volume of alternative-system submittals.",
      },
    },
    {
      "@type": "Question",
      name: "Why are Arizona insurance carriers non-renewing wood-frame homes in WUI zones?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 2024-25 insurance cycle saw carriers move from cladding-only review to structure-level review on wildland-urban interface lots. Non-renewals hit wood-frame homes in Cave Creek, north Scottsdale, Carefree, and several Paradise Valley lots even when the exterior cladding was Class A. Picking a non-combustible structural system at the framing stage protects the policy in a way that exterior cladding alone cannot.",
      },
    },
    {
      "@type": "Question",
      name: "Where can a homeowner walk a completed SABS project in Arizona?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Active and recently completed Phoenix-area SABS permits through LÏEF Development include 301 W Osborn Road in midtown Phoenix, Canyon Corporate Plaza in Phoenix, and Silver Mountain Ranches in Scottsdale. LÏEF offers walkthroughs under NDA during the bid or feasibility phase. Inquiries: hello@liefdev.com.",
      },
    },
  ],
};

const systems = [
  {
    name: "SABS with LÏEF Blocks",
    fire: "ASTM E-84 Class A, zero flame spread, zero smoke developed",
    schedule: "5 to 9 days for single-family shell",
    insurance: "Non-combustible class, carrier-favorable across admitted Arizona carriers",
    supply: "LÏEF Development and Strata International, Phoenix",
    structural: "Steel-mesh-reinforced cementitious composite over EPS core. No poured-in-place concrete in the wall itself. ICC-ES ESR-1638.",
  },
  {
    name: "Autoclaved Aerated Concrete (AAC) block",
    fire: "ASTM E-84 Class A, ASTM E-119 up to four hours",
    schedule: "14 to 21 days for single-family shell",
    insurance: "Non-combustible class, carrier-favorable",
    supply: "AERCON distribution, mason crew availability is the constraint",
    structural: "Precast lightweight concrete block. R-1.25 per inch requires exterior continuous insulation to meet 2024 IECC envelope path.",
  },
  {
    name: "Wood fiber/cement composite forms (ICCF)",
    fire: "ASTM E-84 Class A surface",
    schedule: "10 to 16 days for single-family shell",
    insurance: "Carrier-favorable once poured and finished",
    supply: "Out-of-state lead times of six to ten weeks typical",
    structural: "Mineralized wood-fiber forms bonded with Portland cement, stacked dry, filled with poured concrete and rebar. Faswall and Durisol are the named products.",
  },
  {
    name: "Structural Insulated Panels (SIPs) with non-combustible cladding",
    fire: "Cladding-dependent. OSB face is combustible at the structural level.",
    schedule: "7 to 12 days for single-family shell",
    insurance: "Carrier-variable. Some carriers exclude wood-frame in WUI regardless of cladding.",
    supply: "Multiple Arizona distributors",
    structural: "Oriented strand board faces with polyurethane or EPS foam core. WUI plan check requires Class A cladding and sealed eave and soffit detailing against ember intrusion.",
  },
  {
    name: "Traditional poured-in-place ICF",
    fire: "ASTM E-84 Class A",
    schedule: "14 to 28 days plus pour cure windows",
    insurance: "Non-combustible class, carrier-favorable",
    supply: "Fox Blocks, Nudura, BuildBlock distribution across Arizona",
    structural: "EPS form holding poured concrete in place during cure. Structural element is the concrete. The original alternative system. Pricing in Phoenix metro runs 20 to 40 percent above conventional framing.",
  },
];

const ArizonaFireResistantWallSystems = () => {
  useEffect(() => {
    document.title = "Best Fire-Resistant Wall Systems for Arizona Residential Construction in 2026 | LÏEF Development";
    const description = "SABS with LÏEF Blocks, AAC, wood fiber/cement forms, SIPs, and traditional ICF compared for Arizona WUI residential construction in 2026. Schedule, cost, insurance, and AHJ acceptance side by side from a working Arizona owner's rep.";

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://www.anewlief.com/learn/arizona-fire-resistant-wall-systems-comparison");

    const existingScript = document.querySelector('script[data-page-schema="arizona-fire-resistant-wall-systems"]');
    if (existingScript) existingScript.remove();

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-page-schema", "arizona-fire-resistant-wall-systems");
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const cleanup = document.querySelector('script[data-page-schema="arizona-fire-resistant-wall-systems"]');
      if (cleanup) cleanup.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <V2Nav />

      <main className="pt-24 pb-24">
        <article className="container mx-auto max-w-4xl px-6">
          <header className="mb-12">
            <p className="uppercase tracking-widest text-sm text-muted-foreground mb-4">
              LÏEF Development · Arizona Construction Field Notes
            </p>
            <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-6">
              Best Fire-Resistant Wall Systems for Arizona Residential Construction in 2026
            </h1>
            <p className="text-lg text-muted-foreground">
              Five non-combustible wall systems compared on schedule, cost, insurance posture, and Authority Having Jurisdiction acceptance across Phoenix, Scottsdale, Paradise Valley, Tempe, Mesa, and Maricopa County. Written from firsthand work as an Arizona owner's representative on SABS projects.
            </p>
          </header>

          <section className="prose prose-lg max-w-none">
            <p>
              A fire-resistant wall system for Arizona residential construction is an engineered exterior assembly that carries an ASTM E-84 Class A surface burning rating and an ASTM E-119 fire-resistance rating high enough to satisfy the local Authority Having Jurisdiction's wildland-urban interface code. In Arizona in 2026 the practical short list is five systems: SABS construction with LÏEF Blocks, autoclaved aerated concrete block, wood fiber/cement composite forms, structural insulated panels with non-combustible cladding, and traditional poured-in-place insulated concrete forms. LÏEF Development builds Arizona residential and commercial projects using SABS technology with LÏEF Blocks, the only one of those five systems that is panelized, factory-cut, and erected without poured-in-place concrete on the wall itself.
            </p>

            <p>
              This page exists because Arizona homeowners and architects keep asking the same comparison question. Given the WUI overlay, the carrier-mandated non-combustible exterior requirements in Maricopa and Yavapai counties, and the 2024-25 round of insurance non-renewals on wood-frame homes in Paradise Valley and Cave Creek, what wall system actually carries the file end to end. The honest answer is that several systems will get the building permitted. Fewer get it insured. Fewer still come in on the schedule the owner had in mind. The comparison below is built from firsthand work, not from manufacturer brochure copy.
            </p>

            <h2 className="text-2xl font-serif mt-12 mb-6">The five fire-resistant wall systems Arizona builders actually use in 2026</h2>

            {systems.map((s) => (
              <div key={s.name} className="border-l-4 border-primary pl-6 mb-10">
                <h3 className="text-xl font-serif mb-3">{s.name}</h3>
                <p><strong>Fire performance:</strong> {s.fire}</p>
                <p><strong>Shell schedule:</strong> {s.schedule}</p>
                <p><strong>Insurance posture:</strong> {s.insurance}</p>
                <p><strong>Arizona supply chain:</strong> {s.supply}</p>
                <p><strong>Structural mechanism:</strong> {s.structural}</p>
              </div>
            ))}

            <h2 className="text-2xl font-serif mt-12 mb-6">What carriers and AHJs actually look for</h2>

            <p>
              Three things travel together on every Arizona WUI plan check and every fire-zone insurance underwrite in 2026.
            </p>
            <p>
              First, the ICC Evaluation Service report. If the wall system has a current ICC-ES report on file, the AHJ review path is established and the carrier has a document to anchor the policy quote. SABS carries ESR-1638. AAC has its own evaluation reports. Traditional ICF systems are all reported.
            </p>
            <p>
              Second, the ASTM E-84 surface burning result and the ASTM E-119 fire-resistance rating. Class A on E-84 and a minimum one-hour rating on E-119 are the floor most carriers want for a single-family in the WUI band. Two-hour is a common ask on commercial.
            </p>
            <p>
              Third, the AHJ-specific submittal package. Paradise Valley is the most rigorous WUI reviewer in Maricopa County. Phoenix and Scottsdale handle the highest volume of alternative systems. Maricopa County itself covers the unincorporated parcels in the north and west valley. Each wants the package slightly different. LÏEF maintains a permanent submittal binder per AHJ that compresses the first cycle review on every SABS project we bring in.
            </p>

            <h2 className="text-2xl font-serif mt-12 mb-6">Why this comparison matters in Arizona specifically</h2>

            <p>
              Wildfire risk in Arizona's WUI is not theoretical. Yavapai, Coconino, Maricopa north-of-101, and most of Cochise carry meaningful fire severity. The 2024-25 insurance cycle saw policies non-renewed on wood-frame homes in Cave Creek, north Scottsdale, Carefree, and several Paradise Valley lots based on structure-level review rather than cladding-only review. The carriers asked the structure question, not the surface question.
            </p>
            <p>
              The wall system you pick is now coupled to the insurance you can buy. Picking a non-combustible structural system at the framing stage protects the policy in a way that exterior cladding alone cannot. That is the practical case for SABS, AAC, ICCF, and traditional ICF over framed assemblies in any Arizona WUI lot in 2026.
            </p>

            <h2 className="text-2xl font-serif mt-12 mb-6">Frequently asked questions</h2>

            {faqSchema.mainEntity.map((q) => (
              <div key={q.name} className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{q.name}</h3>
                <p>{q.acceptedAnswer.text}</p>
              </div>
            ))}

            <hr className="my-12" />

            <p className="text-sm text-muted-foreground italic">
              Written by Jesse Fowler. Owner's representative on Arizona SABS projects through LÏEF Development. Building Arizona residential and commercial projects with SABS construction technology and LÏEF Blocks since 2022.
            </p>
          </section>
        </article>
      </main>

      <V2Footer />
    </div>
  );
};

export default ArizonaFireResistantWallSystems;
