// ✅ REDISEÑO: Hero Premium con Mesh Gradient animado y Tipografía Cinematográfica
"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, ChevronDown } from "lucide-react";
import { getWhatsAppLink } from "../../lib/constants";

export default function HeroSection() {
  return (
    <section id="hero" className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center overflow-hidden bg-taxi-dark">
      
      {/* ✅ NUEVO: Fondo de Luces Animadas (Mesh Gradient) */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-taxi-gold/10 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -80, 0],
            y: [0, -30, 0] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-taxi-gold/5 blur-[100px] rounded-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-taxi-dark/20 via-taxi-dark/60 to-taxi-dark z-10" />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 max-w-5xl"
      >
        {/* ✅ NUEVO: Título con efecto de máscara y degradado dorado */}
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-8 italic">
          <span className="text-white block">EL VIAJE</span>
          <span className="bg-gradient-to-b from-taxi-gold via-yellow-200 to-taxi-gold bg-clip-text text-transparent drop-shadow-[0_10px_20px_rgba(250,204,21,0.3)]">
            PERFECTO.
          </span>
        </h1>
        
        <p className="text-lg md:text-2xl text-slate-400 mb-12 font-light tracking-[0.2em] uppercase max-w-3xl mx-auto">
          Seguridad, Distinción y la Puntualidad de <span className="text-white font-bold">Claudio</span>.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a 
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-taxi-gold text-taxi-dark px-10 py-5 rounded-full font-black text-xl hover:bg-white transition-all shadow-[0_20px_50px_rgba(250,204,21,0.2)] hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-6 h-6 fill-current" />
            SOLICITAR AHORA
          </a>
        </div>
      </motion.div>

      {/* Indicador de scroll sutil */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-taxi-gold/30"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </section>
  );
}