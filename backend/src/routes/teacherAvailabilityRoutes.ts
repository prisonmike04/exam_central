import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import {
  addTeacherAvailability,
  getAllTeacherAvailabilities,
  getTeacherAvailability,
  getAvailableTeachers,
} from '../controllers/teacherAvailabilityController';

const router = express.Router();

router.post('/add', authMiddleware, addTeacherAvailability);
router.get('/', authMiddleware, getAllTeacherAvailabilities);
router.get('/:teacherId', authMiddleware, getTeacherAvailability);
router.get('/available', authMiddleware, getAvailableTeachers);

export default router;
