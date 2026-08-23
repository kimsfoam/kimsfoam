import { koreaCityCatalog } from "@/lib/korea-city-points";

export const projectRegions = [
  "서울",
  "경기",
  "인천",
  "강원",
  "충북",
  "충남",
  "대전",
  "세종",
  "전북",
  "전남",
  "광주",
  "경북",
  "대구",
  "경남",
  "울산",
  "부산",
  "제주",
] as const;

export type ProjectRegion = (typeof projectRegions)[number];
type CityPoint = { name: string; x: number; y: number };

export const projectCitiesByRegion = Object.fromEntries(
  projectRegions.map((region) => [region, koreaCityCatalog[region] ?? []]),
) as Record<ProjectRegion, CityPoint[]>;

export function isProjectRegion(value: string): value is ProjectRegion {
  return projectRegions.includes(value as ProjectRegion);
}

export function getProjectCityPoint(region: ProjectRegion, city: string) {
  return (
    projectCitiesByRegion[region].find((item) => item.name === city) ?? null
  );
}

export function inferProjectLocation(title: string) {
  if (title.includes("광주광역")) {
    const city = getProjectCityPoint("광주", "광주");
    return city ? { region: "광주" as const, ...city } : null;
  }

  for (const region of projectRegions) {
    for (const city of projectCitiesByRegion[region]) {
      if (title.includes(city.name)) return { region, ...city };
    }
  }
  return null;
}
