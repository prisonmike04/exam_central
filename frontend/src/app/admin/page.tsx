'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import StudentManagement from './StudentManagement';
import TeacherManagement from './TeacherManagement';

// Interfaces for Supervisor and Assignment
interface Supervisor {
  id: number;
  name: string;
  availability_start: string;
  availability_end: string;
  specialization: string;
  email: string;
}

interface Assignment {
  room_id: number;
  exam_date: string;
  supervisor_name: string;
  specialization: string;
}

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [roomId, setRoomId] = useState<string>('');
  const [examDate, setExamDate] = useState<string>('');
  const [selectedSupervisor, setSelectedSupervisor] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Fetch supervisors and assignments when component mounts
  useEffect(() => {
    fetchSupervisors();
    fetchAssignments();
  }, []);

  // Function to fetch supervisors
  const fetchSupervisors = async () => {
    try {
      const { data } = await axios.get<Supervisor[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/supervisors`);
      setSupervisors(data);
    } catch (err) {
      console.error('Error fetching supervisors:', err);
      setError('Failed to fetch supervisors.');
    }
  };

  // Function to fetch room assignments
  const fetchAssignments = async () => {
    try {
      const { data } = await axios.get<Assignment[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/supervisors/assignments`);
      setAssignments(data);
    } catch (err) {
      console.error('Error fetching assignments:', err);
      setError('Failed to fetch assignments.');
    }
  };

  // Function to handle supervisor assignment
  const handleAssign = async () => {
    try {
      const supervisorDetails = supervisors.find((sup) => sup.id === parseInt(selectedSupervisor));
      if (!supervisorDetails) {
        alert('Invalid supervisor selection.');
        return;
      }

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/supervisors/assign`, {
        room_id: parseInt(roomId),
        exam_date: examDate,
        supervisor_id: parseInt(selectedSupervisor),
      });

      alert('Supervisor assigned successfully.');
      fetchAssignments();
    } catch (err) {
      console.error('Error assigning supervisor:', err);
      setError('Failed to assign supervisor.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-gray-100">
      <AdminNavbar />
      <div className="flex flex-col items-center pt-20">
        <h1 className="text-4xl font-bold mb-8">Hello, Admin</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className="bg-white bg-opacity-30 backdrop-blur-lg p-6 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setActiveSection('students')}
          >
            <h2 className="text-2xl font-bold mb-4">Student Management</h2>
            <p>Manage students: Add, Delete, and View students.</p>
          </div>
          <div
            className="bg-white bg-opacity-30 backdrop-blur-lg p-6 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setActiveSection('teachers')}
          >
            <h2 className="text-2xl font-bold mb-4">Teacher Management</h2>
            <p>Manage teachers: Add, Delete, and View teachers.</p>
          </div>
          <div
            className="bg-white bg-opacity-30 backdrop-blur-lg p-6 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setActiveSection('assign')}
          >
            <h2 className="text-2xl font-bold mb-4">Assign Supervisor</h2>
            <p>Assign supervisors to rooms for exams.</p>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {activeSection === 'students' && <StudentManagement />}
      {activeSection === 'teachers' && <TeacherManagement />}

      {activeSection === 'assign' && (
        <div className="p-6">
          <h2 className="text-xl font-bold mt-4 mb-4">Assign Supervisor</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAssign();
            }}
            className="space-y-4"
          >
            <label className="block">
              Room ID:
              <input
                type="number"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                required
                className="border border-gray-300 px-2 py-1 rounded w-full"
              />
            </label>
            <label className="block">
              Exam Date:
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                required
                className="border border-gray-300 px-2 py-1 rounded w-full"
              />
            </label>
            <label className="block">
              Supervisor:
              <select
                value={selectedSupervisor}
                onChange={(e) => setSelectedSupervisor(e.target.value)}
                required
                className="border border-gray-300 px-2 py-1 rounded w-full"
              >
                <option value="">Select a Supervisor</option>
                {supervisors.map((supervisor) => (
                  <option key={supervisor.id} value={supervisor.id.toString()}>
                    {supervisor.name} ({supervisor.specialization})
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
              Assign Supervisor
            </button>
          </form>

          <h2 className="text-xl font-bold mt-8 mb-4">Room Assignments</h2>
          <ul>
            {assignments.map((assignment) => (
              <li key={`${assignment.room_id}-${assignment.exam_date}`} className="mb-2">
                Room {assignment.room_id} - {assignment.exam_date} - Supervisor: {assignment.supervisor_name} (
                {assignment.specialization})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
