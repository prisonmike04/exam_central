"use client";
import React, { useEffect, useState } from "react";

export default function ExamList() {
  const [exams, setExams] = useState<any[]>([]);

  useEffect(() => {
    // TODO: Fetch exams from backend API
    setExams([
      { name: "Midterm", date: "2025-08-15" },
      { name: "Final", date: "2025-12-01" },
    ]);
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Exam List</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Exam Name</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2">{exam.name}</td>
              <td className="p-2">{exam.date}</td>
              <td className="p-2">
                <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
