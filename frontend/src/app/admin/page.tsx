'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

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

export default function AdminView() {
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [roomId, setRoomId] = useState<string>('');
  const [examDate, setExamDate] = useState<string>('');
  const [selectedSupervisor, setSelectedSupervisor] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSupervisors();
    fetchAssignments();
  }, []);

  const fetchSupervisors = async () => {
    console.log('API URL:', process.env.NEXT_PUBLIC_API_URL); // Debug the URL
    try {
      const response = await axios.get<Supervisor[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/supervisors`);
      setSupervisors(response.data);
    } catch (error) {
      console.error('Error fetching supervisors:', error);
      setError('Failed to fetch supervisors.');
    }
  };

  const fetchAssignments = async () => {
    console.log('API URL:', process.env.NEXT_PUBLIC_API_URL); // Debug the URL
    try {
      const response = await axios.get<Assignment[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/supervisors/assignments`);
      setAssignments(response.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
      setError('Failed to fetch assignments.');
    }
  };

  const getSupervisorDetails = (id: string): Supervisor | undefined => {
    return supervisors.find((supervisor) => supervisor.id.toString() === id);
  };

  const handleAssign = async () => {
    try {
      // Fetch supervisor details from the list of supervisors
      const supervisorDetails = supervisors.find(
        (sup) => sup.id === parseInt(selectedSupervisor)
      );
  
      if (!supervisorDetails) {
        alert('Invalid supervisor selection.');
        return;
      }
  
      // Assign supervisor through the backend API
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/supervisors/assign`, {
        room_id: parseInt(roomId),
        exam_date: examDate,
        supervisor_id: parseInt(selectedSupervisor),
      });
  
      // Send email notification directly from the frontend
      await axios.post('https://api.emailjs.com/api/v1.0/email/send', {
        service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        user_id: process.env.NEXT_PUBLIC_EMAILJS_USER_ID,
        template_params: {
          teacherName: supervisorDetails.name,
          classroom: roomId,
          examDate: examDate,
          facultyEmail: supervisorDetails.email,
        },
      });

      alert('Supervisor assigned and notified successfully.');
    } catch (error) {
      console.error('Error assigning supervisor or sending email:', error);
      alert('Failed to assign supervisor or send email notification.');
    }
  };


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

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
  );
}
