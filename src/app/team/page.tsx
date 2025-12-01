import { ProjectContainer } from "@/ui/composite/project-container";
import { TeamHeroContainer } from "@/ui/composite/team-hero-container";
import Image from "next/image";
import { TeamCeoContainer } from "@/ui/composite/team-ceo-container";

export default function Team() {
  return (
    <main className="mb-120 flex flex-col items-center justify-start gap-y-[clamp(2rem,4vw,4rem)]">
      <TeamHeroContainer />
      <TeamCeoContainer />
    </main>
  );
}
