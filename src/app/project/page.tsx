import { ProjectContainer } from "@/ui/composite/project-container";

export const dynamic = "force-dynamic";

export default function Project() {
  return (
    <main className="mb-120 flex flex-col items-center justify-start gap-y-[clamp(2rem,4vw,4rem)]">
      <ProjectContainer />
    </main>
  );
}
