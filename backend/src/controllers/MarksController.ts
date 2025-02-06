import { Request, Response } from 'express';
import MarksModel from  '../models/marksModel';

// Helper function for consistent error responses
const handleError = (res: Response, err: any, message: string) => {
  console.error(message, err);
  res.status(500).json({ error: message });
};

// Save marks for a student
export const saveMarks = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      sap_id,
      programme,
      course_code,
      course_name,
      highest_marks,
      course_credits,
      ca_tw_max_marks,
      ca_tw_marks_obtained,
      ese_pr_orl_max_marks,
      ese_pr_orl_marks_obtained,
      final_max_marks,
      marks_obtained,
      final_grade,
      credits_earned,
      grade_points,
      total_points,
      sgpa,
      remark,
    } = req.body;

    const newMarks = await MarksModel.create({
      sap_id,
      programme,
      course_code,
      course_name,
      highest_marks,
      course_credits,
      ca_tw_max_marks,
      ca_tw_marks_obtained,
      ese_pr_orl_max_marks,
      ese_pr_orl_marks_obtained,
      final_max_marks,
      marks_obtained,
      final_grade,
      credits_earned,
      grade_points,
      total_points,
      sgpa,
      remark,
    });

    res.status(201).json({ message: 'Marks saved successfully', data: newMarks });
  } catch (err) {
    handleError(res, err, 'Failed to save marks.');
  }
};

// Fetch marks for a specific student by SAP ID
export const getMarksByStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sapId } = req.params;

    const studentMarks = await MarksModel.findAll({
      where: { sap_id: sapId },
      attributes: [
        'sap_id',
        'programme',
        'course_code',
        'course_name',
        'highest_marks',
        'course_credits',
        'ca_tw_max_marks',
        'ca_tw_marks_obtained',
        'ese_pr_orl_max_marks',
        'ese_pr_orl_marks_obtained',
        'final_max_marks',
        'marks_obtained',
        'final_grade',
        'credits_earned',
        'grade_points',
        'total_points',
        'sgpa',
        'remark',
        'createdAt',
        'updatedAt',
      ],
    });

    if (!studentMarks.length) {
      res.status(404).json({ error: 'No marks found for the given SAP ID' });
      return;
    }

    res.status(200).json({ data: studentMarks });
  } catch (err) {
    handleError(res, err, 'Failed to fetch marks for the student.');
  }
};

// Calculate transcript for a student
export const calculateTranscript = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sapId } = req.params;

    const studentMarks = await MarksModel.findAll({
      where: { sap_id: sapId },
      attributes: [
        'sap_id',
        'course_code',
        'course_name',
        'grade_points',
        'course_credits',
      ],
    });

    if (!studentMarks.length) {
      res.status(404).json({ error: 'No marks found for the given SAP ID' });
      return;
    }

    let totalCredits = 0;
    let totalGradePoints = 0;

    studentMarks.forEach((mark: any) => {
      totalGradePoints += mark.grade_points * mark.course_credits;
      totalCredits += mark.course_credits;
    });

    const sgpa = totalCredits ? totalGradePoints / totalCredits : 0;

    res.status(200).json({
      data: studentMarks,
      sgpa,
    });
  } catch (err) {
    handleError(res, err, 'Failed to calculate transcript.');
  }
};

// Fetch all results
export const getResults = async (_req: Request, res: Response): Promise<void> => {
  try {
    const results = await MarksModel.findAll();

    if (!results.length) {
      res.status(404).json({ error: 'No results found' });
      return;
    }

    res.status(200).json({ data: results });
  } catch (err) {
    handleError(res, err, 'Failed to fetch results.');
  }
};

// Fetch all marks for all students
export const getAllMarks = async (_req: Request, res: Response): Promise<void> => {
  try {
    const allMarks = await MarksModel.findAll();

    if (!allMarks.length) {
      res.status(404).json({ error: 'No marks found' });
      return;
    }

    res.status(200).json({ data: allMarks });
  } catch (err) {
    handleError(res, err, 'Failed to fetch all marks.');
  }
};
