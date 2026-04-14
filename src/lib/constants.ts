// ✅ VERSIÓN FINAL: Todas las variables y funciones de ruteo de WhatsApp centralizadas

export const SITE_CONFIG = {
  name: "Claudio Taxi",
  description: "Servicio de transporte privado Premium en CABA y GBA.",
  url: "https://claudio-taxi.vercel.app",
};

export const CONTACT_INFO = {
  // RECORDATORIO: Reemplazar con el número real de tu papá antes de publicar
  whatsapp: "5491136972536", 
  defaultMessage: "Hola Claudio, necesito consultar por un viaje.",
};

// ✅ FUNCIÓN 1: Mensaje Genérico (Usado en el Hero y Botón Flotante)
export const getWhatsAppLink = (message: string = CONTACT_INFO.defaultMessage) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodedMessage}`;
};

// ✅ FUNCIÓN 2: Mensaje para Viaje a Medida (Usado en CustomTripBuilder)
export const getQuoteLink = (origin: string, destination: string, date: string, time: string, passengers: number) => {
  const message = `Hola Claudio, me gustaría cotizar un viaje personalizado.%0A%0A👥 *Pasajeros:* ${passengers}%0A📍 *Origen:* ${origin}%0A🏁 *Destino:* ${destination}%0A📅 *Fecha:* ${date}%0A⏰ *Hora:* ${time}%0A%0A¿Me podrías confirmar disponibilidad?`;
  return `https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`;
};

// ✅ FUNCIÓN 3: Mensaje para Servicios Rápidos (Usado en QuickServices)
export const getServiceQuoteLink = (serviceName: string, origin: string, date: string, time: string, passengers: number) => {
  const message = `Hola Claudio, me gustaría reservar: *${serviceName}*.%0A%0A👥 *Pasajeros:* ${passengers}%0A📍 *Punto de Partida:* ${origin}%0A📅 *Fecha:* ${date}%0A⏰ *Hora:* ${time}%0A%0A¿Estás disponible?`;
  return `https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`;
};