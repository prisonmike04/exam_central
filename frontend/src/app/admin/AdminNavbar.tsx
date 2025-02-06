'use client';

import Link from 'next/link';

export default function AdminNavbar() {
  return (
    <div className="bg-gray-900 text-white p-4 shadow-md fixed top-0 left-0 w-full flex justify-between items-center z-50">
      <div className="text-xl font-bold">Exam Central</div>
      <div className="flex gap-4">
        <Link href="/admin/SeatingArrangement" className="hover:text-gray-300 transition-colors">
          Seating Arrangement
        </Link>
        <Link href="/" className="hover:text-gray-300 transition-colors">
          Logout
        </Link>
      </div>
    </div>
  );
}
