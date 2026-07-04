import React from "react";
import { useSelector } from "react-redux";
import PageTransition from "./components/PageTransiton";
import {
  Header,
  HeroSection,
  AboutSection,
  SkillsSection,
  WorkSection,
  ContactSection,
  Footer,
} from "./components/index";
import BackToTop from "./components/BackToTop";
import CustomCursor from "./components/CustomCursor";

function App() {
  const { themeColors } = useSelector((state) => state.themeReducer);

  return (
    <div
      style={{
        backgroundColor: themeColors.bg,
        color: themeColors.text,
        transition: "background-color 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
        minHeight: "100vh",
      }}
    >
      {/* Premium Interactive Mouse Cursor */}
      <CustomCursor />
      <PageTransition>
        <Header />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <WorkSection />
        <ContactSection />
        <Footer />
      </PageTransition>
      <BackToTop />
    </div>
  );
}

export default App;
