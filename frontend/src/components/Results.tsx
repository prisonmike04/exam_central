'use client';

import React, { useState } from 'react';
import axios from 'axios';

interface SubjectResult {
    subjectName: string;
    finalMarks: number;
    grade: string;
}

interface StudentResult {
    sapId: string;
    data: SubjectResult[];
}

const Results: React.FC = () => {
    const [sapId, setSapId] = useState<string>(''); // State for SAP ID
    const [results, setResults] = useState<StudentResult | null>(null);
    const [error, setError] = useState<string>(''); // Error state

    const fetchResults = async () => {
        if (!sapId.trim()) {
            setError('SAP ID is required!');
            return;
        }

        setError('');
        try {
            const response = await axios.get<StudentResult>(`/api/marks/student/${sapId}`);
            setResults(response.data);
        } catch (err) {
            console.error('Error fetching results:', err);
            setError('Results not found or an error occurred.');
            setResults(null);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg border">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">View Results</h2>

            {/* Input for SAP ID */}
            <div className="mb-6">
                <label htmlFor="sapId" className="block text-gray-700 text-sm font-bold mb-2">
                    SAP ID
                </label>
                <input
                    id="sapId"
                    type="text"
                    placeholder="Enter SAP ID"
                    value={sapId}
                    onChange={(e) => setSapId(e.target.value)}
                    className="border rounded-md px-3 py-2 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
                onClick={fetchResults}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
                Fetch Results
            </button>

            {/* Display Results */}
            {results && (
                <div className="mt-6">
                    <h3 className="text-lg font-bold mb-4">Results for SAP ID: {results.sapId}</h3>
                    {results.data.map((subject: SubjectResult) => (
                        <div key={subject.subjectName} className="mb-2">
                            <p>Subject: {subject.subjectName}</p>
                            <p>Marks: {subject.finalMarks}</p>
                            <p>Grade: {subject.grade}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Results;
