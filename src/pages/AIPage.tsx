import "@/styles/v2.css";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import AISection from "@/components/v2/AISection";
import V2Nav from "@/components/v2/V2Nav";
import V2Footer from "@/components/v2/V2Footer";
const AIPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
    <Helmet>
      <title>AI Technology | Li&#239;ef Development</title>
      <meta name="description" content="How Li&#239;ef Development integrates artificial intelligence into luxury home construction. Smarter builds, optimized timelines, and data-driven design decisions." />
      <link rel="canonical" href="https://www.anewlief.com/ai" />
      <meta property="og:title" content="AI Technology | Li&#239;ef Development" />
      <meta property="og:description" content="How Li&#239;ef Development integrates artificial intelligence into luxury home construction. Smarter builds, optimized timelines, and data-driven design." />
      <meta property="og:url" content="https://www.anewlief.com/ai" />
      <meta property="og:image" content="https://www.anewlief.com/og-image.jpg" />
    </Helmet>
    <div className="v2 min-h-screen overflow-x-hidden">
      <V2Nav />
      <main>
        <div className="pt-16 md:pt-20">
          <AISection />
        </div>
      </main>
      <V2Footer />
    </div>
    </>
  );
};

export default AIPage;
