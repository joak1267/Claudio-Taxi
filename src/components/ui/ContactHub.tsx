// ✅ VERSIÓN DEFINITIVA: Botón verde oficial, mensajes cíclicos y panel de contacto triple
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X, Phone, MessageCircle } from "lucide-react";
import { CONTACT_INFO, getWhatsAppLink } from "../../lib/constants";

export default function ContactHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [messageIndex, setMessageIndex] = useState(-1);
  const [isBubbleVisible, setIsBubbleVisible] = useState(false);

  // Mensajes que aparecen en la burbuja
  const messages = [
    "¿Necesitás un viaje para hoy? 👋",
    "Cualquier duda, consultame aquí. 🚕",
    "¿Querés cotizar un viaje largo? 🗺️"
  ];

  // Lógica de los mensajes cíclicos (7s visible, 10s oculto)
  useEffect(() => {
    const firstTimer = setTimeout(() => {
      setMessageIndex(0);
      setIsBubbleVisible(true);
    }, 2000);
    return () => clearTimeout(firstTimer);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isBubbleVisible) {
      timer = setTimeout(() => setIsBubbleVisible(false), 7000);
    } else if (messageIndex !== -1 && !isOpen) {
      timer = setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % messages.length);
        setIsBubbleVisible(true);
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [isBubbleVisible, messageIndex, isOpen]);

  const contactOptions = [
    {
      name: "WhatsApp",
      icon: <Phone className="w-5 h-5" />,
      link: getWhatsAppLink(),
      color: "bg-[#25D366]",
      label: "Chateá ahora"
    },
    {
      name: "Gmail",
      icon: <Mail className="w-5 h-5" />,
      link: "mailto:reservas@claudiotaxi.com",
      color: "bg-[#EA4335]",
      label: "Envianos un mail"
    },
    {
      name: "Instagram",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
      ),
      link: "https://instagram.com/tu_usuario",
      color: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
      label: "Seguinos"
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[110] flex flex-col items-end gap-3">
      
      {/* Burbuja de Mensaje Automática (Solo si el panel está cerrado) */}
      <AnimatePresence>
        {isBubbleVisible && !isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white text-slate-900 px-4 py-3 rounded-2xl rounded-br-none shadow-xl text-sm font-bold border border-slate-200 relative mb-1"
          >
            {messages[messageIndex]}
            <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white rotate-45 border-r border-b border-slate-200" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel de Opciones (Se abre hacia arriba) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-slate-900/95 backdrop-blur-xl border border-white/10 p-3 rounded-3xl shadow-2xl flex flex-col gap-2 min-w-[220px] mb-2"
          >
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-3 mt-1 mb-1">
              ¿Cómo prefieres contactar?
            </p>
            
            {contactOptions.map((option) => (
              <a 
                key={option.name}
                href={option.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 transition-colors group"
                onClick={() => setIsOpen(false)}
              >
                <div className={`w-10 h-10 ${option.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                  {option.icon}
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-none mb-1">{option.name}</p>
                  <p className="text-slate-500 text-xs leading-none">{option.label}</p>
                </div>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón Principal (Verde oficial cuando está cerrado) */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen 
            ? "bg-white text-slate-900 rotate-90" 
            : "bg-[#25D366] text-white shadow-[#25D366]/40"
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          /* Ícono Real de WhatsApp SVG */
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.394 0 12.03c0 2.12.556 4.188 1.612 6.04L0 24l6.117-1.605a11.837 11.837 0 005.925 1.577h.005c6.632 0 12.032-5.395 12.035-12.03a11.782 11.782 0 00-3.417-8.467z"/>
          </svg>
        )}
      </motion.button>
    </div>
  );
}