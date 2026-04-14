// ✅ NUEVO: Micro-componente reutilizable para encabezados de sección
"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  highlight?: string;
  subtitle?: string;
}

export default function SectionHeader({ title, highlight, subtitle }: SectionHeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
        {title} {highlight && <span className="text-taxi-gold">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}