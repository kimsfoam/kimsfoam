import { FeatureType, ProjectType } from "@/lib/definition";

export const featureDatas: Record<number, FeatureType> = {
  1: {
    title: "책임 시공",
    description:
      "최초 상담부터 현장 진단, 표준 시공, 마감 청소까지 전 과정을 책임지는 체계적인 표준 절차",
    image: "/thumbnail/feature_01.png",
  },
  2: {
    title: "전문 시공",
    description:
      "안전 절차를 준수하는 전문 시공팀이 정밀 장비로 완수하는 표준 시공으로 지키는 품질과 안전",
    image: "/thumbnail/feature_02.png",
  },
  3: {
    title: "전국 시공",
    description:
      "전국 어디든 신속 대응, 거리 제약 없는 시공 서비스 (도서산간지역 별도 문의)",
    image: "/thumbnail/feature_03.png",
  },
  4: {
    title: "정직한 견적",
    description:
      "숨겨진 추가 비용 없이 합리적이고 투명한, 과장 없는 현장 맞춤 견적",
  },
  5: {
    title: "풍부한 경험",
    description:
      "주택·상가·리모델링·창고 등 다양한 현장에서 검증된 노하우로 현장 조건에 맞는 최적의 단열 견적을 제공",
  },
  6: {
    title: "고객 만족",
    description:
      "고객이 직접 보고 만족할 수 있도록, 자그마한 틈새 하나하나 놓치지 않는 꼼꼼함",
  },
  7: {
    title: "무상 A/S 2년 보장",
    description: "시공 하자에 대해 무상 A/S 2년 보장 (시공 완료일 기준)",
  },
};

export const galleryDatas = [
  {
    title: "양주시 신축상가",
    image: "/gallery/01_01.jpg",
    url: "https://blog.naver.com/kimsfoam/223989343453",
  },
  {
    title: "양주시 신축상가",
    image: "/gallery/01_03.jpg",
    url: "https://blog.naver.com/kimsfoam/223989343453",
  },
  {
    title: "양주시 신축상가",
    image: "/gallery/01_04.jpg",
    url: "https://blog.naver.com/kimsfoam/223989343453",
  },
  {
    title: "인제군 단독주택",
    image: "/gallery/02_01.jpeg",
    url: "https://blog.naver.com/kimsfoam/223990402650",
  },
  {
    title: "인제군 단독주택",
    image: "/gallery/02_03.jpeg",
    url: "https://blog.naver.com/kimsfoam/223990402650",
  },
  {
    title: "인제군 단독주택",
    image: "/gallery/02_05.jpeg",
    url: "https://blog.naver.com/kimsfoam/223990402650",
  },
  {
    title: "상주시 단독주택",
    image: "/gallery/03_01.jpg",
    url: "https://blog.naver.com/kimsfoam/223992422836",
  },
  {
    title: "상주시 단독주택",
    image: "/gallery/03_03.jpg",
    url: "https://blog.naver.com/kimsfoam/223992422836",
  },
  {
    title: "상주시 단독주택",
    image: "/gallery/03_05.jpg",
    url: "https://blog.naver.com/kimsfoam/223992422836",
  },
  {
    title: "양주시 공업사",
    image: "/gallery/06_01.jpg",
    url: "https://blog.naver.com/kimsfoam/224072947376",
  },
  {
    title: "양주시 공업사",
    image: "/gallery/06_02.jpg",
    url: "https://blog.naver.com/kimsfoam/224072947376",
  },
  {
    title: "양주시 공업사",
    image: "/gallery/06_03.jpg",
    url: "https://blog.naver.com/kimsfoam/224072947376",
  },
  {
    title: "양주시 공업사",
    image: "/gallery/06_04.jpg",
    url: "https://blog.naver.com/kimsfoam/224072947376",
  },
  {
    title: "양주시 공업사",
    image: "/gallery/06_05.jpg",
    url: "https://blog.naver.com/kimsfoam/224072947376",
  },
  {
    title: "양평 단독주택 지붕",
    image: "/gallery/07_01.jpg",
    url: "https://blog.naver.com/kimsfoam/224078149176",
  },
  {
    title: "양평 단독주택 지붕",
    image: "/gallery/07_02.jpg",
    url: "https://blog.naver.com/kimsfoam/224078149176",
  },
  {
    title: "양평 단독주택 지붕",
    image: "/gallery/07_03.jpg",
    url: "https://blog.naver.com/kimsfoam/224078149176",
  },
  {
    title: "양평 단독주택 지붕",
    image: "/gallery/07_04.jpg",
    url: "https://blog.naver.com/kimsfoam/224078149176",
  },
  {
    title: "동해시 주택 수성연질폼",
    image: "/gallery/08_01.jpg",
    url: "https://blog.naver.com/kimsfoam/224071704291",
  },
  {
    title: "동해시 주택 수성연질폼",
    image: "/gallery/08_02.jpg",
    url: "https://blog.naver.com/kimsfoam/224071704291",
  },
  {
    title: "동해시 주택 수성연질폼",
    image: "/gallery/08_03.jpg",
    url: "https://blog.naver.com/kimsfoam/224071704291",
  },
  {
    title: "동해시 주택 수성연질폼",
    image: "/gallery/08_04.jpg",
    url: "https://blog.naver.com/kimsfoam/224071704291",
  },
  {
    title: "동해시 주택 수성연질폼",
    image: "/gallery/08_05.jpg",
    url: "https://blog.naver.com/kimsfoam/224071704291",
  },
  {
    title: "부안 단독주택",
    image: "/gallery/09_01.jpg",
    url: "https://blog.naver.com/kimsfoam/224045955271",
  },
  {
    title: "부안 단독주택",
    image: "/gallery/09_02.jpg",
    url: "https://blog.naver.com/kimsfoam/224045955271",
  },
  {
    title: "부안 단독주택",
    image: "/gallery/09_03.jpg",
    url: "https://blog.naver.com/kimsfoam/224045955271",
  },
];

