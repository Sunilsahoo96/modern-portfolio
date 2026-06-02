import PageTransition from "./components/PageTransiton";
import {
  Header,
  HeroSection,
  AboutSection,
  SkillsSection,
  WorkSection,
  FAQSection,
  ContactSection,
  Footer,
} from "./components/index";
import BackToTop from "./components/BackToTop";

function App() {
  return (
    <>
      <PageTransition>
        <Header />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <WorkSection />
        {/* <FAQSection /> */}
        <ContactSection />
        <Footer />
      </PageTransition>
      <BackToTop />
    </>
  );
}

export default App;
