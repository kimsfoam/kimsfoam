import fs from "node:fs";

const [provinceFile, municipalityFile, provinceOutputFile, cityOutputFile] =
  process.argv.slice(2);
if (
  !provinceFile ||
  !municipalityFile ||
  !provinceOutputFile ||
  !cityOutputFile
) {
  throw new Error(
    "province, municipality, province output, city output 파일 경로가 필요합니다.",
  );
}

const provinces = JSON.parse(fs.readFileSync(provinceFile, "utf8"));
const municipalities = JSON.parse(fs.readFileSync(municipalityFile, "utf8"));

const regionByCode = {
  11: "서울",
  21: "부산",
  22: "대구",
  23: "인천",
  24: "광주",
  25: "대전",
  26: "울산",
  29: "세종",
  31: "경기",
  32: "강원",
  33: "충북",
  34: "충남",
  35: "전북",
  36: "전남",
  37: "경북",
  38: "경남",
  39: "제주",
};

const metropolitanRegions = new Set([
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "세종",
]);

function normalizeMunicipalityName(region, rawName) {
  const cityIndex = rawName.indexOf("시", 1);
  if (cityIndex >= 0) return rawName.slice(0, cityIndex);
  if (rawName === "군위군") return "군위";
  if (metropolitanRegions.has(region)) return rawName;
  return rawName.endsWith("군") ? rawName.slice(0, -1) : rawName;
}

const project = ([lon, lat]) => [
  55 + (lon - 125.5) * 44 + (lat < 34.2 ? 22 : 0),
  49 + (38.65 - lat) * 60 - (lat < 34.2 ? 18 : 0),
];

function makeDecoder(topology) {
  const { scale, translate } = topology.transform;
  const memo = new Map();
  const decode = (index) => {
    const sourceIndex = index < 0 ? ~index : index;
    if (!memo.has(sourceIndex)) {
      let x = 0;
      let y = 0;
      memo.set(
        sourceIndex,
        topology.arcs[sourceIndex].map(([dx, dy]) => {
          x += dx;
          y += dy;
          return [x * scale[0] + translate[0], y * scale[1] + translate[1]];
        }),
      );
    }
    const points = memo.get(sourceIndex);
    return index < 0 ? [...points].reverse() : points;
  };
  return decode;
}

function geometryRings(geometry, decode) {
  const polygons =
    geometry.type === "Polygon" ? [geometry.arcs] : geometry.arcs;
  return polygons.flatMap((polygon) =>
    polygon.map((ring) => {
      const points = [];
      ring.forEach((arcIndex, index) => {
        const arc = decode(arcIndex);
        points.push(...(index === 0 ? arc : arc.slice(1)));
      });
      return points;
    }),
  );
}

function distanceToSegment(point, start, end) {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  if (dx === 0 && dy === 0)
    return Math.hypot(point[0] - start[0], point[1] - start[1]);
  const t = Math.max(
    0,
    Math.min(
      1,
      ((point[0] - start[0]) * dx + (point[1] - start[1]) * dy) /
        (dx * dx + dy * dy),
    ),
  );
  return Math.hypot(
    point[0] - (start[0] + t * dx),
    point[1] - (start[1] + t * dy),
  );
}

function simplify(points, tolerance = 0.28) {
  if (points.length < 3) return points;
  let maxDistance = 0;
  let splitIndex = 0;
  for (let index = 1; index < points.length - 1; index += 1) {
    const distance = distanceToSegment(points[index], points[0], points.at(-1));
    if (distance > maxDistance) {
      maxDistance = distance;
      splitIndex = index;
    }
  }
  if (maxDistance <= tolerance) return [points[0], points.at(-1)];
  return [
    ...simplify(points.slice(0, splitIndex + 1), tolerance).slice(0, -1),
    ...simplify(points.slice(splitIndex), tolerance),
  ];
}

function toPath(rings) {
  return rings
    .map((ring) => {
      const points = simplify(ring.map(project));
      return `${points.map(([x, y], index) => `${index ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join("")}Z`;
    })
    .join("");
}

function primaryPoints(geometry, decode) {
  const rings = geometryRings(geometry, decode);
  return rings.reduce(
    (largest, ring) => (ring.length > largest.length ? ring : largest),
    [],
  );
}

function center(points) {
  const projected = points.map(project);
  const xs = projected.map((point) => point[0]);
  const ys = projected.map((point) => point[1]);
  return {
    x: Number(((Math.min(...xs) + Math.max(...xs)) / 2).toFixed(1)),
    y: Number(((Math.min(...ys) + Math.max(...ys)) / 2).toFixed(1)),
  };
}

const provinceObject = Object.values(provinces.objects)[0];
const provinceDecode = makeDecoder(provinces);
const provincePaths = provinceObject.geometries.map((geometry) => {
  const region = regionByCode[geometry.properties.code];
  const points = primaryPoints(geometry, provinceDecode);
  return {
    region,
    // 화면용 지도에서는 각 시·도의 가장 큰 본토 윤곽만 사용해 작은 해안 섬을 제외합니다.
    d: toPath([points]),
    label: center(points),
  };
});

const municipalityObject = Object.values(municipalities.objects)[0];
const municipalityDecode = makeDecoder(municipalities);
const municipalityGroups = new Map();

for (const geometry of municipalityObject.geometries) {
  let rawName = geometry.properties.name;
  let region = regionByCode[geometry.properties.code.slice(0, 2)];
  if (!region) continue;
  if (region === "인천" && rawName === "남구") rawName = "미추홀구";

  // 2023년 군위군의 경북 → 대구 편입을 반영합니다.
  if (rawName.includes("군위")) region = "대구";
  const name = normalizeMunicipalityName(region, rawName);
  const key = `${region}:${name}`;
  const points = primaryPoints(geometry, municipalityDecode);
  municipalityGroups.set(key, [
    ...(municipalityGroups.get(key) ?? []),
    ...points,
  ]);
}

const cityCatalog = {};
for (const region of Object.values(regionByCode)) {
  const entries = [...municipalityGroups.entries()]
    .filter(([key]) => key.startsWith(`${region}:`))
    .map(([key, points]) => ({ name: key.split(":")[1], ...center(points) }));

  if (
    metropolitanRegions.has(region) &&
    !entries.some((entry) => entry.name === region)
  ) {
    const code = Object.entries(regionByCode).find(
      ([, value]) => value === region,
    )[0];
    const province = provinceObject.geometries.find(
      (item) => item.properties.code === code,
    );
    entries.push({
      name: region,
      ...center(primaryPoints(province, provinceDecode)),
    });
  }

  cityCatalog[region] = entries.sort((a, b) => {
    if (a.name === region) return -1;
    if (b.name === region) return 1;
    return a.name.localeCompare(b.name, "ko-KR");
  });
}

fs.writeFileSync(
  provinceOutputFile,
  `// 통계청 2018 시·도 경계를 SVG 좌표로 변환한 생성 파일입니다.\n` +
    `export const koreaProvincePaths = ${JSON.stringify(provincePaths)} as const;\n`,
);
fs.writeFileSync(
  cityOutputFile,
  `// 통계청 시·군·구 경계에서 생성한 전국 지역 선택 목록과 중심점입니다.\n` +
    `export const koreaCityCatalog: Record<string, Array<{ name: string; x: number; y: number }>> = ${JSON.stringify(cityCatalog)};\n`,
);
