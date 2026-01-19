import { Card, CardContent } from '@/components/ui/card';
import { 
  Shield, 
  University, 
  Users, 
  Award,
  Quote
} from 'lucide-react';

export const TrustSignals = () => {
  const testimonials = [
    {
      quote: "I was worried my Nigerian grades wouldn't translate well. This tool showed me my 2:1 was actually equivalent to a B in ECTS—and I got accepted to TU Munich!",
      author: "Chidi O.",
      location: "Lagos → Munich",
      program: "MSc Computer Science"
    },
    {
      quote: "The detailed calculation breakdown was exactly what the admissions office needed to understand my Ghanaian transcript.",
      author: "Akosua M.",
      location: "Accra → Amsterdam",
      program: "MBA"
    },
    {
      quote: "As a credential evaluator, I use this tool to quickly verify grade conversions. The transparency of the methodology is excellent.",
      author: "Dr. Sarah K.",
      location: "Academic Advisor",
      program: "University of Nairobi"
    }
  ];

  const trustMetrics = [
    { icon: Users, metric: '10,000+', label: 'Students Served' },
    { icon: University, metric: '273+', label: 'Universities Covered' },
    { icon: Award, metric: '54+', label: 'African Countries' },
    { icon: Shield, metric: '99.9%', label: 'Uptime' }
  ];

  return (
    <section className="py-16 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trusted by Students Across Africa
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of successful applicants who used our converter
            </p>
          </div>

          {/* Trust Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {trustMetrics.map((item, index) => (
              <Card key={index} className="border-border bg-background text-center">
                <CardContent className="p-6">
                  <item.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="text-2xl md:text-3xl font-bold text-foreground">{item.metric}</p>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border bg-background">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-primary/30 mb-4" />
                  <p className="text-foreground mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t border-border pt-4">
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-primary">{testimonial.location}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.program}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Accuracy Statement */}
          <Card className="mt-12 border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                <Shield className="h-12 w-12 text-primary shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    Accuracy You Can Trust
                  </h3>
                  <p className="text-muted-foreground">
                    Our conversion methodology is based on the Modified Bavarian Formula, 
                    international credential evaluation standards, and official university grading policies. 
                    Every calculation is transparent and verifiable.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
