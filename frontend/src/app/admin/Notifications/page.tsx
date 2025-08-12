"use client";
import React from "react";
import Card from "@/components/Card";

export default function Notifications() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div onClick={() => window.location.href = "/admin/Notifications/send"} className="cursor-pointer">
          <Card title="Send Notification"> </Card>
        </div>
        <div onClick={() => window.location.href = "/admin/Notifications/list"} className="cursor-pointer">
          <Card title="View Notifications"> </Card>
        </div>
      </div>
    </div>
  );
}
