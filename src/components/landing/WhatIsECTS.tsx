import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Globe, BookOpen, Award } from 'lucide-react';

export const WhatIsECTS = () => {
  const ectsGrades = [
    { letter: 'A', description: 'Excellent', range: 'Top 10%', color: 'bg-primary text-primary-foreground' },
    { letter: 'B', description: 'Very Good', range: 'Next 25%', color: 'bg-primary/80 text-primary-foreground' },
    { letter: 'C', description: 'Good', range: 'Next 30%', color: 'bg-primary/60 text-primary-foreground' },
    { letter: 'D', description: 'Satisfactory', range: 'Next 25%', color: 'bg-secondary text-secondary-foreground' },
    { letter: 'E', description: 'Sufficient', range: 'Next 10%', color: 'bg-muted text-muted-foreground' },
    { letter: 'F', description: 'Fail', range: 'Below pass', color: 'bg-destructive text-destructive-foreground' }
  ];

  return (
    <section id="what-is-ects" className="py-16 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Educational Resource</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Is ECTS? A Complete Guide for International Students
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Understanding the European Credit Transfer and Accumulation System is crucial 
              for any student applying to European universities.
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Definition Card */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      ECTS Definition
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      The <strong>European Credit Transfer and Accumulation System (ECTS)</strong> is a 
                      standard adopted by all European Higher Education Area (EHEA) countries to compare 
                      student workload and academic performance. One academic year equals 60 ECTS credits, 
                      and the grading scale uses letters A through F to indicate performance levels.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Facts Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-border">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">60 Credits = 1 Year</h4>
                  <p className="text-sm text-muted-foreground">
                    A full academic year of study equals 60 ECTS credits in the European system.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-6 text-center">
                  <Globe className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">48 Countries</h4>
                  <p className="text-sm text-muted-foreground">
                    ECTS is used across all Bologna Process member countries in Europe.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-6 text-center">
                  <Award className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">Global Recognition</h4>
                  <p className="text-sm text-muted-foreground">
                    ECTS grades are recognized by universities worldwide for transfers and admissions.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* ECTS Grading Scale */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  ECTS Grading Scale Explained
                </CardTitle>
                <CardDescription>
                  The ECTS grading scale is based on the statistical distribution of student performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {ectsGrades.map((grade) => (
                    <div 
                      key={grade.letter}
                      className={`p-4 rounded-lg text-center ${grade.color}`}
                    >
                      <span className="text-2xl font-bold block">{grade.letter}</span>
                      <span className="text-sm font-medium block">{grade.description}</span>
                      <span className="text-xs opacity-80 block mt-1">{grade.range}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Why ECTS Matters */}
            <div className="prose prose-lg max-w-none">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Why ECTS Matters for African Students
              </h3>
              <p className="text-muted-foreground mb-4">
                When applying to European universities, your African grades need to be translated 
                into a format that admissions committees understand. Here's why ECTS conversion is essential:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-foreground">
                    <strong>Fair Comparison:</strong> A Nigerian First Class (70%+) might seem low to 
                    European standards where 70% is average, but it actually corresponds to an ECTS A grade.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-foreground">
                    <strong>Scholarship Eligibility:</strong> Many European scholarships require minimum 
                    ECTS grades. Accurate conversion ensures you qualify for opportunities you deserve.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-foreground">
                    <strong>Visa Applications:</strong> Some European countries require ECTS-converted 
                    transcripts for student visa applications.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
