import React, { useState } from 'react';
import axios from 'axios';

const MarksInputForm: React.FC = () => {
    const [sapId, setSapId] = useState('');
    const [subjects, setSubjects] = useState<any[]>([]);
    const [gpa, setGpa] = useState<number | null>(null);

    const addSubject = () => {
        setSubjects([...subjects, { name: '', code: '', caMarks: 0, eseMarks: 0, credits: 0 }]);
    };

    const handleSubmit = async () => {
        if (!sapId) {
            alert('SAP ID is required.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/api/save-transcript', {
                sapId,
                name: 'Student Name', // Replace or fetch dynamically
                semester: 5, // Replace with dynamic value if needed
                subjects,
            });
            if (response.data) {
                setGpa(response.data.transcript.gpa);
                alert('Transcript saved successfully!');
            }
        } catch (error) {
            console.error('Error saving transcript:', error);
            alert('Failed to save transcript.');
        }
    };

    return (
        <div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">SAP ID</label>
                <input
                    type="text"
                    value={sapId}
                    onChange={(e) => setSapId(e.target.value)}
                    placeholder="Enter SAP ID"
                    className="w-full p-2 border rounded"
                />
            </div>
            {subjects.map((subject, index) => (
                <div key={index} className="grid grid-cols-5 gap-2 mb-2">
                    <input
                        type="text"
                        placeholder="Course Name"
                        className="p-2 border rounded"
                        value={subject.name}
                        onChange={(e) => {
                            const updatedSubjects = [...subjects];
                            updatedSubjects[index].name = e.target.value;
                            setSubjects(updatedSubjects);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Course Code"
                        className="p-2 border rounded"
                        value={subject.code}
                        onChange={(e) => {
                            const updatedSubjects = [...subjects];
                            updatedSubjects[index].code = e.target.value;
                            setSubjects(updatedSubjects);
                        }}
                    />
                    <input
                        type="number"
                        placeholder="CA Marks"
                        className="p-2 border rounded"
                        value={subject.caMarks}
                        onChange={(e) => {
                            const updatedSubjects = [...subjects];
                            updatedSubjects[index].caMarks = Number(e.target.value);
                            setSubjects(updatedSubjects);
                        }}
                    />
                    <input
                        type="number"
                        placeholder="ESE Marks"
                        className="p-2 border rounded"
                        value={subject.eseMarks}
                        onChange={(e) => {
                            const updatedSubjects = [...subjects];
                            updatedSubjects[index].eseMarks = Number(e.target.value);
                            setSubjects(updatedSubjects);
                        }}
                    />
                    <input
                        type="number"
                        placeholder="Credits"
                        className="p-2 border rounded"
                        value={subject.credits}
                        onChange={(e) => {
                            const updatedSubjects = [...subjects];
                            updatedSubjects[index].credits = Number(e.target.value);
                            setSubjects(updatedSubjects);
                        }}
                    />
                </div>
            ))}
            <button
                onClick={addSubject}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Add Subject
            </button>
            <button
                onClick={handleSubmit}
                className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Save Transcript
            </button>
            {gpa !== null && <p className="mt-4 font-bold">Calculated GPA: {gpa.toFixed(2)}</p>}
        </div>
    );
};

export default MarksInputForm;
