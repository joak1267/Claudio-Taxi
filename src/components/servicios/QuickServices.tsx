// ✅ CAMBIO: Selector de pasajeros (Límite 3), nuevos servicios y selector rápido de destinos
"use client";

import { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Plane, Map as MapIcon, CalendarHeart, MapPin, Calendar, Clock, ArrowRight, Users, Briefcase, Car, ChevronDown } from "lucide-react";
import { getServiceQuoteLink } from "../../lib/constants";
import Modal from "../ui/Modal";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

// ✅ NUEVO: Selector de destinos. Mapeo de categorías con sus destinos frecuentes.
// Para agregar nuevos destinos en el futuro, solo tenés que sumar elementos a estas listas.
const destinationsMap: Record<string, string[]> = {
  "Aeropuertos": ["Ezeiza (EZE)", "Aeroparque (AEP)"],
  "Traslados Médicos": ["Hospital Alemán", "Hospital Italiano", "Clínica Bazterrica"]
};

export default function QuickServices() {
  // ✅ NUEVO: Añadimos 'destination' como opcional al estado del servicio seleccionado
  const [selectedService, setSelectedService] = useState<{ title: string, icon: any, destination?: string } | null>(null);
  
  // ✅ NUEVO: Estado para saber qué tarjeta tiene el dropdown abierto (solo permite uno a la vez)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    origin: "",
    date: "",
    time: "",
    passengers: 1
  });

  const services = [
    { icon: Plane, title: "Aeropuertos", desc: "Ezeiza y Aeroparque. Puntualidad garantizada para tu vuelo." },
    { icon: MapIcon, title: "Larga Distancia", desc: "Viajes a la Costa, Rosario o el interior de Buenos Aires." },
    { icon: Briefcase, title: "Trámites / City Tour", desc: "Disponibilidad por hora para trámites o recorridos urbanos." },
    { icon: CalendarHeart, title: "Eventos", desc: "Casamientos y fiestas con traslado seguro de ida y vuelta." },
    { icon: Car, title: "Traslados Médicos", desc: "Viajes tranquilos para consultas o estudios programados." }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;
    
    // ✅ NUEVO: Si el servicio tiene un destino específico seleccionado, lo unimos al título.
    const finalTitle = selectedService.destination 
      ? `${selectedService.title} - ${selectedService.destination}` 
      : selectedService.title;

    const link = getServiceQuoteLink(finalTitle, formData.origin, formData.date, formData.time, formData.passengers);
    window.open(link, '_blank');
    setSelectedService(null);
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => {
            // Verificamos si este servicio tiene destinos predefinidos en nuestro mapa
            const hasDestinations = !!destinationsMap[service.title];
            const isDropdownOpen = openDropdown === service.title;

            return (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-taxi-dark p-6 rounded-3xl border border-slate-800 hover:border-taxi-gold/40 transition-all group shadow-xl flex flex-col"
              >
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-4 group-hover:bg-taxi-gold/10 transition-colors">
                  <service.icon className="w-6 h-6 text-taxi-gold" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-slate-400 text-sm mb-6 flex-grow">{service.desc}</p>
                
                {/* ✅ NUEVO: Lógica condicional para el botón */}
                <button 
                  onClick={() => {
                    if (hasDestinations) {
                      // Alterna el acordeón de destinos
                      setOpenDropdown(isDropdownOpen ? null : service.title);
                    } else {
                      // Si no tiene destinos frecuentes, abre el modal directo
                      setSelectedService({ title: service.title, icon: service.icon });
                    }
                  }}
                  className="w-full py-3 bg-slate-900 text-white rounded-xl border border-slate-700 hover:bg-taxi-gold hover:text-taxi-dark transition-all flex items-center justify-center gap-2 font-bold z-10 relative"
                >
                  {hasDestinations ? (
                    <>Elegir Destino <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} /></>
                  ) : (
                    <>Reservar <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>

                {/* ✅ NUEVO: Menú desplegable animado con Framer Motion */}
                <AnimatePresence>
                  {hasDestinations && isDropdownOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 space-y-2 flex flex-col">
                        {destinationsMap[service.title].map((dest, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setSelectedService({ title: service.title, icon: service.icon, destination: dest });
                              setOpenDropdown(null); // Cierra el menú al elegir
                            }}
                            className="w-full text-left px-4 py-3 bg-slate-950 border border-taxi-gold/30 rounded-xl text-slate-300 hover:bg-taxi-gold hover:text-taxi-dark transition-colors text-sm font-medium flex items-center gap-2"
                          >
                            <MapPin className="w-3.5 h-3.5" /> {dest}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </motion.div>

        <Modal isOpen={selectedService !== null} onClose={() => setSelectedService(null)} title="Confirmar Reserva">
          {selectedService && (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* ✅ NUEVO: Indicador visual si el usuario eligió un destino rápido */}
              {selectedService.destination && (
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
                  <div className="p-2 bg-taxi-gold/10 rounded-lg">
                    <MapPin className="w-5 h-5 text-taxi-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Destino Seleccionado</p>
                    <p className="text-white font-bold text-sm">{selectedService.destination}</p>
                  </div>
                </div>
              )}

              {/* Selector de Pasajeros - Diseño de Contador */}
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center">
                <label className="text-sm font-medium text-slate-400 mb-4 block flex items-center justify-center gap-2">
                  <Users className="w-4 h-4" /> Cantidad de Pasajeros (Máx. 3)
                </label>
                <div className="flex items-center justify-center gap-6">
                  <button 
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, passengers: Math.max(1, prev.passengers - 1) }))}
                    className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-2xl font-bold hover:bg-slate-700 transition-colors"
                  > - </button>
                  <span className="text-4xl font-bold text-taxi-gold">{formData.passengers}</span>
                  <button 
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, passengers: Math.min(3, prev.passengers + 1) }))}
                    className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-2xl font-bold hover:bg-slate-700 transition-colors"
                  > + </button>
                </div>
                {formData.passengers === 3 && (
                  <p className="mt-4 text-xs text-yellow-500/80 italic">Capacidad máxima del Chevrolet Classic alcanzada.</p>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="q-origin" className="text-sm text-slate-400">Punto de Recogida</label>
                  <input id="q-origin" required type="text" placeholder="Ej: Calle Falsa 123" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-taxi-gold outline-none transition-all" 
                    value={formData.origin} onChange={e => setFormData({...formData, origin: e.target.value})} />
                </div>
                <div className="space-y-2">
                    <label htmlFor="q-date" className="text-sm text-slate-400">Fecha del viaje</label>
                    <input id="q-date" required type="date" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white [color-scheme:dark] focus:border-taxi-gold outline-none transition-all" 
                      value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="q-time" className="text-sm text-slate-400">Horario</label>
                    <input id="q-time" required type="time" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white [color-scheme:dark] focus:border-taxi-gold outline-none transition-all" 
                      value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
                  </div>
              </div>

              <button type="submit" className="w-full bg-taxi-gold text-taxi-dark py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_20px_rgba(250,204,21,0.3)] transition-all">
                Enviar Solicitud
              </button>
            </form>
          )}
        </Modal>
      </div>
    </section>
  );
}