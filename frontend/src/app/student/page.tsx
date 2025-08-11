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
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-black">
        Welcome, {user?.name || 'Student'}
      </h1>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Your Seat Assignment</h2>
        {loading ? (
          <p>Loading your seat...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : seat ? (
          <div>
            <p><strong>Room:</strong> {seat.room.name}</p>
          </div>
        ) : (
          <p>No seat assignment found.</p>
        )}
      </div>
    </div>
  );
}