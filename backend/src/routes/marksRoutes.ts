import express from 'express';
import { addMarks, getStudentMarks } from '../controllers/marksController';

const router = express.Router();

// Teacher enters marks
router.post('/', addMarks);

// Student views/downloads grade card
router.get('/', getStudentMarks);

export default router;
