import { Button } from '@/components/ui/button';
import { ArrowRight, GraduationCap, Globe, Shield } from 'lucide-react';

interface HeroSectionProps {
  onConvertClick: () => void;
  onLearnMoreClick: () => void;
}

export const HeroSection = ({ onConvertClick, onLearnMoreClick }: HeroSectionProps) => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/20 border-b border-border">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-accent-foreground/20 text-sm text-accent-foreground">
            <Shield className="h-4 w-4" />
            <span>Trusted by 10,000+ international students</span>
          </div>

          {/* H1 Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Convert Your African Grades to{' '}
            <span className="text-primary">ECTS</span>{' '}
            <span className="block md:inline">for European Universities</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The free, accurate grade converter built for study-abroad applicants. 
            Instantly translate your Nigerian, Ghanaian, Kenyan, or other African university 
            grades into the European ECTS grading system.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              onClick={onConvertClick}
              className="w-full sm:w-auto text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <GraduationCap className="h-5 w-5 mr-2" />
              Convert My Grades Free
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={onLearnMoreClick}
              className="w-full sm:w-auto text-lg px-8 py-6"
            >
              <Globe className="h-5 w-5 mr-2" />
              What is ECTS?
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="pt-8 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">54+</p>
              <p className="text-sm text-muted-foreground">African Countries</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">273+</p>
              <p className="text-sm text-muted-foreground">Universities</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">100%</p>
              <p className="text-sm text-muted-foreground">Free to Use</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/30 rounded-full blur-3xl" />
      </div>
    </header>
  );
};
