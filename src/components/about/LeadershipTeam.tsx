import { motion } from "framer-motion";
import jesseFowler from "@/assets/jesse-fowler.png";
import jimmyKhounlavong from "@/assets/jimmy-khounlavong.png";
import jonArmstrong from "@/assets/jon-armstrong.png";
import scottMeiers from "@/assets/scott-meiers.png";

const leaders = [
  {
    name: "Jesse Fowler",
    role: "Principal / Manager",
    experience: "20+ Years in Design, Build Development",
    image: jesseFowler,
    imagePosition: "object-[center_15%]",
    description:
      "The driving force behind Lïef. Jesse brings two decades of design-build expertise to Arizona, fusing development strategy with hands-on construction knowledge to deliver luxury homes that exceed expectations.",
  },
  {
    name: "Jimmy Khounlavong",
    role: "Principal / Creative Director",
    experience: "20+ Years of Brand, Merchandising & Marketplace Strategy",
    image: jimmyKhounlavong,
    imagePosition: "object-[center_15%]",
    description:
      "The creative compass of Lïef. Jimmy transforms brand vision into compelling client experiences, leveraging decades of merchandising expertise to position every project for lasting impact.",
  },
  {
    name: "Jon Armstrong",
    role: "Principal / Manager",
    experience: "15+ Years in Custom Residential & Commercial Building",
    image: jonArmstrong,
    imagePosition: "object-[center_15%]",
    description:
      "The build authority behind every project. As owner of Armstrong Construction Group, Jon commands 300+ specialized trades to deliver uncompromising craftsmanship from foundation to finish.",
  },
  {
    name: "Scott Meiers",
    role: "Chief Architectural Design",
    experience: "40+ Years of Architectural Design in Residential & Commercial",
    image: scottMeiers,
    imagePosition: "object-[center_15%]",
    description:
      "The artistic soul of Lïef. With four decades spanning residential and commercial design, Scott brings a rare cross-industry perspective that elevates every home into a work of art.",
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
