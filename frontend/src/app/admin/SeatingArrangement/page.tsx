'use client';

import React, { useState, useCallback } from 'react';
import axios from 'axios';
import SeatingChart from '../../../components/SeatingChart';

export default function SeatingArrangement() {
  const [seatingArrangement, setSeatingArrangement] = useState([]);
  const [roomId, setRoomId] = useState('');
  const [teacherName, setTeacherName] = useState('N/A');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSeatingArrangement = async () => {
    try {
      setError(null);
      setLoading(true);

      const token = localStorage.getItem('token');
      if (!token) {
        setError('You are not logged in.');
        return;
      }

      await axios.post(
        'http://localhost:5000/api/seating/generate',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert('Seating arrangement generated successfully.');
    } catch (err) {
      console.error('Error generating seating arrangement:', err);
      setError('Failed to generate seating arrangement.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSeatingArrangement = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);

      const token = localStorage.getItem('token');
      if (!token) {
        setError('You are not logged in.');
        return;
      }

      console.log('Fetching seating arrangement for room:', roomId);
      const response = await axios.get(
        `http://localhost:5000/api/seating/room/${roomId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log('API Response:', response.data);

      if (response.data.seating) {
        setSeatingArrangement(response.data.seating);
        setTeacherName(response.data.teacherName || 'N/A');
      } else {
        setError('No seating data received');
      }
    } catch (err) {
      console.error('Error fetching seating arrangement:', err);
      setError('Failed to fetch seating arrangement.');
    } finally {
      setLoading(false);
    }
  }, [roomId]);

  const handleSeatUpdate = async (seatId: number, newRoomId: number, newSeatNumber: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You are not logged in.');
        return;
      }

      await axios.put(
        `http://localhost:5000/api/seating/${seatId}`,
        { roomId: newRoomId, seatNumber: newSeatNumber },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      await fetchSeatingArrangement();
    } catch (err) {
      console.error('Error updating seat:', err);
      setError('Failed to update seat.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Seating Arrangement</h1>
      <div className="space-y-4">
        <button
          onClick={generateSeatingArrangement}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          disabled={loading}
        >
          Generate Seating
        </button>
        
        <div className="flex space-x-4">
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter Room ID"
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={fetchSeatingArrangement}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            disabled={loading || !roomId}
          >
            {loading ? 'Loading...' : 'Fetch Seating'}
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        <SeatingChart
          seatingArrangement={seatingArrangement}
          teacherName={teacherName}
          onSeatChange={handleSeatUpdate}
        />
      </div>
    </div>
  );
}