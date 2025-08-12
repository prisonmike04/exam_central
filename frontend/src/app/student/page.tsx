'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
interface Seat {
  id: number;
  room: { name: string };
}
export default function StudentDashboard() {
  const [seat, setSeat] = useState<Seat | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: number; name: string } | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const fetchSeat = async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You are not logged in.');
        return;
      }
      const response = await axios.get(
        `http://localhost:5001/api/seating/student/${user.id}/<examId>`, // Replace <examId> as needed
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSeat(response.data);
    } catch (err) {
      console.error('Error fetching seat:', err);
      setError('Failed to fetch seat.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSeat();
  }, [user]);
  return (
		<div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8 text-gray-100">
			<h1 className="text-3xl font-bold text-center mb-8">Student Dashboard</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
				<div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md flex flex-col items-center">
					<h2 className="text-xl font-bold mb-4 text-black">View Report Card</h2>
					<button
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
						onClick={() => window.location.href='/student/GradeCard'}
					>
						Go to Report Card
					</button>
				</div>
				<div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md flex flex-col items-center">
					<h2 className="text-xl font-bold mb-4 text-black">View Seating Arrangement</h2>
					<button
						className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
						onClick={() => window.location.href='/student/seating'}
					>
						Go to Seating Arrangement
					</button>
				</div>
			</div>
		</div>
  );
}