import { FAQType, FeatureType, ProjectType } from "@/lib/definition";

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

export const faqDatas: FAQType[] = [
  {
    title: "킴스폼은 어떤 서비스를 전문적으로 제공하나요?",
    description:
      "킴스폼은 우레탄폼 단열 전문 시공업체입니다. 현장 진단 후 맞춤 설계로 주택·상가·공장·냉동창고 등을 시공하고, 표준 절차로 기준 두께를 정확히 확보해 결로·곰팡이 발생을 줄입니다. 국내 인증 자재·전용 장비를 사용하며 2년 무상 A/S를 제공합니다.",
  },
  {
    title: "어떤 절차로 진행되나요?",
    description:
      "1️⃣ 전화 상담 및 견적 산출\n 전화 상담으로 건물 구조와 단열 범위를 확인하고, 현장에 적합한 공법과 자재를 안내드립니다. 필요 시 직접 실측을 진행하며, 이를 바탕으로 정확하고 합리적인 견적을 산출합니다." +
      "\n\n2️⃣ 계약서 작성\n견적과 시공 내용에 동의하시면 계약서를 작성합니다. 계약서에 작업 범위, 자재, 일정, A/S 조건 등을 명확히 기재하여 서로 간의 신뢰를 보장합니다." +
      "\n\n3️⃣ 일정 조율\n고객 일정에 맞춰 가장 편리한 시공 날짜와 시간을 협의하여, 현장 상황에 맞게 장비와 인력을 사전 준비합니다." +
      "\n\n4️⃣ 우레탄폼 시공\n전문 장비와 숙련된 팀이 안전하게 시공을 진행합니다. 우레탄폼 시공 두께와 품질을 점검하며, 모든 공정 후 현장 정리까지 마무리합니다." +
      "\n\n5️⃣ 대금 납부\n시공 결과 확인 후 만족하시면 대금을 납부하시고, 이후 모든 절차가 종료됩니다. 이후에도 문제 발생 시 2년 무상 A/S로 신속히 대응합니다.",
  },
  {
    title: "견적은 어떤 방식으로 산정되나요?",
    description:
      "킴스폼의 견적은 일반적으로 우레탄폼의 두께(mm)를 기준으로 단가를 계산합니다. 현장 구조·용도·시공 환경을 검토해 자재(수성/경질/준불연)와 두께를 정하고, 작업 난이도·장비 투입·접근성을 반영해 산출합니다. 항목별 내역·VAT를 투명하게 안내하며, 사전 동의 없는 추가 비용은 없습니다.",
  },
  {
    title: "A/S는 어떻게 진행되나요?",
    description:
      "킴스폼은 시공 품질에 대한 확실한 보장을 위해 시공 완료 후 2년간 무상 A/S를 제공합니다. 단열 성능 저하, 부풀음, 갈라짐 등 시공 과정에서 발생한 하자가 발견될 경우 고객님의 요청 즉시 현장을 점검하고, 동일 자재와 공법으로 신속히 보수해드립니다. A/S는 고객 불편을 최소화하는 것을 최우선으로 하며, 작은 부분까지 책임 있게 관리합니다. 다만 우레탄폼은 분사 후 건축 구조와 일체화되기 때문에 철거나 원상 복구가 불가능합니다. 따라서 환불은 진행되지 않으며, 이는 업계 전반적으로 동일한 기준입니다. 대신 킴스폼은 시공 전 충분한 상담과 현장 실측, 그리고 계약서 작성을 통해 범위와 조건을 명확히 안내합니다. 이를 통해 불필요한 오해를 사전에 예방하며, 모든 과정에서 고객 만족을 최우선으로 하고 시공 후에도 안심할 수 있는 서비스를 약속드립니다.",
  },
];

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
    price: 280,
    discount_percent: 0,
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
