// ✅ LAYOUT: Mantiene el Header y el ContactHub globales, pero libera el Footer
import "./globals.css";
import Header from "../components/ui/Header";
import ContactHub from "../components/ui/ContactHub"; 

export const metadata = {
  title: "Claudio Taxi",
  description: "Servicio de transporte privado Premium en CABA y GBA.",
  icons: {
    icon: "/favicon.ico", // Asegurate de que el archivo esté en la carpeta /public
    apple: "/apple-touch-icon.png", // Ícono para cuando guardan la web en el iPhone
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="bg-taxi-dark text-white antialiased">
        <Header />
        
        {/* Aquí cargan las páginas */}
        {children} 
        
        <ContactHub />

        {/* El Footer ya no está aquí para poder controlarlo por página */}
      </body>
    </html>
  );
}