import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-2xl font-bold">Exam Central</h1>
        <div className="space-x-4">
          <Link href="/login">Login</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/student">Student</Link>
          <Link href="/teacher">Teacher</Link>
        </div>
      </div>
    </nav>
  );
}
