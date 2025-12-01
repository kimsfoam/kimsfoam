import Link from "next/link";
import Image from "next/image";
import { PhoneIcon } from "@heroicons/react/24/solid";
import { BrandButtonVanilla } from "@/ui/atom/brand-button";
import { LoginContainer } from "@/ui/composite/login-container";

const links = [
  { href: "/home", title: "홈페이지", type: "logo" },
  // { href: "/team", title: "회사 소개", type: "text" },
  { href: "/project", title: "시공 후기", type: "text" },
  { href: "/support", title: "고객 지원", type: "text" },
  { href: "/contact", title: "견적 문의하기 ↗", type: "button" },
] as const;

export const MainNav = () => (
  <section className="h-16 w-full bg-gray-50/75 shadow-sm backdrop-blur-[5px] backdrop-saturate-[180%]">
    <div className="flex h-full w-full items-center justify-between px-6">
      {/* Left */}
      <nav className="flex items-center gap-x-6">
        {links.slice(0, 3).map((link) => (
          <NavItem key={link.href} {...link} />
        ))}
      </nav>

      {/* Right */}
      <div className="flex items-center gap-x-4">
        <ContactBlock />
        <NavItem {...links[3]} />
        <LoginContainer />
      </div>
    </div>
  </section>
);

type NavItemProps = {
  href: string;
  title: string;
  type?: "logo" | "text" | "button";
};
const NavItem = ({ href, title, type = "text" }: NavItemProps) => {
  switch (type) {
    case "logo":
      return (
        <Link href={href} className="mb-0.5 pr-2">
          <Image
            src="/logo/logo-horizontal.png"
            alt={title}
            width={96}
            height={32}
          />
        </Link>
      );

    case "button":
      return <BrandButtonVanilla href={href} title={title} />;

    default:
      return (
        <Link href={href}>
          <p className="text-text-gray hover:text-text-black transition-ease font-semibold">
            {title}
          </p>
        </Link>
      );
  }
};

const ContactBlock = () => (
  <div className="mt-0.5 flex flex-col items-end text-right">
    <h3 className="font-serif">
      지금 바로 <span className="text-brand-red font-semibold">전화</span>상담
    </h3>
    <p className="-mt-1 flex items-center justify-end gap-x-1 text-xl font-bold">
      <PhoneIcon className="text-brand-red size-6" />
      010-4685-9699
    </p>
  </div>
);
