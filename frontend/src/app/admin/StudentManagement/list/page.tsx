"use client";
import React, { useEffect, useState } from "react";

export default function StudentList() {
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    // TODO: Fetch students from backend API
    setStudents([
      { name: "John Doe", roll: "101", email: "john@example.com" },
      { name: "Jane Smith", roll: "102", email: "jane@example.com" },
    ]);
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Student List</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Roll Number</th>
            <th className="p-2">Email</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2">{student.name}</td>
              <td className="p-2">{student.roll}</td>
              <td className="p-2">{student.email}</td>
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
