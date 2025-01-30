'use client';

import React, { useState } from 'react';
import axios from 'axios';

type Student = {
  id: number;
  name: string;
  branch: string;
  semester: number;
  email: string;
};

const branches = [
  'Computer Engineering',
  'Information Technology',
  'Data Science',
  'AIDS',
  'AIML',
  'EXTC',
];

const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

export default function StudentManagement() {
  const [students, setStudents] = useState<Student[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showViewTable, setShowViewTable] = useState(false);
  const [studentData, setStudentData] = useState({
    name: '',
    branch: '',
    semester: 1,
    email: '',
  });
  const [deleteId, setDeleteId] = useState('');
  const [studentDetails, setStudentDetails] = useState<Student | null>(null);
  const [filters, setFilters] = useState({
    branch: '',
    semester: 0,
  });

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students', {
        params: { ...filters },
      });
      setStudents(response.data.students);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // Add a student
  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/students', studentData);
      alert('Student added successfully');
      setStudentData({ name: '', branch: '', semester: 1, email: '' });
      setShowAddForm(false);
      fetchStudents();
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  // Fetch a student by ID
  const handleFetchStudentDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/students/${deleteId}`);
      setStudentDetails(response.data.student);
    } catch (error) {
      console.error('Error fetching student details:', error);
      alert('Student not found');
      setStudentDetails(null);
    }
  };

  // Delete a student
  const handleDeleteStudent = async () => {
    try {
      if (!studentDetails) {
        alert('No student to delete');
        return;
      }
      await axios.delete(`http://localhost:5000/api/students/${deleteId}`);
      alert('Student deleted successfully');
      setDeleteId('');
      setStudentDetails(null);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Student Management</h1>

      {/* Buttons to toggle forms and view table */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => {
            setShowAddForm(true);
            setShowDeleteForm(false);
            setShowViewTable(false);
          }}
        >
          Add Student
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => {
            setShowDeleteForm(true);
            setShowAddForm(false);
            setShowViewTable(false);
          }}
        >
          Delete Student
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => {
            setShowViewTable(true);
            setShowAddForm(false);
            setShowDeleteForm(false);
            fetchStudents();
          }}
        >
          View Students
        </button>
      </div>

      {/* Add Student Form */}
      {showAddForm && (
        <div className="bg-white bg-opacity-60 backdrop-blur-md p-8 rounded-lg shadow-md max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">Add Student</h2>
          <form onSubmit={handleAddStudent} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={studentData.name}
              onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <select
              value={studentData.branch}
              onChange={(e) => setStudentData({ ...studentData, branch: e.target.value })}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Branch</option>
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
            <select
              value={studentData.semester}
              onChange={(e) =>
                setStudentData({ ...studentData, semester: parseInt(e.target.value) })
              }
              className="w-full p-2 border rounded"
              required
            >
              {semesters.map((sem) => (
                <option key={sem} value={sem}>
                  Semester {sem}
                </option>
              ))}
            </select>
            <input
              type="email"
              placeholder="Email"
              value={studentData.email}
              onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Add Student
            </button>
          </form>
        </div>
      )}

      {/* Delete Student Form */}
      {showDeleteForm && (
        <div className="bg-white bg-opacity-60 backdrop-blur-md p-8 rounded-lg shadow-md max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">Delete Student</h2>
          <input
            type="text"
            placeholder="Enter Student ID"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={handleFetchStudentDetails}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
          >
            Fetch Student Details
          </button>
          {studentDetails && (
            <div className="bg-gray-100 p-4 rounded-lg text-gray-800">
              <p>
                <strong>Name:</strong> {studentDetails.name}
              </p>
              <p>
                <strong>Branch:</strong> {studentDetails.branch}
              </p>
              <p>
                <strong>Semester:</strong> {studentDetails.semester}
              </p>
              <p>
                <strong>Email:</strong> {studentDetails.email}
              </p>
              <button
                onClick={handleDeleteStudent}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
              >
                Confirm Delete
              </button>
            </div>
          )}
        </div>
      )}

      {/* View Students Table */}
      {showViewTable && (
        <div className="bg-white bg-opacity-60 backdrop-blur-md p-8 rounded-lg shadow-md max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-4">Students</h2>
          <div className="mb-4 flex space-x-4">
            <select
              value={filters.branch}
              onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
              className="p-2 border rounded"
            >
              <option value="">All Branches</option>
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
            <select
              value={filters.semester}
              onChange={(e) => setFilters({ ...filters, semester: parseInt(e.target.value) })}
              className="p-2 border rounded"
            >
              <option value={0}>All Semesters</option>
              {semesters.map((sem) => (
                <option key={sem} value={sem}>
                  Semester {sem}
                </option>
              ))}
            </select>
            <button
              onClick={fetchStudents}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Apply Filters
            </button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2">ID</th>
                <th className="border-b p-2">Name</th>
                <th className="border-b p-2">Branch</th>
                <th className="border-b p-2">Semester</th>
                <th className="border-b p-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="border-b p-2">{student.id}</td>
                  <td className="border-b p-2">{student.name}</td>
                  <td className="border-b p-2">{student.branch}</td>
                  <td className="border-b p-2">{student.semester}</td>
                  <td className="border-b p-2">{student.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
