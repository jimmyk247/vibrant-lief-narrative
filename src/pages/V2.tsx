import "@/styles/v2.css";
import V2Nav from "@/components/v2/V2Nav";
import V2Hero from "@/components/v2/V2Hero";
import V2Ticker from "@/components/v2/V2Ticker";
import V2Model from "@/components/v2/V2Model";
import V2Communities from "@/components/v2/V2Communities";
import V2Edge from "@/components/v2/V2Edge";
import V2Team from "@/components/v2/V2Team";
import V2CTA from "@/components/v2/V2CTA";
import V2Footer from "@/components/v2/V2Footer";

const V2 = () => {
  return (
    <div className="v2 min-h-screen overflow-x-hidden">
      <V2Nav />
      <main>
        <V2Hero />
        <V2Ticker />
        <V2Model />
        <V2Communities />
        <V2Edge />
        <V2Team />
        <V2CTA />
      </main>
      <V2Footer />
    </div>
  );
};

export default V2;
