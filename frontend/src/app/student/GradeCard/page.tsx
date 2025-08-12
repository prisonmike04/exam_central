import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Marks = {
  subjectCode: string;
  subjectName: string;
  caMarks: number;
  eseMarks: number;
  finalMarks: number;
  grade: string;
  gradePoint: number;
};

const GradeCard = () => {
  const [marks, setMarks] = useState<Marks[]>([]);
  const [studentId, setStudentId] = useState('');
  const [examId, setExamId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (studentId && examId) {
      setLoading(true);
      axios.get('http://localhost:5001/api/marks', {
        params: { studentId, examId },
      })
        .then(res => {
          setMarks(res.data.marks);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [studentId, examId]);

  const totalCredits = marks.reduce((sum, m) => sum + (m.gradePoint || 0), 0);
  const sgpa = marks.length ? (totalCredits / marks.length).toFixed(2) : '0.00';

  return (
    <div className="max-w-3xl mx-auto bg-white bg-opacity-80 p-8 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Grade Card</h2>
      <div className="mb-4 flex space-x-4">
        <input type="text" placeholder="Student ID" value={studentId} onChange={e => setStudentId(e.target.value)} className="p-2 border rounded" />
        <input type="text" placeholder="Exam ID" value={examId} onChange={e => setExamId(e.target.value)} className="p-2 border rounded" />
      </div>
      {loading ? <div>Loading...</div> : (
        <table className="w-full text-left border">
          <thead>
            <tr>
              <th>Subject Code</th>
              <th>Subject Name</th>
              <th>CA/TW</th>
              <th>ESE/PR/ORL</th>
              <th>Final Marks</th>
              <th>Grade</th>
              <th>Grade Point</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((m, idx) => (
              <tr key={idx}>
                <td>{m.subjectCode}</td>
                <td>{m.subjectName}</td>
                <td>{m.caMarks}</td>
                <td>{m.eseMarks}</td>
                <td>{m.finalMarks}</td>
                <td>{m.grade}</td>
                <td>{m.gradePoint}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="mt-4 font-semibold">SGPA: {sgpa}</div>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => window.print()}>
        Download Grade Card (PDF)
      </button>
    </div>
  );
};

export default GradeCard;
