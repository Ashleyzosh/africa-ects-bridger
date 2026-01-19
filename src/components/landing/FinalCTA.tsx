import { Button } from '@/components/ui/button';
import { ArrowRight, GraduationCap, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  onConvertClick: () => void;
}

export const FinalCTA = ({ onConvertClick }: FinalCTAProps) => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-accent-foreground/20 text-sm text-accent-foreground mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Free • Instant • Accurate</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Convert Your Grades?
          </h2>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
            Don't let grade confusion hold you back. Join thousands of African students 
            who've successfully applied to European universities with accurate ECTS conversions.
          </p>

          {/* Primary CTA */}
          <Button 
            size="lg" 
            onClick={onConvertClick}
            className="text-lg px-10 py-7 shadow-lg hover:shadow-xl transition-shadow"
          >
            <GraduationCap className="h-6 w-6 mr-2" />
            Start Converting Now — It's Free
            <ArrowRight className="h-6 w-6 ml-2" />
          </Button>

          {/* Trust Note */}
          <p className="mt-6 text-sm text-muted-foreground">
            No registration required • Results in seconds • Works on mobile
          </p>
        </div>
      </div>
    </section>
  );
};
