import PDFDocument from "pdfkit";
import fs from "fs";

export function generateResultPDF(result: any, studentName: string, filePath: string) {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(18).text("Exam Result", { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text(`Name: ${studentName}`);
  doc.text(`Marks: ${result.marks}/${result.totalMarks}`);
  doc.text(`Percentage: ${result.percentage}%`);
  doc.text(`Grade: ${result.grade}`);
  doc.end();
}
