"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logReassignment = exports.getAllAssignments = exports.assignSupervisor = exports.getAllSupervisors = exports.addSupervisor = void 0;
const Supervisor_1 = __importDefault(require("../models/Supervisor"));
const database_1 = __importDefault(require("../utils/database"));
const sequelize_1 = require("sequelize");
// ✅ Add Supervisor
const addSupervisor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, availability_start, availability_end, specialization, email } = req.body;
        if (!name || !availability_start || !availability_end || !specialization || !email) {
            res.status(400).json({ error: "All fields are required." });
            return;
        }
        const newSupervisor = yield Supervisor_1.default.create({
            name,
            availability_start,
            availability_end,
            specialization,
            email,
        });
        res.status(201).json({ message: "Supervisor added successfully", id: newSupervisor.id });
    }
    catch (error) {
        console.error("Error adding supervisor:", error);
        res.status(500).json({ error: "Failed to add supervisor." });
    }
});
exports.addSupervisor = addSupervisor;
// ✅ Get All Supervisors
const getAllSupervisors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supervisors = yield Supervisor_1.default.findAll();
        res.status(200).json(supervisors);
    }
    catch (error) {
        console.error("Error fetching supervisors:", error);
        res.status(500).json({ error: "Failed to fetch supervisors." });
    }
});
exports.getAllSupervisors = getAllSupervisors;
// ✅ Assign a Supervisor (No Email Notification)
const assignSupervisor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { room_id, exam_date, supervisor_id } = req.body;
        if (!room_id || !exam_date || !supervisor_id) {
            res.status(400).json({ error: "All fields are required." });
            return;
        }
        // Ensure the supervisor exists
        const supervisor = yield Supervisor_1.default.findByPk(supervisor_id);
        if (!supervisor) {
            res.status(404).json({ error: "Supervisor not found." });
            return;
        }
        // Insert the assignment into the database
        const query = `
      INSERT INTO exam_room_assignments (room_id, exam_date, supervisor_id)
      VALUES (:room_id, :exam_date, :supervisor_id)
    `;
        yield database_1.default.query(query, {
            type: sequelize_1.QueryTypes.INSERT,
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
    }
    catch (error) {
        console.error("Error assigning supervisor:", error);
        res.status(500).json({ error: "Failed to assign supervisor." });
    }
});
exports.assignSupervisor = assignSupervisor;
// ✅ Get All Room Assignments
const getAllAssignments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
      SELECT e.room_id, e.exam_date, s.name AS supervisor_name, s.specialization, s.email
      FROM exam_room_assignments e
      JOIN supervisors s ON e.supervisor_id = s.id
      ORDER BY e.exam_date DESC
    `;
        const assignments = yield database_1.default.query(query, { type: sequelize_1.QueryTypes.SELECT });
        res.status(200).json(assignments);
    }
    catch (error) {
        console.error("Error fetching assignments:", error);
        res.status(500).json({ error: "Failed to fetch assignments." });
    }
});
exports.getAllAssignments = getAllAssignments;
// ✅ Log a Reassignment
const logReassignment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield database_1.default.query(query, {
            type: sequelize_1.QueryTypes.INSERT,
            replacements: { room_id, exam_date, supervisor_id, action },
        });
        res.status(201).json({ message: "Reassignment logged successfully." });
    }
    catch (error) {
        console.error("Error logging reassignment:", error);
        res.status(500).json({ error: "Failed to log reassignment." });
    }
});
exports.logReassignment = logReassignment;
