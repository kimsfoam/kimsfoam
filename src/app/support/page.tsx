import { SupportWayContainer } from "@/ui/composite/support-way-container";
import Faq from "@/ui/composite/faq";

export default function Support() {
  return (
    <main className="mb-120 flex flex-col items-center justify-start gap-y-[clamp(2rem,4vw,4rem)]">
      <SupportWayContainer />
      <Faq />
    </main>
  );
}
