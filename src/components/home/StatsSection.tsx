// ✅ CAMBIO: Importamos 'Variants' de framer-motion para tipado estricto
"use client";

import { motion, Variants } from "framer-motion";
import { ShieldCheck, MapPin, Clock } from "lucide-react";

// ✅ NUEVO: Le decimos a TypeScript que esto es de tipo Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

// ✅ NUEVO: Le decimos a TypeScript que esto es de tipo Variants
const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" } },
};

export default function StatsSection() {
// ...resto del componente queda exactamente igual
  const stats = [
    { icon: ShieldCheck, title: "+7 Años", desc: "De experiencia al volante" },
    { icon: MapPin, title: "CABA y GBA", desc: "Cobertura total en el AMBA" },
    { icon: Clock, title: "24 Horas", desc: "Disponibilidad con reserva previa" }
  ];

  return (
    <section className="relative z-20 -mt-16 px-4">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col items-center text-center shadow-2xl hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="p-4 bg-taxi-dark rounded-full mb-4 ring-1 ring-slate-800">
              <stat.icon className="w-8 h-8 text-taxi-gold" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{stat.title}</h2>
            <p className="text-slate-400 font-medium">{stat.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}