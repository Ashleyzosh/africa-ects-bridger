import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertTriangle, XCircle, ArrowRight } from 'lucide-react';

export const ValueProposition = () => {
  return (
    <section className="py-16 bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Don't Let Grade Confusion Cost You Your Dream University
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every year, thousands of African students lose admission opportunities because 
              European universities misunderstand their grades. We fix that.
            </p>
          </div>

          {/* Problem → Solution */}
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* The Problem */}
            <Card className="border-destructive/30 bg-destructive/5">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-6 w-6" />
                  <h3 className="text-xl font-semibold">The Problem</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                    <span className="text-foreground">Nigerian 2:1 (60%) gets confused with European 60% (barely passing)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                    <span className="text-foreground">GPA scales vary: 4.0, 5.0, 7.0, percentage—admissions officers struggle</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                    <span className="text-foreground">Manual conversion errors lead to rejected applications</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* The Solution */}
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle className="h-6 w-6" />
                  <h3 className="text-xl font-semibold">Our Solution</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground">Instant, accurate conversion using official grading matrices</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground">273+ Nigerian universities with verified grading scales</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground">Show calculation methodology to prove accuracy to admissions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Who It's For */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Perfect for:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Erasmus applicants',
                'Master\'s program seekers',
                'Study abroad students',
                'Academic advisors',
                'Credential evaluators'
              ].map((item) => (
                <span 
                  key={item}
                  className="px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
