import { ProjectType } from "@/lib/definition";
import { prisma } from "@/lib/prisma";

export const ProjectContainer = () => {
  return (
    <section className="relative w-full py-16">
      <div className="padding-outer flex flex-col items-start justify-start gap-y-2 sm:items-center">
        <h2 className="text-text-black font-serif font-bold">시공 후기</h2>
        <ProjectList />
      </div>
    </section>
  );
};

const ProjectList = async () => {
  const projects = await prisma.project.findMany({
    orderBy: { date: "desc" },
    take: 100,
  });

  return (
    <div className="flex flex-col">
      {projects.map((project) => (
        <ProjectCard {...project} key={project.id} />
      ))}
    </div>
  );
};

const ProjectCard = ({
  title,
  url,
  thumbnail,
  buildingType,
  date,
}: ProjectType) => {
  return (
    <div className="card-gray transition-ease flex w-full cursor-pointer flex-col items-start justify-start rounded-2xl">
      l
    </div>
  );
};
