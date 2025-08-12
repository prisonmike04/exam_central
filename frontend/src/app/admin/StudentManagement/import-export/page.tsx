"use client";
import React from "react";

export default function ImportExportStudent() {
  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Import/Export Students (CSV)</h2>
      <div className="space-y-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded">Import CSV</button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Export CSV</button>
      </div>
    </div>
  );
}
