// ✅ CAMBIO: Enlaces de accesibilidad (id y htmlFor) agregados a todos los inputs
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, MapPin, Navigation, Calendar, Clock } from "lucide-react";
import { getQuoteLink } from "../../lib/constants";
import SectionHeader from "../ui/SectionHeader";

export default function QuoteSection() {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    date: "",
    time: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const link = getQuoteLink(formData.origin, formData.destination, formData.date, formData.time, 1);
    window.open(link, '_blank');
  };

  return (
    <section className="py-24 px-4 bg-taxi-dark relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeader 
          title="Armá tu" 
          highlight="Viaje a Medida" 
          subtitle="Completá los datos y recibí una cotización al instante por WhatsApp."
        />

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* ✅ CAMBIO: htmlFor="origin" enlazado con id="origin" */}
            <div className="space-y-2">
              <label htmlFor="origin" className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-taxi-gold" /> Origen
              </label>
              <input 
                id="origin"
                required
                type="text" 
                placeholder="Ej: Obelisco, CABA"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-taxi-gold focus:ring-1 focus:ring-taxi-gold transition-all"
                value={formData.origin}
                onChange={(e) => setFormData({...formData, origin: e.target.value})}
              />
            </div>

            {/* ✅ CAMBIO: htmlFor="destination" enlazado con id="destination" */}
            <div className="space-y-2">
              <label htmlFor="destination" className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-taxi-gold" /> Destino
              </label>
              <input 
                id="destination"
                required
                type="text" 
                placeholder="Ej: Aeropuerto Ezeiza"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-taxi-gold focus:ring-1 focus:ring-taxi-gold transition-all"
                value={formData.destination}
                onChange={(e) => setFormData({...formData, destination: e.target.value})}
              />
            </div>

            {/* ✅ CAMBIO: htmlFor="date" enlazado con id="date" */}
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-taxi-gold" /> Fecha
              </label>
              <input 
                id="date"
                required
                type="date" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-taxi-gold focus:ring-1 focus:ring-taxi-gold transition-all [color-scheme:dark]"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>

            {/* ✅ CAMBIO: htmlFor="time" enlazado con id="time" */}
            <div className="space-y-2">
              <label htmlFor="time" className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Clock className="w-4 h-4 text-taxi-gold" /> Hora
              </label>
              <input 
                id="time"
                required
                type="time" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-taxi-gold focus:ring-1 focus:ring-taxi-gold transition-all [color-scheme:dark]"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-taxi-gold text-taxi-dark py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors shadow-lg shadow-taxi-gold/20 hover:scale-[1.02]"
          >
            <Calculator className="w-6 h-6" />
            Cotizar Viaje por WhatsApp
          </button>
        </motion.form>
      </div>
    </section>
  );
}