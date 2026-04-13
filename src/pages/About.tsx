import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FounderStory from "@/components/about/FounderStory";
import Timeline from "@/components/about/Timeline";
import LeadershipTeam from "@/components/about/LeadershipTeam";
import AboutHero from "@/components/about/AboutHero";

const About = () => {
  return (
    <>
    <Helmet>
      <title>About | Li&#239;ef Development</title>
      <meta name="description" content="The story behind Li&#239;ef Development. Meet the founders, explore our timeline, and learn what drives Arizona's premier luxury home builder." />
      <link rel="canonical" href="https://www.anewlief.com/about" />
      <meta property="og:title" content="About | Li&#239;ef Development" />
      <meta property="og:description" content="The story behind Li&#239;ef Development. Meet the founders, explore our timeline, and learn what drives Arizona's premier luxury home builder." />
      <meta property="og:url" content="https://www.anewlief.com/about" />
      <meta property="og:image" content="https://www.anewlief.com/og-image.jpg" />
    </Helmet>
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
    </>
  );
};

export default About;
