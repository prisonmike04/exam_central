import express from 'express';
import { addStudent, getAllStudents, deleteStudent, getStudentById } from '../controllers/studentController';

const router = express.Router();

// Add a new student
router.post('/', addStudent);

// Get all students
router.get('/', getAllStudents);

// Get a student by ID
router.get('/:id', getStudentById);

// Delete a student by ID
router.delete('/:id', deleteStudent);

export default router;
