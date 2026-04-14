// ✅ CAMBIO: Refactorizado a Carrusel Infinito (Marquee) con Framer Motion
"use client";

import { motion } from "framer-motion";
import { Star, MessageSquareQuote } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";

export default function TestimonialsSection() {
  const testimonials = [
    { name: "Mariana L.", review: "Excelente servicio. Claudio me esperó en Ezeiza de madrugada, el auto impecable y maneja súper prudente. Lo súper recomiendo.", rating: 5 },
    { name: "Carlos G.", review: "Viajo siempre al interior por trabajo y Claudio es mi chófer de confianza. Puntualidad inglesa y el Chevrolet es comodísimo.", rating: 5 },
    { name: "Sofía R.", review: "Contratamos el servicio para el casamiento de mi hermana. Un lujo la atención, súper amable y predispuesto en todo momento.", rating: 5 },
    { name: "Diego F.", review: "Lo uso siempre para ir al aeropuerto. Saber que el viaje va a ser seguro y puntual me da mucha tranquilidad.", rating: 5 },
  ];

  // Duplicamos el array para crear la ilusión de que es infinito
  const infiniteTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-24 px-4 bg-slate-950 overflow-hidden">
      <div className="max-w-6xl mx-auto mb-12">
        <SectionHeader 
          title="Lo que dicen" 
          highlight="Nuestros Pasajeros" 
          subtitle="La confianza de quienes nos eligen todos los días para llegar a destino."
        />
      </div>

      {/* Contenedor del Marquee */}
      <div className="relative w-full overflow-hidden flex">
        {/* Degradados en los bordes para que parezca que entran y salen de la nada */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        {/* ✅ LA MAGIA: Pista animada infinita */}
        <motion.div 
          className="flex gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }} // Se mueve hasta la mitad y vuelve a empezar invisiblemente
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 35 // Cambiá este número para que vaya más rápido o más lento
          }}
        >
          {infiniteTestimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="w-[350px] md:w-[450px] bg-taxi-dark p-8 rounded-2xl border border-slate-800 relative flex-shrink-0 hover:border-taxi-gold/30 transition-colors"
            >
              <MessageSquareQuote className="absolute top-6 right-6 w-8 h-8 text-slate-800" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-taxi-gold text-taxi-gold" />
                ))}
              </div>
              
              <p className="text-slate-300 italic mb-6 text-lg relative z-10">"{testimonial.review}"</p>
              
              <div className="flex items-center gap-3 border-t border-slate-800 pt-4">
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-taxi-gold font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <span className="font-bold text-white">{testimonial.name}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}