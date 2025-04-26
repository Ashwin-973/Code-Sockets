"use client";
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "../lib/utils";
// import SiteHeader from "../components/site-header";
import { NavBar} from "../components/layout/Navbar";
import { HeroSection } from "../components/layout/HeroSection";
import { BenefitsSection } from "../components/layout/BenefitsSection";
import { ProblemSolutionSection } from "../components/layout/ProblemSolutionSection";
// import {FeaturesSection} from "../components/layout/HeroSection"
import { Testimonials } from "../components/layout/Testimonials";
import { FAQSection } from "../components/layout/FAQSection";
import { CTASection } from "../components/layout/CTASection";
import { Footer } from "../components/layout/FooterNew";


const AnimatedBackground = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      backgroundPosition: ["0px 0px", "-200px -200px"],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 20,
        ease: "linear",
      },
    });
  }, [controls]);

  return (
    <motion.div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
        backgroundSize: "100px 100px",
      }}
      animate={controls}
    />
  );
};

export function Home() {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div id="root-layout"  className={cn("min-h-screen bg-background font-sans antialiased",)}>
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white font-sans relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">

        {/* Site Header */}
        <NavBar/>

        <main>         
          <HeroSection />
          {/*Benifits Section, maybe change this to timeline card from ace-ui */}
          <BenefitsSection/>          
          <ProblemSolutionSection/>
          <Testimonials/>
         {/* <FeaturesSection /> */}
            <FAQSection/>
          <CTASection />
        </main>
        <Footer/>
      </div>
    </div>
    </div>
  );
}