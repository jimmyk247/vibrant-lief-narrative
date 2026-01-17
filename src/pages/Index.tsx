import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PhilosophySection from "@/components/PhilosophySection";
import FeaturedProject from "@/components/FeaturedProject";
import CraftSection from "@/components/CraftSection";
import ExcellenceSection from "@/components/ExcellenceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <PhilosophySection />
        <FeaturedProject />
        <CraftSection />
        <ExcellenceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
