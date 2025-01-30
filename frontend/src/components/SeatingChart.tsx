'use client';

import React from 'react';

interface Seat {
  id: number;
  seatNumber?: number;
  student?: {
    id: number;
    name: string;
    branch: string;
    semester: number;
  };
}

interface SeatingChartProps {
  seatingArrangement: Seat[];
  teacherName: string;
  onSeatChange?: (seatId: number, newRoomId: number, newSeatNumber: number) => void;
}

export default function SeatingChart({ seatingArrangement, teacherName, onSeatChange }: SeatingChartProps) {
  const handleSeatClick = (seatId: number) => {
    if (!onSeatChange) return;

    const newRoomId = prompt('Enter new Room ID:');
    const newSeatNumber = prompt('Enter new Seat Number:');

    if (newRoomId && newSeatNumber) {
      onSeatChange(seatId, parseInt(newRoomId, 10), parseInt(newSeatNumber, 10));
    }
  };

  return (
    <div className="p-6 border rounded shadow bg-white">
      <h2 className="text-xl font-bold mb-4">Teacher: {teacherName}</h2>
      <div className="grid grid-cols-5 gap-4">
        {seatingArrangement.map((seat) => (
          <div
            key={seat.id}
            className="p-4 border rounded bg-gray-100 hover:bg-gray-200 cursor-pointer"
            onClick={() => handleSeatClick(seat.id)}
          >
            <p><strong>Seat Number:</strong> {seat.seatNumber || 'N/A'}</p>
            {seat.student ? (
              <div>
                <p><strong>Student Name:</strong> {seat.student.name}</p>
                <p><strong>Student ID:</strong> {seat.student.id}</p>
              </div>
            ) : (
              <p className="text-gray-500">No student assigned</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
