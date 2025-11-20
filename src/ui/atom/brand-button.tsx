import Link from "next/link";

type BrandButtonProps = {
  href: string;
  title: string;
};

export const BrandButtonVanilla = ({ href, title }: BrandButtonProps) => (
  <Link
    href={href}
    className="transition-ease group button-brand rounded-full px-5 py-2"
  >
    <p className="text-gray-dark/80 group-hover:text-gray-dark font-serif text-lg font-semibold">
      {title}
    </p>
  </Link>
);

export const BrandButtonScale = ({ href, title }: BrandButtonProps) => (
  <Link
    href={href}
    className="transition-ease group button-brand rounded-full px-8 py-3 hover:scale-105"
  >
    <p className="text-gray-dark/80 group-hover:text-gray-dark font-serif text-lg font-semibold">
      {title}
    </p>
  </Link>
);

export const BrandButtonProgress = ({ href, title }: BrandButtonProps) => {
  return (
    <Link
      href={href}
      className="bg-brand-base transition-ease group relative hidden overflow-hidden rounded-full px-8 py-3 shadow-sm select-none hover:scale-105 lg:block"
    >
      <span className="bg-brand-base-dark absolute inset-0 top-0 left-0 w-0 transition-all duration-500 group-hover:w-full"></span>

      <p className="text-gray-dark/80 group-hover:text-gray-dark relative z-1 font-serif text-2xl font-semibold">
        {title}
      </p>
    </Link>
  );
};
