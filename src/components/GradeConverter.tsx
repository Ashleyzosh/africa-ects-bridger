import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Info, Calculator, Award } from "lucide-react";
import { getGradingScaleByUniversity } from "@/data/gradingData";
import { convertToECTS, ConversionResult } from "@/lib/conversionEngine";
import { CountryUniversitySelector } from "@/components/shared/CountryUniversitySelector";

export function GradeConverter() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [inputGrade, setInputGrade] = useState("");
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState("");

  const gradingScale = selectedUniversity
    ? getGradingScaleByUniversity(selectedUniversity)
    : null;

  const handleConvert = () => {
    setError("");
    setResult(null);

    if (!gradingScale) {
      setError("Please select a country and university first");
      return;
    }

    const grade = parseFloat(inputGrade);
    if (isNaN(grade)) {
      setError("Please enter a valid numeric grade");
      return;
    }

    try {
      const conversionResult = convertToECTS(grade, gradingScale, "auto");
      setResult(conversionResult);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setSelectedUniversity("");
    setResult(null);
    setError("");
  };

  const handleUniversityChange = (value: string) => {
    setSelectedUniversity(value);
    setResult(null);
    setError("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grade Converter</CardTitle>
        <CardDescription>
          Convert your African university grade to the German ECTS grading system
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <CountryUniversitySelector
          selectedCountry={selectedCountry}
          selectedUniversity={selectedUniversity}
          onCountryChange={handleCountryChange}
          onUniversityChange={handleUniversityChange}
        />

        {gradingScale && (
          <Alert className="border-primary/20 bg-primary/5">
            <Info className="h-4 w-4 text-primary" />
            <AlertDescription>
              <div className="space-y-1">
                <p className="font-medium text-foreground">{gradingScale.name}</p>
                <p className="text-sm text-muted-foreground">
                  Scale: {gradingScale.minValue} - {gradingScale.maxValue} | Type:{" "}
                  {gradingScale.type} | Passing: {gradingScale.passingGrade}
                </p>
                {gradingScale.programYears && (
                  <p className="text-sm text-muted-foreground">
                    Program Duration: {gradingScale.programYears} years (
                    {gradingScale.totalSemesters} semesters)
                  </p>
                )}
              </div>
            </AlertDescription>
          </Alert>
        )}

        {gradingScale && (
          <div className="space-y-2">
            <Label htmlFor="grade">Enter Your Grade</Label>
            <div className="flex gap-2">
              <Input
                id="grade"
                type="number"
                step="0.01"
                placeholder={`Enter grade (${gradingScale.minValue} - ${gradingScale.maxValue})`}
                value={inputGrade}
                onChange={(e) => setInputGrade(e.target.value)}
              />
              <Button onClick={handleConvert}>
                <Calculator className="mr-2 h-4 w-4" />
                Convert
              </Button>
            </div>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">ECTS Conversion Result</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-background border">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">ECTS Grade</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-primary">{result.ectsLetter}</span>
                    <span className="text-2xl text-muted-foreground">({result.ectsNumeric})</span>
                  </div>
                </div>
                <Badge className="bg-primary text-primary-foreground">
                  {result.ectsDescription}
                </Badge>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Conversion Method</p>
                <Badge variant="outline">{result.method}</Badge>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Calculation Steps</p>
                <div className="space-y-2 p-4 rounded-lg bg-muted/50 border">
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
  );
}
