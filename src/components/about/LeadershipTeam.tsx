import { motion } from "framer-motion";
import jesseFowler from "@/assets/jesse-fowler.png";
import jimmyKhounlavong from "@/assets/jimmy-khounlavong.png";

const leaders = [
  {
    name: "Jesse Fowler",
    role: "Principal / Manager",
    experience: "20+ Years in Design, Build Development",
    image: jesseFowler,
    imagePosition: "object-top",
    description:
      "Three decades of visionary leadership. Built Lïef from a single-person operation to Arizona's premier luxury home builder.",
  },
  {
    name: "Jimmy Khounlavong",
    role: "Principal / Creative Director",
    experience: "20+ Years of Brand, Merchandising & Marketplace Strategy",
    image: jimmyKhounlavong,
    imagePosition: "object-[center_20%]",
    description:
      "Shapes the Lïef brand identity and client experience. Transforms vision into compelling narratives that resonate across every touchpoint.",
  },
  {
    name: "Leadership Name",
    role: "Chief Design Officer",
    experience: "",
    image: null,
    description:
      "Leads architectural vision and design integration. Ensures every Lïef home achieves harmony of form and function.",
  },
  {
    name: "Leadership Name",
    role: "VP of Construction",
    experience: "",
    image: null,
    description:
      "Masters the art of execution. Coordinates complex builds with precision and unwavering attention to detail.",
  },
];

const LeadershipTeam = () => {
  return (
    <section className="relative bg-greek-villa py-32 md:py-48">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-20 md:mb-28"
        >
          <span className="block font-body text-goldenrod text-sm tracking-[0.3em] uppercase mb-6">
            Leadership
          </span>
          <h2 className="font-display text-tricorn-black text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.02em] leading-[1.05] max-w-3xl">
            The architects of
            <br />
            excellence.
          </h2>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.role}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative overflow-hidden">
                {/* Image */}
                <div className="aspect-[4/3] bg-urbane-bronze/10 relative overflow-hidden mb-6">
                  {leader.image ? (
                    <img 
                      src={leader.image} 
                      alt={leader.name} 
                      className={`absolute inset-0 w-full h-full object-cover ${leader.imagePosition || 'object-top'}`}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-body text-urbane-bronze/30 text-sm tracking-widest uppercase">
                        Portrait
                      </span>
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-goldenrod/0 group-hover:bg-goldenrod/10 transition-colors duration-500" />
                </div>

                {/* Info */}
                <div>
                  <h3 className="font-display text-tricorn-black text-2xl md:text-3xl font-bold mb-2">
                    {leader.name}
                  </h3>
                  <span className="block font-body text-goldenrod text-sm tracking-[0.15em] uppercase mb-3">
                    {leader.role}
                  </span>
                  {leader.experience && (
                    <span className="block font-body text-urbane-bronze/80 text-sm mb-4">
                      {leader.experience}
                    </span>
                  )}
                  <p className="font-body text-urbane-bronze/70 text-base leading-relaxed">
                    {leader.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-24 md:mt-32 pt-16 border-t border-urbane-bronze/20"
        >
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <h3 className="font-display text-tricorn-black text-3xl md:text-4xl font-bold tracking-[-0.02em] leading-[1.1]">
                300+ craftsmen.
                <br />
                <span className="text-urbane-bronze">One standard.</span>
              </h3>
            </div>
            <p className="font-body text-urbane-bronze/70 text-lg leading-relaxed">
              Behind our leadership stands an army of masters—over 300 
              specialized tradespeople who bring decades of expertise to 
              every project. This isn't a network of subcontractors. This 
              is a family that builds together.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadershipTeam;
