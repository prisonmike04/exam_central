"use client";

import React, { useState } from "react";
import axios from "axios";

interface StudentResult {
  sap_id: string;
  programme: string;
  course_code: string;
  course_name: string;
  highest_marks: number;
  course_credits: number;
  ca_tw_max_marks: number;
  ca_tw_marks_obtained: number;
  ese_pr_orl_max_marks: number;
  ese_pr_orl_marks_obtained: number;
  final_max_marks: number;
  marks_obtained: number;
  final_grade: string;
  credits_earned: number;
  grade_points: number;
  total_points: number;
  remark: string;
}

const columns = [
  { key: "sap_id", label: "SAP ID" },
  { key: "programme", label: "Programme" },
  { key: "course_code", label: "Course Code" },
  { key: "course_name", label: "Course Name" },
  { key: "highest_marks", label: "Highest Marks" },
  { key: "course_credits", label: "Course Credits" },
  { key: "ca_tw_max_marks", label: "CA/TW Max Marks" },
  { key: "ca_tw_marks_obtained", label: "CA/TW Marks Obtained" },
  { key: "ese_pr_orl_max_marks", label: "ESE/PR/ORL Max Marks" },
  { key: "ese_pr_orl_marks_obtained", label: "ESE/PR/ORL Marks Obtained" },
  { key: "final_max_marks", label: "Final Max Marks" },
  { key: "marks_obtained", label: "Marks Obtained" },
  { key: "final_grade", label: "Final Grade" },
  { key: "credits_earned", label: "Credits Earned" },
  { key: "grade_points", label: "Grade Points" },
  { key: "total_points", label: "Total Points" },
  { key: "remark", label: "Remark" },
];

export default function StudentPage() {
  const [sapId, setSapId] = useState("");
  const [tableData, setTableData] = useState<StudentResult[]>([]);
  const [sgpa, setSgpa] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchResults = async () => {
    try {
      setError("");
      setLoading(true);
      setTableData([]);
      setSgpa(null);

      const response = await axios.get(
        `http://localhost:5001/api/marks/student/${sapId}`
      );

      const rows = response.data.data || [];

      if (!rows.length) {
        setError("No data found for this SAP ID.");
      } else {
        setTableData(rows);
        calculateSgpa(rows);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data. Check SAP ID or server.");
    } finally {
      setLoading(false);
    }
  };

  const calculateSgpa = (rows: StudentResult[]) => {
    let totalCredits = 0;
    let totalGradePoints = 0;

    rows.forEach((row) => {
      if (row.course_credits && row.grade_points) {
        totalGradePoints += row.course_credits * row.grade_points;
        totalCredits += row.course_credits;
      }
    });

    const sgpaValue = totalCredits ? totalGradePoints / totalCredits : 0;
    setSgpa(Number(sgpaValue.toFixed(2)));
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const content = `
      <html>
        <head>
          <title>${sapId} Results</title>
          <style>
            @media print {
              body {
                font-family: Arial, sans-serif;
                font-size: 12px;
                margin: 0;
                padding: 10px;
              }

              h1 {
                text-align: center;
              }

              table {
                width: 100%;
                border-collapse: collapse;
              }

              th, td {
                border: 1px solid #444;
                padding: 6px;
                text-align: left;
                font-size: 10px;
              }

              th {
                background-color: #222;
                color: #fff;
              }

              .sgpa-text {
                margin-top: 20px;
                font-size: 12px;
                font-weight: bold;
                text-align: right;
              }
            }
          </style>
        </head>
        <body>
          <h1>Results for SAP ID: ${sapId}</h1>
          <table>
            <thead>
              <tr>
                ${columns.map((col) => `<th>${col.label}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${tableData
                .map(
                  (row) =>
                    `<tr>${columns
                      .map(
                        (col) => `<td>${row[col.key as keyof StudentResult] ?? "-"}</td>`
                      )
                      .join("")}</tr>`
                )
                .join("")}
            </tbody>
          </table>
          <div class="sgpa-text">SGPA: ${sgpa ?? "N/A"}</div>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#000", color: "#fff" }}>
      <h1>Student Panel</h1>
      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Enter SAP ID"
          value={sapId}
          onChange={(e) => setSapId(e.target.value)}
          style={{ marginRight: 8, padding: 8 }}
        />
        <button onClick={fetchResults} style={{ padding: 8 }}>
          Get Results
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {tableData.length > 0 && (
        <div>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key} style={{ padding: 8, backgroundColor: "#222", color: "#fff" }}>
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.sap_id}>
                  {columns.map((col) => (
                    <td key={col.key} style={{ padding: 8 }}>
                      {row[col.key as keyof StudentResult] ?? "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
            <button onClick={handlePrint} style={{ padding: 10, backgroundColor: "#007bff", color: "#fff" }}>
              Print Results
            </button>
            <div style={{ fontWeight: "bold", color: "#fff" }}>
              SGPA: {sgpa ?? "N/A"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
