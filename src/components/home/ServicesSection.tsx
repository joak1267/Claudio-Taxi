// ✅ VERSIÓN FINAL: Incluye tipado TS, animaciones en cascada y botón hacia la nueva página
"use client";

import { motion, Variants } from "framer-motion";
import { Plane, Map, CalendarHeart } from "lucide-react";
import Link from "next/link"; // Necesario para el botón final
import SectionHeader from "../ui/SectionHeader";

// ✅ Tipado estricto para que TypeScript no tire error
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// ✅ Tipado estricto para la animación individual
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
};

export default function ServicesSection() {
  const services = [
    { icon: Plane, title: "Aeropuertos", desc: "Ezeiza y Aeroparque. Monitoreo de tu vuelo para esperarte a tiempo." },
    { icon: Map, title: "Larga Distancia", desc: "Viajes programados a la Costa Atlántica, interior de Bs As y más." },
    { icon: CalendarHeart, title: "Eventos Especiales", desc: "Casamientos, fiestas y salidas nocturnas con espera programada." }
  ];

  return (
    <section className="py-24 px-4 bg-slate-950 relative overflow-hidden">
      {/* Brillo sutil de fondo para dar look Premium */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-taxi-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Título unificado usando nuestro micro-componente */}
        <SectionHeader 
          title="Servicios" 
          highlight="Especializados" 
          subtitle="Adaptados a tus necesidades para que viajes con total tranquilidad."
        />
        
        {/* Grilla de servicios con animación en cascada */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="bg-taxi-dark/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-800/60 hover:border-taxi-gold/50 hover:bg-slate-900/80 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-taxi-gold/10 transition-transform duration-300">
                <service.icon className="w-7 h-7 text-taxi-gold" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-taxi-gold transition-colors">{service.title}</h3>
              <p className="text-slate-400 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Botón de redirección hacia la página específica de servicios y cotización */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link 
            href="/servicios"
            className="inline-flex items-center justify-center gap-2 border-2 border-taxi-gold text-taxi-gold px-8 py-4 rounded-full font-bold text-lg hover:bg-taxi-gold hover:text-taxi-dark transition-all shadow-lg hover:shadow-taxi-gold/20"
          >
            Ver más detalles y armar Viaje a Medida
          </Link>
        </motion.div>

      </div>
    </section>
  );
}