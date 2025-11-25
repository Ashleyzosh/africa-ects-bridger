import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ProgramDetailsStepProps {
  years: string;
  semesters: string;
  onYearsChange: (value: string) => void;
  onSemestersChange: (value: string) => void;
  onNext: () => void;
}

export function ProgramDetailsStep({
  years,
  semesters,
  onYearsChange,
  onSemestersChange,
  onNext,
}: ProgramDetailsStepProps) {
  const canProceed = years && semesters && parseInt(semesters) > 0;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="years">Program Duration (Years)</Label>
          <Input
            id="years"
            type="number"
            min="1"
            max="7"
            value={years}
            onChange={(e) => onYearsChange(e.target.value)}
            placeholder="e.g., 4"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="semesters">Number of Semesters</Label>
          <Input
            id="semesters"
            type="number"
            min="1"
            max="14"
            value={semesters}
            onChange={(e) => onSemestersChange(e.target.value)}
            placeholder="e.g., 8"
          />
        </div>
      </div>

      <Button onClick={onNext} disabled={!canProceed} className="w-full">
        Continue to Enter Grades
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
