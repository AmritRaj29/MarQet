import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeBand from "@/components/MarqueeBand";
import FeatureShowcase from "@/components/FeatureShowcase";
import HowItWorks from "@/components/HowItWorks";
import LiveStats from "@/components/LiveStats";
import ProductShowcase from "@/components/ProductShowcase";
import ForSellers from "@/components/ForSellers";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30 overflow-x-hidden">
      <Navbar />
      <div className="flex-1 w-full overflow-hidden relative">
        <Hero />
        <MarqueeBand />
        <FeatureShowcase />
        <HowItWorks />
        <LiveStats />
        <ProductShowcase />
        <ForSellers />
        <Testimonials />
        <FAQ />
        <CallToAction />
      </div>
      <Footer />
    </main>
  );
}
