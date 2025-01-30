export default function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 transition-transform duration-300 hover:scale-105">
      <h2 className="text-2xl font-bold text-black mb-4">{title}</h2>
      <div className="text-gray-300">{children}</div>
    </div>
  );
}
