import { galleryDatas } from "@/lib/data";
import Image from "next/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { generateSeededHeights, seededSplitRandomGroups } from "@/lib/gallery";
import { GalleryType } from "@/lib/definition";
import { BrandButtonScale } from "@/ui/atom/brand-button";
import { FlexCenter } from "@/ui/atom/flex-box";

export const Gallery = () => {
  const link = {
    href: "/project",
    title: "더 다양한 시공 현장 보러가기 ↗",
  };

  return (
    <section className="bg-background-gray/70 w-full py-16 2xl:px-8">
      <div className="padding-outer flex flex-col items-start justify-start gap-y-2 sm:items-center">
        <h2 className="text-text-black font-serif font-bold">
          킴스폼의 생생한 시공 현장
        </h2>
        <p className="text-small text-text-gray">
          현장 그대로의 모습을 여과 없이 보여드립니다.
        </p>
        <GalleryList />
        <FlexCenter className="z-3 -mt-10">
          <BrandButtonScale href={link.href} title={link.title} />
        </FlexCenter>
      </div>
    </section>
  );
};

const GalleryList = () => {
  const galleries = galleryDatas;

  const today = new Date().toISOString().slice(0, 10);
  let seed = Number(today.replace(/-/g, ""));

  const groups = seededSplitRandomGroups(galleries, seed);

  seed = Number(today.replace(/-/g, ""));
  const heights = generateSeededHeights(galleries.length, seed);

  return (
    <div className="mt-[clamp(0.5rem,0.5rem+2vw,2rem)] flex h-450 w-full max-w-screen flex-row items-start justify-center gap-0.5 overflow-hidden rounded-t-2xl [mask-image:linear-gradient(to_bottom,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black_90%,transparent)]">
      {groups.map((group, i) => (
        <div
          key={i}
          className={`flex flex-1 flex-col items-center justify-start gap-0.5 ${i == 2 ? "hidden lg:flex" : ""} ${i == 3 ? "hidden xl:flex" : ""} ${i == 4 ? "hidden 2xl:flex" : ""}`}
        >
          {group.map((g, j) => (
            <GalleryCard gallery={g} height={heights[i * 5 + j]} key={j} />
          ))}
        </div>
      ))}
    </div>
  );
};

const GalleryCard = ({
  gallery,
  height,
}: {
  gallery: GalleryType;
  height: number;
}) => {
  return (
    <a
      href={gallery.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-60 w-full flex-col items-start justify-start overflow-hidden bg-gray-200/50"
      style={{ height: `${height * 4}px` }}
    >
      <Image
        src={gallery.image}
        alt={gallery.title}
        fill
        className="transition-ease object-cover group-hover:scale-110"
      />
      <div className="transition-ease absolute bottom-0 flex w-full flex-row items-center justify-between bg-gradient-to-b from-transparent to-black/80 p-4 opacity-0 group-hover:opacity-100">
        <p className="font-semibold text-white">{gallery.title}</p>
        <ArrowTopRightOnSquareIcon className="-top-0.5 size-6 stroke-2 text-white" />
      </div>
    </a>
  );
};
