export default function StudentLayout({ children }: { children: React.ReactNode }) {
    return (
      <div>
        <header className="bg-blue-800 p-4 text-white">Student Panel</header>
        <main className="container mx-auto p-6">{children}</main>
      </div>
    );
  }
  