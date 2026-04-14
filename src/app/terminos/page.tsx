// ✅ PÁGINA COMPLETA: Términos y Condiciones (Sin Footer, con navegación de retorno)
import Link from "next/link";
import { ChevronLeft, ShieldCheck, Scale, Car, Clock, Luggage } from "lucide-react";

export const metadata = {
  title: "Términos y Condiciones | Claudio Taxi",
  description: "Términos, condiciones y políticas de servicio de Claudio Taxi.",
};

export default function TerminosPage() {
  const lastUpdate = "15 de Mayo de 2024";

  return (
    <main className="relative flex-grow pt-32 pb-20 px-4 min-h-screen bg-taxi-dark">
      <div className="max-w-4xl mx-auto">
        
        {/* Encabezado y Navegación de Retorno */}
        <div className="mb-12">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-taxi-gold hover:text-white transition-colors font-bold uppercase text-xs tracking-widest mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Volver al Inicio
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
            Términos y <span className="text-taxi-gold">Condiciones</span>
          </h1>
          
          <p className="text-slate-400 flex items-center gap-2 text-sm">
            <ShieldCheck className="w-5 h-5 text-taxi-gold" />
            Última actualización: {lastUpdate}
          </p>
        </div>

        {/* Bloque de Contenido Legal */}
        <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-8 md:p-14 shadow-2xl space-y-12">
          
          {/* Sección 1 */}
          <section>
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-5">
              <Scale className="w-6 h-6 text-taxi-gold" />
              1. Condiciones Generales
            </h2>
            <div className="text-slate-400 space-y-4 leading-relaxed">
              <p>
                Al solicitar o utilizar los servicios de transporte privado de <strong>Claudio Taxi</strong> (en adelante, "el Servicio"), el cliente o pasajero acepta expresamente los términos y condiciones aquí detallados. 
              </p>
              <p>
                El Servicio se especializa en el traslado de pasajeros en la Ciudad Autónoma de Buenos Aires (CABA) y el Gran Buenos Aires (GBA), operando bajo estándares de puntualidad, confort y seguridad.
              </p>
            </div>
          </section>

          {/* Sección 2 */}
          <section>
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-5">
              <Clock className="w-6 h-6 text-taxi-gold" />
              2. Reservas, Esperas y Cancelaciones
            </h2>
            <div className="text-slate-400 space-y-4 leading-relaxed">
              <ul className="list-disc pl-5 space-y-3">
                <li>
                  <strong>Reservas Anticipadas:</strong> Para garantizar la disponibilidad de Claudio, se recomienda realizar las reservas con al menos 24 horas de antelación.
                </li>
                <li>
                  <strong>Tolerancia de Espera:</strong> Se establece un tiempo de cortesía de <strong>15 minutos</strong> en el punto de recogida acordado. Superado este lapso, se podrá aplicar un recargo por espera o cancelar el servicio si afecta a otros compromisos programados.
                </li>
                <li>
                  <strong>Política de Cancelación:</strong> El cliente debe avisar cualquier cancelación con un mínimo de <strong>2 horas</strong> de anticipación. Las cancelaciones efectuadas con el conductor ya presente en el domicilio podrán ser facturadas con el valor de un viaje mínimo.
                </li>
              </ul>
            </div>
          </section>

          {/* Sección 3 */}
          <section>
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-5">
              <Car className="w-6 h-6 text-taxi-gold" />
              3. Tarifas, Peajes y Pagos
            </h2>
            <div className="text-slate-400 space-y-4 leading-relaxed">
              <p>
                Las cotizaciones brindadas vía WhatsApp o el planificador web son aproximadas. El valor final puede ajustarse por factores externos no previstos.
              </p>
              <ul className="list-disc pl-5 space-y-3">
                <li>
                  <strong>Peajes:</strong> El costo de los peajes (ida y vuelta en caso de viajes fuera de jurisdicción) es responsabilidad del pasajero, salvo acuerdo previo.
                </li>
                <li>
                  <strong>Desvíos:</strong> Cualquier cambio de ruta solicitado por el pasajero durante el trayecto invalidará la cotización previa y se ajustará al nuevo recorrido.
                </li>
              </ul>
            </div>
          </section>

          {/* Sección 4 */}
          <section>
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-5">
              <Luggage className="w-6 h-6 text-taxi-gold" />
              4. Capacidad y Seguridad del Pasajero
            </h2>
            <div className="text-slate-400 space-y-4 leading-relaxed">
              <p>
                Por razones de seguridad y reglamentación, el vehículo tiene una capacidad máxima de <strong>3 pasajeros</strong>. 
              </p>
              <p>
                El uso del <strong>cinturón de seguridad</strong> es obligatorio para todos los ocupantes durante todo el trayecto. Claudio Taxi no se responsabiliza por objetos personales olvidados en el vehículo, aunque se compromete a facilitar su devolución en caso de ser hallados.
              </p>
            </div>
          </section>

          {/* Sección 5 */}
          <section>
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-5">
              <ShieldCheck className="w-6 h-6 text-taxi-gold" />
              5. Derecho de Admisión y Conducta
            </h2>
            <div className="text-slate-400 space-y-4 leading-relaxed">
              <p>
                Para proteger la integridad del conductor y el estado del vehículo, se reserva el <strong>derecho de admisión</strong>. No se realizarán traslados si:
              </p>
              <ul className="list-disc pl-5 space-y-3">
                <li>El pasajero presenta un comportamiento violento o agresivo.</li>
                <li>Se encuentra bajo efectos evidentes de alcohol o sustancias.</li>
                <li>Se intenta fumar o consumir alimentos/bebidas dentro de la unidad sin autorización.</li>
              </ul>
            </div>
          </section>

        </div>

        {/* Pie de página legal simple */}
        <div className="mt-16 text-center">
          <p className="text-slate-600 text-xs uppercase tracking-[0.3em]">
            Claudio Taxi &copy; {new Date().getFullYear()} • Compromiso con la Excelencia
          </p>
        </div>

      </div>
    </main>
  );
}