import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calculator } from "lucide-react";

interface SemesterGrade {
  semester: number;
  grade: string;
  weight: string;
}

interface GradeInputStepProps {
  semesterGrades: SemesterGrade[];
  onGradeChange: (index: number, field: "grade" | "weight", value: string) => void;
  onCalculate: () => void;
}

export function GradeInputStep({
  semesterGrades,
  onGradeChange,
  onCalculate,
}: GradeInputStepProps) {
  const canCalculate = semesterGrades.every(
    (sg) => sg.grade && sg.weight && parseFloat(sg.weight) > 0
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 max-h-[400px] overflow-y-auto pr-2">
        {semesterGrades.map((sg, index) => (
          <Card key={sg.semester} className="p-4">
            <h4 className="font-semibold mb-3">Semester {sg.semester}</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor={`grade-${sg.semester}`}>Grade</Label>
                <Input
                  id={`grade-${sg.semester}`}
                  type="number"
                  step="0.01"
                  value={sg.grade}
                  onChange={(e) => onGradeChange(index, "grade", e.target.value)}
                  placeholder="e.g., 85"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`weight-${sg.semester}`}>Weight (ECTS)</Label>
                <Input
                  id={`weight-${sg.semester}`}
                  type="number"
                  step="0.5"
                  value={sg.weight}
                  onChange={(e) => onGradeChange(index, "weight", e.target.value)}
                  placeholder="e.g., 30"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Button onClick={onCalculate} disabled={!canCalculate} className="w-full">
        <Calculator className="mr-2 h-4 w-4" />
        Calculate Cumulative GPA
      </Button>
    </div>
  );
}
