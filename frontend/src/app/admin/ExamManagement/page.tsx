"use client";
import React from "react";
import Card from "@/components/Card";

export default function ExamManagement() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Exam Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div onClick={() => window.location.href = "/admin/ExamManagement/create"} className="cursor-pointer">
          <Card title="Create Exam"> </Card>
        </div>
        <div onClick={() => window.location.href = "/admin/ExamManagement/list"} className="cursor-pointer">
          <Card title="View/Edit Exams"> </Card>
        </div>
        <div onClick={() => window.location.href = "/admin/SeatingAssignment"} className="cursor-pointer">
          <Card title="Assign Seating"> </Card>
        </div>
      </div>
    </div>
  );
}
