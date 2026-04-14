// ✅ CUSTOM TRIP BUILDER: Progreso dinámico, alineación perfecta y diseño Premium
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, MapPin, Navigation, Calendar, Clock, Map, Car, Check } from "lucide-react";
import { getQuoteLink } from "../../lib/constants";
import Modal from "../ui/Modal";

export default function CustomTripBuilder() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    date: "",
    time: "",
    passengers: 1
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#cotizar") {
      setIsModalOpen(true);
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const link = getQuoteLink(formData.origin, formData.destination, formData.date, formData.time, formData.passengers);
    window.open(link, '_blank');
    setIsModalOpen(false); 
  };

  // ✅ MEJORA: Cálculo matemático proporcional (20% por cada campo completado)
  let progress = 0;
  if (formData.origin.trim() !== "") progress += 20;
  if (formData.destination.trim() !== "") progress += 20;
  if (formData.date !== "") progress += 20;
  if (formData.time !== "") progress += 20;
  if (formData.passengers > 0) progress += 20;

  // ✅ MEJORA: Estado de éxito simplificado al llegar a 100
  const isComplete = progress === 100;

  return (
    <section id="planificador" className="py-20 px-4 flex justify-center">
      
      {/* Botón Disparador Principal */}
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsModalOpen(true)}
        className="group relative overflow-hidden bg-taxi-dark border border-taxi-gold/20 p-16 rounded-[50px] w-full max-w-4xl text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-taxi-gold/50 transition-all duration-500"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-taxi-gold/[0.03] to-transparent" />
        <Map className="w-20 h-20 text-taxi-gold mx-auto mb-8 drop-shadow-[0_0_20px_rgba(250,204,21,0.3)] group-hover:scale-110 transition-transform duration-500" />
        <h2 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase italic tracking-tighter leading-none">
          VIAJE <span className="text-taxi-gold">A MEDIDA</span>
        </h2>
        <p className="text-slate-400 mb-10 max-w-xl mx-auto text-lg md:text-xl font-medium tracking-tight">
          Configurá tu trayecto ideal y visualizá el recorrido en tiempo real.
        </p>
        <div className="inline-flex items-center gap-3 bg-taxi-gold text-taxi-dark px-12 py-5 rounded-full font-black uppercase text-sm tracking-widest shadow-[0_10px_30px_rgba(250,204,21,0.2)] group-hover:shadow-taxi-gold/40 transition-all">
          Iniciar Planificador
        </div>
      </motion.button>

      {/* MODAL DE PLANIFICACIÓN */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="">
        <form onSubmit={handleSubmit} className="space-y-8 text-left">
          
          {/* ✅ MEJORA: Encabezado visual Premium dentro del modal */}
          <div className="text-center mb-4">
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter">
              CONFIGURÁ TU VIAJE <span className="text-taxi-gold">PERSONALIZADO</span>
            </h3>
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.4em] font-bold mt-2">
              Completá los datos para calcular el trayecto
            </p>
          </div>

          {/* VISUALIZADOR DE RUTA */}
          <div className="relative h-48 bg-slate-950 rounded-[40px] border border-white/5 overflow-hidden shadow-2xl flex flex-col justify-center">
            {/* Grilla de Radar */}
            <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#FACC15_0.5px,transparent_0.5px)] [background-size:16px_16px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
            
            {/* ✅ MEJORA: Alineación visual perfecta usando Flexbox */}
            <div className="relative w-full flex items-center justify-between px-8 md:px-16 z-10">
              
              {/* PUNTO A: PARTIDA */}
              <div className="flex flex-col items-center gap-3 w-16">
                <motion.div 
                  initial={false}
                  animate={formData.origin ? { scale: [1, 1.2, 1], backgroundColor: "#FACC15" } : { backgroundColor: "#FACC15" }}
                  className="w-5 h-5 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.6)] relative z-20"
                />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Partida</span>
              </div>

              {/* LÍNEA DE TRAYECTO (Contenedor que ocupa el espacio disponible) */}
              <div className="relative flex-grow h-[2px] bg-slate-800 mx-2 flex items-center">
                
                {/* Línea Dorada de Progreso */}
                <motion.div 
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 60, damping: 15 }}
                  className="absolute left-0 h-full bg-gradient-to-r from-taxi-gold via-yellow-200 to-taxi-gold shadow-[0_0_15px_rgba(250,204,21,0.5)]"
                />
                
                {/* EL AUTO (TAXI) */}
                <motion.div
                  animate={{ left: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 60, damping: 15 }}
                  // translate-x y translate-y garantizan que el centro del auto esté exactamente sobre la línea
                  className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-[60%] z-30"
                >
                  <div className="relative">
                    <Car className="w-10 h-10 text-taxi-gold fill-taxi-gold drop-shadow-[0_8px_15px_rgba(0,0,0,0.8)]" />
                    
                    {/* ETIQUETA "LISTO" */}
                    <AnimatePresence>
                      {isComplete && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: -45 }}
                          className="absolute left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-1.5 rounded-full flex items-center gap-2 shadow-[0_10px_20px_rgba(34,197,94,0.4)] border border-green-400"
                        >
                          <Check className="w-3 h-3 stroke-[4px]" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Listo</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>

              {/* PUNTO B: LLEGADA */}
              <div className="flex flex-col items-center gap-3 w-16">
                <motion.div 
                  animate={{
                    backgroundColor: isComplete ? "#22c55e" : "#1e293b",
                    boxShadow: isComplete ? "0 0 30px #22c55e" : "0 0 0px transparent",
                    scale: isComplete ? [1, 1.3, 1] : 1
                  }}
                  transition={{ duration: 0.5 }}
                  className="w-5 h-5 rounded-full relative z-20"
                />
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] italic transition-colors duration-500 ${isComplete ? 'text-green-500' : 'text-slate-500'}`}>
                  Llegada
                </span>
              </div>
            </div>

            {/* BARRA DE ESTADO INFERIOR */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
              <div className="px-6 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/5">
                <p className={`text-[9px] font-bold uppercase tracking-[0.4em] transition-all ${isComplete ? 'text-green-400' : 'text-slate-500'}`}>
                  {isComplete ? "SISTEMA LISTO PARA COTIZAR" : `COMPLETANDO DATOS: ${progress}%`}
                </p>
              </div>
            </div>
          </div>

          {/* FORMULARIO DE DATOS */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="custom-origin" className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 ml-4">
                  <MapPin className="w-3.5 h-3.5 text-taxi-gold" /> Punto de Partida
                </label>
                <input 
                  id="custom-origin" required type="text" placeholder="Ej: Av. del Libertador 1200" 
                  className="w-full bg-slate-900/50 border border-white/10 rounded-[24px] px-6 py-5 text-white focus:ring-2 focus:ring-taxi-gold/20 focus:border-taxi-gold outline-none transition-all placeholder:text-slate-600"
                  value={formData.origin} onChange={(e) => setFormData({...formData, origin: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="custom-destination" className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 ml-4">
                  <Navigation className="w-3.5 h-3.5 text-taxi-gold" /> Destino Final
                </label>
                <input 
                  id="custom-destination" required type="text" placeholder="Ej: Aeropuerto de Ezeiza" 
                  className="w-full bg-slate-900/50 border border-white/10 rounded-[24px] px-6 py-5 text-white focus:ring-2 focus:ring-taxi-gold/20 focus:border-taxi-gold outline-none transition-all placeholder:text-slate-600"
                  value={formData.destination} onChange={(e) => setFormData({...formData, destination: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="col-span-2 md:col-span-1 space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-4">Pasajeros</label>
                <div className="flex items-center justify-between bg-slate-950 border border-white/10 rounded-[24px] p-2">
                  <button type="button" onClick={() => setFormData(prev => ({ ...prev, passengers: Math.max(1, prev.passengers - 1) }))} className="w-12 h-12 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors">-</button>
                  <span className="text-2xl font-black text-taxi-gold">{formData.passengers}</span>
                  <button type="button" onClick={() => setFormData(prev => ({ ...prev, passengers: Math.min(3, prev.passengers + 1) }))} className="w-12 h-12 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors">+</button>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="custom-date" className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-4 italic">Fecha</label>
                <input id="custom-date" required type="date" className="w-full bg-slate-900/50 border border-white/10 rounded-[24px] px-6 py-5 text-white text-sm [color-scheme:dark] outline-none focus:border-taxi-gold transition-all" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label htmlFor="custom-time" className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-4 italic">Hora</label>
                <input id="custom-time" required type="time" className="w-full bg-slate-900/50 border border-white/10 rounded-[24px] px-6 py-5 text-white text-sm [color-scheme:dark] outline-none focus:border-taxi-gold transition-all" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={!isComplete}
            className={`w-full py-6 rounded-[30px] font-black text-base uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all duration-500 shadow-2xl ${
              isComplete 
                ? 'bg-green-500 text-white shadow-green-500/20 hover:scale-[1.02] cursor-pointer' 
                : 'bg-taxi-gold text-taxi-dark opacity-50 cursor-not-allowed shadow-taxi-gold/10'
            }`}
          >
            <Calculator className="w-6 h-6" />
            Solicitar Cotización Directa
          </button>
        </form>
      </Modal>
    </section>
  );
}