import { ContactHeroContainer } from "@/ui/composite/contact-hero-container";
import { ContactQuestionContainer } from "@/ui/composite/contact-question-container";
import { ContactEstimateContainer } from "@/ui/composite/contact-estimate-container";
import { ProjectContainer } from "@/ui/composite/project-container";

export default function Project() {
  return (
    <main className="mb-120 flex flex-col items-center justify-start gap-y-[clamp(2rem,4vw,4rem)]">
      <ProjectContainer />
    </main>
  );
}
