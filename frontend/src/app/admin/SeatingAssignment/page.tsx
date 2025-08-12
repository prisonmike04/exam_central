"use client";
import React from "react";
import Card from "@/components/Card";

export default function SeatingAssignment() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Seating Assignment</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div onClick={() => window.location.href = "/admin/SeatingAssignment/assign"} className="cursor-pointer">
          <Card title="Assign Seats"> </Card>
        </div>
        <div onClick={() => window.location.href = "/admin/SeatingAssignment/list"} className="cursor-pointer">
          <Card title="View Arrangements"> </Card>
        </div>
      </div>
    </div>
  );
}
