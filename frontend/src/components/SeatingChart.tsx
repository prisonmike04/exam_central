'use client';

import React from 'react';

// Define the Seat interface
interface Seat {
  id: number;
  seatNumber?: number;
  student?: {
    id: number;
    name: string;
    branch?: string;
    semester?: number;
  };
  room?: {
    name: string;
  };
}

// Define the SeatingChartProps interface
interface SeatingChartProps {
  seatingArrangement: Seat[];
  teacherName: string;
  onSeatChange?: (seatId: number, newRoomId: number, newSeatNumber: number) => void;
}

// Component definition
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
                {seat.student.branch && (
                  <p><strong>Branch:</strong> {seat.student.branch}</p>
                )}
                {seat.student.semester && (
                  <p><strong>Semester:</strong> {seat.student.semester}</p>
                )}
              </div>
            ) : (
              <p className="text-gray-500">No student assigned</p>
            )}
            {seat.room && (
              <p><strong>Room:</strong> {seat.room.name}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
