import { useInView } from "./useInView";
import { motion } from "framer-motion";
import dotsNeon from "@/assets/v2/dots-neon.png";
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
    <section id="communities" className="relative overflow-hidden py-12 md:py-28" style={{ background: "var(--v2-deep)" }}>
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[60%] h-[60%]" style={{ background: "radial-gradient(ellipse at top right, rgba(0,107,63,.12), transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%]" style={{ background: "radial-gradient(ellipse at bottom left, rgba(0,255,136,.04), transparent 70%)" }} />
      </div>

      {/* Ghost text */}
      <div className="v2-ghost-text hidden lg:block top-8 right-8 text-right" style={{ fontSize: "min(12vw, 150px)", color: "rgba(0,107,63,.24)" }}>PROJECTS</div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <img src={dotsNeon} alt="" className="w-[176vw] max-w-[1512px] opacity-[0.01]" />
      </div>

      <div ref={headerRef} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
        {headerInView && (
          <>
            <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease }} className="v2-label mb-6">
              <span className="hidden lg:inline">In Process</span>
              <span className="lg:hidden">Projects</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.08, ease }} className="v2-headline text-4xl md:text-6xl lg:text-7xl">
              THE WORK<br /><span style={{ color: "var(--v2-neon)" }}>SPEAKS<span className="v2-neon-period">.</span></span>
            </motion.h2>
          </>
        )}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2" style={{ minHeight: "600px" }}>
          {/* Osborn - 2 cols, 2 rows */}
          <div ref={osbornRef} className="lg:col-span-2 lg:row-span-2 relative overflow-hidden group" style={{ minHeight: "500px" }}>
            <img src={osbornImg} alt="301 W Osborn" className="absolute inset-0 w-full h-full object-cover grayscale brightness-[.45] transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-[.65]" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,.92) 0%, rgba(10,10,10,.35) 55%, transparent 100%)" }} />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 z-10">
              <span style={{ fontSize: "1.25rem", textTransform: "uppercase", color: "var(--v2-neon)", letterSpacing: "0.1em" }}>● Xtrata Showcase</span>
              <h3 className="v2-headline text-xl md:text-2xl mt-3 mb-2" style={{ color: "var(--v2-white)" }}>301 W OSBORN</h3>
              <p style={{ fontSize: "1.25rem", color: "var(--v2-neon)", marginBottom: "12px" }}>Midtown · Phoenix, AZ</p>
              <p className="max-w-md" style={{ fontSize: "1.25rem", color: "var(--v2-muted)", lineHeight: 1.7 }}>
                Commercial to residential adaptive reuse. SABS technology. Luxury urban living — 23 units, secure parking & conditioned storage.
              </p>
            </div>
          </div>

          {/* Basin */}
          <div ref={basinRef} className="relative overflow-hidden group" style={{ minHeight: "280px" }}>
            <img src={basinImg} alt="440 Basin" className="absolute inset-0 w-full h-full object-cover grayscale brightness-[.45] transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-[.65]" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,.92) 0%, rgba(10,10,10,.35) 55%, transparent 100%)" }} />
            <div className="absolute bottom-0 left-0 p-6 z-10">
              <span style={{ fontSize: "1.25rem", textTransform: "uppercase", color: "var(--v2-neon)", letterSpacing: "0.1em" }}>● In Development</span>
              <h3 className="v2-headline text-lg mt-2 mb-1" style={{ color: "var(--v2-white)" }}>444 E BASIN</h3>
              <p style={{ fontSize: "1.25rem", color: "var(--v2-neon)", marginBottom: "8px" }}>Pahrump, NV</p>
              <p style={{ fontSize: "1.25rem", color: "var(--v2-muted)", lineHeight: 1.6 }}>204 units. Integrated model at scale.</p>
              <div className="mt-3 pt-3" style={{ borderTop: "1px solid var(--v2-rule)" }}>
                <span style={{ fontSize: "1.25rem", color: "var(--v2-neon)", fontWeight: 600 }}>$56M saved vs. traditional</span>
              </div>
            </div>
          </div>

          {/* PV Mall */}
          <div ref={pvRef} className="relative overflow-hidden group" style={{ minHeight: "280px" }}>
            <img src={pvmallImg} alt="PV Mall" className="absolute inset-0 w-full h-full object-cover grayscale brightness-[.45] transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-[.65]" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,.92) 0%, rgba(10,10,10,.35) 55%, transparent 100%)" }} />
            <div className="absolute bottom-0 left-0 p-6 z-10">
              <span style={{ fontSize: "1.25rem", textTransform: "uppercase", color: "var(--v2-neon)", letterSpacing: "0.1em" }}>● Planning and Design</span>
              <h3 className="v2-headline text-lg mt-2 mb-1" style={{ color: "var(--v2-white)" }}>PV MALL</h3>
              <p style={{ fontSize: "1.25rem", color: "var(--v2-neon)", marginBottom: "8px" }}>Paradise Valley, AZ</p>
              <p style={{ fontSize: "1.25rem", color: "var(--v2-muted)", lineHeight: 1.6 }}>Mixed-use redevelopment. In Development.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default V2Communities;
