import { Request, Response, NextFunction } from 'express';
import MarksModel from '../models/marksModel';

// Fetch results for a student
export const getStudentResults = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { sapId } = req.params;

  if (!sapId) {
    res.status(400).json({ error: 'SAP ID is required.' });
    return;
  }

  try {
    const results = await MarksModel.findAll({ where: { sap_id: sapId } });

    if (!results || results.length === 0) {
      res.status(404).json({ error: 'No results found for the given SAP ID.' });
      return;
    }

    res.status(200).json({ message: 'Results retrieved successfully.', results });
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ error: 'Failed to fetch results.' });
  }
};

// Save results for a student
export const saveStudentResults = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { sapId, programme, results } = req.body;

  if (!sapId || !programme || !results || results.length === 0) {
    res.status(400).json({ error: 'All fields (SAP ID, programme, results) are required.' });
    return;
  }

  try {
    for (const result of results) {
      // Save individual course results
      await MarksModel.create({
        sap_id: sapId,
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
        sgpa: result.sgpa,
        remark: result.remark,
      });
    }

    res.status(201).json({ message: 'Results saved successfully.' });
  } catch (error) {
    console.error('Error saving results:', error);
    res.status(500).json({ error: 'Failed to save results.' });
  }
};
