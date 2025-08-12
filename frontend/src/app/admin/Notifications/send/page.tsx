"use client";
import React, { useState } from "react";

export default function SendNotification() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to backend API
    setStatus("Notification sent!");
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Send Notification</h2>
      <form onSubmit={handleSend} className="space-y-4">
        <textarea placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} className="w-full p-2 border rounded" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
      </form>
      {status && <div className="mt-4 text-green-600">{status}</div>}
    </div>
  );
}
