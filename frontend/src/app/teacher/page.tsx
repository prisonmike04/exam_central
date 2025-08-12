'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Seat {
  id: number;
  student?: { name: string; branch: string; semester: number };
  room: { name: string };
}

export default function TeacherDashboard() {
  const [seatingArrangement, setSeatingArrangement] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: number; name: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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

      const response = await axios.get(`http://localhost:5001/api/seating/teacher/${user.id}`, {
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

  useEffect(() => {
    fetchSeatingArrangement();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 p-8 text-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">Teacher Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4 text-black">Enter Marks</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            onClick={() => window.location.href='/teacher/MarksEntry'}
          >
            Go to Marks Entry
          </button>
        </div>
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4 text-black">View Seating Arrangement</h2>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
            onClick={fetchSeatingArrangement}
          >
            Refresh Seating Arrangement
          </button>
          <div className="mt-4 text-black">
            {loading ? (
              <p>Loading seating arrangement...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : seatingArrangement.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
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
          </div>
        </div>
      </div>
    </div>
  );
}
