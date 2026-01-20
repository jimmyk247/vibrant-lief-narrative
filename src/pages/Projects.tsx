import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import projectVista from "@/assets/project-vista.jpg";
import projectSerenia from "@/assets/project-serenia.jpg";
import projectHarmonia from "@/assets/project-harmonia.jpg";

type ProjectType = "All" | "New Build" | "Renovation" | "Estate";

interface Project {
  id: string;
  name: string;
  type: ProjectType;
  location: string;
  year: string;
  sqft: string;
  description: string;
  image: string;
}

const projects: Project[] = [
  {
    id: "vista",
    name: "Vista",
    type: "New Build",
    location: "Paradise Valley, AZ",
    year: "2024",
    sqft: "8,400",
    description: "A masterwork of desert modernism where clean lines embrace the Sonoran landscape.",
    image: projectVista,
  },
  {
    id: "serenia",
    name: "Serenia",
    type: "Estate",
    location: "Scottsdale, AZ",
    year: "2023",
    sqft: "12,200",
    description: "An estate sanctuary blending Mediterranean warmth with contemporary refinement.",
    image: projectSerenia,
  },
  {
    id: "harmonia",
    name: "Harmonia",
    type: "Renovation",
    location: "Paradise Valley, AZ",
    year: "2023",
    sqft: "6,800",
    description: "A thoughtful transformation honoring original character while elevating every detail.",
    image: projectHarmonia,
  },
];

const filterTypes: ProjectType[] = ["All", "New Build", "Renovation", "Estate"];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectType>("All");

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.type === activeFilter);

  return (
    <div className="min-h-screen bg-greek-villa">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-tricorn-black">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="block font-body text-goldenrod text-sm tracking-[0.3em] uppercase mb-6">
              Portfolio
            </span>
            <h1 className="font-display text-greek-villa text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.02em] leading-[1.05] max-w-4xl">
              Crafted with
              <br />
              conviction.
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-body text-greek-villa/60 text-lg md:text-xl max-w-2xl mt-8 leading-relaxed"
          >
            Each home represents a singular vision brought to life through 
            uncompromising craftsmanship and meticulous attention to detail.
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-0 z-40 bg-greek-villa/95 backdrop-blur-md border-b border-urbane-bronze/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-5">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-3 md:gap-6"
          >
            <span className="font-body text-urbane-bronze/60 text-sm tracking-wider uppercase mr-2">
              Filter
            </span>
            {filterTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`relative font-body text-sm tracking-wide px-4 py-2 transition-all duration-300 ${
                  activeFilter === type
                    ? "text-tricorn-black"
                    : "text-urbane-bronze/60 hover:text-tricorn-black"
                }`}
              >
                {type}
                {activeFilter === type && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-goldenrod/20 border border-goldenrod/40 -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Gallery */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid gap-16 md:gap-24"
            >
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  {/* Project Image */}
                  <div className="relative aspect-[16/9] overflow-hidden mb-8">
                    <img
                      src={project.image}
                      alt={`${project.name} - ${project.type} in ${project.location}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-tricorn-black/0 group-hover:bg-tricorn-black/10 transition-colors duration-500" />
                    
                    {/* Type Badge */}
                    <div className="absolute top-6 left-6">
                      <span className="inline-block font-body text-xs tracking-[0.2em] uppercase px-4 py-2 bg-greek-villa/95 backdrop-blur-sm text-tricorn-black">
                        {project.type}
                      </span>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="grid md:grid-cols-12 gap-6 md:gap-12">
                    <div className="md:col-span-8">
                      <h2 className="font-display text-tricorn-black text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.02em] mb-4">
                        {project.name}
                      </h2>
                      <p className="font-body text-urbane-bronze/70 text-lg leading-relaxed max-w-2xl">
                        {project.description}
                      </p>
                    </div>
                    
                    <div className="md:col-span-4 flex flex-wrap md:flex-col md:items-end gap-4 md:gap-2 text-right">
                      <div>
                        <span className="font-body text-urbane-bronze/50 text-sm tracking-wider block">
                          Location
                        </span>
                        <span className="font-body text-tricorn-black">
                          {project.location}
                        </span>
                      </div>
                      <div>
                        <span className="font-body text-urbane-bronze/50 text-sm tracking-wider block">
                          Size
                        </span>
                        <span className="font-body text-tricorn-black">
                          {project.sqft} sq ft
                        </span>
                      </div>
                      <div>
                        <span className="font-body text-urbane-bronze/50 text-sm tracking-wider block">
                          Completed
                        </span>
                        <span className="font-body text-tricorn-black">
                          {project.year}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="font-body text-urbane-bronze/60 text-lg">
                No projects found in this category.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 border-t border-urbane-bronze/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-8"
          >
            <div>
              <h3 className="font-display text-tricorn-black text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-4">
                Ready to build your vision?
              </h3>
              <p className="font-body text-urbane-bronze/70 text-lg max-w-lg">
                Let's discuss how we can bring your dream home to life.
              </p>
            </div>
            <Link
              to="/#contact"
              className="group inline-flex items-center gap-4 font-body text-tricorn-black text-lg tracking-wide hover:text-goldenrod transition-colors duration-500"
            >
              <span>Start a conversation</span>
              <ArrowRight
                size={20}
                className="transform group-hover:translate-x-2 transition-transform duration-300"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
