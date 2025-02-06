import React, { useState } from 'react';
import axios from 'axios';

const Results = () => {
    const [sapId, setSapId] = useState('');
    const [transcript, setTranscript] = useState<any>(null);
    const [error, setError] = useState('');

    const fetchTranscript = async () => {
        if (!sapId.trim()) {
            setError('SAP ID is required!');
            return;
        }

        try {
            setError('');
            const response = await axios.get(`http://localhost:5001/api/marks/transcript/${sapId}`);
            setTranscript(response.data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch transcript. Please try again.');
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold">Student Transcript</h1>
            <div className="mt-4">
                <label htmlFor="sapId" className="block text-gray-700 font-semibold">
                    Enter SAP ID:
                </label>
                <input
                    id="sapId"
                    type="text"
                    value={sapId}
                    onChange={(e) => setSapId(e.target.value)}
                    className="border rounded p-2 mt-2 w-full"
                />
                <button
                    onClick={fetchTranscript}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Fetch Transcript
                </button>
            </div>
            {error && <p className="text-red-600 mt-4">{error}</p>}
            {transcript && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">Transcript Details</h2>
                    <p>SAP ID: {transcript.sapId}</p>
                    <p>GPA: {transcript.gpa}</p>
                    <h3 className="mt-4 font-semibold">Subjects:</h3>
                    {transcript.transcriptDetails.map((subject: any, index: number) => (
                        <div key={index} className="border p-2 mt-2">
                            <p>Subject ID: {subject.subjectId}</p>
                            <p>Final Marks: {subject.finalMarks}</p>
                            <p>Grade: {subject.grade}</p>
                            <p>Grade Point: {subject.gradePoint}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Results;
