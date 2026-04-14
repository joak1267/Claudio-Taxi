// ✅ FOOTER FINAL: Crédito JoaTech integrado, discreto y en celeste.
"use client";

import { useState } from "react";
import { Car, MapPin, Phone, Mail, Calculator, Navigation, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { CONTACT_INFO, getQuoteLink, getWhatsAppLink } from "../../lib/constants";
import Modal from "./Modal";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    date: "",
    time: "",
    passengers: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const link = getQuoteLink(formData.origin, formData.destination, formData.date, formData.time, formData.passengers);
    window.open(link, '_blank');
    setIsModalOpen(false); 
  };

  return (
    <footer id="contacto" className="bg-taxi-dark border-t border-slate-900 pt-12 pb-6 px-4">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Columna 1: Marca */}
          <div>
            <Link href="/#hero" className="flex items-center gap-2 text-2xl font-black text-white tracking-tight uppercase mb-4 hover:opacity-80 transition-opacity">
              <Car className="w-6 h-6 text-taxi-gold" />
              Claudio<span className="text-taxi-gold">Taxi</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Transporte privado Premium en CABA y GBA. Seguridad, puntualidad y confort en cada kilómetro.
            </p>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm tracking-wide uppercase">Navegación</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/#hero" className="text-slate-400 hover:text-taxi-gold transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-slate-400 hover:text-taxi-gold transition-colors">
                  Servicios y Tarifas
                </Link>
              </li>
              <li>
                <button onClick={() => setIsModalOpen(true)} className="text-slate-400 hover:text-taxi-gold transition-colors text-left">
                  Armar Viaje a Medida
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm tracking-wide uppercase">Contacto</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-taxi-gold" />
                <span>CABA y Gran Buenos Aires</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-taxi-gold" />
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="hover:text-taxi-gold transition-colors">
                  +{CONTACT_INFO.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-taxi-gold" />
                <a href="mailto:claudiogildiazjc@gmail.com" className="hover:text-taxi-gold transition-colors text-xs">
                  claudiogildiazjc@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra Inferior corregida */}
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-3 text-center md:text-left">
            <p>&copy; {currentYear} Claudio Taxi. Todos los derechos reservados.</p>
            <span className="hidden md:block text-slate-700">|</span>
            {/* ✅ CRÉDITO JOATECH: Más chico y en celeste */}
            <p className="text-[10px] uppercase tracking-widest text-slate-600">
              Desarrollado por{" "}
              <a 
                href="https://portafolio-joa-tech.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sky-400 hover:text-white transition-colors font-bold"
              >
                JoaTech
              </a>
            </p>
          </div>
          
          <Link href="/terminos" className="hover:text-taxi-gold transition-colors font-medium">
            Términos y Condiciones
          </Link>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Planificador de Ruta">
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center mb-6">
            <label className="text-sm font-medium text-slate-400 mb-4 flex items-center justify-center gap-2">
               Cantidad de Pasajeros (Máx. 3)
            </label>
            <div className="flex items-center justify-center gap-6">
              <button type="button" onClick={() => setFormData(prev => ({ ...prev, passengers: Math.max(1, prev.passengers - 1) }))} className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-2xl font-bold hover:bg-slate-700 transition-colors text-white">-</button>
              <span className="text-4xl font-bold text-taxi-gold">{formData.passengers}</span>
              <button type="button" onClick={() => setFormData(prev => ({ ...prev, passengers: Math.min(3, prev.passengers + 1) }))} className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-2xl font-bold hover:bg-slate-700 transition-colors text-white">+</button>
            </div>
          </div>
          <div className="relative bg-slate-900 rounded-2xl p-6 border border-slate-800 overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#FACC15_1px,transparent_1px)] [background-size:20px_20px]" />
            <div className="relative z-10 space-y-6">
              <div className="relative">
                <label htmlFor="global-origin" className="text-sm font-medium text-slate-400 flex items-center gap-2 mb-2"><MapPin className="w-5 h-5 text-taxi-gold" /> Punto de Partida</label>
                <input id="global-origin" required type="text" placeholder="Ej: Obelisco, CABA" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-taxi-gold transition-all" value={formData.origin} onChange={(e) => setFormData({...formData, origin: e.target.value})} />
                <div className="absolute left-2.5 top-[70px] bottom-[-30px] w-0.5 bg-dashed bg-slate-800 border-l-2 border-dashed border-slate-700 hidden md:block" />
              </div>
              <div className="relative">
                <label htmlFor="global-dest" className="text-sm font-medium text-slate-400 flex items-center gap-2 mb-2"><Navigation className="w-5 h-5 text-taxi-gold" /> Destino Final</label>
                <input id="global-dest" required type="text" placeholder="Ej: Aeropuerto Ezeiza" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-taxi-gold transition-all" value={formData.destination} onChange={(e) => setFormData({...formData, destination: e.target.value})} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="global-date" className="text-sm font-medium text-slate-400 flex items-center gap-2"><Calendar className="w-4 h-4 text-taxi-gold" /> Fecha del viaje</label>
              <input id="global-date" required type="date" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-taxi-gold transition-all [color-scheme:dark]" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label htmlFor="global-time" className="text-sm font-medium text-slate-400 flex items-center gap-2"><Clock className="w-4 h-4 text-taxi-gold" /> Horario</label>
              <input id="global-time" required type="time" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-taxi-gold transition-all [color-scheme:dark]" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} />
            </div>
          </div>
          <button type="submit" className="w-full bg-taxi-gold text-taxi-dark py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors shadow-lg shadow-taxi-gold/20">
            <Calculator className="w-6 h-6" />
            Cotizar por WhatsApp
          </button>
        </form>
      </Modal>
    </footer>
  );
}