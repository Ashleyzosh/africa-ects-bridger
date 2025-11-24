import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ECTS_GRADES } from '@/data/gradingData';
import { GraduationCap } from 'lucide-react';

export const ECTSReference = () => {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <CardTitle className="text-foreground">ECTS Grading Scale Reference</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          Understanding the European Credit Transfer and Accumulation System grades
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {ECTS_GRADES.map((grade) => (
            <div 
              key={grade.letter} 
              className="flex items-center justify-between p-4 rounded-lg border border-border bg-background hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">{grade.letter}</span>
                  <span className="text-lg text-muted-foreground">({grade.numeric})</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{grade.description}</p>
                  <p className="text-sm text-muted-foreground">{grade.percentage}</p>
                </div>
              </div>
              <Badge 
                variant={grade.letter === 'F' ? 'destructive' : 'secondary'}
                className={grade.letter === 'A' ? 'bg-primary text-primary-foreground' : ''}
              >
                {grade.letter === 'F' ? 'Fail' : 'Pass'}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
