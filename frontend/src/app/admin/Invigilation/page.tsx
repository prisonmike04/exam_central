"use client";
import React from "react";
import Card from "@/components/Card";

export default function Invigilation() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Invigilation Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div onClick={() => window.location.href = "/admin/Invigilation/assign"} className="cursor-pointer">
          <Card title="Assign Invigilators"> </Card>
        </div>
        <div onClick={() => window.location.href = "/admin/Invigilation/list"} className="cursor-pointer">
          <Card title="View Invigilation"> </Card>
        </div>
      </div>
    </div>
  );
}
