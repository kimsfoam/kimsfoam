import Link from "next/link";
import Image from "next/image";
import { FlexCenter } from "@/ui/atom/flex-box";
import { NewspaperIcon, ViewfinderCircleIcon } from "@heroicons/react/24/solid";

export const Footer = () => {
  return (
    <footer className="bg-background-gray mb-16 flex w-full flex-row items-center justify-center p-8 sm:mb-0">
      <section className="padding-outer flex w-full max-w-7xl flex-col gap-y-16">
        <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-5">
          <Link href="/home" className="shrink-0">
            <Image
              src="/logo/logo-vertical.png"
              alt="logo"
              width={96}
              height={96}
            />
          </Link>
          <div className="col-span-2 flex flex-col">
            <h3 className="text-text-black mb-2 font-bold">사업자 정보</h3>
            <p className="text-small text-text-gray">
              사업자등록번호 <span className="font-semibold">702-08-02721</span>
            </p>
            <p className="text-small text-text-gray">
              대표 <span className="font-semibold">김준민</span>
            </p>
            <p className="text-small text-text-gray">
              회사주소{" "}
              <span className="font-semibold">
                전북특별자치도 익산시 만석동 462-1 2동
              </span>
            </p>
            <p className="text-small text-text-gray">
              연락처 <span className="font-semibold">010-4685-9699</span>
            </p>
            <p className="text-small text-text-gray">
              이메일 <span className="font-semibold">kimsfoam@naver.com</span>
            </p>
          </div>
          <div className="col-span-2 flex flex-col">
            <h3 className="text-text-black mb-2 font-bold">이용약관</h3>
            <p className="text-small text-text-gray cursor-pointer underline">
              개인정보처리방침
            </p>
          </div>
        </div>
        <div className="flex w-full flex-row items-start justify-start gap-4">
          <RoundIcon url="https://www.instagram.com/kims_foam/">
            <ViewfinderCircleIcon className="text-brand-base size-5" />
          </RoundIcon>
          <RoundIcon url="https://blog.naver.com/kimsfoam">
            <NewspaperIcon className="text-brand-base size-5" />
          </RoundIcon>
        </div>
      </section>
    </footer>
  );
};

const RoundIcon = ({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) => {
  return (
    <a href={url} target="_blank" rel="noreferrer noopener">
      <FlexCenter className="bg-text-black transition-ease flex-col rounded-full p-2 hover:scale-125">
        {children}
      </FlexCenter>
    </a>
  );
};
