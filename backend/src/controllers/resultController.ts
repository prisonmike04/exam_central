import { Request, Response } from "express";
import { calculatePointer } from "../utils/resultCalculator";
import { generateResultPDF } from "../utils/resultPDFGenerator";
import { sendEmailWithPDF } from "../utils/emailService";
import path from "path";

export async function processExamResult(req: Request, res: Response) {
  try {
    const { studentName, email, marks, totalMarks } = req.body;

    // Step 1: Calculate the result
    const result = calculatePointer(marks, totalMarks);

    // Step 2: Generate PDF
    const filePath = path.join(__dirname, "../../temp", `${studentName}_Result.pdf`);
    generateResultPDF(result, studentName, filePath);

    // Step 3: Send Email
    await sendEmailWithPDF(email, filePath);

    res.status(200).json({ message: "Result processed and emailed successfully!" });
  } catch (error) {
    console.error("Error processing exam result:", error);
    res.status(500).json({ message: "Failed to process result.", error });
  }
}
