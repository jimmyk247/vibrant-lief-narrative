import { motion } from "framer-motion";
import { useInView } from "./useInView";
import jesseImg from "@/assets/v2/jesse.png";
import jimmyImg from "@/assets/v2/jimmy.png";
import jonImg from "@/assets/v2/jon.png";
import scottImg from "@/assets/v2/scott.png";
import nickImg from "@/assets/v2/nick.png";
import hiblerImg from "@/assets/v2/hibler.png";
import taniaImg from "@/assets/v2/tania.png";
import alexImg from "@/assets/v2/alex.png";

const ease = [.16, 1, .3, 1] as const;

interface TeamMember {
  name: string;
  role: string;
  cred: string;
  img: string;
}

const principals: TeamMember[] = [
  { name: "Jesse Fowler", role: "CEO / COO · Principal", cred: "20+ years. $300M+ built. LA Clippers. Greensburg KS. Concept to concrete.", img: jesseImg },
  { name: "Jimmy Khounlavong", role: "CMO · Principal", cred: "16+ years Nike. $1B+ P&Ls. The project's story matches the project's quality.", img: jimmyImg },
  { name: "Jon Armstrong", role: "General Contractor · Principal", cred: "300+ trades. Ritz-Carlton Paradise Valley. Schedule controlled, not contracted.", img: jonImg },
];

const extended: TeamMember[] = [
  { name: "Scott Meiers", role: "Design & Architecture", cred: "50+ years. Still sketches by hand.", img: scottImg },
  { name: "Nick Scavio", role: "General Counsel", cred: "15+ yrs. >$100M in transactions.", img: nickImg },
  { name: "Scott Hibler", role: "Real Estate / B2B", cred: "20+ yrs sales & investment.", img: hiblerImg },
  { name: "Tania Karenina Gonzalez", role: "Architecture & Interior", cred: "15+ yrs multi-residential.", img: taniaImg },
  { name: "Alex Prince", role: "Investor Relations", cred: "20+ yrs institutional finance.", img: alexImg },
];

const V2Team = () => {
  const { ref, inView } = useInView(0.1);
  const { ref: photoRef, inView: photosInView } = useInView(0.1);

  return (
    <section id="team" className="relative py-32 md:py-44" style={{ background: "var(--v2-deep)" }}>
      {/* Ghost watermark */}
      <div className="v2-ghost-text top-16 right-8" style={{ fontSize: "min(12vw, 160px)", color: "rgba(0,255,136,.03)" }}>TEAM</div>

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
        {inView && (
          <>
            <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease }} className="v2-label mb-6">The Team</motion.div>
            <motion.h2 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.08, ease }} className="v2-headline text-4xl md:text-6xl lg:text-7xl mb-4" style={{ color: "var(--v2-white)" }}>
              BIG IDEAS<span className="v2-neon-period">.</span><br />DIRTY HANDS<span className="v2-neon-period">.</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.16, ease }} style={{ fontStyle: "italic", fontWeight: 300, color: "var(--v2-dim)", maxWidth: "550px" }}>
              The entire chain — design, construction, development, brand — one team, no gaps.
            </motion.p>
          </>
        )}
      </div>

      {/* Principals */}
      <div ref={photoRef} className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 0 }}>
          {principals.map((m) => (
            <div key={m.name} className="relative overflow-hidden" style={{ height: "480px" }}>
              <img
                src={m.img}
                alt={m.name}
                className={`absolute inset-0 w-full h-full object-cover object-top v2-team-photo ${photosInView ? "in-view" : ""}`}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,.95) 0%, rgba(10,10,10,.5) 80%, transparent 100%)" }} />
              <div className="absolute bottom-0 left-0 p-6 z-10">
                <h4 className="v2-headline text-base mb-1" style={{ color: "var(--v2-white)" }}>{m.name}</h4>
                <p className="mb-2" style={{ fontSize: "0.55rem", fontWeight: 600, textTransform: "uppercase", color: "var(--v2-neon)" }}>{m.role}</p>
                <p style={{ fontSize: "0.75rem", fontWeight: 300, fontStyle: "italic", color: "var(--v2-muted)", lineHeight: 1.6 }}>{m.cred}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Extended team */}
        <div className="grid grid-cols-2 md:grid-cols-5" style={{ gap: 0 }}>
          {extended.map((m) => (
            <div key={m.name} className="relative overflow-hidden" style={{ height: "280px" }}>
              <img
                src={m.img}
                alt={m.name}
                className={`absolute inset-0 w-full h-full object-cover object-top v2-team-photo ${photosInView ? "in-view" : ""}`}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,.95) 0%, rgba(10,10,10,.5) 80%, transparent 100%)" }} />
              <div className="absolute bottom-0 left-0 p-4 z-10">
                <h4 className="v2-headline mb-1" style={{ fontSize: "0.65rem", color: "var(--v2-white)" }}>{m.name}</h4>
                <p className="mb-1" style={{ fontSize: "0.44rem", fontWeight: 600, textTransform: "uppercase", color: "var(--v2-neon)" }}>{m.role}</p>
                <p style={{ fontSize: "0.6rem", fontWeight: 300, fontStyle: "italic", color: "var(--v2-muted)" }}>{m.cred}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default V2Team;
