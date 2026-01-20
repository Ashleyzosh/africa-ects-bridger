import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Landing page sections
import { HeroSection } from '@/components/landing/HeroSection';
import { ValueProposition } from '@/components/landing/ValueProposition';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { WhatIsECTS } from '@/components/landing/WhatIsECTS';
import { BenefitsSection } from '@/components/landing/BenefitsSection';
import { TrustSignals } from '@/components/landing/TrustSignals';
import { FAQSection } from '@/components/landing/FAQSection';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { Footer } from '@/components/landing/Footer';

const Index = () => {
  const navigate = useNavigate();
  const ectsRef = useRef<HTMLDivElement>(null);

  const goToConverter = () => {
    navigate('/converter');
  };

  const scrollToECTS = () => {
    ectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection 
        onConvertClick={goToConverter}
        onLearnMoreClick={scrollToECTS}
      />

      {/* Value Proposition */}
      <ValueProposition />

      {/* How It Works */}
      <HowItWorks />

      {/* What is ECTS - Educational Content */}
      <div ref={ectsRef}>
        <WhatIsECTS />
      </div>

      {/* Benefits */}
      <BenefitsSection />

      {/* Trust Signals & Testimonials */}
      <TrustSignals />

      {/* FAQ Section */}
      <FAQSection />

      {/* Final CTA */}
      <FinalCTA onConvertClick={goToConverter} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
