import "@/styles/v2.css";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Testimonials from "@/components/v2/Testimonials";
import V2Nav from "@/components/v2/V2Nav";
import V2Footer from "@/components/v2/V2Footer";
const TestimonialsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
    <Helmet>
      <title>Testimonials | Li&#239;ef Development</title>
      <meta name="description" content="What clients, partners, and industry leaders say about working with Li&#239;ef Development. Real feedback from luxury home construction projects in Arizona." />
      <link rel="canonical" href="https://www.anewlief.com/testimonials" />
      <meta property="og:title" content="Testimonials | Li&#239;ef Development" />
      <meta property="og:description" content="What clients, partners, and industry leaders say about working with Li&#239;ef Development." />
      <meta property="og:url" content="https://www.anewlief.com/testimonials" />
      <meta property="og:image" content="https://www.anewlief.com/og-image.jpg" />
    </Helmet>
    <div className="v2 min-h-screen overflow-x-hidden">
      <V2Nav />
      <main>
        <div className="pt-16 md:pt-20">
          <Testimonials />
        </div>
      </main>
      <V2Footer />
    </div>
    </>
  );
};

export default TestimonialsPage;
