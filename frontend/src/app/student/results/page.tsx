'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Result {
    subject: string;
    marks: number;
    grade: string;
}

export default function ResultsPage() {
    const [results, setResults] = useState<Result[]>([]);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/marks/results');
                setResults(response.data.results);
            } catch (err) {
                console.error('Error fetching results:', err);
                setError('Failed to fetch results.');
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">Student Results</h1>
            {results.length === 0 ? (
                <p>No results available.</p>
            ) : (
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Subject</th>
                            <th className="border border-gray-300 px-4 py-2">Marks</th>
                            <th className="border border-gray-300 px-4 py-2">Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 px-4 py-2">{result.subject}</td>
                                <td className="border border-gray-300 px-4 py-2">{result.marks}</td>
                                <td className="border border-gray-300 px-4 py-2">{result.grade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
