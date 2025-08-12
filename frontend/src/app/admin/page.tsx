"use client";

import React from "react";
import Card from "@/components/Card";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          onClick={() => (window.location.href = "/admin/StudentManagement")}
          className="cursor-pointer"
        >
          <Card title="Student Management"> </Card>
        </div>
        <div
          onClick={() => (window.location.href = "/admin/TeacherManagement")}
          className="cursor-pointer"
        >
          <Card title="Teacher Management"> </Card>
        </div>
        <div
          onClick={() => (window.location.href = "/admin/ExamManagement")}
          className="cursor-pointer"
        >
          <Card title="Exam Management"> </Card>
        </div>
        <div
          onClick={() => (window.location.href = "/admin/SeatingAssignment")}
          className="cursor-pointer"
        >
          <Card title="Seating Assignment"> </Card>
        </div>
        <div
          onClick={() => (window.location.href = "/admin/Invigilation")}
          className="cursor-pointer"
        >
          <Card title="Invigilation"> </Card>
        </div>
        <div
          onClick={() => (window.location.href = "/admin/Notifications")}
          className="cursor-pointer"
        >
          <Card title="Notifications"> </Card>
        </div>
        <div
          onClick={() => (window.location.href = "/admin/Reports")}
          className="cursor-pointer"
        >
          <Card title="Reports & Downloads"> </Card>
        </div>
      </div>
    </div>
  );
}
