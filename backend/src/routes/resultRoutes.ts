import { Router } from 'express';
import { getStudentResults, saveStudentResults } from '../controllers/marksCalculationController';

const router = Router();

// Route to fetch results
router.get('/:sapId', getStudentResults);

// Route to save results
router.post('/', saveStudentResults);

export default router;
