import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FounderStory from "@/components/about/FounderStory";
import Timeline from "@/components/about/Timeline";
import LeadershipTeam from "@/components/about/LeadershipTeam";
import AboutHero from "@/components/about/AboutHero";

const About = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main>
        <AboutHero />
        <FounderStory />
        <Timeline />
        <LeadershipTeam />
      </main>
      <Footer />
    </div>
  );
};

export default About;
