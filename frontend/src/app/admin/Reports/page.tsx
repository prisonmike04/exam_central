"use client";
import React from "react";
import Card from "@/components/Card";

export default function Reports() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Reports & Downloads</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div onClick={() => window.location.href = "/admin/Reports/pdf"} className="cursor-pointer">
          <Card title="Download PDF"> </Card>
        </div>
        <div onClick={() => window.location.href = "/admin/Reports/csv"} className="cursor-pointer">
          <Card title="Download CSV"> </Card>
        </div>
        <div onClick={() => window.location.href = "/admin/Reports/stats"} className="cursor-pointer">
          <Card title="View Statistics"> </Card>
        </div>
      </div>
    </div>
  );
}
