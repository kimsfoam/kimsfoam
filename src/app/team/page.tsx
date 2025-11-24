import { ProjectContainer } from "@/ui/composite/project-container";
import { TeamContainer } from "@/ui/composite/team-container";
import Image from "next/image";

export default function Team() {
  return (
    <main className="mb-120 flex flex-col items-center justify-start gap-y-[clamp(2rem,4vw,4rem)]">
      <TeamContainer />
    </main>
  );
}
