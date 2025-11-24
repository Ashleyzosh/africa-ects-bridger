// Core data types for the grading conversion system
// Designed to be easily migrated to a database later

export interface Country {
  id: string;
  name: string;
  code: string;
  region: string;
}

export interface University {
  id: string;
  name: string;
  countryId: string;
  shortName?: string;
}

export interface GradeScaleItem {
  grade: string;
  minScore: number;
  maxScore: number;
  description?: string;
}

export interface GradingScale {
  id: string;
  universityId: string;
  name: string;
  type: 'numeric' | 'letter' | 'percentage' | 'mixed';
  minValue: number;
  maxValue: number;
  passingGrade: number;
  items: GradeScaleItem[];
  programYears?: number;
  totalSemesters?: number;
}

export interface ECTSGrade {
  letter: string;
  numeric: number;
  description: string;
  percentage: string;
}

// ECTS Grading Scale
export const ECTS_GRADES: ECTSGrade[] = [
  { letter: 'A', numeric: 1.0, description: 'Excellent', percentage: 'Top 10%' },
  { letter: 'B', numeric: 1.7, description: 'Very Good', percentage: 'Next 25%' },
  { letter: 'C', numeric: 2.3, description: 'Good', percentage: 'Next 30%' },
  { letter: 'D', numeric: 3.0, description: 'Satisfactory', percentage: 'Next 25%' },
  { letter: 'E', numeric: 4.0, description: 'Sufficient', percentage: 'Next 10%' },
  { letter: 'F', numeric: 5.0, description: 'Fail', percentage: 'Bottom' },
];

// Sample African Countries
export const COUNTRIES: Country[] = [
  { id: 'nga', name: 'Nigeria', code: 'NG', region: 'West Africa' },
  { id: 'ken', name: 'Kenya', code: 'KE', region: 'East Africa' },
  { id: 'zaf', name: 'South Africa', code: 'ZA', region: 'Southern Africa' },
  { id: 'egy', name: 'Egypt', code: 'EG', region: 'North Africa' },
  { id: 'gha', name: 'Ghana', code: 'GH', region: 'West Africa' },
  { id: 'eth', name: 'Ethiopia', code: 'ET', region: 'East Africa' },
  { id: 'uga', name: 'Uganda', code: 'UG', region: 'East Africa' },
  { id: 'tza', name: 'Tanzania', code: 'TZ', region: 'East Africa' },
];

// Sample Universities
export const UNIVERSITIES: University[] = [
  // Nigeria
  { id: 'ui', name: 'University of Ibadan', countryId: 'nga', shortName: 'UI' },
  { id: 'unilag', name: 'University of Lagos', countryId: 'nga', shortName: 'UNILAG' },
  
  // Kenya
  { id: 'uon', name: 'University of Nairobi', countryId: 'ken', shortName: 'UoN' },
  { id: 'ku', name: 'Kenyatta University', countryId: 'ken', shortName: 'KU' },
  
  // South Africa
  { id: 'uct', name: 'University of Cape Town', countryId: 'zaf', shortName: 'UCT' },
  { id: 'wits', name: 'University of the Witwatersrand', countryId: 'zaf', shortName: 'Wits' },
  
  // Egypt
  { id: 'cu', name: 'Cairo University', countryId: 'egy', shortName: 'CU' },
  { id: 'auc', name: 'American University in Cairo', countryId: 'egy', shortName: 'AUC' },
  
  // Ghana
  { id: 'ug', name: 'University of Ghana', countryId: 'gha', shortName: 'UG' },
  
  // Ethiopia
  { id: 'aau', name: 'Addis Ababa University', countryId: 'eth', shortName: 'AAU' },
  
  // Uganda
  { id: 'mak', name: 'Makerere University', countryId: 'uga', shortName: 'MAK' },
  
  // Tanzania
  { id: 'udsm', name: 'University of Dar es Salaam', countryId: 'tza', shortName: 'UDSM' },
];

