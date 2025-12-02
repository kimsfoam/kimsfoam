import { MainMobileNav } from "@/ui/composite/main-nav";

export const MobileHeader = () => {
  return (
    <header className="fixed bottom-0 z-6 w-full">
      <div className="block sm:hidden">
        <MainMobileNav />
      </div>
    </header>
  );
};
