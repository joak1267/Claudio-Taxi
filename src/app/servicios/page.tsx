// ✅ SERVICIOS COMPLETA: Mantiene el Footer al final
import QuickServices from "../../components/servicios/QuickServices";
import CustomTripBuilder from "../../components/servicios/CustomTripBuilder";
import Footer from "../../components/ui/Footer";

export default function ServiciosPage() {
  return (
    <main className="relative flex-grow overflow-x-hidden pt-20">
      
      <section className="pt-20 pb-10 px-4 text-center bg-taxi-dark">
        <h1 className="text-4xl md:text-6xl font-black mb-6 text-white italic tracking-tighter">
          NUESTROS <span className="text-taxi-gold">SERVICIOS</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto uppercase tracking-widest">
          Elegí uno de nuestros servicios frecuentes para una reserva rápida, o planificá una ruta 100% a tu medida.
        </p>
      </section>

      <QuickServices />

      <div className="w-full max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent my-10" />

      <CustomTripBuilder />

      {/* Agregamos el Footer al final de Servicios */}
      <Footer />
    </main>
  );
}