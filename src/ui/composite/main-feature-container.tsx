import { featureDatas } from "@/lib/data";
import { FeatureType } from "@/lib/definition";
import Image from "next/image";
import { FlexCenter, FlexRight } from "@/ui/atom/flex-box";
import Link from "next/link";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";

export const Feature = () => {
  return (
    <section className="w-full pb-16">
      <div className="padding-outer flex flex-col items-start justify-start gap-y-2 sm:items-center">
        <h2 className="text-text-black font-serif font-bold">
          킴스폼이 지키는 것, 중요하게 여기는 기준
        </h2>
        <p className="text-small text-text-gray">
          검증된 자재와 전문 장비, 꼼꼼한 시공으로 믿을 수 있는 단열을
          제공합니다.
        </p>
        <FeatureList />
      </div>
    </section>
  );
};

const FeatureList = () => {
  const features = featureDatas;

  return (
    <div className="mt-[clamp(0.5rem,0.5rem+2vw,2rem)] grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <FeatureCard {...features[1]} />
      <FeatureCard {...features[2]} />
      <FeatureCard {...features[3]} />
      <FeatureCard {...features[4]} />
      <FeatureCard {...features[5]} />
      <div className="hidden md:row-span-2 md:block">
        <TeamLinkCard />
      </div>

      <FeatureCard {...features[6]} />
      <FeatureCard {...features[7]} />
    </div>
  );
};

const FeatureCard = ({ title, description, image }: FeatureType) => {
  return (
    <div className="card-gray transition-ease flex w-full cursor-default flex-col items-start justify-start rounded-2xl p-6">
      {image && (
        <FlexCenter>
          <Image
            src={image}
            alt={title}
            width={256}
            height={192}
            className="pb-4 mix-blend-multiply grayscale-50"
          />
        </FlexCenter>
      )}

      <h3 className="text-text-black pb-1 font-extrabold">{title}</h3>
      <p className="text-text-gray">{description}</p>
    </div>
  );
};

const TeamLinkCard = () => {
  return (
    <Link
      href="/team"
      className="group bg-text-black transition-ease relative flex h-50 w-full flex-col items-start justify-between rounded-2xl p-6"
    >
      <div className="relative -top-2 flex flex-col items-start justify-start">
        <h2 className="font-bold text-white">킴스폼</h2>
        {/*<p className="text-white/80">더 자세히 알아보기</p>*/}
      </div>

      <FlexRight>
        <ArrowRightCircleIcon className="transition-ease size-10 text-white/50 group-hover:text-white" />
        {/*<div className="flex flex-row items-center justify-end gap-x-1 rounded-full bg-white/50 px-4 py-2">*/}
        {/*  <p className="text-text-black font-bold">더 자세히 알아보기</p>*/}
        {/*  <ArrowRightIcon className="ease-transition text-text-black size-4 font-bold" />*/}
        {/*</div>*/}
      </FlexRight>
    </Link>
  );
};
