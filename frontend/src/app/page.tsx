import NavBar from '../components/Navbar';

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Navigation */}
      <NavBar />

      {/* Main Content */}
      <div className="relative flex flex-col items-center justify-center min-h-screen text-white text-center">
        <h1 className="text-6xl font-extrabold mb-4">Welcome to Exam Central</h1>
        <p className="text-lg mb-8">
          Manage and streamline all your examination-related activities efficiently.
        </p>
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700">
            <a href='/login'>Login</a>
          </button>
          <button className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg text-lg hover:bg-gray-400">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
