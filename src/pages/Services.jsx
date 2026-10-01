import PageHeader from "../components/PageHeader";
import ServicesSection from "../components/ServicesSection";
import HowItWorks from "../components/HowItWorks";
import WhyChooseUs from "../components/WhyChooseUs";
import CTA from "../components/CTA";
import { useSeo } from "../hooks/useSeo";

export default function Services() {
  useSeo({ title: "Services | 02 Automobile Company", description: "Vehicle sales, sourcing, inspection assistance, trade-in enquiries, delivery coordination and after-sales support from 02 Automobile Company.", path: "/services" });
  return (
    <>
      <PageHeader title="Our Services" text="Support at every stage, from finding the right vehicle to life after purchase." />
      <ServicesSection heading="What we do" as="h2" />
      <HowItWorks />
      <WhyChooseUs />
      <CTA />
    </>
  );
}
