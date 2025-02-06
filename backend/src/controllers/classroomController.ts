import { Request, Response } from 'express';
import Classroom from '../models/Classroom';
import Teacher from '../models/Teacher'
// Get all classrooms
export const getClassrooms = async (req: Request, res: Response): Promise<void> => {
  try {
    const classrooms = await Classroom.findAll();
    res.status(200).json({ success: true, classrooms });
  } catch (error) {
    console.error('Error fetching classrooms:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get a single classroom by ID
export const getClassroomById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const classroom = await Classroom.findByPk(id);

    if (!classroom) {
      res.status(404).json({ success: false, message: 'Classroom not found' });
      return;
    }

    res.status(200).json({ success: true, classroom });
  } catch (error) {
    console.error('Error fetching classroom by ID:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Add a new classroom
export const addClassroom = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, capacity } = req.body;

    const newClassroom = await Classroom.create({
      name,
      capacity,
    });

    res.status(201).json({ success: true, classroom: newClassroom });
  } catch (error) {
    console.error('Error adding classroom:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Update a classroom
export const updateClassroom = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, capacity } = req.body;

    const classroom = await Classroom.findByPk(id);

    if (!classroom) {
      res.status(404).json({ success: false, message: 'Classroom not found' });
      return;
    }

    classroom.name = name;
    classroom.capacity = capacity;

    await classroom.save();

    res.status(200).json({ success: true, classroom });
  } catch (error) {
    console.error('Error updating classroom:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Delete a classroom
export const deleteClassroom = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const classroom = await Classroom.findByPk(id);

    if (!classroom) {
      res.status(404).json({ success: false, message: 'Classroom not found' });
      return;
    }

    await classroom.destroy();

    res.status(200).json({ success: true, message: 'Classroom deleted successfully' });
  } catch (error) {
    console.error('Error deleting classroom:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const assignTeacherToClassroom = async (req: Request, res: Response): Promise<void> => {
  try {
    const { classroomId, teacherId } = req.body;

    // Check if the classroom exists
    const classroom = await Classroom.findByPk(classroomId);
    if (!classroom) {
      res.status(404).json({ success: false, message: 'Classroom not found' });
      return;
    }

    // Check if the teacher exists
    const teacher = await Teacher.findByPk(teacherId);
    if (!teacher) {
      res.status(404).json({ success: false, message: 'Teacher not found' });
      return;
    }

    // Assign the teacher to the classroom
    classroom.teacherId = teacherId;
    await classroom.save();

    res.status(200).json({ success: true, message: 'Teacher assigned to classroom successfully', classroom });
  } catch (error) {
    console.error('Error assigning teacher to classroom:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};