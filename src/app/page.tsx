// ✅ HOME LIMPIA: El crédito ahora vive dentro del componente Footer
import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import VehicleSection from "../components/home/VehicleSection";
import ServicesSection from "../components/home/ServicesSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import ProfileSection from "../components/home/ProfileSection";
import Footer from "../components/ui/Footer";

export default function Home() {
  return (
    <main className="relative flex-grow overflow-x-hidden">
      <HeroSection />
      <StatsSection />
      <VehicleSection />
      <ServicesSection />
      <TestimonialsSection />
      <ProfileSection />
      <Footer />
    </main>
  );
}