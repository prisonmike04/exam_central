import { Request, Response } from 'express';
import sequelize from '../utils/database';
import Supervisor from '../models/Supervisor';
import { QueryTypes } from 'sequelize';

// Add Supervisor
export const addSupervisor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, availability_start, availability_end, specialization, email } = req.body;

    if (!name || !availability_start || !availability_end || !specialization || !email) {
      res.status(400).json({ error: 'All fields are required.' });
      return;
    }

    const newSupervisor = await Supervisor.create({
      name,
      availability_start,
      availability_end,
      specialization,
      email,
    });

    res.status(201).json({ message: 'Supervisor added successfully', id: newSupervisor.id });
  } catch (error) {
    const errorMessage = (error as Error).message || 'An unknown error occurred';
    console.error('Error adding supervisor:', error);
    res.status(500).json({ error: 'Failed to add supervisor.', details: errorMessage });
  }
};

// Get All Supervisors
export const getAllSupervisors = async (req: Request, res: Response): Promise<void> => {
  try {
    const supervisors = await Supervisor.findAll();
    res.status(200).json(supervisors);
  } catch (error) {
    const errorMessage = (error as Error).message || 'An unknown error occurred';
    console.error('Error fetching supervisors:', error);
    res.status(500).json({ error: 'Failed to fetch supervisors.', details: errorMessage });
  }
};

// Assign Supervisor
export const assignSupervisor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { room_id, exam_date, supervisor_id } = req.body;

    if (!room_id || !exam_date || !supervisor_id) {
      res.status(400).json({ error: 'All fields are required.' });
      return;
    }

    const supervisor = await Supervisor.findByPk(supervisor_id);
    if (!supervisor) {
      res.status(404).json({ error: 'Supervisor not found.' });
      return;
    }

    const query = `
      INSERT INTO exam_room_assignments (room_id, exam_date, supervisor_id)
      VALUES (:room_id, :exam_date, :supervisor_id)
    `;
    await sequelize.query(query, {
      type: QueryTypes.INSERT,
      replacements: { room_id, exam_date, supervisor_id },
    });

    res.status(201).json({ message: 'Supervisor assigned successfully.' });
  } catch (error) {
    const errorMessage = (error as Error).message || 'An unknown error occurred';
    console.error('Error assigning supervisor:', error);
    res.status(500).json({ error: 'Failed to assign supervisor.', details: errorMessage });
  }
};

// Get All Room Assignments
export const getAllAssignments = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = `
      SELECT e.room_id, e.exam_date, s.name AS supervisor_name, s.specialization, s.email
      FROM exam_room_assignments e
      JOIN supervisors s ON e.supervisor_id = s.id
      ORDER BY e.exam_date DESC
    `;
    const assignments = await sequelize.query(query, { type: QueryTypes.SELECT });
    res.status(200).json(assignments);
  } catch (error) {
    const errorMessage = (error as Error).message || 'An unknown error occurred';
    console.error('Error fetching assignments:', error);
    res.status(500).json({ error: 'Failed to fetch assignments.', details: errorMessage });
  }
};
