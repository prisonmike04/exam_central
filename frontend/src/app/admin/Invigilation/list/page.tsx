"use client";
import React, { useEffect, useState } from "react";

export default function InvigilationList() {
  const [invigilations, setInvigilations] = useState<any[]>([]);

  useEffect(() => {
    // TODO: Fetch invigilation assignments from backend API
    setInvigilations([
      { room: "A101", teacher: "Alice Brown" },
      { room: "B202", teacher: "Bob White" },
    ]);
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Invigilation Assignments</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Room</th>
            <th className="p-2">Teacher</th>
          </tr>
        </thead>
        <tbody>
          {invigilations.map((inv, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2">{inv.room}</td>
              <td className="p-2">{inv.teacher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
