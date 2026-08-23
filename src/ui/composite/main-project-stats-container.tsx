import { prisma } from "@/lib/prisma";
import { koreaProvincePaths } from "@/lib/korea-province-paths";
import { demoMapLocations } from "@/lib/demo-projects";
import {
  getProjectCityPoint,
  inferProjectLocation,
  isProjectRegion,
  type ProjectRegion,
} from "@/lib/project-regions";
import { CountUpNumber } from "@/ui/atom/count-up-number";

const PROVINCE_LABELS = new Set([
  "경기",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
]);

type SiteMarker = {
  region: ProjectRegion;
  city: string;
  x: number;
  y: number;
  count: number;
};

export const MainProjectStatsContainer = async () => {
  const savedProjects = await prisma.project.findMany({
    select: { title: true, region: true, city: true },
  });
  const projects = [...savedProjects, ...demoMapLocations];
  const markerMap = new Map<string, SiteMarker>();

  for (const project of projects) {
    const inferred = inferProjectLocation(project.title);
    const region =
      project.region && isProjectRegion(project.region)
        ? project.region
        : inferred?.region;
    if (!region) continue;

    const savedCity = project.city
      ? getProjectCityPoint(region, project.city)
      : null;
    const inferredCity = inferred?.region === region ? inferred : null;
    const provinceCenter = koreaProvincePaths.find(
      (province) => province.region === region,
    )?.label;
    const location = savedCity ??
      inferredCity ?? {
        ...(provinceCenter ?? { x: 160, y: 200 }),
        name: region,
      };
    const markerKey = `${region}-${location.name}`;
    const current = markerMap.get(markerKey);

    markerMap.set(markerKey, {
      region,
      city: location.name,
      x: location.x,
      y: location.y,
      count: (current?.count ?? 0) + 1,
    });
  }

  const completedCount = projects.length;
  const siteMarkers = [...markerMap.values()];

  return (
    <section
      className="padding-outer w-full"
      aria-labelledby="project-stats-title"
    >
      <div className="mx-auto grid w-full max-w-7xl overflow-hidden rounded-[2rem] bg-[#292b31] text-white shadow-[0_24px_70px_rgba(46,48,56,0.16)] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
          <span className="mb-3 w-fit rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[16px] font-semibold tracking-[0.14em] text-[#d9d2cc]">
            KIMSFOAM PROJECT
          </span>
          <p className="mb-8 text-[20px] font-semibold text-[#d4b7ab]">
            현장에서 증명해온 단열 시공
          </p>
          <div className="flex flex-col gap-2">
            <h2
              id="project-stats-title"
              className="flex flex-nowrap items-baseline gap-x-2 leading-none sm:gap-x-3"
            >
              <span className="text-[30px] font-bold whitespace-nowrap text-white">
                전국
              </span>
              <span className="font-serif text-[clamp(2rem,4.2vw,3.75rem)] font-bold tracking-[-0.05em] whitespace-nowrap text-[#d27358]">
                <CountUpNumber target={completedCount} />개
              </span>
              <span className="text-[30px] font-bold whitespace-nowrap text-white">
                현장
              </span>
            </h2>
            <p className="flex flex-nowrap items-baseline gap-x-2 leading-none sm:gap-x-3">
              <span className="text-[30px] font-bold whitespace-nowrap text-white">
                누적
              </span>
              <span className="font-serif text-[clamp(2rem,4.2vw,3.75rem)] font-bold tracking-[-0.05em] whitespace-nowrap text-[#d27358]">
                <CountUpNumber target={42000} />㎡
              </span>
              <span className="text-[30px] font-bold whitespace-nowrap text-white">
                시공 달성
              </span>
            </p>
          </div>
          <p className="mt-7 max-w-xl text-[22px] leading-[1.7] text-white/60">
            <span className="block">
              지역도, 건물도, 시공 조건도 달랐습니다.
            </span>
            <span className="block">그동안 쌓아온 현장 경험을 바탕으로</span>
            <span className="block">
              각 공간에 필요한 단열을 고민하고 시공합니다.
            </span>
          </p>
        </div>

        <div className="relative min-h-[430px] overflow-hidden bg-[#22242a] px-4 py-8 sm:min-h-[520px]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:inset-y-0 lg:left-0 lg:h-full lg:w-px lg:bg-gradient-to-b" />
          <div className="absolute top-8 right-8 text-right">
            <p className="text-sm font-semibold tracking-[0.16em] text-white/35">
              KIMSFOAM PROJECT MAP
            </p>
            <p className="mt-1 text-base text-white/65">전국 시공 현황</p>
          </div>
          <svg
            viewBox="0 0 320 410"
            className="mx-auto h-full max-h-[480px] w-full max-w-[440px]"
            role="img"
            aria-label="대한민국 도 경계와 시군별 킴스폼 시공 현황 지도"
          >
            <defs>
              <filter
                id="map-shadow"
                x="-30%"
                y="-30%"
                width="160%"
                height="160%"
              >
                <feDropShadow
                  dx="0"
                  dy="10"
                  stdDeviation="10"
                  floodColor="#000"
                  floodOpacity=".24"
                />
              </filter>
            </defs>
            <g filter="url(#map-shadow)">
              {koreaProvincePaths.map((province, index) => (
                <path
                  key={province.region}
                  d={province.d}
                  fill={index % 2 === 0 ? "#3b3d43" : "#42444a"}
                  fillRule="evenodd"
                  stroke="#2E2316"
                  strokeWidth="1.35"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </g>

            {koreaProvincePaths
              .filter((province) => PROVINCE_LABELS.has(province.region))
              .map((province) => (
                <text
                  key={province.region}
                  x={province.label.x}
                  y={province.label.y}
                  fill="#a1a3a9"
                  fontSize="8"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  {province.region}
                </text>
              ))}

            {siteMarkers.map((marker) => (
              <g
                key={`${marker.region}-${marker.city}`}
                transform={`translate(${marker.x} ${marker.y})`}
              >
                <title>{`${marker.region} ${marker.city} 시공사례 ${marker.count}건`}</title>
                <circle r="7.5" fill="#b5442b" opacity=".2" />
                <circle
                  r="3.5"
                  fill="#d27358"
                  stroke="#f0ddd6"
                  strokeWidth="1.2"
                />
              </g>
            ))}
          </svg>
          <div className="absolute right-6 bottom-6 left-6 flex items-center border-t border-white/10 pt-4 text-sm text-white/40">
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#d27358]" /> 실제 시공
              지역
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
