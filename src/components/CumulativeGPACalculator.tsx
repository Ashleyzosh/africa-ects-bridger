import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { getGradingScaleByUniversity } from "@/data/gradingData";
import { convertToECTS, calculateCumulativeECTS } from "@/lib/conversionEngine";
import { CountryUniversitySelector } from "@/components/shared/CountryUniversitySelector";
import { StepIndicator } from "@/components/cumulative/StepIndicator";
import { ProgramDetailsStep } from "@/components/cumulative/ProgramDetailsStep";
import { GradeInputStep } from "@/components/cumulative/GradeInputStep";
import { ResultsStep } from "@/components/cumulative/ResultsStep";

interface SemesterGrade {
  semester: number;
  grade: string;
  weight: string;
}

const STEPS = [
  { number: 1, title: "Institution" },
  { number: 2, title: "Program" },
  { number: 3, title: "Grades" },
  { number: 4, title: "Results" },
];

export function CumulativeGPACalculator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [programYears, setProgramYears] = useState("");
  const [numSemesters, setNumSemesters] = useState("");
  const [semesterGrades, setSemesterGrades] = useState<SemesterGrade[]>([]);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setSelectedUniversity("");
    setCurrentStep(1);
    resetCalculation();
  };

  const handleUniversityChange = (value: string) => {
    setSelectedUniversity(value);
    if (value && currentStep === 1) {
      setCurrentStep(2);
    }
    resetCalculation();
  };

  const handleProgramNext = () => {
    const count = parseInt(numSemesters);
    if (count > 0) {
      const grades: SemesterGrade[] = Array.from({ length: count }, (_, i) => ({
        semester: i + 1,
        grade: "",
        weight: "",
      }));
      setSemesterGrades(grades);
      setCurrentStep(3);
    }
  };

  const handleGradeChange = (index: number, field: "grade" | "weight", value: string) => {
    const updated = [...semesterGrades];
    updated[index][field] = value;
    setSemesterGrades(updated);
  };

  const resetCalculation = () => {
    setProgramYears("");
    setNumSemesters("");
    setSemesterGrades([]);
    setResult(null);
    setError("");
  };

  const handleReset = () => {
    setCurrentStep(1);
    setSelectedCountry("");
    setSelectedUniversity("");
    resetCalculation();
  };

  const handleCalculate = () => {
    setError("");
    setResult(null);

    if (!selectedUniversity || semesterGrades.length === 0) {
      setError("Please complete all steps before calculating.");
      return;
    }

    try {
      const gradingScale = getGradingScaleByUniversity(selectedUniversity);
      if (!gradingScale) {
        setError("Unable to find grading scale for the selected university.");
        return;
      }

      const conversions = semesterGrades.map((sg) => {
        const gradeValue = parseFloat(sg.grade);
        if (isNaN(gradeValue)) {
          throw new Error(`Invalid grade value for semester ${sg.semester}`);
        }
        return convertToECTS(gradeValue, gradingScale, "auto");
      });

      // Calculate weighted average manually
      const weights = semesterGrades.map((sg) => parseFloat(sg.weight));
      const totalWeight = weights.reduce((sum, w) => sum + w, 0);
      const weightedSum = conversions.reduce(
        (sum, conv, idx) => sum + conv.ectsNumeric * weights[idx],
        0
      );
      const weightedAverage = weightedSum / totalWeight;

      // Get cumulative result without weights for the letter grade
      const cumulativeResult = calculateCumulativeECTS(conversions);

      // Override with weighted average
      setResult({
        ...cumulativeResult,
        averageNumeric: parseFloat(weightedAverage.toFixed(2)),
      });
      setCurrentStep(4);
    } catch (err: any) {
      setError(err.message || "An error occurred during calculation.");
    }
  };

  const canGoBack = currentStep > 1 && currentStep < 4;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cumulative GPA Calculator</CardTitle>
        <CardDescription>
          Follow the steps to calculate your overall ECTS grade from multiple semesters
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <StepIndicator steps={STEPS} currentStep={currentStep} />

        {canGoBack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentStep(currentStep - 1)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {currentStep === 1 && (
          <CountryUniversitySelector
            selectedCountry={selectedCountry}
            selectedUniversity={selectedUniversity}
            onCountryChange={handleCountryChange}
            onUniversityChange={handleUniversityChange}
          />
        )}

        {currentStep === 2 && (
          <ProgramDetailsStep
            years={programYears}
            semesters={numSemesters}
            onYearsChange={setProgramYears}
            onSemestersChange={setNumSemesters}
            onNext={handleProgramNext}
          />
        )}

        {currentStep === 3 && (
          <GradeInputStep
            semesterGrades={semesterGrades}
            onGradeChange={handleGradeChange}
            onCalculate={handleCalculate}
          />
        )}

        {currentStep === 4 && result && (
          <ResultsStep
            averageNumeric={result.averageNumeric}
            letterGrade={result.letterGrade}
            classification={result.classification}
            onReset={handleReset}
          />
        )}
      </CardContent>
    </Card>
  );
}
