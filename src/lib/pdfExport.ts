import jsPDF from 'jspdf';
import { ConversionResult } from './conversionEngine';

interface PDFExportOptions {
  result: ConversionResult;
  universityName: string;
  countryName: string;
  studentGrade: string;
  generatedDate?: Date;
}

/**
 * Generates a branded PDF certificate for grade conversion results
 */
export function generateGradeConversionPDF(options: PDFExportOptions): void {
  const { result, universityName, countryName, studentGrade, generatedDate = new Date() } = options;
  
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);

  // Colors (matching the app's primary green theme)
  const primaryColor: [number, number, number] = [16, 122, 87]; // HSL 161 93% 30% → RGB
  const textDark: [number, number, number] = [23, 23, 23];
  const textMuted: [number, number, number] = [100, 100, 100];
  const borderColor: [number, number, number] = [200, 200, 200];

  // === HEADER / LETTERHEAD ===
  
  // Top accent bar
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 8, 'F');

  // Logo area
  doc.setFillColor(240, 240, 240);
  doc.roundedRect(margin, 15, 50, 15, 2, 2, 'F');
  
  // Logo text
  doc.setTextColor(...primaryColor);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Grades to ECTS', margin + 25, 24, { align: 'center' });

  // Header info (right side)
  doc.setTextColor(...textMuted);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Grade Conversion Certificate', pageWidth - margin, 18, { align: 'right' });
  doc.text(`Generated: ${generatedDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}`, pageWidth - margin, 24, { align: 'right' });
  doc.text(`Reference: GC-${Date.now().toString(36).toUpperCase()}`, pageWidth - margin, 30, { align: 'right' });

  // Divider line
  doc.setDrawColor(...borderColor);
  doc.setLineWidth(0.5);
  doc.line(margin, 38, pageWidth - margin, 38);

  // === TITLE SECTION ===
  doc.setTextColor(...textDark);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('ECTS Grade Conversion Report', pageWidth / 2, 55, { align: 'center' });

  doc.setTextColor(...textMuted);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Official Grade Equivalency Statement', pageWidth / 2, 63, { align: 'center' });

  // === INSTITUTION DETAILS BOX ===
  const instBoxY = 75;
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, instBoxY, contentWidth, 30, 3, 3, 'F');
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, instBoxY, contentWidth, 30, 3, 3, 'S');

  doc.setTextColor(...primaryColor);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('INSTITUTION DETAILS', margin + 5, instBoxY + 8);

  doc.setTextColor(...textDark);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`Country: ${countryName}`, margin + 5, instBoxY + 17);
  doc.text(`University: ${universityName}`, margin + 5, instBoxY + 25);
  doc.text(`Grading System: ${result.inputScale}`, pageWidth / 2, instBoxY + 17);
  doc.text(`Original Grade: ${studentGrade}`, pageWidth / 2, instBoxY + 25);

  // === CONVERSION RESULT BOX ===
  const resultBoxY = 115;
  
  // Main result box
  doc.setFillColor(...primaryColor);
  doc.roundedRect(margin, resultBoxY, contentWidth, 50, 3, 3, 'F');

  // ECTS Grade display
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(48);
  doc.setFont('helvetica', 'bold');
  doc.text(result.ectsLetter, margin + 30, resultBoxY + 35, { align: 'center' });

  doc.setFontSize(16);
  doc.text(`(${result.ectsNumeric.toFixed(1)})`, margin + 30, resultBoxY + 45, { align: 'center' });

  // Vertical divider
  doc.setDrawColor(255, 255, 255, 0.3);
  doc.setLineWidth(0.5);
  doc.line(margin + 60, resultBoxY + 8, margin + 60, resultBoxY + 42);

  // Result text
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('ECTS Equivalent Grade', margin + 70, resultBoxY + 18);
  
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(result.ectsDescription, margin + 70, resultBoxY + 32);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Conversion Method: ${result.method}`, margin + 70, resultBoxY + 42);

  // === CALCULATION METHODOLOGY ===
  const methodY = 175;
  doc.setTextColor(...textDark);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Calculation Methodology', margin, methodY);

  doc.setDrawColor(...borderColor);
  doc.line(margin, methodY + 3, pageWidth - margin, methodY + 3);

  doc.setTextColor(...textMuted);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  let stepY = methodY + 12;
  result.explanation.forEach((step, index) => {
    // Step number circle
    doc.setFillColor(...primaryColor);
    doc.circle(margin + 4, stepY - 2, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}`, margin + 4, stepY - 0.5, { align: 'center' });
    
    // Step text
    doc.setTextColor(...textDark);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const wrappedText = doc.splitTextToSize(step, contentWidth - 15);
    doc.text(wrappedText, margin + 12, stepY);
    stepY += wrappedText.length * 5 + 3;
  });

  // === ECTS SCALE REFERENCE ===
  const scaleY = Math.max(stepY + 10, 230);
  doc.setTextColor(...textDark);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('ECTS Grading Scale Reference', margin, scaleY);

  doc.setDrawColor(...borderColor);
  doc.line(margin, scaleY + 3, pageWidth - margin, scaleY + 3);

  // Scale table
  const tableY = scaleY + 10;
  const colWidth = contentWidth / 6;
  const grades = [
    { letter: 'A', desc: 'Excellent', range: 'Top 10%' },
    { letter: 'B', desc: 'Very Good', range: 'Next 25%' },
    { letter: 'C', desc: 'Good', range: 'Next 30%' },
    { letter: 'D', desc: 'Satisfactory', range: 'Next 25%' },
    { letter: 'E', desc: 'Sufficient', range: 'Next 10%' },
    { letter: 'F', desc: 'Fail', range: 'Below' }
  ];

  grades.forEach((grade, index) => {
    const x = margin + (index * colWidth);
    const isCurrentGrade = grade.letter === result.ectsLetter;
    
    if (isCurrentGrade) {
      doc.setFillColor(...primaryColor);
      doc.roundedRect(x, tableY - 2, colWidth - 2, 18, 2, 2, 'F');
      doc.setTextColor(255, 255, 255);
    } else {
      doc.setFillColor(248, 248, 248);
      doc.roundedRect(x, tableY - 2, colWidth - 2, 18, 2, 2, 'F');
      doc.setTextColor(...textDark);
    }
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(grade.letter, x + (colWidth / 2) - 1, tableY + 5, { align: 'center' });
    
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text(grade.desc, x + (colWidth / 2) - 1, tableY + 11, { align: 'center' });
  });

  // === FOOTER ===
  const footerY = pageHeight - 25;
  
  // Footer divider
  doc.setDrawColor(...borderColor);
  doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);

  // Disclaimer
  doc.setTextColor(...textMuted);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  const disclaimer = 'This conversion is calculated using internationally recognized methodologies including the Modified Bavarian Formula. Results are for informational purposes and should be verified with the receiving institution.';
  const disclaimerLines = doc.splitTextToSize(disclaimer, contentWidth);
  doc.text(disclaimerLines, pageWidth / 2, footerY, { align: 'center' });

  // Footer bottom bar
  doc.setFillColor(...primaryColor);
  doc.rect(0, pageHeight - 8, pageWidth, 8, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('gradestoects.blshub.com', margin, pageHeight - 3);
  doc.text('© Grades to ECTS', pageWidth - margin, pageHeight - 3, { align: 'right' });

  // Save the PDF
  const fileName = `ECTS_Conversion_${result.ectsLetter}_${Date.now()}.pdf`;
  doc.save(fileName);
}

