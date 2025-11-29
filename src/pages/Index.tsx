import { GradeConverter } from '@/components/GradeConverter';
import { ECTSReference } from '@/components/ECTSReference';
import { CumulativeGPACalculator } from '@/components/CumulativeGPACalculator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, BookOpen, TrendingUp } from 'lucide-react';
const Index = () => {
  return <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-emerald-600">
              African to ECTS Grade Converter
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Convert university grades from African institutions to the German ECTS grading system with precision and transparency
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="converter" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8 bg-muted">
            <TabsTrigger value="converter" className="data-[state=active]:bg-background">
              <Calculator className="h-4 w-4 mr-2" />
              Converter
            </TabsTrigger>
            <TabsTrigger value="cumulative" className="data-[state=active]:bg-background">
              <TrendingUp className="h-4 w-4 mr-2" />
              Cumulative GPA
            </TabsTrigger>
            <TabsTrigger value="reference" className="data-[state=active]:bg-background">
              <BookOpen className="h-4 w-4 mr-2" />
              Reference
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
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Built for accurate and transparent grade conversion across African and European education systems
          </p>
          </div>
          <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Don't let wrong grade calculations hinder your Europe Admissions!! @Ectstogradesconverter
          </p>
        </div>
      </footer>
    </div>;
};
export default Index;
