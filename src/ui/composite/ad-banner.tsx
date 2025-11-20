import { XMarkIcon } from "@heroicons/react/24/outline";

export const AdBanner = () => {
  return (
    <section className="bg-background-red relative h-8 w-full has-checked:hidden">
      <div className="flex h-full w-full flex-row items-center justify-center font-bold text-white">
        <p>지금 견적 신청하면 최대 10% 특별할인</p>
        <label className="absolute right-1 z-7 cursor-pointer">
          <XMarkIcon className="size-6 stroke-2" />
          <input type="checkbox" className="sr-only" />
        </label>
      </div>
    </section>
  );
};
