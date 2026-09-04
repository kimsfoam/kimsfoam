"use client";

import { buildingEnum, QuoteType, solutionEnum } from "@/lib/definition";
import {
  projectCitiesByRegion,
  projectRegions,
  ProjectRegion,
} from "@/lib/project-regions";
import { submitQuote } from "@/lib/quote";
import {
  CheckCircleIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import {
  CheckIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import React, { useMemo, useState } from "react";

const scheduleOptions = [
  "최대한 빨리",
  "2주 이내",
  "1개월 이내",
  "일정 미정",
];

const solutionCards = [
  {
    name: "수성연질폼",
    keywords: "복잡한 구조 · 기밀 · 흡음",
    description: [
      "높은 발포성과 유연성으로 작은 틈과 복잡한 구조까지 채우기 좋습니다.",
      "목조주택, 벽체·천장 등 기밀과 흡음이 필요한 공간에 적합합니다.",
    ],
  },
  {
    name: "저밀도폼",
    keywords: "단열성능 · 경제성 · 일반건축",
    description: [
      "수성연질폼보다 높은 단열성능을 확보하면서 경질폼보다 부담을 낮춘 일반 건축용 단열재입니다.",
      "주택·건축물의 벽체와 천장 등에 폭넓게 사용할 수 있습니다.",
    ],
  },
  {
    name: "경질폼",
    keywords: "고단열 · 강성 · 수분관리",
    description: [
      "높은 단열성능과 밀도를 가진 단열재입니다.",
      "외부 온도의 영향을 크게 받는 냉동·저온창고, 철판 구조, 외기에 가까운 벽체와 지붕 등에 적합합니다.",
    ],
  },
  {
    name: "준불연폼",
    keywords: "고단열 · 준불연 · 화재안전",
    description: [
      "일반 우레탄폼보다 화재 시 열 발생과 연소 확대를 억제하도록 성능을 강화한 제품입니다.",
      "화재 안전성을 더욱 고려해야 하는 건축물에 적합합니다.",
    ],
  },
] as const;

const provinceNames: Record<string, string> = {
  서울: "서울특별시",
  경기: "경기도",
  인천: "인천광역시",
  강원: "강원특별자치도",
  충북: "충청북도",
  충남: "충청남도",
  대전: "대전광역시",
  세종: "세종특별자치시",
  전북: "전북특별자치도",
  전남: "전라남도",
  광주: "광주광역시",
  경북: "경상북도",
  대구: "대구광역시",
  경남: "경상남도",
  울산: "울산광역시",
  부산: "부산광역시",
  제주: "제주특별자치도",
};

const countyNames = new Set([
  "가평", "양평", "연천", "고성", "양구", "양양", "영월", "인제",
  "정선", "철원", "평창", "홍천", "화천", "횡성", "괴산", "단양",
  "보은", "영동", "옥천", "음성", "증평", "진천", "금산", "부여",
  "서천", "예산", "청양", "태안", "홍성", "고창", "무주", "부안",
  "순창", "완주", "임실", "장수", "진안", "강진", "고흥", "곡성",
  "구례", "담양", "무안", "보성", "신안", "영광", "영암", "완도",
  "장성", "장흥", "진도", "함평", "해남", "화순", "고령", "군위",
  "봉화", "성주", "영덕", "영양", "예천", "울릉", "울진", "의성",
  "청도", "청송", "칠곡", "거창", "남해", "산청", "의령", "창녕",
  "하동", "함안", "함양", "합천",
]);

const cityLabel = (region: string, city: string) => {
  if (city === region) return provinceNames[region] || region;
  if (/[시군구]$/.test(city)) return city;
  return `${city}${countyNames.has(city) ? "군" : "시"}`;
};

const provinceOptions = projectRegions.map((region) => ({
  value: region,
  label: provinceNames[region],
  searchText: `${region} ${provinceNames[region]}`,
}));

const choiceClass = (selected: boolean) =>
  `transition-ease relative flex min-h-12 cursor-pointer items-center justify-center rounded-xl border px-4 py-3 text-center text-sm font-semibold sm:text-base ${
    selected
      ? "border-brand-blue bg-brand-blue/10 text-brand-blue shadow-sm"
      : "border-background-black bg-white text-text-gray hover:border-brand-base-dark hover:bg-background-gray/60"
  }`;

export const ContactQuestionForm = () => {
  const [quote, setQuote] = useState<QuoteType>({
    email: "",
    name: "",
    phone: "",
    status: 0,
    createdAt: null,
    workAt: null,
    price: 0,
    thickness: 0,
    solutionType: 4,
    buildingType: 0,
    area: 100,
    region: "",
    schedule: "일정 미정",
    memo: "",
    privacyAgreed: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    quoteId: number;
    notificationQueued: boolean;
  } | null>(null);
  const [error, setError] = useState("");
  const [selectedProvince, setSelectedProvince] = useState<
    ProjectRegion | ""
  >("");
  const [selectedCity, setSelectedCity] = useState("");
  const [expandedSolution, setExpandedSolution] = useState<number | null>(null);

  const phoneNumber = "010-4685-9699";
  const kakaoChannelUrl = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL;

  const cityOptions = useMemo(
    () =>
      selectedProvince
        ? projectCitiesByRegion[selectedProvince].map((city) => ({
            value: city.name,
            label:
              city.name === selectedProvince
                ? `${provinceNames[selectedProvince]} 전체`
                : cityLabel(selectedProvince, city.name),
            searchText: `${city.name} ${cityLabel(selectedProvince, city.name)}`,
          }))
        : [],
    [selectedProvince],
  );

  const summary = useMemo(
    () => [
      ["시공 장소", quote.region || "지역을 입력해 주세요"],
      ["건물 유형", buildingEnum[quote.buildingType]],
      ["단열재", solutionEnum[quote.solutionType]],
      ["예상 면적", `${quote.area || 0}㎡`],
      [
        "시공 두께",
        quote.thickness ? `${quote.thickness}T` : "상담 후 결정",
      ],
      ["희망 일정", quote.schedule || "일정 미정"],
    ],
    [quote],
  );

  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    const formatted = digits
      .replace(/^(\d{3})(\d{1,4})(\d{0,4})$/, "$1-$2-$3")
      .replace(/-$/, "");
    setQuote((prev) => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!quote.region?.trim()) {
      setError("시공 지역을 입력해 주세요.");
      return;
    }
    if (!quote.name.trim()) {
      setError("고객님 성함을 입력해 주세요.");
      return;
    }
    if ((quote.phone || "").replace(/\D/g, "").length < 10) {
      setError("연락받으실 휴대폰 번호를 확인해 주세요.");
      return;
    }
    if (!quote.privacyAgreed) {
      setError("개인정보 수집 및 이용에 동의해 주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      const submitted = await submitQuote({
        email: "",
        name: quote.name.trim(),
        phone: quote.phone || null,
        status: 0,
        createdAt: new Date(),
        workAt: null,
        price: 0,
        thickness: quote.thickness,
        solutionType: quote.solutionType,
        buildingType: quote.buildingType,
        area: quote.area,
        region: quote.region?.trim(),
        schedule: quote.schedule,
        memo: quote.memo?.trim(),
        privacyAgreed: true,
      });
      setResult(submitted);
    } catch {
      setError("접수 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (result) {
    return (
      <div className="border-background-black flex w-full flex-col items-center rounded-3xl border bg-white px-5 py-12 text-center shadow-xl sm:px-12">
        <CheckCircleIcon className="text-brand-blue mb-5 size-16" />
        <p className="text-brand-blue mb-2 text-sm font-bold">
          접수번호 #{result.quoteId}
        </p>
        <h2 className="text-text-black font-serif font-bold">
          견적 신청이 완료되었습니다
        </h2>
        <p className="text-text-gray mt-3 leading-7">
          남겨주신 내용을 확인한 뒤 빠르게 연락드리겠습니다.
          <br />추가로 전달하실 내용이 있다면 카카오톡이나 전화로 알려주세요.
        </p>
        <p className="text-brand-blue mt-5 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold">
          접수 내용은 정상적으로 전달되었습니다. 이제 이 화면을 닫으셔도 됩니다.
        </p>
        <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row">
          {kakaoChannelUrl && (
            <a
              href={kakaoChannelUrl}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#FEE500] px-5 py-4 font-bold text-[#191919]"
            >
              <ChatBubbleLeftRightIcon className="size-5" />
              카톡 상담하기
            </a>
          )}
          <a
            href={`tel:${phoneNumber}`}
            className="bg-brand-blue flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-4 font-bold text-white"
          >
            <PhoneIcon className="size-5" />
            전화 상담하기
          </a>
        </div>
        <button
          type="button"
          onClick={() => setResult(null)}
          className="text-text-gray mt-6 cursor-pointer text-sm underline"
        >
          다른 견적 문의 작성하기
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-background-black grid w-full overflow-hidden rounded-3xl border bg-white shadow-xl lg:grid-cols-[minmax(0,1fr)_22rem]"
    >
      <div className="flex flex-col gap-12 p-5 sm:p-10 lg:p-12">
        <FormStep number="01" title="어디에 시공하시나요?">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {buildingEnum.map((building, index) => (
              <label key={building} className={choiceClass(quote.buildingType === index)}>
                <input
                  type="radio"
                  name="buildingType"
                  className="sr-only"
                  checked={quote.buildingType === index}
                  onChange={() => setQuote((prev) => ({ ...prev, buildingType: index }))}
                />
                {building}
              </label>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <SearchableSelect
              label="시·도"
              required
              value={selectedProvince}
              options={provinceOptions}
              placeholder="시·도 선택 또는 검색"
              onClear={() => {
                setSelectedProvince("");
                setSelectedCity("");
                setQuote((prev) => ({ ...prev, region: "" }));
              }}
              onSelect={(value) => {
                  const province = value as ProjectRegion;
                  setSelectedProvince(province);
                  setSelectedCity("");
                  setQuote((prev) => ({ ...prev, region: "" }));
                }}
            />
            <SearchableSelect
              key={selectedProvince || "empty-city"}
              label="시·군·구"
              required
              value={selectedCity}
              options={cityOptions}
              disabled={!selectedProvince}
              placeholder={
                selectedProvince
                  ? "시·군·구 선택 또는 검색"
                  : "시·도를 먼저 선택해 주세요"
              }
              onClear={() => {
                setSelectedCity("");
                setQuote((prev) => ({ ...prev, region: "" }));
              }}
              onSelect={(city) => {
                  const formattedCity = cityLabel(selectedProvince, city);
                  const location =
                    city === selectedProvince
                      ? formattedCity
                      : `${selectedProvince} ${formattedCity}`;
                  setSelectedCity(city);
                  setQuote((prev) => ({ ...prev, region: location }));
                }}
            />
          </div>
        </FormStep>

        <FormStep number="02" title="어떤 시공을 생각하고 계신가요?">
          <div className="grid items-start gap-3 md:grid-cols-2">
            {solutionCards.map((solution, index) => {
              const selected = quote.solutionType === index;
              const expanded = expandedSolution === index;
              const descriptionId = `solution-description-${index}`;

              return (
                <label
                  key={solution.name}
                  onClick={() =>
                    setExpandedSolution((current) => (current === index ? null : index))
                  }
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl border bg-white p-5 text-left shadow-sm transition-[border-color,background-color,box-shadow,transform] duration-300 focus-within:ring-2 focus-within:ring-brand-blue/30 focus-within:outline-none md:hover:-translate-y-0.5 md:hover:shadow-md ${
                    selected
                      ? "border-brand-blue bg-brand-blue/[0.045] shadow-md"
                      : "border-background-black hover:border-brand-blue/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="solutionType"
                    className="sr-only"
                    checked={selected}
                    aria-describedby={descriptionId}
                    onChange={() =>
                      setQuote((prev) => ({ ...prev, solutionType: index }))
                    }
                  />
                  <span className="flex min-h-16 items-start justify-between gap-4">
                    <span>
                      <span className="text-text-black block font-serif text-lg font-bold sm:text-xl">
                        {solution.name}
                      </span>
                      <span className="text-brand-blue mt-1.5 block text-xs font-semibold tracking-tight sm:text-sm">
                        {solution.keywords}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                        selected
                          ? "border-brand-blue bg-brand-blue text-white"
                          : "border-background-black bg-white text-transparent"
                      }`}
                    >
                      <CheckIcon className="size-4" />
                    </span>
                  </span>
                  <span
                    id={descriptionId}
                    className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out md:grid-rows-[0fr] md:opacity-0 md:group-hover:mt-4 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100 md:group-focus-within:mt-4 md:group-focus-within:grid-rows-[1fr] md:group-focus-within:opacity-100 ${
                      expanded
                        ? "mt-4 grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <span className="min-h-0 overflow-hidden">
                      <span className="border-brand-blue/25 text-text-gray block border-t pt-4 text-sm leading-6">
                        {solution.description.map((line) => (
                          <span key={line} className="block not-last:mb-1">
                            {line}
                          </span>
                        ))}
                      </span>
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
          <label
            className={`${choiceClass(quote.solutionType === 4)} self-start px-5 sm:self-auto`}
            onClick={() => setExpandedSolution(null)}
          >
            <input
              type="radio"
              name="solutionType"
              className="sr-only"
              checked={quote.solutionType === 4}
              onChange={() => setQuote((prev) => ({ ...prev, solutionType: 4 }))}
            />
            어떤 제품이 맞을지 모르겠어요 · 상담 후 결정
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <FieldLabel label="예상 시공 면적" required>
              <div className="relative">
                <input
                  type="number"
                  min={1}
                  value={quote.area}
                  onChange={(event) => setQuote((prev) => ({ ...prev, area: Math.max(0, Number(event.target.value)) }))}
                  className="border-background-black focus:border-brand-blue w-full rounded-xl border bg-white px-4 py-3 pr-12 outline-none"
                />
                <span className="text-text-gray absolute top-1/2 right-4 -translate-y-1/2 font-semibold">㎡</span>
              </div>
            </FieldLabel>
            <FieldLabel label="시공 두께">
              <div className="flex gap-2">
                <div className="relative min-w-0 flex-1">
                  <input
                    type="number"
                    min={1}
                    max={1000}
                    value={quote.thickness || ""}
                    onChange={(event) =>
                      setQuote((prev) => ({
                        ...prev,
                        thickness: Math.max(0, Number(event.target.value)),
                      }))
                    }
                    placeholder="예: 100"
                    className="border-background-black focus:border-brand-blue w-full rounded-xl border bg-white px-4 py-3 pr-10 outline-none"
                  />
                  <span className="text-text-gray absolute top-1/2 right-4 -translate-y-1/2 font-semibold">T</span>
                </div>
                <button
                  type="button"
                  aria-pressed={!quote.thickness}
                  onClick={() => setQuote((prev) => ({ ...prev, thickness: 0 }))}
                  className={`${choiceClass(!quote.thickness)} shrink-0`}
                >
                  상담 후 결정
                </button>
              </div>
            </FieldLabel>
          </div>
        </FormStep>

        <FormStep number="03" title="언제 시공을 원하시나요?">
          <div className="grid grid-cols-2 gap-2">
            {scheduleOptions.map((schedule) => (
              <label key={schedule} className={choiceClass(quote.schedule === schedule)}>
                <input
                  type="radio"
                  name="schedule"
                  className="sr-only"
                  checked={quote.schedule === schedule}
                  onChange={() => setQuote((prev) => ({ ...prev, schedule }))}
                />
                {schedule}
              </label>
            ))}
          </div>
        </FormStep>

        <FormStep number="04" title="연락받으실 정보를 알려주세요">
          <div className="grid gap-4 sm:grid-cols-2">
            <FieldLabel label="성함" required>
              <input
                value={quote.name}
                onChange={(event) => setQuote((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="홍길동"
                autoComplete="name"
                className="border-background-black focus:border-brand-blue w-full rounded-xl border bg-white px-4 py-3 outline-none"
              />
            </FieldLabel>
            <FieldLabel label="휴대폰 번호" required>
              <input
                value={quote.phone}
                onChange={(event) => handlePhoneChange(event.target.value)}
                placeholder="010-0000-0000"
                inputMode="tel"
                autoComplete="tel"
                className="border-background-black focus:border-brand-blue w-full rounded-xl border bg-white px-4 py-3 outline-none"
              />
            </FieldLabel>
          </div>
          <FieldLabel label="추가 문의사항">
            <textarea
              value={quote.memo}
              onChange={(event) => setQuote((prev) => ({ ...prev, memo: event.target.value }))}
              rows={4}
              placeholder="현장 상황이나 궁금한 내용을 자유롭게 적어주세요."
              className="border-background-black focus:border-brand-blue w-full resize-none rounded-xl border bg-white px-4 py-3 outline-none"
            />
          </FieldLabel>
          <label className="text-text-gray flex cursor-pointer items-start gap-3 text-sm leading-6">
            <input
              type="checkbox"
              checked={quote.privacyAgreed}
              onChange={(event) => setQuote((prev) => ({ ...prev, privacyAgreed: event.target.checked }))}
              className="accent-brand-blue mt-1 size-4 shrink-0"
            />
            <span>
              견적 상담을 위한 개인정보 수집 및 이용에 동의합니다. 입력한 정보는 상담 목적으로만 사용됩니다. <strong className="text-text-black">(필수)</strong>
            </span>
          </label>
        </FormStep>
      </div>

      <aside className="bg-background-gray/70 border-background-black flex flex-col border-t p-5 sm:p-8 lg:sticky lg:top-24 lg:h-fit lg:border-t-0 lg:border-l">
        <p className="text-brand-blue text-sm font-bold">내 견적 요약</p>
        <h3 className="text-text-black mt-1 font-serif text-xl font-bold">신청 전 확인해 주세요</h3>
        <dl className="mt-6 flex flex-col gap-4">
          {summary.map(([label, value]) => (
            <div key={label} className="border-background-black flex items-start justify-between gap-4 border-b pb-3">
              <dt className="text-text-gray text-sm">{label}</dt>
              <dd className="text-text-black text-right text-sm font-bold">{value}</dd>
            </div>
          ))}
        </dl>

        {error && (
          <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-brand-blue mt-6 min-h-14 w-full cursor-pointer rounded-full px-6 py-4 text-lg font-bold text-white shadow-md transition hover:brightness-95 disabled:cursor-wait disabled:opacity-60"
        >
          {isSubmitting ? "견적을 접수하고 있어요..." : "무료 견적 신청하기"}
        </button>
        <p className="text-text-gray mt-3 text-center text-xs leading-5">
          접수 즉시 담당자에게 알림이 전달되며,<br />확인 후 빠르게 연락드립니다.
        </p>
      </aside>
    </form>
  );
};

const FormStep = ({ number, title, children }: { number: string; title: string; children: React.ReactNode }) => (
  <section className="flex flex-col gap-5">
    <div className="flex items-center gap-3">
      <span className="bg-brand-blue flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">{number}</span>
      <h3 className="text-text-black font-serif text-xl font-bold sm:text-2xl">{title}</h3>
    </div>
    {children}
  </section>
);

const FieldLabel = ({ label, required = false, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <label className="flex flex-col gap-2">
    <span className="text-text-black text-sm font-bold">
      {label}{required && <span className="text-brand-red ml-1">*</span>}
    </span>
    {children}
  </label>
);

type SearchOption = {
  value: string;
  label: string;
  searchText?: string;
};

const SearchableSelect = ({
  label,
  value,
  options,
  placeholder,
  disabled = false,
  required = false,
  onClear,
  onSelect,
}: {
  label: string;
  value: string;
  options: SearchOption[];
  placeholder: string;
  disabled?: boolean;
  required?: boolean;
  onClear?: () => void;
  onSelect: (value: string) => void;
}) => {
  const listboxId = `contact-${label.replace(/[^가-힣a-z0-9]/gi, "-")}-options`;
  const selectedLabel = options.find((option) => option.value === value)?.label;
  const [query, setQuery] = useState(selectedLabel || "");
  const [isOpen, setIsOpen] = useState(false);

  const normalizedQuery = query.replaceAll(" ", "").toLowerCase();
  const filteredOptions = options.filter((option) =>
    `${option.label} ${option.searchText || ""}`
      .replaceAll(" ", "")
      .toLowerCase()
      .includes(normalizedQuery),
  );

  const selectOption = (option: SearchOption) => {
    setQuery(option.label);
    setIsOpen(false);
    onSelect(option.value);
  };

  return (
    <label className="relative flex min-w-0 flex-col gap-2">
      <span className="text-text-black text-sm font-bold">
        {label}
        {required && <span className="text-brand-red ml-1">*</span>}
      </span>
      <div className="relative">
        <MagnifyingGlassIcon className="text-text-white pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2" />
        <input
          type="text"
          value={query}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete="off"
          role="combobox"
          aria-label={`${label} 검색`}
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-autocomplete="list"
          onFocus={() => setIsOpen(true)}
          onBlur={() => window.setTimeout(() => setIsOpen(false), 150)}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
            if (event.target.value !== selectedLabel) onClear?.();
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && isOpen && filteredOptions[0]) {
              event.preventDefault();
              selectOption(filteredOptions[0]);
            }
            if (event.key === "Escape") setIsOpen(false);
          }}
          className="border-background-black focus:border-brand-blue w-full rounded-xl border bg-white py-3 pr-10 pl-11 outline-none disabled:cursor-not-allowed disabled:bg-background-gray disabled:text-text-white"
        />
        <ChevronDownIcon className="text-text-white pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2" />
      </div>

      {isOpen && !disabled && (
        <div
          id={listboxId}
          role="listbox"
          className="border-background-black absolute top-full z-40 mt-1 max-h-64 w-full overflow-y-auto rounded-xl border bg-white p-1.5 shadow-xl"
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={option.value === value}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectOption(option)}
                className="text-text-black hover:bg-background-gray flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-semibold"
              >
                {option.label}
                {option.value === value && (
                  <CheckIcon className="text-brand-blue size-5" />
                )}
              </button>
            ))
          ) : (
            <p className="text-text-gray px-4 py-3 text-sm">
              검색 결과가 없습니다.
            </p>
          )}
        </div>
      )}
    </label>
  );
};
