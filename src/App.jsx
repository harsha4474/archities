import { useEffect } from 'react';
import Navbar from './components/Navbar';
import WhatsAppButton from './components/WhatsAppButton';
import SchemaMarkup from './components/SchemaMarkup';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import RenderVsReality from './sections/RenderVsReality';
import PortfolioSlider from './sections/PortfolioSlider';
import TrustedPartners from './sections/TrustedPartners';
import WhyChooseUs from './sections/WhyChooseUs';
import Process from './sections/Process';
import TestimonialsAndFAQs from './sections/TestimonialsAndFAQs';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  useEffect(() => {
    // Smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      <SchemaMarkup />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <RenderVsReality />
        <PortfolioSlider />
        <TrustedPartners />
        <WhyChooseUs />
        <Process />
        <TestimonialsAndFAQs />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
