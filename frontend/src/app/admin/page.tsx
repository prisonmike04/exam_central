'use client';

import { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import StudentManagement from './StudentManagement';
import TeacherManagement from './TeacherManagement';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-gray-100">
      <AdminNavbar />
      <div className="flex flex-col items-center pt-20">
        <h1 className="text-4xl font-bold mb-8">Hello, Admin</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className="bg-white bg-opacity-30 backdrop-blur-lg p-6 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setActiveSection('students')}
          >
            <h2 className="text-2xl font-bold mb-4">Student Management</h2>
            <p>Manage students: Add, Delete, and View students.</p>
          </div>
          <div
            className="bg-white bg-opacity-30 backdrop-blur-lg p-6 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setActiveSection('teachers')}
          >
            <h2 className="text-2xl font-bold mb-4">Teacher Management</h2>
            <p>Manage teachers: Add, Delete, and View teachers.</p>
          </div>
          <div className="bg-white bg-opacity-30 backdrop-blur-lg p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Performance Evaluation</h2>
            <p>Analyze and evaluate student performance.</p>
          </div>
        </div>
      </div>

      {activeSection === 'students' && <StudentManagement />}
      {activeSection === 'teachers' && <TeacherManagement />}
    </div>
  );
}
