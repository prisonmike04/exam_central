import { Request, Response, NextFunction } from 'express';
import MarksModel from  '../models/marksModel';

// Save exam results (renamed/kept as "saveTranscript")
export const saveTranscript = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { sapId, programme, results } = req.body;

  if (!sapId || !programme || !results || results.length === 0) {
    // Do NOT return the `res` call
    res.status(400).json({
      error: 'All fields (SAP ID, programme, results) are required.',
    });
    return;
  }

  try {
    // Calculate SGPA
    let totalCredits = 0;
    let totalGradePoints = 0;

    results.forEach((result: any) => {
      const gradePoints = result.grade_points * result.course_credits;
      totalGradePoints += gradePoints;
      totalCredits += result.course_credits;
    });

    const sgpa = totalCredits ? totalGradePoints / totalCredits : 0;

    // Save exam results for each subject
    for (const result of results) {
      await MarksModel.create({
        sap_id: sapId, // 'sapId' must match your column name if it's 'sap_id' in DB
        programme,
        course_code: result.course_code,
        course_name: result.course_name,
        highest_marks: result.highest_marks,
        course_credits: result.course_credits,
        ca_tw_max_marks: result.ca_tw_max_marks,
        ca_tw_marks_obtained: result.ca_tw_marks_obtained,
        ese_pr_orl_max_marks: result.ese_pr_orl_max_marks,
        ese_pr_orl_marks_obtained: result.ese_pr_orl_marks_obtained,
        final_max_marks: result.final_max_marks,
        marks_obtained: result.marks_obtained,
        final_grade: result.final_grade,
        credits_earned: result.credits_earned,
        grade_points: result.grade_points,
        total_points: result.total_points,
        sgpa,
        remark: result.remark,
      });
    }

    // Again, do NOT return this `res`.
    res.status(201).json({ message: 'Exam results saved successfully.' });
  } catch (error) {
    console.error('Error saving exam results:', error);
    res.status(500).json({ error: 'Failed to save exam results.' });
  }
};

// Fetch exam results (renamed/kept as "getTranscript")
export const getTranscript = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { sapId } = req.params;

  if (!sapId) {
    res.status(400).json({ error: 'SAP ID is required.' });
    return;
  }

  try {
    const results = await MarksModel.findAll({
      where: { sap_id: sapId }, // Make sure 'sap_id' matches your table column name
    });

    if (!results || results.length === 0) {
      // No `return` needed; just send response
      res.status(404).json({ error: 'Exam results not found for the given SAP ID.' });
      return;
    }

    res.status(200).json({
      message: 'Exam results retrieved successfully.',
      results,
    });
  } catch (error) {
    console.error('Error fetching exam results:', error);
    res.status(500).json({ error: 'Failed to fetch exam results.' });
  }
};
