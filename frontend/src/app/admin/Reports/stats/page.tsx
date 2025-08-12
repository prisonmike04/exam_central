"use client";
import React, { useEffect, useState } from "react";

export default function ViewStats() {
  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    // TODO: Fetch stats from backend API
    setStats({
      totalStudents: 120,
      totalTeachers: 15,
      totalExams: 5,
    });
  }, []);

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Statistics</h2>
      <ul className="space-y-2">
        <li>Total Students: {stats.totalStudents}</li>
        <li>Total Teachers: {stats.totalTeachers}</li>
        <li>Total Exams: {stats.totalExams}</li>
      </ul>
    </div>
  );
}
