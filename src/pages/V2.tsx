import "@/styles/v2.css";
import { Helmet } from "react-helmet-async";
import V2Nav from "@/components/v2/V2Nav";
import V2Hero from "@/components/v2/V2Hero";
import V2Ticker from "@/components/v2/V2Ticker";
import V2Model from "@/components/v2/V2Model";
import V2Disciplines from "@/components/v2/V2Disciplines";
import V2FAQ from "@/components/v2/V2FAQ";
import V2CTA from "@/components/v2/V2CTA";
import V2Footer from "@/components/v2/V2Footer";

const V2 = () => {
  return (
    <>
    <Helmet>
      <title>Li&#239;ef Development | Arizona's Premier Luxury Home Builder</title>
      <meta name="description" content="Crafting architectural masterpieces across Arizona. Luxury custom homes, adaptive reuse, and commercial developments with proprietary SABS technology." />
      <link rel="canonical" href="https://www.anewlief.com/" />
      <meta property="og:title" content="Li&#239;ef Development | Arizona's Premier Luxury Home Builder" />
      <meta property="og:description" content="Crafting architectural masterpieces across Arizona. Luxury custom homes, adaptive reuse, and commercial developments with proprietary SABS technology." />
      <meta property="og:url" content="https://www.anewlief.com/" />
      <meta property="og:image" content="https://www.anewlief.com/og-image.jpg" />
    </Helmet>
    <div className="v2 min-h-screen overflow-x-hidden">
      <V2Nav />
      <h1 className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
        Lïef Development - Arizona's Premier Luxury Home Builder
      </h1>
      <main>
        <V2Hero />
        <V2Ticker />
        <V2Model />
        <V2Disciplines />
        <V2FAQ />
        <V2CTA />
      </main>
      <V2Footer />
    </div>
    </>
  );
};

export default V2;
