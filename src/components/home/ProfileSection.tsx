// ✅ CAMBIO: Integración de next/image para foto de perfil
"use client";

import { motion } from "framer-motion";
import Image from "next/image"; // ✅ NUEVO: Importamos el optimizador

export default function ProfileSection() {
  return (
    <section className="py-24 px-4 bg-taxi-dark">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10 bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-800"
      >
        <div className="w-40 h-40 shrink-0 bg-slate-800 rounded-full overflow-hidden relative border-4 border-taxi-gold shadow-lg shadow-taxi-gold/10">
          {/* ✅ NUEVO: Componente Image con texto alternativo para Accesibilidad */}
          <Image 
            src="/claudio-perfil.jpg" 
            alt="Claudio, chofer profesional" 
            fill
            sizes="160px"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Conocé a <span className="text-taxi-gold">Claudio</span></h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            "Mi prioridad número uno es que llegues a destino de forma segura y cómoda. Tras más de 7 años recorriendo las calles de Buenos Aires, entiendo el valor de la puntualidad y el buen trato. Mi auto no es solo mi herramienta de trabajo, es el espacio donde garantizo tu confort."
          </p>
        </div>
      </motion.div>
    </section>
  );
}