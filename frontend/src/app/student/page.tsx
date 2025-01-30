'use client';

import { useState } from 'react';
import axios from 'axios';
import SeatingChart from '../../components/SeatingChart';


interface Seat {
  student: {
    name: string;
  };
  room: {
    name: string;
  };
}

export default function StudentDashboard() {
  const [arrangement, setArrangement] = useState<Seat[]>([]);

  const fetchSeatingArrangement = async () => {
    try {
      const response = await axios.post('/api/seating/arrange', {
        students: [],
        rooms: [],
      });
      setArrangement(response.data.arrangement);
    } catch (error) {
      console.error('Error fetching seating arrangement:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>
      <button
        onClick={fetchSeatingArrangement}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Fetch Seating Arrangement
      </button>
      <SeatingChart arrangement={arrangement} />
    </div>
  );
}
