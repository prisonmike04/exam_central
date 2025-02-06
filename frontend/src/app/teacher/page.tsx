'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import AddSupervisorForm from '../../components/AddSupervisorForm';
import MarksCalculator from './components/MarksCalculator';

// Interfaces for various entities
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

interface Seat {
  id: number;
  student?: { name: string; branch: string; semester: number };
  room: { name: string };
}

export default function TeacherDashboard() {
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [seatingArrangement, setSeatingArrangement] = useState<Seat[]>([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState<number | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [examDate, setExamDate] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{ id: number; name: string } | null>(null);

  // Load user from local storage and fetch data on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchSupervisors();
    fetchAssignments();
    fetchSeatingArrangement();
  }, []);

  // Fetch supervisors
  const fetchSupervisors = async () => {
    try {
      const response = await axios.get<Supervisor[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/supervisors`);
      setSupervisors(response.data);
    } catch (err) {
      console.error('Error fetching supervisors:', err);
      setError('Failed to fetch supervisors.');
    }
  };

  // Fetch room assignments
  const fetchAssignments = async () => {
    try {
      const response = await axios.get<Assignment[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/supervisors/assignments`);
      setAssignments(response.data);
    } catch (err) {
      console.error('Error fetching assignments:', err);
      setError('Failed to fetch assignments.');
    }
  };

  // Fetch seating arrangement for the logged-in teacher
  const fetchSeatingArrangement = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        alert('You are not logged in.');
        return;
      }

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/seating/teacher/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSeatingArrangement(response.data.arrangement || []);
    } catch (err) {
      console.error('Error fetching seating arrangement:', err);
      setError('Failed to fetch seating arrangement.');
    } finally {
      setLoading(false);
    }
  };

  // Assign supervisor to a room and date
  const assignSupervisor = async () => {
    if (!selectedRoom || !examDate || !selectedSupervisor) {
      alert('Please select a room, date, and supervisor.');
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/supervisors/assign`, {
        room_id: selectedRoom,
        exam_date: examDate,
        supervisor_id: selectedSupervisor,
      });

      alert('Supervisor assigned successfully.');
      fetchAssignments();
    } catch (error) {
      console.error('Error assigning supervisor:', error);
      alert('Failed to assign supervisor.');
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-black">
        Welcome, {user?.name || 'Teacher'}
      </h1>

      {/* Marks Calculator Section */}
      <section className="mb-10 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Student Marks Calculator</h2>
        <MarksCalculator />
      </section>

      {/* Supervisor Management Section */}
      <section className="mb-10 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Supervisor Management</h2>
        <AddSupervisorForm />
      </section>

      {/* Available Supervisors Section */}
      <section className="mb-10 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Available Supervisors</h2>
        {error && <p className="text-red-500">{error}</p>}
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
      </section>

      {/* Assign Supervisor Section */}
      <section className="mb-10 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Assign Supervisor</h2>

        <label className="block mb-2">
          <span className="text-gray-700">Select Supervisor:</span>
          <select
            value={selectedSupervisor ?? ''}
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
            value={selectedRoom || ''}
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
      </section>

      {/* Room Assignments Section */}
      <section className="mt-10 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Room Assignments</h2>
        {assignments.length > 0 ? (
          <ul>
            {assignments.map((assignment) => (
              <li key={`${assignment.room_id}-${assignment.exam_date}`} className="mb-2">
                Room {assignment.room_id} - {assignment.exam_date} - Supervisor: {assignment.supervisor_name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No assignments available.</p>
        )}
      </section>

      {/* Seating Arrangement Section */}
      <section className="mt-10 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Seating Arrangement</h2>
        <button
          onClick={fetchSeatingArrangement}
          className="bg-green-500 text-white px-4 py-2 rounded-md mb-4"
        >
          Refresh Seating Arrangement
        </button>

        {loading ? (
          <p>Loading seating arrangement...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : seatingArrangement.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {seatingArrangement.map((seat) => (
              <div
                key={seat.id}
                className="p-4 border rounded shadow bg-gray-50 hover:bg-gray-100"
              >
                <p><strong>Room:</strong> {seat.room.name}</p>
                {seat.student ? (
                  <div className="mt-2 text-sm text-gray-700">
                    <p><strong>Name:</strong> {seat.student.name}</p>
                    <p><strong>Branch:</strong> {seat.student.branch}</p>
                    <p><strong>Semester:</strong> {seat.student.semester}</p>
                  </div>
                ) : (
                  <p>No student assigned</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No seating arrangement found for your supervised classrooms.</p>
        )}
      </section>
    </div>
  );
}
