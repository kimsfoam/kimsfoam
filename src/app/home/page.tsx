import { Hero } from "@/ui/composite/main-hero-container";
import { Feature } from "@/ui/composite/main-feature-container";
import { Gallery } from "@/ui/composite/main-gallery-container";
import { MainContactContainer } from "@/ui/composite/main-contact-container";
import Faq from "@/ui/composite/faq";

export default function Home() {
  return (
    <main className="mb-60 flex flex-col items-center justify-start gap-y-[clamp(2rem,4vw,4rem)]">
      <Hero />
      {/*<MainDashboardContainer />*/}
      <Feature />
      <Gallery />
      <MainContactContainer />
      <Faq />
    </main>
  );
}
