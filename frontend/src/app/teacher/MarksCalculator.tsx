'use client';

import React, { useState } from 'react';

interface Subject {
    name: string;
    code: string;
    caMarks: number;
    eseMarks: number;
    credits: number;
}

const MarksCalculator: React.FC = () => {
    const [sapId, setSapId] = useState<string>(''); // State for SAP ID
    const [subjects, setSubjects] = useState<Subject[]>([]); // Explicitly type as Subject[]
    const [gpa, setGpa] = useState<number | null>(null);
    const [error, setError] = useState<string>(''); // Error state for validation

    const handleInputChange = <K extends keyof Subject>(
        index: number,
        field: K,
        value: Subject[K]
    ) => {
        const updatedSubjects = [...subjects];
        updatedSubjects[index][field] = value; // Properly type field and value
        setSubjects(updatedSubjects);
    };

    const addSubject = () => {
        setSubjects([
            ...subjects,
            { name: '', code: '', caMarks: 0, eseMarks: 0, credits: 0 },
        ]);
    };

    const calculateGpa = () => {
        if (!sapId.trim()) {
            setError('SAP ID is required!');
            return;
        }
        if (subjects.length === 0) {
            setError('At least one subject must be added!');
            return;
        }

        setError(''); // Clear previous errors
        let totalCredits = 0;
        let totalGradePoints = 0;

        subjects.forEach((subject) => {
            const finalMarks = subject.caMarks + subject.eseMarks;
            const gradePoint = Math.min(finalMarks / 10, 10); // Ensure gradePoint <= 10
            totalGradePoints += gradePoint * subject.credits;
            totalCredits += subject.credits;
        });

        setGpa(totalCredits ? totalGradePoints / totalCredits : 0);
    };

    return (
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg border">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Marks Calculator
            </h2>

            {/* SAP ID Input */}
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    SAP ID
                </label>
                <input
                    type="text"
                    placeholder="Enter SAP ID"
                    value={sapId}
                    onChange={(e) => setSapId(e.target.value)}
                    className="border rounded-md px-3 py-2 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {/* Subjects Input Section */}
            {subjects.map((subject, index) => (
                <div
                    key={index}
                    className="grid grid-cols-5 gap-4 mb-4 items-center"
                >
                    <input
                        type="text"
                        placeholder="Course Name"
                        value={subject.name}
                        onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                        className="border rounded-md px-3 py-2 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Course Code"
                        value={subject.code}
                        onChange={(e) => handleInputChange(index, 'code', e.target.value)}
                        className="border rounded-md px-3 py-2 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="number"
                        placeholder="CA Marks"
                        value={subject.caMarks}
                        onChange={(e) => handleInputChange(index, 'caMarks', Number(e.target.value))}
                        className="border rounded-md px-3 py-2 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="number"
                        placeholder="ESE Marks"
                        value={subject.eseMarks}
                        onChange={(e) => handleInputChange(index, 'eseMarks', Number(e.target.value))}
                        className="border rounded-md px-3 py-2 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                        type="number"
                        placeholder="Credits"
                        value={subject.credits}
                        onChange={(e) => handleInputChange(index, 'credits', Number(e.target.value))}
                        className="border rounded-md px-3 py-2 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
            ))}

            <div className="flex justify-between items-center mt-6">
                <button
                    onClick={addSubject}
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Add Subject
                </button>
                <button
                    onClick={calculateGpa}
                    className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                >
                    Calculate GPA
                </button>
            </div>

            {/* GPA Display */}
            {gpa !== null && (
                <div className="mt-6 text-lg font-bold text-gray-700">
                    GPA for SAP ID <span className="text-blue-500">{sapId}</span>: <span className="text-green-500">{gpa.toFixed(2)}</span>
                </div>
            )}
        </div>
    );
};

export default MarksCalculator;
