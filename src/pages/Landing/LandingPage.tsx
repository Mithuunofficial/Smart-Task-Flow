import Navbar from '../../components/layout/Navbar';
import Hero from '../../components/Hero';
import Stats from '../../components/Stats';
import Features from '../../components/Features';
import HowItWorks from '../../components/HowItWorks';
import AIEngine from '../../components/AIEngine';
import Testimonials from '../../components/Testimonials';
import FAQ from '../../components/FAQ';
import CTA from '../../components/CTA';
import Footer from '../../components/layout/Footer';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-brand-bg text-slate-100 overflow-x-hidden selection:bg-brand-purple/30 selection:text-white">
      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-100 pointer-events-none z-0" />
      
      {/* Glow Vignette Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,24,48,0.3),transparent_70%)] pointer-events-none z-0" />
      
      {/* Page Sections */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <AIEngine />
        <Testimonials />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}
