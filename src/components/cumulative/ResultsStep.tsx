import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, RotateCcw } from "lucide-react";

interface ResultsStepProps {
  averageNumeric: number;
  letterGrade: string;
  classification: string;
  onReset: () => void;
}

export function ResultsStep({
  averageNumeric,
  letterGrade,
  classification,
  onReset,
}: ResultsStepProps) {
  return (
    <div className="space-y-6">
      <Alert className="border-primary/20 bg-primary/5">
        <CheckCircle2 className="h-4 w-4 text-primary" />
        <AlertDescription>
          Your cumulative GPA has been successfully calculated
        </AlertDescription>
      </Alert>

      <Card className="p-6 space-y-4">
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold text-primary">{letterGrade}</div>
          <p className="text-sm text-muted-foreground">ECTS Grade</p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-semibold">{averageNumeric.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Numeric Grade</p>
          </div>
          <div className="text-center">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              {classification}
            </Badge>
            <p className="text-xs text-muted-foreground mt-1">Classification</p>
          </div>
        </div>
      </Card>

      <Button onClick={onReset} variant="outline" className="w-full">
        <RotateCcw className="mr-2 h-4 w-4" />
        Start New Calculation
      </Button>
    </div>
  );
}
