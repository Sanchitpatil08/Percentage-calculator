// Formulas and grade mappings extracted from the provided images

export interface GradeMapping {
  range: string;
  grade: string;
  cgpaMin: number;
  cgpaMax: number;
}

export interface DegreeClassMapping {
  range: string;
  degreeClass: string;
  sgpaMin: number;
  sgpaMax: number;
}

export interface FormulaMapping {
  range: string;
  formula: string;
  multiplier?: number;
  constant?: number;
  sgpaMin: number;
  sgpaMax: number;
  grade: string;
}

// CGPA to Grade mapping (from first image)
export const cgpaToGrade: GradeMapping[] = [
  { range: "9.50 and above", grade: "O", cgpaMin: 9.50, cgpaMax: 10.00 },
  { range: "8.25 to 9.50", grade: "A+", cgpaMin: 8.25, cgpaMax: 9.49 },
  { range: "6.75 to 8.25", grade: "A", cgpaMin: 6.75, cgpaMax: 8.24 },
  { range: "5.75 to 6.75", grade: "B+", cgpaMin: 5.75, cgpaMax: 6.74 },
  { range: "5.25 to 5.75", grade: "B", cgpaMin: 5.25, cgpaMax: 5.74 },
  { range: "4.75 to 5.25", grade: "C", cgpaMin: 4.75, cgpaMax: 5.24 },
  { range: "4.00 to 4.75", grade: "P", cgpaMin: 4.00, cgpaMax: 4.74 },
];

// SGPA to Degree Class mapping (from second image)
export const sgpaToDegreeClass: DegreeClassMapping[] = [
  { range: "7.75 and above", degreeClass: "First Class With Distinction", sgpaMin: 7.75, sgpaMax: 10.00 },
  { range: "6.75 to 7.74", degreeClass: "First Class", sgpaMin: 6.75, sgpaMax: 7.74 },
  { range: "6.25 to 6.74", degreeClass: "Higher Second Class", sgpaMin: 6.25, sgpaMax: 6.74 },
  { range: "5.50 to 6.24", degreeClass: "Second Class", sgpaMin: 5.50, sgpaMax: 6.24 },
];

// SGPA to Percentage formulas (from third image)
export const sgpaToPercentageFormulas: FormulaMapping[] = [
  { range: "9.50 and above", formula: "20 * SGPA - 100", multiplier: 20, constant: -100, sgpaMin: 9.50, sgpaMax: 10.00, grade: "O" },
  { range: "8.25 to 9.50", formula: "12 * SGPA - 25", multiplier: 12, constant: -25, sgpaMin: 8.25, sgpaMax: 9.49, grade: "A+" },
  { range: "6.75 to 8.25", formula: "10 * SGPA - 7.5", multiplier: 10, constant: -7.5, sgpaMin: 6.75, sgpaMax: 8.24, grade: "A" },
  { range: "5.75 to 6.75", formula: "5 * SGPA + 26.25", multiplier: 5, constant: 26.25, sgpaMin: 5.75, sgpaMax: 6.74, grade: "B+" },
  { range: "5.25 to 5.75", formula: "10 * SGPA - 2.5", multiplier: 10, constant: -2.5, sgpaMin: 5.25, sgpaMax: 5.74, grade: "B" },
  { range: "4.75 to 5.25", formula: "10 * SGPA - 2.5", multiplier: 10, constant: -2.5, sgpaMin: 4.75, sgpaMax: 5.24, grade: "C" },
  { range: "4.00 to 4.75", formula: "6.6 * SGPA + 13.6", multiplier: 6.6, constant: 13.6, sgpaMin: 4.00, sgpaMax: 4.74, grade: "D/P" },
];

// Convert SGPA to Percentage using the provided formulas
export function convertSgpaToPercentage(sgpa: number): { percentage: number; formula: string; grade: string } {
  const formulaData = sgpaToPercentageFormulas.find(
    (f) => sgpa >= f.sgpaMin && sgpa <= f.sgpaMax
  );

  if (!formulaData) {
    throw new Error(`No formula found for SGPA ${sgpa}`);
  }

  const percentage = (formulaData.multiplier! * sgpa) + formulaData.constant!;
  
  return {
    percentage: Math.round(percentage * 100) / 100, // Round to 2 decimal places
    formula: formulaData.formula,
    grade: formulaData.grade,
  };
}

// Convert CGPA to Grade
export function convertCgpaToGrade(cgpa: number): { grade: string; range: string } {
  const gradeData = cgpaToGrade.find(
    (g) => cgpa >= g.cgpaMin && cgpa <= g.cgpaMax
  );

  if (!gradeData) {
    throw new Error(`No grade found for CGPA ${cgpa}`);
  }

  return {
    grade: gradeData.grade,
    range: gradeData.range,
  };
}

// Convert SGPA to Degree Class
export function convertSgpaToDegreeClass(averageSgpa: number): { degreeClass: string; range: string } {
  const degreeData = sgpaToDegreeClass.find(
    (d) => averageSgpa >= d.sgpaMin && averageSgpa <= d.sgpaMax
  );

  if (!degreeData) {
    // If below all ranges, return the lowest class
    return {
      degreeClass: "Pass Class",
      range: "Below 5.50",
    };
  }

  return {
    degreeClass: degreeData.degreeClass,
    range: degreeData.range,
  };
}

// Calculate average SGPA (which becomes CGPA)
export function calculateAverageSgpa(sgpaList: number[]): number {
  if (sgpaList.length === 0) return 0;
  
  const sum = sgpaList.reduce((acc, sgpa) => acc + sgpa, 0);
  return Math.round((sum / sgpaList.length) * 100) / 100; // Round to 2 decimal places
}

// Validate SGPA/CGPA input
export function validateGpaInput(value: string): { isValid: boolean; error?: string; numValue?: number } {
  const numValue = parseFloat(value);
  
  if (isNaN(numValue)) {
    return { isValid: false, error: "Please enter a valid number" };
  }
  
  if (numValue < 0 || numValue > 10) {
    return { isValid: false, error: "Value must be between 0.00 and 10.00" };
  }
  
  return { isValid: true, numValue };
}