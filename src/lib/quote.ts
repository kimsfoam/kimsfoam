"use server";

import { prisma } from "@/lib/prisma";

export async function submitQuote(data: {
  email: string;
  name: string;
  phone: string | null;
  status: number;
  createdAt: Date;
  workAt?: Date | null;
  price?: number;
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
