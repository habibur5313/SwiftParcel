// import HeroSection from "@/components/modules/Home/HeroSection";
// import { About } from "./About";
// import { Contact } from "./Contact";
// import LocationMap from "@/components/modules/Home/LocationMap";
// import { FAQ } from "./FAQ";
import { Categories } from "@/components/modules/Home/Categories";
import { Contact } from "@/components/modules/Home/Contact";
import { FAQ } from "@/components/modules/Home/Faq";
import { Hero } from "@/components/modules/Home/Hero";
import { HowItWorks } from "@/components/modules/Home/HowItWorks";
import LocationMap from "@/components/modules/Home/LocationMap";
import { Pricing } from "@/components/modules/Home/Pricing";
import { ServiceHighlights } from "@/components/modules/Home/ServiceHighlights";
import { Statistics } from "@/components/modules/Home/Statistics";
import { Testimonials } from "@/components/modules/Home/Testimonials";
import { useEffect } from "react";

export const Home = () => {
      useEffect(() => {
      document.title = "Home | SwiftParcel ";
    }, []);
  return (
    // <div>
    //   <HeroSection></HeroSection>
    //   <About></About>
    //   <Contact></Contact>
    //   <FAQ></FAQ>
    // </div>
     <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* <Navbar /> */}
      <main>
        <Hero />
        <ServiceHighlights />
        <HowItWorks />
        <Categories />
        <Statistics />
        <Pricing />
        <Testimonials />
        <FAQ />
<LocationMap></LocationMap>

        <Contact />
      </main>
      {/* <Footer /> */}
    </div>
  );
};
