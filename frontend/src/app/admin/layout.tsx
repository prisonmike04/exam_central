export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="bg-gray-800 p-4 text-white">Admin Panel</header>
      <main className="container mx-auto p-6">{children}</main>
    </div>
  );
}
