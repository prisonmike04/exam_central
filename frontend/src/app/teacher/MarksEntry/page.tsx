"use client";
import React, { useState } from 'react';
import axios from 'axios';

const MarksEntry = () => {
  const [studentId, setStudentId] = useState('');
  const [examId, setExamId] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [caMarks, setCaMarks] = useState(0);
  const [eseMarks, setEseMarks] = useState(0);
  const [finalMarks, setFinalMarks] = useState(0);
  const [grade, setGrade] = useState('');
  const [gradePoint, setGradePoint] = useState(0);
  const [message, setMessage] = useState('');

  // Calculate final marks and grade live
  React.useEffect(() => {
    const total = caMarks + eseMarks;
    setFinalMarks(total);
    let g = 'F';
    let gp = 0;
    if (total >= 90) { g = 'O'; gp = 10; }
    else if (total >= 80) { g = 'A+'; gp = 9; }
    else if (total >= 70) { g = 'A'; gp = 8; }
    else if (total >= 60) { g = 'B+'; gp = 7; }
    else if (total >= 50) { g = 'B'; gp = 6; }
    else if (total >= 45) { g = 'C+'; gp = 5; }
    else if (total >= 40) { g = 'C'; gp = 4; }
    setGrade(g);
    setGradePoint(gp);
  }, [caMarks, eseMarks]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/marks', {
        studentId,
        examId,
        subjectCode,
        subjectName,
        caMarks,
        eseMarks,
      });
      setMessage('Marks submitted successfully!');
    } catch (error) {
      setMessage('Error submitting marks.');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white bg-opacity-80 p-8 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Enter Marks for Student</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Student ID" value={studentId} onChange={e => setStudentId(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Exam ID" value={examId} onChange={e => setExamId(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Subject Code" value={subjectCode} onChange={e => setSubjectCode(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Subject Name" value={subjectName} onChange={e => setSubjectName(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="number" placeholder="CA/TW Marks" value={caMarks} onChange={e => setCaMarks(Number(e.target.value))} className="w-full p-2 border rounded" required />
        <input type="number" placeholder="ESE/PR/ORL Marks" value={eseMarks} onChange={e => setEseMarks(Number(e.target.value))} className="w-full p-2 border rounded" required />
        <div className="flex justify-between items-center">
          <span className="font-semibold">Final Marks: {finalMarks}</span>
          <span className="font-semibold">Grade: {grade}</span>
          <span className="font-semibold">Grade Point: {gradePoint}</span>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit Marks</button>
        {message && <div className="mt-2 text-center text-green-600">{message}</div>}
      </form>
    </div>
  );
};

export default MarksEntry;
