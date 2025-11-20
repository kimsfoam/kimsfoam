"use server";

import { prisma } from "@/lib/prisma";

// export async function submitQuote(quote: QuoteType) {
//   const saved = await prisma.quote.create({
//     data: {
//       email: quote.email!,
//       name: quote.name!,
//       phone: quote.phone ?? null,
//       status: quote.status,
//       createdAt: new Date(),
//       workAt: quote.workAt ?? null,
//       price: quote.price,
//       thickness: quote.thickness,
//       solutionType: quote.solutionType,
//       buildingType: quote.buildingType,
//       area: quote.area,
//     },
//   });
//
//   return saved;
// }

export async function submitQuote(data: {
  email: string;
  name: string;
  phone: string | null;
  status: number;
  createdAt: Date;
  workAt: Date | null;
  price: number;
  thickness: number;
  solutionType: number;
  buildingType: number;
  area: number;
}) {
  const saved = await prisma.quote.create({
    data: {
      email: data.email,
      name: data.name,
      phone: data.phone,
      status: data.status,
      createdAt: data.createdAt,
      workAt: data.workAt,
      price: data.price,
      thickness: data.thickness,
      solutionType: data.solutionType,
      buildingType: data.buildingType,
      area: data.area,
    },
  });

  return saved;
}
