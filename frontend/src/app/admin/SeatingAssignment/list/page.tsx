"use client";
import React, { useEffect, useState } from "react";

export default function SeatingList() {
  const [arrangements, setArrangements] = useState<any[]>([]);

  useEffect(() => {
    // TODO: Fetch seating arrangements from backend API
    setArrangements([
      { room: "A101", students: ["John Doe", "Jane Smith"] },
      { room: "B202", students: ["Alice Brown"] },
    ]);
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Seating Arrangements</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Room</th>
            <th className="p-2">Students</th>
          </tr>
        </thead>
        <tbody>
          {arrangements.map((arr, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2">{arr.room}</td>
              <td className="p-2">{arr.students.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
