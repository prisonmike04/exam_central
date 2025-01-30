import Navbar from '../components/Navbar';

export default function TeacherHome() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-4xl font-bold mb-6">Teacher Dashboard</h1>
        <p className="text-lg mb-4">
          Manage and streamline all your examination-related activities efficiently.
        </p>
        <div className="flex gap-4">
          <a
            href="/teacher/supervisors"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          >
            Manage Supervisors
          </a>
          <a
            href="/teacher/schedule"
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
          >
            Manage Schedule
          </a>
        </div>
      </main>
    </div>
  );
}
