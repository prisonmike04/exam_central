import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* You can add an AdminNavbar here if needed */}
      {children}
    </div>
  );
}
