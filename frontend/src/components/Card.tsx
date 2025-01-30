import { motion } from 'framer-motion';

export default function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-md mb-4"
    >
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p>{children}</p>
    </motion.div>
  );
}
