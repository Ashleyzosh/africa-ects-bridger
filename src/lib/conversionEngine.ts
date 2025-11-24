import { GradingScale, ECTS_GRADES, GradeScaleItem } from '@/data/gradingData';

export interface ConversionResult {
  ectsLetter: string;
  ectsNumeric: number;
  ectsDescription: string;
  inputGrade: number;
  inputScale: string;
  method: string;
  explanation: string[];
}

/**
 * Core conversion engine that converts any African grading system to ECTS
 * Uses multiple conversion methods for accuracy
 */

// Method 1: Linear Normalization
function linearConversion(
  inputGrade: number,
  gradingScale: GradingScale
): ConversionResult {
  const explanation: string[] = [];
  
  // Step 1: Normalize to 0-1 range
  const normalized = (inputGrade - gradingScale.minValue) / 
                     (gradingScale.maxValue - gradingScale.minValue);
  
  explanation.push(
    `Step 1: Normalized ${inputGrade} on ${gradingScale.minValue}-${gradingScale.maxValue} scale to ${normalized.toFixed(3)}`
  );
  
  // Step 2: Map to German scale (1.0 = best, 5.0 = worst)
  // Invert because higher original grades should map to lower German grades
  const germanNumeric = 5.0 - (normalized * 4.0);
  
  explanation.push(
    `Step 2: Mapped to German scale: ${germanNumeric.toFixed(2)} (1.0=best, 5.0=worst)`
  );
  
  // Step 3: Find closest ECTS grade
  const ectsGrade = ECTS_GRADES.reduce((prev, curr) => 
    Math.abs(curr.numeric - germanNumeric) < Math.abs(prev.numeric - germanNumeric) 
      ? curr 
      : prev
  );
  
  explanation.push(
    `Step 3: Matched to ECTS grade ${ectsGrade.letter} (${ectsGrade.numeric}) - ${ectsGrade.description}`
  );
  
  return {
    ectsLetter: ectsGrade.letter,
    ectsNumeric: ectsGrade.numeric,
    ectsDescription: ectsGrade.description,
    inputGrade,
    inputScale: gradingScale.name,
    method: 'Linear Normalization',
    explanation,
  };
}

// Method 2: Percentile-based conversion
function percentileConversion(
  inputGrade: number,
  gradingScale: GradingScale
): ConversionResult {
  const explanation: string[] = [];
  
  // Find which grade bracket the input falls into
  const gradeItem = gradingScale.items.find(
    item => inputGrade >= item.minScore && inputGrade <= item.maxScore
  );
  
  if (!gradeItem) {
    // Fallback to linear if no match
    return linearConversion(inputGrade, gradingScale);
  }
  
  explanation.push(
    `Step 1: Input grade ${inputGrade} falls in range ${gradeItem.grade} (${gradeItem.minScore}-${gradeItem.maxScore})`
  );
  
  // Calculate position within the bracket
  const bracketPosition = (inputGrade - gradeItem.minScore) / 
                          (gradeItem.maxScore - gradeItem.minScore);
  
  explanation.push(
    `Step 2: Position within bracket: ${(bracketPosition * 100).toFixed(1)}%`
  );
  
  // Map grade brackets to ECTS
  const ectsGrade = mapGradeBracketToECTS(gradingScale.items, gradeItem, bracketPosition);
  
  explanation.push(
    `Step 3: Mapped ${gradeItem.grade} to ECTS ${ectsGrade.letter} - ${ectsGrade.description}`
  );
  
  return {
    ectsLetter: ectsGrade.letter,
    ectsNumeric: ectsGrade.numeric,
    ectsDescription: ectsGrade.description,
    inputGrade,
    inputScale: gradingScale.name,
    method: 'Percentile-Based Mapping',
    explanation,
  };
}

