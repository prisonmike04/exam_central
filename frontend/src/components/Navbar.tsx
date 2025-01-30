'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
    <nav className="fixed top-0 left-0 w-full bg-white/10 backdrop-blur-md rounded-lg shadow-lg z-10 animate-slide-down">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold text-white">Exam Central</h1>

        {/* Links */}
        <div className="space-x-6 text-white text-lg">
          {user ? (
            <>
              <span>Hello, {user.name}</span>
              <a
                href={`/${user.role}`}
                className="hover:text-pink-400 transition-colors duration-200"
              >
                Dashboard
              </a>
              <button
                onClick={handleLogout}
                className="hover:text-pink-400 transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a
                href="/login"
                className="hover:text-pink-400 transition-colors duration-200"
              >
                Login
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
