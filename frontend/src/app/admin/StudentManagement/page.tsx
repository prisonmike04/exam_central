"use client";
import React from "react";
import Card from "@/components/Card";

export default function StudentManagement() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Student Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div onClick={() => window.location.href = "/admin/StudentManagement/add"} className="cursor-pointer">
          <Card title="Add Student"> </Card>
        </div>
        <div onClick={() => window.location.href = "/admin/StudentManagement/list"} className="cursor-pointer">
          <Card title="View/Edit Students"> </Card>
        </div>
        <div onClick={() => window.location.href = "/admin/StudentManagement/import-export"} className="cursor-pointer">
          <Card title="Import/Export CSV"> </Card>
        </div>
      </div>
    </div>
  );
}
