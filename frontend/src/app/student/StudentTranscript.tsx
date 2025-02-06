'use client';

import React, { useState } from 'react';
import axios from 'axios';

const StudentTranscript: React.FC = () => {
    const [sapId, setSapId] = useState<string>(''); // State for SAP ID
    const [transcript, setTranscript] = useState<any | null>(null);
    const [error, setError] = useState<string>(''); // Error state for invalid input or server issues

    const fetchTranscript = async () => {
        if (!sapId.trim()) {
            setError('SAP ID is required!');
            return;
        }

        setError('');
        try {
            const response = await axios.get(`http://localhost:5001/api/transcript/${sapId}`);
            setTranscript(response.data.transcript);
        } catch (err) {
            setError('Transcript not found or an error occurred.');
            setTranscript(null);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg border">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                View Transcript
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

            <button
                onClick={fetchTranscript}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
                Fetch Transcript
            </button>

            {/* Transcript Display */}
            {transcript && (
                <div className="mt-6">
                    <h3 className="text-lg font-bold mb-4">Transcript for {transcript.name} (SAP ID: {transcript.sapId})</h3>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Course Name</th>
                                <th className="border border-gray-300 px-4 py-2">Course Code</th>
                                <th className="border border-gray-300 px-4 py-2">CA Marks</th>
                                <th className="border border-gray-300 px-4 py-2">ESE Marks</th>
                                <th className="border border-gray-300 px-4 py-2">Credits</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transcript.Subjects.map((subject: any, index: number) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-2">{subject.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{subject.code}</td>
                                    <td className="border border-gray-300 px-4 py-2">{subject.caMarks}</td>
                                    <td className="border border-gray-300 px-4 py-2">{subject.eseMarks}</td>
                                    <td className="border border-gray-300 px-4 py-2">{subject.credits}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="mt-4 text-lg font-bold text-gray-700">
                        GPA: <span className="text-green-500">{transcript.gpa.toFixed(2)}</span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default StudentTranscript;
