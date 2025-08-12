"use client";
import React, { useEffect, useState } from "react";

export default function NotificationList() {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    // TODO: Fetch notifications from backend API
    setNotifications([
      { message: "Exam on 15th Aug", date: "2025-08-10" },
      { message: "Seating updated", date: "2025-08-11" },
    ]);
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Notifications</h2>
      <ul className="space-y-2">
        {notifications.map((note, idx) => (
          <li key={idx} className="bg-gray-100 p-4 rounded shadow">
            <div className="font-semibold">{note.message}</div>
            <div className="text-sm text-gray-500">{note.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
