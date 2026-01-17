import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import vistaImage from "@/assets/project-vista.jpg";
import sereniaImage from "@/assets/project-serenia.jpg";
import harmoniaImage from "@/assets/project-harmonia.jpg";

const projects = [
  {
    name: "Vista",
    location: "Paradise Valley, AZ",
    description: "A sanctuary of light and space, where panoramic desert views meet refined minimalism.",
    image: vistaImage,
    stats: { sqft: "8,400", beds: 5, year: 2024 },
  },
  {
    name: "Serenia",
    location: "Scottsdale, AZ",
    description: "Modern elegance that embraces the twilight hour, designed for contemplative living.",
    image: sereniaImage,
    stats: { sqft: "6,200", beds: 4, year: 2024 },
  },
  {
    name: "Harmonia",
    location: "Cave Creek, AZ",
    description: "Where natural materials and clean lines create spaces for connection and calm.",
    image: harmoniaImage,
    stats: { sqft: "5,800", beds: 4, year: 2023 },
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 md:py-32 bg-card">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <span className="section-subtitle">Portfolio</span>
            <h2 className="section-title mt-4">Signature Residences</h2>
          </div>
          <p className="font-body text-muted-foreground max-w-md">
            Each home is a unique expression of its inhabitants, crafted with 
            precision and designed to stand for generations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="card-elevated">
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img
                    src={project.image}
                    alt={`${project.name} - ${project.location}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-tricorn-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-greek-villa font-body text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-display text-2xl font-medium text-foreground">
                        {project.name}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground mt-1">
                        {project.location}
                      </p>
                    </div>
                    <div className="p-2 bg-background rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight size={18} className="text-primary" />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-6 pt-4 border-t border-border">
                    <div>
                      <span className="block text-lg font-display text-foreground">
                        {project.stats.sqft}
                      </span>
                      <span className="text-xs text-muted-foreground tracking-wide uppercase">
                        sq ft
                      </span>
                    </div>
                    <div>
                      <span className="block text-lg font-display text-foreground">
                        {project.stats.beds}
                      </span>
                      <span className="text-xs text-muted-foreground tracking-wide uppercase">
                        beds
                      </span>
                    </div>
                    <div>
                      <span className="block text-lg font-display text-foreground">
                        {project.stats.year}
                      </span>
                      <span className="text-xs text-muted-foreground tracking-wide uppercase">
                        year
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