/**
 * Generates a cumulative GPA conversion PDF
 */
export function generateCumulativeGPAPDF(options: {
  results: Array<{ semester: string; grade: number; ectsGrade: string; ectsNumeric: number }>;
  averageNumeric: number;
  letterGrade: string;
  classification: string;
  universityName: string;
  countryName: string;
  programYears: number;
}): void {
  const { results, averageNumeric, letterGrade, classification, universityName, countryName, programYears } = options;
  
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);

  const primaryColor: [number, number, number] = [16, 122, 87];
  const textDark: [number, number, number] = [23, 23, 23];
  const textMuted: [number, number, number] = [100, 100, 100];
  const borderColor: [number, number, number] = [200, 200, 200];

  // === HEADER ===
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 8, 'F');

  doc.setTextColor(...primaryColor);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Grades to ECTS', margin, 24);

  doc.setTextColor(...textMuted);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Cumulative GPA Conversion Report', pageWidth - margin, 18, { align: 'right' });
  doc.text(`Generated: ${new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}`, pageWidth - margin, 24, { align: 'right' });

  doc.setDrawColor(...borderColor);
  doc.line(margin, 32, pageWidth - margin, 32);

  // === TITLE ===
  doc.setTextColor(...textDark);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Cumulative ECTS GPA Report', pageWidth / 2, 48, { align: 'center' });

  // === INSTITUTION INFO ===
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`${universityName}, ${countryName}`, pageWidth / 2, 58, { align: 'center' });
  doc.setTextColor(...textMuted);
  doc.text(`${programYears}-Year Program`, pageWidth / 2, 65, { align: 'center' });

  // === RESULT BOX ===
  const resultY = 75;
  doc.setFillColor(...primaryColor);
  doc.roundedRect(margin, resultY, contentWidth, 35, 3, 3, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(36);
  doc.setFont('helvetica', 'bold');
  doc.text(letterGrade, margin + 25, resultY + 25, { align: 'center' });

  doc.setFontSize(12);
  doc.text(`(${averageNumeric.toFixed(2)})`, margin + 25, resultY + 32, { align: 'center' });

  doc.line(margin + 50, resultY + 8, margin + 50, resultY + 28);

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Cumulative ECTS GPA', margin + 60, resultY + 18);
  doc.setFontSize(18);
  doc.text(classification, margin + 60, resultY + 30);

  // === SEMESTER BREAKDOWN ===
  const tableY = 120;
  doc.setTextColor(...textDark);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Semester Breakdown', margin, tableY);

  // Table header
  const colWidths = [50, 40, 40, 40];
  let currentX = margin;
  doc.setFillColor(240, 240, 240);
  doc.rect(margin, tableY + 5, contentWidth, 8, 'F');
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...textDark);
  doc.text('Semester', currentX + 2, tableY + 10);
  currentX += colWidths[0];
  doc.text('Original Grade', currentX + 2, tableY + 10);
  currentX += colWidths[1];
  doc.text('ECTS Grade', currentX + 2, tableY + 10);
  currentX += colWidths[2];
  doc.text('ECTS Numeric', currentX + 2, tableY + 10);

  // Table rows
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  let rowY = tableY + 18;
  
  results.forEach((row, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(250, 250, 250);
      doc.rect(margin, rowY - 4, contentWidth, 8, 'F');
    }
    
    currentX = margin;
    doc.setTextColor(...textDark);
    doc.text(row.semester, currentX + 2, rowY);
    currentX += colWidths[0];
    doc.text(row.grade.toFixed(2), currentX + 2, rowY);
    currentX += colWidths[1];
    doc.text(row.ectsGrade, currentX + 2, rowY);
    currentX += colWidths[2];
    doc.text(row.ectsNumeric.toFixed(1), currentX + 2, rowY);
    rowY += 8;
  });

  // === FOOTER ===
  doc.setFillColor(...primaryColor);
  doc.rect(0, pageHeight - 8, pageWidth, 8, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text('gradestoects.blshub.com', margin, pageHeight - 3);

  doc.save(`Cumulative_ECTS_GPA_${letterGrade}_${Date.now()}.pdf`);
}
