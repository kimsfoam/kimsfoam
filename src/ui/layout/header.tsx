import { AdBanner } from "@/ui/composite/ad-banner";
import { MainNav } from "@/ui/composite/main-nav";

export const Header = () => {
  return (
    <header className="sticky top-0 z-6 w-full">
      <AdBanner />
      <MainNav />
    </header>
  );
};
