import { Request, Response } from 'express';
import Student from '../models/Student';
import Room from '../models/Room';

export const generateSeatingArrangement = async (req: Request, res: Response): Promise<void> => {
  try {
    const students = await Student.findAll();
    const rooms = await Room.findAll();

    if (!students.length || !rooms.length) {
      res.status(404).json({ success: false, message: 'No students or rooms available' });
      return;
    }

    const arrangement = students.map((student, index) => ({
      student,
      room: rooms[index % rooms.length],
    }));

    res.status(200).json({ success: true, arrangement });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
