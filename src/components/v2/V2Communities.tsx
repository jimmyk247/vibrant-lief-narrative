import { useInView } from "./useInView";
import { motion } from "framer-motion";
import osbornImg from "@/assets/v2/osborn.jpg";
import basinImg from "@/assets/v2/basin.jpg";
import pvmallImg from "@/assets/v2/pvmall.jpg";

const ease = [.16, 1, .3, 1] as const;

const V2Communities = () => {
  const { ref: headerRef, inView: headerInView } = useInView(0.1);
  const { ref: osbornRef, inView: osbornInView } = useInView(0.1);
  const { ref: basinRef, inView: basinInView } = useInView(0.1);
  const { ref: pvRef, inView: pvInView } = useInView(0.1);

  return (
    <section id="communities" style={{ background: "var(--v2-black)" }} className="py-32 md:py-44">
      <div ref={headerRef} className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
        {headerInView && (
          <>
            <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease }} className="v2-label mb-6">Communities</motion.div>
            <motion.h2 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.08, ease }} className="v2-headline text-4xl md:text-6xl lg:text-7xl">
              THE WORK<br /><span style={{ color: "var(--v2-neon)" }}>SPEAKS<span className="v2-neon-period">.</span></span>
            </motion.h2>
          </>
        )}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2" style={{ minHeight: "600px" }}>
          {/* Osborn - 2 cols, 2 rows */}
          <div ref={osbornRef} className="md:col-span-2 md:row-span-2 relative overflow-hidden" style={{ minHeight: "500px" }}>
            <img src={osbornImg} alt="301 W Osborn" className={`absolute inset-0 w-full h-full object-cover v2-bw-to-color ${osbornInView ? "in-view" : ""}`} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,.92) 0%, rgba(10,10,10,.35) 55%, transparent 100%)" }} />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 z-10">
              <span style={{ fontSize: "0.55rem", textTransform: "uppercase", color: "var(--v2-neon)", letterSpacing: "0.1em" }}>● Active Development</span>
              <h3 className="v2-headline text-xl md:text-2xl mt-3 mb-2" style={{ color: "var(--v2-white)" }}>301 W OSBORN</h3>
              <p style={{ fontSize: "0.7rem", color: "var(--v2-neon)", marginBottom: "12px" }}>Central & Osborn · Phoenix, AZ</p>
              <p className="max-w-md" style={{ fontSize: "0.8rem", color: "var(--v2-dim)", lineHeight: 1.7 }}>
                Commercial to residential adaptive reuse. SABS + ICF technology. Penthouse living with 34'+ great rooms, private lifts, 360° city views.
              </p>
            </div>
          </div>

          {/* Basin */}
          <div ref={basinRef} className="relative overflow-hidden" style={{ minHeight: "280px" }}>
            <img src={basinImg} alt="440 Basin" className={`absolute inset-0 w-full h-full object-cover v2-bw-to-color ${basinInView ? "in-view" : ""}`} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,.92) 0%, rgba(10,10,10,.35) 55%, transparent 100%)" }} />
            <div className="absolute bottom-0 left-0 p-6 z-10">
              <span style={{ fontSize: "0.55rem", textTransform: "uppercase", color: "var(--v2-neon)", letterSpacing: "0.1em" }}>Xtrata Showcase</span>
              <h3 className="v2-headline text-lg mt-2 mb-1" style={{ color: "var(--v2-white)" }}>440 BASIN</h3>
              <p style={{ fontSize: "0.65rem", color: "var(--v2-neon)", marginBottom: "8px" }}>Pahrump, NV</p>
              <p style={{ fontSize: "0.75rem", color: "var(--v2-dim)", lineHeight: 1.6 }}>204 units. Integrated model at scale.</p>
              <div className="mt-3 pt-3" style={{ borderTop: "1px solid var(--v2-rule)" }}>
                <span style={{ fontSize: "0.7rem", color: "var(--v2-neon)", fontWeight: 600 }}>$56M saved vs. traditional</span>
              </div>
            </div>
          </div>

          {/* PV Mall */}
          <div ref={pvRef} className="relative overflow-hidden" style={{ minHeight: "280px" }}>
            <img src={pvmallImg} alt="PV Mall" className={`absolute inset-0 w-full h-full object-cover v2-bw-to-color ${pvInView ? "in-view" : ""}`} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,.92) 0%, rgba(10,10,10,.35) 55%, transparent 100%)" }} />
            <div className="absolute bottom-0 left-0 p-6 z-10">
              <span style={{ fontSize: "0.55rem", textTransform: "uppercase", color: "var(--v2-dim)", letterSpacing: "0.1em" }}>Coming Soon</span>
              <h3 className="v2-headline text-lg mt-2 mb-1" style={{ color: "var(--v2-white)" }}>PV MALL</h3>
              <p style={{ fontSize: "0.65rem", color: "var(--v2-neon)", marginBottom: "8px" }}>Paradise Valley, AZ</p>
              <p style={{ fontSize: "0.75rem", color: "var(--v2-dim)", lineHeight: 1.6 }}>Mixed-use redevelopment. Details forthcoming.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default V2Communities;