// Sample Grading Scales
export const GRADING_SCALES: GradingScale[] = [
  // Nigeria - 5.0 scale
  {
    id: 'nga-5point',
    universityId: 'ui',
    name: 'Nigerian 5-Point GPA Scale',
    type: 'numeric',
    minValue: 0,
    maxValue: 5.0,
    passingGrade: 2.0,
    programYears: 4,
    totalSemesters: 8,
    items: [
      { grade: 'A', minScore: 4.5, maxScore: 5.0, description: 'First Class Honours' },
      { grade: 'B', minScore: 3.5, maxScore: 4.49, description: 'Second Class Honours (Upper)' },
      { grade: 'C', minScore: 2.5, maxScore: 3.49, description: 'Second Class Honours (Lower)' },
      { grade: 'D', minScore: 2.0, maxScore: 2.49, description: 'Third Class Honours' },
      { grade: 'E', minScore: 1.0, maxScore: 1.99, description: 'Pass' },
      { grade: 'F', minScore: 0, maxScore: 0.99, description: 'Fail' },
    ],
  },
  
  // Kenya - 4.0 scale
  {
    id: 'ken-4point',
    universityId: 'uon',
    name: 'Kenyan University GPA Scale',
    type: 'numeric',
    minValue: 0,
    maxValue: 4.0,
    passingGrade: 1.0,
    programYears: 4,
    totalSemesters: 8,
    items: [
      { grade: 'A', minScore: 3.7, maxScore: 4.0, description: 'First Class Honours' },
      { grade: 'A-', minScore: 3.3, maxScore: 3.69, description: 'First Class Honours' },
      { grade: 'B+', minScore: 3.0, maxScore: 3.29, description: 'Upper Second Class' },
      { grade: 'B', minScore: 2.7, maxScore: 2.99, description: 'Upper Second Class' },
      { grade: 'B-', minScore: 2.3, maxScore: 2.69, description: 'Lower Second Class' },
      { grade: 'C+', minScore: 2.0, maxScore: 2.29, description: 'Lower Second Class' },
      { grade: 'C', minScore: 1.7, maxScore: 1.99, description: 'Pass' },
      { grade: 'C-', minScore: 1.3, maxScore: 1.69, description: 'Pass' },
      { grade: 'D+', minScore: 1.0, maxScore: 1.29, description: 'Pass' },
      { grade: 'D', minScore: 0.7, maxScore: 0.99, description: 'Fail' },
      { grade: 'E', minScore: 0, maxScore: 0.69, description: 'Fail' },
    ],
  },
  
  // South Africa - Percentage scale
  {
    id: 'zaf-percentage',
    universityId: 'uct',
    name: 'South African Percentage Scale',
    type: 'percentage',
    minValue: 0,
    maxValue: 100,
    passingGrade: 50,
    programYears: 3,
    totalSemesters: 6,
    items: [
      { grade: '75+', minScore: 75, maxScore: 100, description: 'First Class' },
      { grade: '70-74', minScore: 70, maxScore: 74, description: 'Upper Second Class' },
      { grade: '60-69', minScore: 60, maxScore: 69, description: 'Lower Second Class' },
      { grade: '50-59', minScore: 50, maxScore: 59, description: 'Pass' },
      { grade: '0-49', minScore: 0, maxScore: 49, description: 'Fail' },
    ],
  },
  
  // Egypt - Letter grade system
  {
    id: 'egy-letter',
    universityId: 'cu',
    name: 'Egyptian University Letter Grade System',
    type: 'letter',
    minValue: 0,
    maxValue: 100,
    passingGrade: 60,
    programYears: 4,
    totalSemesters: 8,
    items: [
      { grade: 'A+', minScore: 95, maxScore: 100, description: 'Excellent' },
      { grade: 'A', minScore: 90, maxScore: 94, description: 'Excellent' },
      { grade: 'B+', minScore: 85, maxScore: 89, description: 'Very Good' },
      { grade: 'B', minScore: 80, maxScore: 84, description: 'Very Good' },
      { grade: 'C+', minScore: 75, maxScore: 79, description: 'Good' },
      { grade: 'C', minScore: 70, maxScore: 74, description: 'Good' },
      { grade: 'D+', minScore: 65, maxScore: 69, description: 'Pass' },
      { grade: 'D', minScore: 60, maxScore: 64, description: 'Pass' },
      { grade: 'F', minScore: 0, maxScore: 59, description: 'Fail' },
    ],
  },
  
  // Ghana - Letter grade system
  {
    id: 'gha-letter',
    universityId: 'ug',
    name: 'Ghanaian University Grading System',
    type: 'letter',
    minValue: 0,
    maxValue: 100,
    passingGrade: 50,
    programYears: 4,
    totalSemesters: 8,
    items: [
      { grade: 'A', minScore: 80, maxScore: 100, description: 'First Class' },
      { grade: 'B+', minScore: 70, maxScore: 79, description: 'Second Class Upper' },
      { grade: 'B', minScore: 60, maxScore: 69, description: 'Second Class Lower' },
      { grade: 'C+', minScore: 55, maxScore: 59, description: 'Third Class' },
      { grade: 'C', minScore: 50, maxScore: 54, description: 'Pass' },
      { grade: 'D', minScore: 45, maxScore: 49, description: 'Fail' },
      { grade: 'E', minScore: 0, maxScore: 44, description: 'Fail' },
    ],
  },
];

// Utility functions to get data
export const getCountries = () => COUNTRIES;

export const getUniversitiesByCountry = (countryId: string) => 
  UNIVERSITIES.filter(uni => uni.countryId === countryId);

export const getGradingScaleByUniversity = (universityId: string) => 
  GRADING_SCALES.find(scale => scale.universityId === universityId);

export const getCountryById = (id: string) => 
  COUNTRIES.find(country => country.id === id);

export const getUniversityById = (id: string) => 
  UNIVERSITIES.find(uni => uni.id === id);