// Method 3: Distribution-based (considers program duration)
function distributionConversion(
  inputGrade: number,
  gradingScale: GradingScale
): ConversionResult {
  const explanation: string[] = [];
  
  // Get base conversion
  const baseResult = percentileConversion(inputGrade, gradingScale);
  
  explanation.push(`Base conversion: ${baseResult.ectsLetter} (${baseResult.ectsNumeric})`);
  
  // Adjust for program duration (longer programs may need adjustment)
  const programYears = gradingScale.programYears || 4;
  let adjustment = 0;
  
  if (programYears > 4) {
    // Longer programs: slightly favor the student
    adjustment = -0.1;
    explanation.push(`Program duration adjustment: ${programYears} years (adjusted -0.1)`);
  } else if (programYears < 4) {
    // Shorter programs: slightly stricter
    adjustment = 0.1;
    explanation.push(`Program duration adjustment: ${programYears} years (adjusted +0.1)`);
  }
  
  const adjustedNumeric = Math.max(1.0, Math.min(5.0, baseResult.ectsNumeric + adjustment));
  
  // Find closest ECTS grade after adjustment
  const finalGrade = ECTS_GRADES.reduce((prev, curr) => 
    Math.abs(curr.numeric - adjustedNumeric) < Math.abs(prev.numeric - adjustedNumeric) 
      ? curr 
      : prev
  );
  
  if (adjustment !== 0) {
    explanation.push(
      `Final ECTS grade after adjustment: ${finalGrade.letter} (${finalGrade.numeric})`
    );
  }
  
  return {
    ectsLetter: finalGrade.letter,
    ectsNumeric: finalGrade.numeric,
    ectsDescription: finalGrade.description,
    inputGrade,
    inputScale: gradingScale.name,
    method: 'Distribution-Based (Program-Adjusted)',
    explanation,
  };
}

// Helper function to map grade brackets to ECTS
function mapGradeBracketToECTS(
  allItems: GradeScaleItem[],
  currentItem: GradeScaleItem,
  positionInBracket: number
) {
  // Find the position of current grade in the overall scale
  const totalBrackets = allItems.filter(item => item.minScore >= 0).length;
  const currentBracketIndex = allItems.indexOf(currentItem);
  
  // Calculate percentile rank
  const percentileRank = ((totalBrackets - currentBracketIndex - 1) + positionInBracket) / totalBrackets;
  
  // Map percentile to ECTS
  if (percentileRank >= 0.90) return ECTS_GRADES[0]; // A
  if (percentileRank >= 0.65) return ECTS_GRADES[1]; // B
  if (percentileRank >= 0.35) return ECTS_GRADES[2]; // C
  if (percentileRank >= 0.10) return ECTS_GRADES[3]; // D
  if (percentileRank > 0) return ECTS_GRADES[4]; // E
  return ECTS_GRADES[5]; // F
}

/**
 * Main conversion function - uses the best method for the given scale
 */
export function convertToECTS(
  inputGrade: number,
  gradingScale: GradingScale,
  method: 'linear' | 'percentile' | 'distribution' | 'auto' = 'auto'
): ConversionResult {
  // Validate input
  if (inputGrade < gradingScale.minValue || inputGrade > gradingScale.maxValue) {
    throw new Error(
      `Grade ${inputGrade} is outside the valid range ${gradingScale.minValue}-${gradingScale.maxValue}`
    );
  }
  
  // Auto-select best method based on scale type
  if (method === 'auto') {
    if (gradingScale.type === 'percentage') {
      method = 'linear';
    } else if (gradingScale.programYears && gradingScale.programYears !== 4) {
      method = 'distribution';
    } else {
      method = 'percentile';
    }
  }
  
  // Apply selected method
  switch (method) {
    case 'linear':
      return linearConversion(inputGrade, gradingScale);
    case 'percentile':
      return percentileConversion(inputGrade, gradingScale);
    case 'distribution':
      return distributionConversion(inputGrade, gradingScale);
    default:
      return linearConversion(inputGrade, gradingScale);
  }
}

/**
 * Batch conversion for multiple grades
 */
export function convertMultipleGrades(
  grades: number[],
  gradingScale: GradingScale,
  method: 'linear' | 'percentile' | 'distribution' | 'auto' = 'auto'
): ConversionResult[] {
  return grades.map(grade => convertToECTS(grade, gradingScale, method));
}

/**
 * Calculate cumulative GPA in ECTS
 */
export function calculateCumulativeECTS(
  results: ConversionResult[]
): {
  averageNumeric: number;
  letterGrade: string;
  classification: string;
} {
  const sum = results.reduce((acc, r) => acc + r.ectsNumeric, 0);
  const averageNumeric = sum / results.length;
  
  const letterGrade = ECTS_GRADES.reduce((prev, curr) => 
    Math.abs(curr.numeric - averageNumeric) < Math.abs(prev.numeric - averageNumeric) 
      ? curr 
      : prev
  );
  
  let classification = '';
  if (averageNumeric <= 1.5) classification = 'With Distinction';
  else if (averageNumeric <= 2.5) classification = 'Very Good';
  else if (averageNumeric <= 3.5) classification = 'Good';
  else if (averageNumeric <= 4.0) classification = 'Satisfactory';
  else classification = 'Fail';
  
  return {
    averageNumeric: parseFloat(averageNumeric.toFixed(2)),
    letterGrade: letterGrade.letter,
    classification,
  };
}
