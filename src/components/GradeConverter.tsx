import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  getCountries, 
  getUniversitiesByCountry, 
  getGradingScaleByUniversity,
  getCountryById,
  getUniversityById 
} from '@/data/gradingData';
import { convertToECTS } from '@/lib/conversionEngine';
import { Calculator, Award, Info } from 'lucide-react';

export const GradeConverter = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');
  const [inputGrade, setInputGrade] = useState<string>('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const countries = getCountries();
  const universities = selectedCountry ? getUniversitiesByCountry(selectedCountry) : [];
  const gradingScale = selectedUniversity ? getGradingScaleByUniversity(selectedUniversity) : null;

  const handleConvert = () => {
    setError('');
    setResult(null);

    if (!gradingScale) {
      setError('Please select a country and university first');
      return;
    }

    const grade = parseFloat(inputGrade);
    if (isNaN(grade)) {
      setError('Please enter a valid numeric grade');
      return;
    }

    try {
      const conversionResult = convertToECTS(grade, gradingScale, 'auto');
      setResult(conversionResult);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setSelectedUniversity('');
    setResult(null);
    setError('');
  };

  const handleUniversityChange = (value: string) => {
    setSelectedUniversity(value);
    setResult(null);
    setError('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calculator className="h-6 w-6 text-primary" />
            <CardTitle className="text-foreground">Grade Converter</CardTitle>
          </div>
          <CardDescription className="text-muted-foreground">
            Convert your African university grades to the German ECTS grading system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Country Selection */}
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

          {/* University Selection */}
          {selectedCountry && (
            <div className="space-y-2">
              <Label htmlFor="university" className="text-foreground">Select University</Label>
              <Select value={selectedUniversity} onValueChange={handleUniversityChange}>
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
          )}

          {/* Grading Scale Info */}
          {gradingScale && (
            <Alert className="bg-muted border-border">
              <Info className="h-4 w-4" />
              <AlertDescription className="text-muted-foreground">
                <div className="space-y-1">
                  <p className="font-medium text-foreground">{gradingScale.name}</p>
                  <p className="text-sm">
                    Scale: {gradingScale.minValue} - {gradingScale.maxValue} | 
                    Type: {gradingScale.type} | 
                    Passing: {gradingScale.passingGrade}
                  </p>
                  {gradingScale.programYears && (
                    <p className="text-sm">
                      Program Duration: {gradingScale.programYears} years 
                      ({gradingScale.totalSemesters} semesters)
                    </p>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Grade Input */}
          {gradingScale && (
            <div className="space-y-2">
              <Label htmlFor="grade" className="text-foreground">Enter Your Grade</Label>
              <div className="flex gap-2">
                <Input
                  id="grade"
                  type="number"
                  step="0.01"
                  placeholder={`Enter grade (${gradingScale.minValue} - ${gradingScale.maxValue})`}
                  value={inputGrade}
                  onChange={(e) => setInputGrade(e.target.value)}
                  className="bg-background border-border text-foreground"
                />
                <Button onClick={handleConvert} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Convert
                </Button>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Result Display */}
          {result && (
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg text-foreground">ECTS Conversion Result</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Grade Display */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-background border border-border">
                  <div>
                    <p className="text-sm text-muted-foreground">ECTS Grade</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-primary">{result.ectsLetter}</span>
                      <span className="text-2xl text-muted-foreground">({result.ectsNumeric})</span>
                    </div>
                  </div>
                  <Badge className="bg-primary text-primary-foreground">{result.ectsDescription}</Badge>
                </div>

                {/* Conversion Method */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Conversion Method</p>
                  <Badge variant="outline" className="border-border text-foreground">{result.method}</Badge>
                </div>

                {/* Step-by-step Explanation */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Calculation Steps</p>
                  <div className="space-y-2 p-4 rounded-lg bg-muted/50 border border-border">
                    {result.explanation.map((step: string, index: number) => (
                      <div key={index} className="flex gap-2">
                        <span className="text-primary font-medium">{index + 1}.</span>
                        <span className="text-sm text-muted-foreground">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
