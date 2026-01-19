import { Card, CardContent } from '@/components/ui/card';
import { School, Calculator, FileCheck, Download } from 'lucide-react';

export const HowItWorks = () => {
  const steps = [
    {
      icon: School,
      step: '1',
      title: 'Select Your University',
      description: 'Choose your African country and university from our comprehensive database of 273+ institutions.'
    },
    {
      icon: Calculator,
      step: '2',
      title: 'Enter Your Grade',
      description: 'Input your grade in any format: percentage, letter grade, GPA, or class (e.g., 2:1, Second Class Upper).'
    },
    {
      icon: FileCheck,
      step: '3',
      title: 'Get ECTS Equivalent',
      description: 'Instantly see your German ECTS grade (A–F) with full calculation methodology and explanation.'
    },
    {
      icon: Download,
      step: '4',
      title: 'Use Your Results',
      description: 'Copy your conversion results or export for your European university applications.'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How to Convert Your Grades in 60 Seconds
            </h2>
            <p className="text-lg text-muted-foreground">
              No registration. No payment. Just accurate grade conversion.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <Card key={index} className="relative border-border bg-card hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  {/* Step Number */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </div>
                  
                  {/* Icon */}
                  <div className="mt-4 mb-4 mx-auto w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
