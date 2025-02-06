import { motion } from 'framer-motion';

export default function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 transition-transform duration-300"
    >
      <h2 className="text-2xl font-bold text-black mb-4">{title}</h2>
      <div className="text-gray-300">{children}</div>
    </motion.div>
  );
}
