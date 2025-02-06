import { Router } from 'express';
import {
  getStudentResults,
  saveStudentResults,
} from '../controllers/marksCalculationController';

const router = Router();

// Route to fetch results for a specific student
// GET /api/marks-calculation/:sapId
router.get('/:sapId', getStudentResults);

// Route to save results for a student
// POST /api/marks-calculation/
router.post('/', saveStudentResults);

export default router;
