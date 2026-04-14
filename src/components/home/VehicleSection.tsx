// ✅ CAMBIO: Integración de next/image para SEO y Performance
"use client";

import { motion } from "framer-motion";
import Image from "next/image"; // ✅ NUEVO: Importamos el optimizador de Next.js

export default function VehicleSection() {
  return (
    <section className="py-24 px-4 bg-taxi-dark">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Tu viaje en un <span className="text-taxi-gold">Chevrolet Classic 2016</span></h2>
          <ul className="space-y-4 text-slate-300 text-lg">
            {[
              "Higiene impecable garantizada en cada traslado.",
              "Aire acondicionado y climatización a tu gusto.",
              "Espacio amplio en baúl para tu equipaje.",
              "Mantenimiento mecánico al día para tu seguridad."
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-taxi-gold shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 aspect-video bg-slate-800 rounded-2xl overflow-hidden relative border border-slate-700 shadow-2xl shadow-black/50"
        >
          {/* ✅ NUEVO: Componente Image optimizado */}
          <Image 
            src="/chevrolet-classic.jpg" 
            alt="Chevrolet Classic 2016 de Claudio Taxi" 
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover hover:scale-105 transition-transform duration-700"
            priority={false}
          />
        </motion.div>
      </div>
    </section>
  );
}