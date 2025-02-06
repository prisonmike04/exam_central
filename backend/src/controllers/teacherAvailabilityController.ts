import { Request, Response } from 'express';
import { TeacherAvailability } from '../models/TeacherAvailability';
import { Teacher } from '../models/Teacher';

// Add teacher availability with validation
export const addTeacherAvailability = async (req: Request, res: Response): Promise<void> => {
  try {
    const { availabilityStart, availabilityEnd } = req.body;

    // Ensure user is authenticated and teacher ID is present
    const teacherId = req.user?.id; // Use dynamic teacher ID from authMiddleware
    if (!teacherId) {
      res.status(400).json({ success: false, message: 'Teacher ID is required' });
      return;
    }

    if (new Date(availabilityStart) >= new Date(availabilityEnd)) {
      res.status(400).json({ success: false, message: 'Start date must be before end date.' });
      return;
    }

    const overlap = await TeacherAvailability.findOne({
      where: {
        teacherId,
        availabilityStart: { $lte: new Date(availabilityEnd) },
        availabilityEnd: { $gte: new Date(availabilityStart) },
      },
    });

    if (overlap) {
      res.status(400).json({ success: false, message: 'Availability overlaps with an existing entry.' });
      return;
    }

    const availability = await TeacherAvailability.create({
      teacherId,
      availabilityStart,
      availabilityEnd,
    });

    res.status(201).json({ success: true, message: 'Availability added successfully', availability });
  } catch (error) {
    console.error('Error adding teacher availability:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Fetch all teacher availabilities
export const getAllTeacherAvailabilities = async (_req: Request, res: Response): Promise<void> => {
  try {
    const availabilities = await TeacherAvailability.findAll({
      include: [{ model: Teacher }],
    });

    res.status(200).json({ success: true, availabilities });
  } catch (error) {
    console.error('Error fetching teacher availabilities:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Fetch availability by teacher ID
export const getTeacherAvailability = async (req: Request, res: Response): Promise<void> => {
  try {
    const { teacherId } = req.params;

    const availabilities = await TeacherAvailability.findAll({
      where: { teacherId },
    });

    res.status(200).json({ success: true, availabilities });
  } catch (error) {
    console.error('Error fetching teacher availability:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get available teachers for a specific date range
export const getAvailableTeachers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { startDate, endDate } = req.query;

    const availableTeachers = await TeacherAvailability.findAll({
      where: {
        availabilityStart: { $lte: new Date(startDate as string) },
        availabilityEnd: { $gte: new Date(endDate as string) },
      },
      include: [Teacher],
    });

    res.status(200).json({ success: true, teachers: availableTeachers });
  } catch (error) {
    console.error('Error fetching available teachers:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
