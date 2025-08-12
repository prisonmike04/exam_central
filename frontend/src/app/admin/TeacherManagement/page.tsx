"use client";
import React from "react";
import Card from "@/components/Card";

export default function TeacherManagement() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Teacher Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div onClick={() => window.location.href = "/admin/TeacherManagement/add"} className="cursor-pointer">
          <Card title="Add Teacher"> </Card>
        </div>
        <div onClick={() => window.location.href = "/admin/TeacherManagement/list"} className="cursor-pointer">
          <Card title="View/Edit Teachers"> </Card>
        </div>
        <div onClick={() => window.location.href = "/admin/TeacherManagement/assign-subjects"} className="cursor-pointer">
          <Card title="Assign Subjects"> </Card>
        </div>
      </div>
    </div>
  );
}
