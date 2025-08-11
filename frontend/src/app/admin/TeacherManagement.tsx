'use client';

import React, { useState } from 'react';
import axios from 'axios';

type Teacher = {
  id: number;
  name: string;
  branch: string;
  email: string;
  subjects: string[];
};

const branches = [
  'Computer Engineering',
  'Information Technology',
  'Data Science',
  'AIDS',
  'AIML',
  'EXTC',
];

const subjects = [
  'Image Processing and Computer Vision',
  'Time Series Analysis',
  'Machine Learning 2',
  'Natural Language Processing',
  'Computational Neuro Science',
];

export default function TeacherManagement() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showViewTable, setShowViewTable] = useState(false);
  const [teacherData, setTeacherData] = useState({
    name: '',
    branch: '',
    email: '',
    subjects: [] as string[],
  });
  const [deleteId, setDeleteId] = useState('');
  const [teacherDetails, setTeacherDetails] = useState<Teacher | null>(null);

  // Fetch all teachers when "View Teachers" is clicked
  const fetchTeachers = async () => {
    try {
  const response = await axios.get('http://localhost:5001/api/teachers');
      setTeachers(response.data.teachers);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  // Add a teacher
  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
  await axios.post('http://localhost:5001/api/teachers', teacherData);
      alert('Teacher added successfully');
      setTeacherData({ name: '', branch: '', email: '', subjects: [] });
      setShowAddForm(false);
      fetchTeachers();
    } catch (error) {
      console.error('Error adding teacher:', error);
    }
  };

  // Fetch a teacher by ID before deleting
  const handleFetchTeacherDetails = async () => {
    try {
  const response = await axios.get(`http://localhost:5001/api/teachers/${deleteId}`);
      setTeacherDetails(response.data.teacher);
    } catch (error) {
      console.error('Error fetching teacher details:', error);
      alert('Teacher not found');
      setTeacherDetails(null);
    }
  };

  // Delete a teacher
  const handleDeleteTeacher = async () => {
    try {
      if (!teacherDetails) {
        alert('No teacher to delete');
        return;
      }
  await axios.delete(`http://localhost:5001/api/teachers/${deleteId}`);
      alert('Teacher deleted successfully');
      setDeleteId('');
      setTeacherDetails(null);
      fetchTeachers();
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Teacher Management</h1>

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
          Add Teacher
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => {
            setShowDeleteForm(true);
            setShowAddForm(false);
            setShowViewTable(false);
          }}
        >
          Delete Teacher
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => {
            setShowViewTable(true);
            setShowAddForm(false);
            setShowDeleteForm(false);
            fetchTeachers();
          }}
        >
          View Teachers
        </button>
      </div>

      {/* Add Teacher Form */}
      {showAddForm && (
        <div className="bg-white bg-opacity-60 backdrop-blur-md p-8 rounded-lg shadow-md max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">Add Teacher</h2>
          <form onSubmit={handleAddTeacher} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={teacherData.name}
              onChange={(e) => setTeacherData({ ...teacherData, name: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <select
              value={teacherData.branch}
              onChange={(e) => setTeacherData({ ...teacherData, branch: e.target.value })}
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
            <input
              type="email"
              placeholder="Email"
              value={teacherData.email}
              onChange={(e) => setTeacherData({ ...teacherData, email: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <h3 className="text-lg font-semibold">Subjects:</h3>
            <div className="flex flex-col gap-2">
              {subjects.map((subject, index) => (
                <div className="flex items-center gap-2" key={index} style={{ width: 'fit-content' }}>
                  <input
                    type="checkbox"
                    id={`subject-${index}`}
                    value={subject}
                    onChange={(e) => {
                      const value = e.target.value;
                      setTeacherData((prev) => {
                        const updatedSubjects = prev.subjects.includes(value)
                          ? prev.subjects.filter((subj) => subj !== value)
                          : [...prev.subjects, value];
                        return { ...prev, subjects: updatedSubjects };
                      });
                    }}
                  />
                  <label htmlFor={`subject-${index}`} className="ml-2 whitespace-nowrap">{subject}</label>
                </div>
              ))}
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Add Teacher
            </button>
          </form>
        </div>
      )}

      {/* Delete Teacher Form */}
      {showDeleteForm && (
        <div className="bg-white bg-opacity-60 backdrop-blur-md p-8 rounded-lg shadow-md max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">Delete Teacher</h2>
          <input
            type="text"
            placeholder="Enter Teacher ID"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={handleFetchTeacherDetails}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
          >
            Fetch Teacher Details
          </button>
          {teacherDetails && (
            <div className="bg-gray-100 p-4 rounded-lg text-gray-800">
              <p>
                <strong>Name:</strong> {teacherDetails.name}
              </p>
              <p>
                <strong>Branch:</strong> {teacherDetails.branch}
              </p>
              <p>
                <strong>Email:</strong> {teacherDetails.email}
              </p>
              <p>
                <strong>Subjects:</strong> {teacherDetails.subjects.join(', ')}
              </p>
              <button
                onClick={handleDeleteTeacher}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
              >
                Confirm Delete
              </button>
            </div>
          )}
        </div>
      )}

      {/* View Teachers Table */}
      {showViewTable && (
        <div className="bg-white bg-opacity-60 backdrop-blur-md p-8 rounded-lg shadow-md max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-4">Teachers</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2">ID</th>
                <th className="border-b p-2">Name</th>
                <th className="border-b p-2">Branch</th>
                <th className="border-b p-2">Email</th>
                <th className="border-b p-2">Subjects</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td className="border-b p-2">{teacher.id}</td>
                  <td className="border-b p-2">{teacher.name}</td>
                  <td className="border-b p-2">{teacher.branch}</td>
                  <td className="border-b p-2">{teacher.email}</td>
                  <td className="border-b p-2">
  {teacher.subjects ? teacher.subjects.join(', ') : 'No Subjects Assigned'}
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
