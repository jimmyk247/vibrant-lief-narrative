import "@/styles/v2.css";
import { useEffect } from "react";
import AISection from "@/components/v2/AISection";
import V2Nav from "@/components/v2/V2Nav";
import V2Footer from "@/components/v2/V2Footer";
const AIPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="v2 min-h-screen overflow-x-hidden">
      <V2Nav />
      <main>
        <div className="pt-16 md:pt-20">
          <AISection />
        </div>
      </main>
      <V2Footer />
    </div>
  );
};

export default AIPage;
