"use client";
import React, { useEffect, useState } from "react";

export default function TeacherList() {
  const [teachers, setTeachers] = useState<any[]>([]);

  useEffect(() => {
    // TODO: Fetch teachers from backend API
    setTeachers([
      { name: "Alice Brown", email: "alice@example.com", subjects: "Math, Physics" },
      { name: "Bob White", email: "bob@example.com", subjects: "Chemistry" },
    ]);
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Teacher List</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Subjects</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2">{teacher.name}</td>
              <td className="p-2">{teacher.email}</td>
              <td className="p-2">{teacher.subjects}</td>
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
