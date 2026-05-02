import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import CaraKerjaSection from "@/components/landing/CaraKerjaSection";
import PricingSection from "@/components/landing/PricingSection";
import PortofolioSection from "@/components/landing/PortofolioSection";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <CaraKerjaSection />
      <PricingSection />
      <PortofolioSection />
      <Footer />
    </main>
  );
}
