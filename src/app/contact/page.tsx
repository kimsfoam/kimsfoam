import { ContactHeroContainer } from "@/ui/composite/contact-hero-container";
import { ContactQuestionContainer } from "@/ui/composite/contact-question-container";

export default function Contact() {
  return (
    <main className="mb-120 flex flex-col items-center justify-start gap-y-4 sm:gap-y-6">
      <ContactHeroContainer />
      <ContactQuestionContainer />
      {/*<ContactEstimateContainer />*/}
    </main>
  );
}
