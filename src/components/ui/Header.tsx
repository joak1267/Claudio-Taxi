// ✅ HEADER COMPLETO: Con el nuevo mail de Claudio y el panel de contacto funcional
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Car, Phone, Mail, X as CloseIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getWhatsAppLink } from "../../lib/constants";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactPanelOpen, setIsContactPanelOpen] = useState(false); 
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      link: "mailto:claudiogildiazjc@gmail.com", // ✅ NUEVO MAIL
      color: "bg-[#EA4335]", 
      label: "Envianos un mail" 
    },
    { 
      name: "Instagram", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
      ), 
      link: "https://www.instagram.com/claudiogildiaz", 
      color: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]", 
      label: "Seguinos" 
    }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? "py-4 bg-taxi-dark/90 backdrop-blur-xl border-b border-white/5" : "py-6 bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-taxi-gold rounded-lg"><Car className="w-5 h-5 text-taxi-dark" /></div>
            <span className="text-xl font-black text-white tracking-tighter uppercase">Claudio<span className="text-taxi-gold">Taxi</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            <Link href={isHome ? "#hero" : "/"} className="text-slate-300 hover:text-taxi-gold transition-colors font-bold uppercase text-xs tracking-[0.2em]">Inicio</Link>
            <Link href="/servicios" className={`font-bold uppercase text-xs tracking-[0.2em] transition-colors ${pathname === "/servicios" ? "text-taxi-gold" : "text-slate-300 hover:text-white"}`}>Servicios</Link>
            
            <button 
              onClick={() => setIsContactPanelOpen(true)}
              className="text-slate-300 hover:text-taxi-gold transition-colors font-bold uppercase text-xs tracking-[0.2em]"
            >
              Contacto
            </button>
          </nav>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden text-white p-2"
            aria-label="Abrir o cerrar menú"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isContactPanelOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsContactPanelOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-slate-900 border border-white/10 p-6 rounded-[32px] shadow-2xl w-full max-w-sm overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest">¿Cómo prefieres contactar?</p>
                <button onClick={() => setIsContactPanelOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-slate-400" aria-label="Cerrar panel de contacto">
                  <CloseIcon className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {contactOptions.map((option) => (
                  <a key={option.name} href={option.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group" onClick={() => setIsContactPanelOpen(false)}>
                    <div className={`w-12 h-12 ${option.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>{option.icon}</div>
                    <div><p className="text-white font-bold">{option.name}</p><p className="text-slate-500 text-xs">{option.label}</p></div>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="fixed inset-0 z-[90] bg-taxi-dark flex flex-col items-center justify-center gap-12 md:hidden">
            <Link href={isHome ? "#hero" : "/"} onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-black text-white uppercase italic">Inicio</Link>
            <Link href="/servicios" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-black text-white uppercase italic">Servicios</Link>
            <button onClick={() => { setIsMobileMenuOpen(false); setIsContactPanelOpen(true); }} className="text-4xl font-black text-white uppercase italic">Contacto</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}