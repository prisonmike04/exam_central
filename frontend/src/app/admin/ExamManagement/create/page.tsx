"use client";
import React, { useState } from "react";

export default function CreateExam() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to backend API
    setMessage("Exam created successfully!");
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create Exam</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Exam Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 border rounded" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create Exam</button>
      </form>
      {message && <div className="mt-4 text-green-600">{message}</div>}
    </div>
  );
}
