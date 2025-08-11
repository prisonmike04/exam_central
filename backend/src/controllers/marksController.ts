import { Request, Response } from 'express';
import { Marks } from '../models/Marks';

// Teacher enters marks for a student
export const addMarks = async (req: Request, res: Response) => {
  try {
    const { studentId, examId, subjectCode, subjectName, caMarks, eseMarks } = req.body;
    const finalMarks = caMarks + eseMarks;
    // Calculate grade and gradePoint
    let grade = 'F';
    let gradePoint = 0;
    if (finalMarks >= 90) { grade = 'O'; gradePoint = 10; }
    else if (finalMarks >= 80) { grade = 'A+'; gradePoint = 9; }
    else if (finalMarks >= 70) { grade = 'A'; gradePoint = 8; }
    else if (finalMarks >= 60) { grade = 'B+'; gradePoint = 7; }
    else if (finalMarks >= 50) { grade = 'B'; gradePoint = 6; }
    else if (finalMarks >= 45) { grade = 'C+'; gradePoint = 5; }
    else if (finalMarks >= 40) { grade = 'C'; gradePoint = 4; }
    // Save marks
    const marks = await Marks.create({
      studentId,
      examId,
      subjectCode,
      subjectName,
      caMarks,
      eseMarks,
      finalMarks,
      grade,
      gradePoint,
    });
    res.status(201).json({ success: true, marks });
  } catch (error) {
    console.error('Error adding marks:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Student views/downloads grade card
export const getStudentMarks = async (req: Request, res: Response) => {
  try {
    const { studentId, examId } = req.query;
    const marks = await Marks.findAll({ where: { studentId, examId } });
    res.status(200).json({ success: true, marks });
  } catch (error) {
    console.error('Error fetching marks:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
