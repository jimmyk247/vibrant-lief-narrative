import "@/styles/v2.css";
import { useEffect } from "react";
import Testimonials from "@/components/v2/Testimonials";
import V2Nav from "@/components/v2/V2Nav";
import V2Footer from "@/components/v2/V2Footer";
const TestimonialsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="v2 min-h-screen overflow-x-hidden">
      <V2Nav />
      <main>
        <div className="pt-16 md:pt-20">
          <Testimonials />
        </div>
      </main>
      <V2Footer />
    </div>
  );
};

export default TestimonialsPage;
