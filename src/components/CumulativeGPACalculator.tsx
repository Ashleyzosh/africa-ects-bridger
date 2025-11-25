import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  getCountries, 
  getUniversitiesByCountry, 
  getGradingScaleByUniversity 
} from '@/data/gradingData';
import { convertToECTS, calculateCumulativeECTS } from '@/lib/conversionEngine';
import { TrendingUp, Plus, Award, Calculator } from 'lucide-react';

interface SemesterGrade {
  id: string;
  semester: string;
  grade: number;
  weight: number;
}

export const CumulativeGPACalculator = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');
  const [numberOfSemesters, setNumberOfSemesters] = useState<number>(0);
  const [numberOfYears, setNumberOfYears] = useState<number>(0);
  const [showInputs, setShowInputs] = useState<boolean>(false);
  const [semesterGrades, setSemesterGrades] = useState<SemesterGrade[]>([]);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const countries = getCountries();
  const universities = selectedCountry ? getUniversitiesByCountry(selectedCountry) : [];
  const gradingScale = selectedUniversity ? getGradingScaleByUniversity(selectedUniversity) : null;

  const generateSemesterInputs = () => {
    if (numberOfSemesters <= 0) {
      setError('Please enter a valid number of semesters');
      return;
    }
    
    const semesters: SemesterGrade[] = [];
    for (let i = 1; i <= numberOfSemesters; i++) {
      semesters.push({
        id: i.toString(),
        semester: `Semester ${i}`,
        grade: 0,
        weight: 1
      });
    }
    setSemesterGrades(semesters);
    setShowInputs(true);
    setResult(null);
    setError('');
  };

  const updateSemester = (id: string, field: keyof SemesterGrade, value: string | number) => {
    setSemesterGrades(semesterGrades.map(sg => 
      sg.id === id ? { ...sg, [field]: value } : sg
    ));
  };

  const calculateCumulativeGPA = () => {
    setError('');
    setResult(null);

    if (!gradingScale) {
      setError('Please select a country and university first');
      return;
    }

    // Validate all grades
    const invalidGrades = semesterGrades.filter(sg => {
      const grade = sg.grade;
      return isNaN(grade) || grade < gradingScale.minValue || grade > gradingScale.maxValue;
    });

    if (invalidGrades.length > 0) {
      setError(`Please enter valid grades (${gradingScale.minValue} - ${gradingScale.maxValue}) for all semesters`);
      return;
    }

    try {
      // Convert all grades to ECTS
      const conversions = semesterGrades.map(sg => ({
        ...convertToECTS(sg.grade, gradingScale, 'auto'),
        semester: sg.semester,
        weight: sg.weight
      }));

      // Calculate weighted average
      const totalWeight = semesterGrades.reduce((sum, sg) => sum + sg.weight, 0);
      const weightedSum = conversions.reduce((sum, conv, index) => 
        sum + (conv.ectsNumeric * semesterGrades[index].weight), 0
      );
      const weightedAverage = weightedSum / totalWeight;

      // Get overall ECTS grade
      const cumulative = calculateCumulativeECTS(conversions);

      setResult({
        conversions,
        weighted: {
          averageNumeric: parseFloat(weightedAverage.toFixed(2)),
          totalWeight,
          ...cumulative
        }
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setSelectedUniversity('');
    setShowInputs(false);
    setSemesterGrades([]);
    setResult(null);
    setError('');
  };

  const handleUniversityChange = (value: string) => {
    setSelectedUniversity(value);
    setShowInputs(false);
    setSemesterGrades([]);
    setResult(null);
    setError('');
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <CardTitle className="text-foreground">Cumulative GPA Calculator</CardTitle>
          </div>
          <CardDescription className="text-muted-foreground">
            Calculate your overall ECTS GPA from multiple semesters with weighted averages
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Country & University Selection */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country" className="text-foreground">Select Country</Label>
              <Select value={selectedCountry} onValueChange={handleCountryChange}>
                <SelectTrigger id="country" className="bg-background border-border">
                  <SelectValue placeholder="Choose your country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map(country => (
                    <SelectItem key={country.id} value={country.id}>
                      {country.name} ({country.region})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="university" className="text-foreground">Select University</Label>
              <Select value={selectedUniversity} onValueChange={handleUniversityChange} disabled={!selectedCountry}>
                <SelectTrigger id="university" className="bg-background border-border">
                  <SelectValue placeholder="Choose your university" />
                </SelectTrigger>
                <SelectContent>
                  {universities.map(uni => (
                    <SelectItem key={uni.id} value={uni.id}>
                      {uni.name} {uni.shortName && `(${uni.shortName})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Initial Setup */}
          {gradingScale && !showInputs && (
            <>
              <Separator className="bg-border" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Setup Your Calculation</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="semesters" className="text-foreground">Number of Semesters</Label>
                    <Input
                      id="semesters"
                      type="number"
                      min="1"
                      value={numberOfSemesters || ''}
                      onChange={(e) => setNumberOfSemesters(parseInt(e.target.value) || 0)}
                      placeholder="e.g., 8"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="years" className="text-foreground">Number of Years</Label>
                    <Input
                      id="years"
                      type="number"
                      min="1"
                      value={numberOfYears || ''}
                      onChange={(e) => setNumberOfYears(parseInt(e.target.value) || 0)}
                      placeholder="e.g., 4"
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                </div>

                <Button 
                  onClick={generateSemesterInputs} 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Generate Semester Inputs
                </Button>
              </div>
            </>
          )}

          {/* Semester Grades Input */}
          {gradingScale && showInputs && semesterGrades.length > 0 && (
            <>
              <Separator className="bg-border" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Enter Semester Grades</h3>
                  <Badge variant="outline" className="border-border text-foreground">
                    {numberOfYears} {numberOfYears === 1 ? 'Year' : 'Years'} • {numberOfSemesters} {numberOfSemesters === 1 ? 'Semester' : 'Semesters'}
                  </Badge>
                </div>

                <div className="space-y-3">
                  {semesterGrades.map((sg, index) => (
                    <div key={sg.id} className="flex items-end gap-3 p-4 rounded-lg border border-border bg-background">
                      <div className="flex-1 space-y-2">
                        <Label className="text-sm text-muted-foreground">Semester Name</Label>
                        <Input
                          value={sg.semester}
                          onChange={(e) => updateSemester(sg.id, 'semester', e.target.value)}
                          placeholder="e.g., Semester 1"
                          className="bg-card border-border text-foreground"
                        />
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <Label className="text-sm text-muted-foreground">
                          Grade ({gradingScale.minValue} - {gradingScale.maxValue})
                        </Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={sg.grade || ''}
                          onChange={(e) => updateSemester(sg.id, 'grade', parseFloat(e.target.value) || 0)}
                          placeholder="Enter grade"
                          className="bg-card border-border text-foreground"
                        />
                      </div>
                      
                      <div className="w-32 space-y-2">
                        <Label className="text-sm text-muted-foreground">Weight</Label>
                        <Input
                          type="number"
                          step="0.1"
                          min="0.1"
                          value={sg.weight}
                          onChange={(e) => updateSemester(sg.id, 'weight', parseFloat(e.target.value) || 1)}
                          className="bg-card border-border text-foreground"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <Button onClick={calculateCumulativeGPA} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate Cumulative GPA
                </Button>
              </div>
            </>
          )}

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Results Display */}
          {result && (
            <div className="space-y-4">
              <Separator className="bg-border" />
              
              {/* Overall GPA */}
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg text-foreground">Overall ECTS GPA</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-6 rounded-lg bg-background border border-border">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Weighted Average GPA</p>
                      <div className="flex items-baseline gap-3">
                        <span className="text-5xl font-bold text-primary">{result.weighted.letterGrade}</span>
                        <span className="text-3xl text-muted-foreground">({result.weighted.averageNumeric})</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-primary text-primary-foreground mb-2">
                        {result.weighted.classification}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        Total Weight: {result.weighted.totalWeight}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Semester Breakdown */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Semester Breakdown</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Individual semester conversions to ECTS
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.conversions.map((conv: any, index: number) => (
                      <div key={index} className="p-4 rounded-lg border border-border bg-background">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-foreground">{conv.semester}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="border-border text-foreground">
                              Weight: {semesterGrades[index].weight}
                            </Badge>
                            <Badge className="bg-primary text-primary-foreground">
                              {conv.ectsLetter} ({conv.ectsNumeric})
                            </Badge>
                          </div>
                        </div>
                        <div className="text-sm space-y-1">
                          <p className="text-muted-foreground">
                            Original Grade: <span className="text-foreground font-medium">{conv.inputGrade}</span>
                          </p>
                          <p className="text-muted-foreground">
                            Method: <span className="text-foreground">{conv.method}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
