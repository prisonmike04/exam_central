'use client';

import React, { useEffect, useState } from 'react';

const Dashboard: React.FC = () => {
    const [classPerformance, setClassPerformance] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/marks/class-performance');
            const data = await response.json();
            setClassPerformance(data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>Class Performance</h2>
            {classPerformance && (
                <div>
                    <p>Average Marks: {classPerformance.average}</p>
                    <p>Highest Marks: {classPerformance.highest}</p>
                    <p>Lowest Marks: {classPerformance.lowest}</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
