/* feature */
export type FeatureType = {
  title: string;
  description: string;
  image?: string;
};

export type FAQType = {
  title: string;
  description: string;
};

export type GalleryType = {
  title: string;
  image: string;
  url: string;
};

export type SolutionType = {
  title: string;
  description: string;
  isMost: boolean;
  price: number;
  discount_percent: number;
  place: string[];
};

export const statusEnum = [
  "답변 대기 중",
  "취소됨",
  "방문 예정",
  "결제 대기 중",
  "시공 완료",
];
export const solutionEnum = ["수성연질폼", "저밀도", "경질폼", "준불연폼"];
export const buildingEnum = [
  "단독주택",
  "한옥·목조주택",
  "원룸",
  "상가",
  "창고",
  "냉동·저온창고",
  "비닐하우스",
  "컨테이너",
  "학교",
  "축사",
  "관공서",
  "기타",
];

export type QuoteType = {
  id?: number;
  email: string;
  name: string;
  phone?: string;
  status: number;
  createdAt: Date | null;
  workAt?: Date | null;
  price?: number;
  thickness: number;
  solutionType: number;
  buildingType: number;
  area: number;
};

export type ProjectType = {
  id?: number;
  title: string;
  date: Date;
  buildingType: number;
  url: string;
  thumbnail: string;
  region?: string | null;
  city?: string | null;
};
