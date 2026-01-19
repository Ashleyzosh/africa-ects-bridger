import { Card, CardContent } from '@/components/ui/card';
import { 
  Zap, 
  Shield, 
  Eye, 
  DollarSign, 
  Globe, 
  Clock,
  CheckCircle
} from 'lucide-react';

export const BenefitsSection = () => {
  const benefits = [
    {
      icon: Zap,
      title: 'Instant Conversion',
      description: 'Get your ECTS grade in under 5 seconds. No waiting, no manual calculations.'
    },
    {
      icon: Shield,
      title: 'Academic Accuracy',
      description: 'Uses official grading matrices and university-specific scales for precise results.'
    },
    {
      icon: Eye,
      title: 'Full Transparency',
      description: 'See the exact calculation methodology—show admissions officers how we arrived at your grade.'
    },
    {
      icon: DollarSign,
      title: '100% Free',
      description: 'No hidden fees, no registration walls. Convert unlimited grades at no cost.'
    },
    {
      icon: Globe,
      title: '273+ Universities',
      description: 'Comprehensive coverage of Nigerian, Ghanaian, Kenyan, and other African institutions.'
    },
    {
      icon: Clock,
      title: 'Always Available',
      description: 'Convert grades 24/7 from anywhere in the world—perfect for deadline pressure.'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Students Trust Grades to ECTS
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built by international students, for international students. 
              Here's what makes us the preferred choice.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-border bg-card hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-accent">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Social Proof */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Used by students accepted to universities in Germany, Netherlands, France, and 20+ countries</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
