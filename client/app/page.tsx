import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import FeaturedCategories from "@/components/FeaturedCategories";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import NearbyShopsMarquee from "@/components/NearbyShopsMarquee";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30">
      <Navbar />
      <div className="flex-1">
        <Hero />
        <NearbyShopsMarquee />
        <HowItWorks />
        <FeaturedCategories />
        <CallToAction />
      </div>
      <Footer />
    </main>
  );
}
