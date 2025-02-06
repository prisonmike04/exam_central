import { Request, Response } from 'express';
import { Teacher } from '../models/Teacher';
import { TeacherAvailability } from '../models/TeacherAvailability';
import bcrypt from 'bcrypt';

// Add a new teacher
export const addTeacher = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, branch, email } = req.body;
    const password = 'Password123'; // Fixed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the teacher
    const newTeacher = await Teacher.create({
      name,
      branch,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ success: true, teacher: newTeacher });
  } catch (error) {
    console.error('Error adding teacher:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get all teachers
export const getAllTeachers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { branch } = req.query;

    const whereClause: any = {};
    if (branch) whereClause.branch = branch;

    const teachers = await Teacher.findAll({
      where: whereClause,
    });

    res.status(200).json({ success: true, teachers });
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Delete a teacher
export const deleteTeacher = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findByPk(id);
    if (!teacher) {
      res.status(404).json({ success: false, message: 'Teacher not found' });
      return;
    }

    // Delete associated availability
    await TeacherAvailability.destroy({ where: { teacherId: id } });
    await teacher.destroy();

    res.status(200).json({ success: true, message: 'Teacher deleted successfully' });
  } catch (error) {
    console.error('Error deleting teacher:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get a teacher by ID
export const getTeacherById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findByPk(id);
    if (!teacher) {
      res.status(404).json({ success: false, message: 'Teacher not found' });
      return;
    }

    res.status(200).json({ success: true, teacher });
  } catch (error) {
    console.error('Error fetching teacher by ID:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
