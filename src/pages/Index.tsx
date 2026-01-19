import { useRef } from 'react';
import { GradeConverter } from '@/components/GradeConverter';
import { ECTSReference } from '@/components/ECTSReference';
import { CumulativeGPACalculator } from '@/components/CumulativeGPACalculator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, BookOpen, TrendingUp } from 'lucide-react';

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
  const converterRef = useRef<HTMLDivElement>(null);
  const ectsRef = useRef<HTMLDivElement>(null);

  const scrollToConverter = () => {
    converterRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToECTS = () => {
    ectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection 
        onConvertClick={scrollToConverter}
        onLearnMoreClick={scrollToECTS}
      />

      {/* Value Proposition */}
      <ValueProposition />

      {/* How It Works */}
      <HowItWorks />

      {/* Main Converter Tool */}
      <section ref={converterRef} id="converter" className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Convert Your Grades Now
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select your institution, enter your grade, and get your ECTS equivalent instantly.
            </p>
          </div>

          <Tabs defaultValue="converter" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8 bg-muted">
              <TabsTrigger value="converter" className="data-[state=active]:bg-background">
                <Calculator className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Single Grade</span>
                <span className="sm:hidden">Convert</span>
              </TabsTrigger>
              <TabsTrigger value="cumulative" className="data-[state=active]:bg-background" id="cumulative">
                <TrendingUp className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Cumulative GPA</span>
                <span className="sm:hidden">GPA</span>
              </TabsTrigger>
              <TabsTrigger value="reference" className="data-[state=active]:bg-background" id="reference">
                <BookOpen className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Reference</span>
                <span className="sm:hidden">Guide</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="converter" className="space-y-6">
              <GradeConverter />
            </TabsContent>

            <TabsContent value="cumulative" className="space-y-6">
              <CumulativeGPACalculator />
            </TabsContent>

            <TabsContent value="reference" className="space-y-6">
              <div className="max-w-4xl mx-auto">
                <ECTSReference />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

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
      <FinalCTA onConvertClick={scrollToConverter} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
