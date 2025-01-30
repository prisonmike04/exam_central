import { Request, Response } from "express";
import Supervisor from "../models/Supervisor";
import sequelize from "../utils/database";
import { QueryTypes } from "sequelize";

// ✅ Add Supervisor
export const addSupervisor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, availability_start, availability_end, specialization, email } = req.body;

    if (!name || !availability_start || !availability_end || !specialization || !email) {
      res.status(400).json({ error: "All fields are required." });
      return;
    }

    const newSupervisor = await Supervisor.create({
      name,
      availability_start,
      availability_end,
      specialization,
      email,
    });

    res.status(201).json({ message: "Supervisor added successfully", id: newSupervisor.id });
  } catch (error) {
    console.error("Error adding supervisor:", error);
    res.status(500).json({ error: "Failed to add supervisor." });
  }
};

// ✅ Get All Supervisors
export const getAllSupervisors = async (req: Request, res: Response): Promise<void> => {
  try {
    const supervisors = await Supervisor.findAll();
    res.status(200).json(supervisors);
  } catch (error) {
    console.error("Error fetching supervisors:", error);
    res.status(500).json({ error: "Failed to fetch supervisors." });
  }
};

// ✅ Assign a Supervisor (No Email Notification)
export const assignSupervisor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { room_id, exam_date, supervisor_id } = req.body;

    if (!room_id || !exam_date || !supervisor_id) {
      res.status(400).json({ error: "All fields are required." });
      return;
    }

    // Ensure the supervisor exists
    const supervisor = await Supervisor.findByPk(supervisor_id);
    if (!supervisor) {
      res.status(404).json({ error: "Supervisor not found." });
      return;
    }

    // Insert the assignment into the database
    const query = `
      INSERT INTO exam_room_assignments (room_id, exam_date, supervisor_id)
      VALUES (:room_id, :exam_date, :supervisor_id)
    `;
    await sequelize.query(query, {
      type: QueryTypes.INSERT,
      replacements: { room_id, exam_date, supervisor_id },
    });

    // Return success response (Email notification will be handled on the frontend)
    res.status(201).json({
      message: "Supervisor assigned successfully.",
      supervisor: {
        name: supervisor.name,
        email: supervisor.email,
      },
    });
  } catch (error) {
    console.error("Error assigning supervisor:", error);
    res.status(500).json({ error: "Failed to assign supervisor." });
  }
};

// ✅ Get All Room Assignments
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
    console.error("Error fetching assignments:", error);
    res.status(500).json({ error: "Failed to fetch assignments." });
  }
};

// ✅ Log a Reassignment
export const logReassignment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { room_id, exam_date, supervisor_id, action } = req.body;

    if (!room_id || !exam_date || !supervisor_id || !action) {
      res.status(400).json({ error: "All fields are required." });
      return;
    }

    const query = `
      INSERT INTO assignment_logs (room_id, exam_date, supervisor_id, action)
      VALUES (:room_id, :exam_date, :supervisor_id, :action)
    `;
    await sequelize.query(query, {
      type: QueryTypes.INSERT,
      replacements: { room_id, exam_date, supervisor_id, action },
    });

    res.status(201).json({ message: "Reassignment logged successfully." });
  } catch (error) {
    console.error("Error logging reassignment:", error);
    res.status(500).json({ error: "Failed to log reassignment." });
  }
};
