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
  zoom?: number;
  originY?: string;
}

const principals: TeamMember[] = [
  { name: "Jesse Fowler", role: "Principal / Manager", cred: "20+ Yrs in Design, Build & Development", img: jesseImg, zoom: 1.32 },
  { name: "Jimmy Khounlavong", role: "Principal / Creative Director", cred: "20+ Yrs of Brand, Merchandising & Marketplace Strategy", img: jimmyImg, zoom: 1.10 },
  { name: "Jon Armstrong", role: "Principal / Manager", cred: "15+ Yrs in Custom Residential & Commercial Building", img: jonImg, zoom: 1.32 },
];

const extended: TeamMember[] = [
  { name: "Scott Hibler", role: "Real Estate / B2B Partnerships", cred: "20+ Yrs of Sales & Investment Strategy", img: hiblerImg, zoom: 1.20, originY: "13%" },
  { name: "Nick Scavio", role: "General Counsel", cred: "15+ Yrs of Business Law, >$100M In Transactions Closed", img: nickImg, zoom: 1.12, originY: "13%" },
  { name: "Scott Meiers", role: "Chief Architectural Design", cred: "40+ Yrs of Architectural Design in Commercial & Residential", img: scottImg, zoom: 1.63, originY: "8%" },
  { name: "Tania Karenina Gonzalez", role: "Architectural & Interior Design", cred: "15+ Yrs of Multi-residential Commercial & Interior Design", img: taniaImg },
  { name: "Alex Prince", role: "Investor Relations", cred: "20+ Yrs of Institutional Asset Mgmt. & Investment Banking", img: alexImg, zoom: 1.45, originY: "7%" },
];

const Portrait = ({ member, delay, size = 180 }: { member: TeamMember; delay: number; size?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay, ease }}
    className="flex flex-col items-center text-center group"
  >
    <div
      className="relative overflow-hidden mb-5"
      style={{ width: size, height: size * 1.2, border: "2px solid rgba(0,255,136,.15)" }}
    >
      <img
        src={member.img}
        alt={member.name}
        className="w-full h-full object-cover object-top grayscale brightness-[.5] transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-[.85]"
        style={{ transform: `scale(${member.zoom ?? 1.15})`, transformOrigin: `center ${member.originY ?? "15%"}` }}
      />
    </div>
    <h4
      className="v2-headline mb-1"
      style={{ fontSize: "0.8rem", color: "var(--v2-white)", letterSpacing: "0.05em" }}
    >
      {member.name}
    </h4>
    <p
      className="mb-2 v2-headline"
      style={{ fontSize: "0.65rem", color: "var(--v2-neon)", letterSpacing: "0.05em" }}
    >
      {member.role}
    </p>
    <p style={{ fontSize: "0.95rem", color: "var(--v2-muted)", lineHeight: 1.5, maxWidth: 200 }}>
      {member.cred}
    </p>
  </motion.div>
);

const V2Team = () => {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="team" className="relative py-32 md:py-44" style={{ background: "var(--v2-deep)" }}>
      <div className="v2-ghost-text top-16 right-8" style={{ fontSize: "min(12vw, 160px)", color: "rgba(0,255,136,.03)" }}>TEAM</div>

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        {inView && (
          <>
            <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease }} className="v2-label mb-6">The Team</motion.div>
            <motion.h2 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.08, ease }} className="v2-headline text-4xl md:text-6xl lg:text-7xl mb-4" style={{ color: "var(--v2-white)" }}>
              BIG IDEAS<span className="v2-neon-period">.</span><br />DIRTY HANDS<span className="v2-neon-period">.</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.16, ease }} className="mb-20" style={{ fontStyle: "italic", fontWeight: 300, fontSize: "1.375rem", color: "var(--v2-muted)", maxWidth: "550px", lineHeight: 1.7 }}>
              The entire chain — design, construction, development, brand — one team, no gaps.
            </motion.p>

            {/* Principals row */}
            <div className="flex flex-wrap justify-center gap-12 md:gap-16 mb-20">
              {principals.map((m, i) => (
                <Portrait key={m.name} member={m} delay={0.24 + i * 0.08} size={200} />
              ))}
            </div>

            {/* Extended row */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {extended.map((m, i) => (
                <Portrait key={m.name} member={m} delay={0.5 + i * 0.06} size={150} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default V2Team;
