import { Request, Response } from 'express';
import { Student } from '../models/Student';
import bcrypt from 'bcrypt';

export const addStudent = async (req: Request, res: Response) => {
  try {
    const { name, branch, semester, email, special_accommodations } = req.body;
    const password = 'Password123'; // Fixed password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = await Student.create({
      name,
      branch,
      semester,
      email,
      special_accommodations,
      password: hashedPassword,
    });

    res.status(201).json({ success: true, student: newStudent });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const { branch, semester } = req.query;

    const whereClause: any = {};
    if (branch) whereClause.branch = branch;
    if (semester) whereClause.semester = semester;

    const students = await Student.findAll({ where: whereClause });
    res.status(200).json({ success: true, students });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id);

    if (!student) {
      res.status(404).json({ success: false, message: 'Student not found' });
      return;
    }

    await student.destroy();
    res.status(200).json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getStudentById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const student = await Student.findByPk(id);
      if (!student) {
        res.status(404).json({ success: false, message: 'Student not found' });
        return;
      }
      res.status(200).json({ success: true, student });
    } catch (error) {
      console.error('Error fetching student by ID:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };