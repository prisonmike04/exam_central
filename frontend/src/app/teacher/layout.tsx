export default function TeacherLayout({ children }: { children: React.ReactNode }) {
    return (
      <div>
        <header className="bg-green-800 p-4 text-white">Teacher Panel</header>
        <main className="container mx-auto p-6">{children}</main>
      </div>
    );
  }
  