import { Router } from 'express';
import {
  saveMarks,
  getMarksByStudent,
  calculateTranscript,
  getResults,
  getAllMarks,
} from '../controllers/MarksController';

const router = Router();

router.post('/', saveMarks); // POST /api/marks/
router.get('/student/:sapId', getMarksByStudent); // GET /api/marks/student/:sapId
router.get('/calculate-transcript/:sapId', calculateTranscript); // GET /api/marks/calculate-transcript/:sapId
router.get('/results', getResults); // GET /api/marks/results
router.get('/', getAllMarks); // GET /api/marks/

export default router;
