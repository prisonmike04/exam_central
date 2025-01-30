"use client";

import { useEffect, useState } from "react";
import AddSupervisorForm from "../../components/AddSupervisorForm";
import axios from "axios";

// Define TypeScript types for supervisors and assignments
interface Supervisor {
  id: number;
  name: string;
  specialization: string;
  email: string;
}

interface Assignment {
  room_id: number;
  exam_date: string;
  supervisor_name: string;
}

export default function AdminView() {
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState<number | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [examDate, setExamDate] = useState<string>("");

  useEffect(() => {
    fetchSupervisors();
    fetchAssignments();
  }, []);

  const fetchSupervisors = async () => {
    try {
      const response = await axios.get<Supervisor[]>("http://localhost:5000/api/supervisors");
      setSupervisors(response.data);
    } catch (err) {
      console.error("Error fetching supervisors:", err);
    }
  };

  const fetchAssignments = async () => {
    try {
      const response = await axios.get<Assignment[]>("http://localhost:5000/api/supervisors/assignments");
      setAssignments(response.data);
    } catch (err) {
      console.error("Error fetching assignments:", err);
    }
  };

  // ✅ Assign Supervisor and Send Email
  const assignSupervisor = async () => {
    if (!selectedRoom || !examDate || !selectedSupervisor) {
      alert("Please select a room, date, and supervisor.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/supervisors/assign", {
        room_id: selectedRoom,
        exam_date: examDate,
        supervisor_id: selectedSupervisor,
      });

      alert("Supervisor assigned and email sent!");

      // Refresh assignments after update
      fetchAssignments();
    } catch (error) {
      console.error("Error assigning supervisor:", error);
    }
  };

  return (
    <div className="p-6">
      {/* Teacher Dashboard Section */}
      <h1 className="text-2xl font-bold mb-6">Teacher Dashboard</h1>
      <p className="mb-4">Use the form below to add new supervisors. Ensure all fields are filled out correctly.</p>
      <AddSupervisorForm />

      {/* Admin Panel Section */}
      <div className="mt-10">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

        {/* Supervisors Section */}
        <h2 className="text-xl font-bold mb-4">Available Supervisors</h2>
        {supervisors.length > 0 ? (
          <ul>
            {supervisors.map((supervisor) => (
              <li key={supervisor.id} className="mb-2">
                {supervisor.name} - {supervisor.specialization} ({supervisor.email})
              </li>
            ))}
          </ul>
        ) : (
          <p>No supervisors available.</p>
        )}

        {/* Assign Supervisor Section */}
        <div className="mt-10 p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-bold mb-4">Assign Supervisor</h2>

          <label className="block mb-2">
            <span className="text-gray-700">Select Supervisor:</span>
            <select
              onChange={(e) => setSelectedSupervisor(Number(e.target.value))}
              className="border border-gray-300 px-2 py-1 rounded w-full mt-1"
            >
              <option value="">-- Select Supervisor --</option>
              {supervisors.map((supervisor) => (
                <option key={supervisor.id} value={supervisor.id}>
                  {supervisor.name} - {supervisor.specialization}
                </option>
              ))}
            </select>
          </label>

          <label className="block mb-2">
            <span className="text-gray-700">Select Room ID:</span>
            <input
              type="number"
              value={selectedRoom || ""}
              onChange={(e) => setSelectedRoom(Number(e.target.value))}
              className="border border-gray-300 px-2 py-1 rounded w-full mt-1"
              placeholder="Enter Room ID"
            />
          </label>

          <label className="block mb-2">
            <span className="text-gray-700">Select Exam Date:</span>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="border border-gray-300 px-2 py-1 rounded w-full mt-1"
            />
          </label>

          <button
            onClick={assignSupervisor}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full mt-3"
          >
            Assign Supervisor
          </button>
        </div>

        {/* Room Assignments Section */}
        <h2 className="text-xl font-bold mt-8 mb-4">Room Assignments</h2>
        {assignments.length > 0 ? (
          <ul>
            {assignments.map((assignment) => (
              <li key={`${assignment.room_id}-${assignment.exam_date}`} className="mb-2">
                Room {assignment.room_id} - {assignment.exam_date} - {assignment.supervisor_name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No assignments available.</p>
        )}
      </div>
    </div>
  );
}