export const SolutionDatas = {
  0: {
    title: "수성연질폼",
    description: "틈새에 밀착해 결로와 곰팡이를 막는 친환경 단열재",
    isMost: true,
    price: 190,
    discount_percent: 10,
    place: ["주택", "상가", "리모델링"],
  },
  1: {
    title: "저밀도",
    description: "비교적 가벼운 가성비 단열재",
    isMost: false,
    price: 210,
    discount_percent: 9,
    place: ["창고", "농막", "컨테이너", "임시건축물"],
  },
  2: {
    title: "경질폼",
    description: "강력한 단열과 구조 보강까지 책임지는 고밀도 단열재",
    isMost: false,
    price: 230,
    discount_percent: 8,
    place: ["공장", "축사", "창고", "대형견물"],
  },
  3: {
    title: "준불연폼",
    description: "화재에 대비하는 든든한 단열재",
    isMost: false,
    price: 390,
    discount_percent: 5,
    place: ["물류창고", "대형상가", "공공건물"],
  },
};

export const sampleProjects: ProjectType[] = [
  {
    title: "송파구 잠실동 아파트 단열 시공",
    date: new Date("2025-02-18"),
    buildingType: 1, // 1 = 아파트
    url: "/projects/songpa-jamsil-apt",
    thumbnail: "/gallery/01_01.jpg",
  },
  {
    title: "강남구 삼성동 고급 빌라 방음 단열",
    date: new Date("2025-01-09"),
    buildingType: 2, // 2 = 빌라
    url: "/projects/gangnam-samsung-villa",
    thumbnail: "/gallery/02_01.jpeg",
  },
  {
    title: "수원 영통구 단독주택 외벽 + 다락 단열",
    date: new Date("2024-12-23"),
    buildingType: 3, // 3 = 단독주택
    url: "/projects/suwon-yeongtong-house",
    thumbnail: "/gallery/03_01.jpg",
  },
  {
    title: "화성 동탄 상가 사무실 천장 우레탄 폼 시공",
    date: new Date("2024-11-14"),
    buildingType: 4, // 4 = 상가/오피스
    url: "/projects/dongtan-office-foam",
    thumbnail: "/gallery/06_01.jpg",
  },
  {
    title: "용인 처인구 창고 단열 보수 공사",
    date: new Date("2024-10-02"),
    buildingType: 5, // 5 = 창고/공장
    url: "/projects/yongin-warehouse",
    thumbnail: "/gallery/07_01.jpg",
  },
];
