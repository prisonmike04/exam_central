'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 shadow-lg z-10 animate-slide-down">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">Exam Central</h1>

        {/* Navigation Links */}
        <div className="space-x-6 text-lg">
          {user ? (
            <>
              <span>Hello, {user.name}</span>
              <Link href={`/${user.role}`} className="hover:text-pink-400 transition-colors duration-200">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="hover:text-pink-400 transition-colors duration-200">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-pink-400 transition-colors duration-200">
                Login
              </Link>
              <Link href="/admin" className="hover:text-pink-400 transition-colors duration-200">
                Admin
              </Link>
              <Link href="/student" className="hover:text-pink-400 transition-colors duration-200">
                Student
              </Link>
              <Link href="/teacher" className="hover:text-pink-400 transition-colors duration-200">
                Teacher
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
