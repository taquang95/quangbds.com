import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import WhyChoose from './components/WhyChoose';
import InteractiveCallback from './components/InteractiveCallback';
import Contact from './components/Contact';
import CtaBottom from './components/CtaBottom';
import StickyBottomBar from './components/StickyBottomBar';

export default function App() {
  useEffect(() => {
    // Add title change or meta adjustments if needed
    document.title = 'Quang Masterise Homes - Tư Vấn Bất Động Sản Cao Cấp Masterise Homes Ocean City';
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#07070a] font-sans text-gray-100 flex justify-center items-start overflow-x-hidden relative">
      {/* Absolute floating lights (Bokeh background) for premium feel - Professional Polish Theme */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#0B0B0F]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(215,25,32,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(139,0,0,0.15),transparent_50%)]" />
        <div className="absolute top-10 left-10 w-96 h-96 bg-brand-red/10 rounded-full blur-[140px] animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-gold/5 rounded-full blur-[160px] animate-pulse-slow-reverse" />
      </div>

      {/* Main Wrapper that restricts width on wide screens & represents a premium Mobile Container */}
      <div className="relative z-10 w-full max-w-[540px] min-h-screen bg-premium-dark shadow-[0_0_80px_rgba(0,0,0,0.85)] border-x border-white/5 flex flex-col">
        {/* Glowing Top Frame */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-red via-brand-gold to-brand-red-dark" />
        
        {/* Floating Header */}
        <Header />

        {/* Content Modules */}
        <main className="flex-grow flex flex-col space-y-4 pt-[76px] pb-[88px] w-full">
          {/* Section 1: Hero */}
          <Hero />

          {/* Section 2: Services / Benefits */}
          <div className="px-2">
            <Services />
          </div>

          {/* Section 3: Quỹ Căn & Dự Án */}
          <div className="px-2">
            <Projects />
          </div>

          {/* Calculator Section */}
          <div className="px-4">
            <InteractiveCallback />
          </div>

          {/* Section 4: Why Me? */}
          <div className="px-2">
            <WhyChoose />
          </div>

          {/* Section 5: Connect */}
          <div className="px-2">
            <Contact />
          </div>

          {/* Section 6: Action CTA + Footer */}
          <div className="px-2">
            <CtaBottom />
          </div>
        </main>

        {/* Sticky Contact Actions Bar pinned at the bottom */}
        <StickyBottomBar />
      </div>
    </div>
  );
}
