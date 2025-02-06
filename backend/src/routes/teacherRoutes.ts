import express from 'express';
import {
  addTeacher,
  getAllTeachers,
  deleteTeacher,
  getTeacherById,
} from '../controllers/teacherController';

const router = express.Router();

// Add a new teacher with subjects
router.post('/', addTeacher);

// Get all teachers with subjects
router.get('/', getAllTeachers);

// Get a teacher by ID with subjects
router.get('/:id', getTeacherById);

// Delete a teacher by ID
router.delete('/:id', deleteTeacher);

export default router;
