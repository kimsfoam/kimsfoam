import {
  NewspaperIcon,
  PhoneIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/solid";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export const SupportWayContainer = () => {
  return (
    <section className="w-full py-16">
      <div className="padding-outer flex flex-col items-start justify-start gap-y-2 md:items-center">
        <h2 className="text-text-black font-extrabold">킴스폼 둘러보기</h2>
        <p className="text-small text-text-gray">
          연락 가능 시간: 오전 8시~오후 10시
        </p>
        <WayList />
      </div>
    </section>
  );
};

const WayList = () => {
  return (
    <div className="mt-[clamp(0.5rem,0.5rem+2vw,2rem)] grid w-full max-w-6xl grid-cols-2 gap-4 md:grid-cols-3">
      <WayIcon url="tel:010-4685-9699" className="col-span-2 md:col-span-1">
        <PhoneIcon className="text-text-black mb-4 size-10" />
        <div className="flex flex-col items-center gap-x-1">
          <p className="text-description text-text-black font-semibold">
            대표 전화
          </p>
          <p className="text-description text-text-gray">010-4685-9699</p>
        </div>
      </WayIcon>
      <WayIcon url="https://www.instagram.com/kims_foam/">
        <ViewfinderCircleIcon className="text-text-black mb-4 size-10" />
        <div className="flex flex-row items-center gap-x-1">
          <p className="text-description text-text-black font-semibold">
            인스타
          </p>
          <ArrowTopRightOnSquareIcon className="text-text-gray size-4" />
        </div>
      </WayIcon>
      <WayIcon url="https://blog.naver.com/kimsfoam">
        <NewspaperIcon className="text-text-black mb-4 size-10" />
        <div className="flex flex-row items-center gap-x-1">
          <p className="text-description text-text-black font-semibold">
            블로그
          </p>
          <ArrowTopRightOnSquareIcon className="text-text-gray size-4" />
        </div>
      </WayIcon>
    </div>
  );
};

const WayIcon = ({
  url,
  children,
  className = "",
}: {
  url: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      className={`transition-ease flex-shrink-0 cursor-pointer hover:scale-110 ${className}`}
    >
      <div className="transition-ease flex w-full flex-col items-center justify-start rounded-2xl p-12">
        {children}
      </div>
    </a>
  );
};
