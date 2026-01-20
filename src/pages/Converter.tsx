import { GradeConverter } from '@/components/GradeConverter';
import { ECTSReference } from '@/components/ECTSReference';
import { CumulativeGPACalculator } from '@/components/CumulativeGPACalculator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, BookOpen, TrendingUp, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Converter = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-semibold">Africa ECTS Bridge</span>
          </Link>
        </div>
      </nav>

      {/* Main Converter Tool */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Convert Your Grades Now
            </h1>
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
    </div>
  );
};

export default Converter;
