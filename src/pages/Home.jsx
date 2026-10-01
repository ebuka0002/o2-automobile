import Hero from "../components/Hero";
import VehicleSearch from "../components/VehicleSearch";
import FeaturedVehicles from "../components/FeaturedVehicles";
import TrustStats from "../components/TrustStats";
import AboutSection from "../components/AboutSection";
import WhyChooseUs from "../components/WhyChooseUs";
import ServicesSection from "../components/ServicesSection";
import HowItWorks from "../components/HowItWorks";
import Brands from "../components/Brands";
import Testimonials from "../components/Testimonials";
import Insights from "../components/Insights";
import CTA from "../components/CTA";
import { useSeo } from "../hooks/useSeo";
import { homeSchema } from "../lib/schema";

export default function Home() {
  useSeo({
    title: "02 Automobile Company | Quality Vehicles & Automotive Services",
    description: "Explore quality vehicles and professional automotive services from 02 Automobile Company. Find your next vehicle and connect with our team today.",
    path: "/",
    jsonLd: homeSchema(),
  });
  return (
    <>
      <Hero />
      <VehicleSearch />
      <FeaturedVehicles />
      <TrustStats />
      <AboutSection />
      <WhyChooseUs />
      <ServicesSection />
      <HowItWorks />
      <Brands />
      <Testimonials />
      <Insights />
      <CTA />
    </>
  );
}
