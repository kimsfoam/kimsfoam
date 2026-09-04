"use server";

import { prisma } from "@/lib/prisma";
import { buildingEnum, solutionEnum } from "@/lib/definition";
import nodemailer from "nodemailer";
import { after } from "next/server";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

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
  region?: string;
  schedule?: string;
  memo?: string;
  privacyAgreed: boolean;
}) {
  if (!data.name.trim() || !data.phone?.trim() || !data.privacyAgreed) {
    throw new Error("필수 견적 정보를 확인해 주세요.");
  }

  // 로컬 미리보기에서는 운영 DB를 건드리지 않고 임시 접수번호를 사용합니다.
  const isLocalPreview =
    process.env.NODE_ENV === "development" &&
    process.env.QUOTE_USE_LIVE_DATABASE !== "true";

  const saved = isLocalPreview
    ? { id: Number(String(Date.now()).slice(-6)) }
    : await prisma.quote.create({
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
          region: data.region,
          schedule: data.schedule,
          memo: data.memo,
          privacyAgreed: data.privacyAgreed,
        },
      });

  const smtpUser = process.env.NAVER_SMTP_USER || process.env.AUTH_USER;
  const smtpPassword =
    process.env.NAVER_SMTP_APP_PASSWORD || process.env.AUTH_PASS;
  const notificationEmail = process.env.QUOTE_NOTIFICATION_EMAIL || "kimsfoam@naver.com";
  const notificationQueued = Boolean(
    smtpUser && smtpPassword && notificationEmail,
  );

  if (notificationQueued && smtpUser && smtpPassword) {
    after(async () => {
      await sendQuoteNotification({
        smtpUser,
        smtpPassword,
        notificationEmail,
        quoteId: saved.id,
        data,
      });
    });
  }

  return { quoteId: saved.id, notificationQueued };
}

async function sendQuoteNotification({
  smtpUser,
  smtpPassword,
  notificationEmail,
  quoteId,
  data,
}: {
  smtpUser: string;
  smtpPassword: string;
  notificationEmail: string;
  quoteId: number;
  data: Parameters<typeof submitQuote>[0];
}) {
  const isNaverSmtp = smtpUser.toLowerCase().endsWith("@naver.com");
  const transporter = nodemailer.createTransport({
    host: isNaverSmtp ? "smtp.naver.com" : "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
  });

  const rows = [
    ["접수번호", String(quoteId)],
    ["고객명", data.name],
    ["연락처", data.phone || "-"],
    ["시공 지역", data.region || "미입력"],
    ["건물 유형", buildingEnum[data.buildingType] || "기타"],
    ["단열재", solutionEnum[data.solutionType] || "상담 후 결정"],
    ["예상 면적", `${data.area}㎡`],
    ["시공 두께", data.thickness ? `${data.thickness}T` : "상담 후 결정"],
    ["희망 일정", data.schedule || "일정 미정"],
    ["추가 문의", data.memo || "없음"],
  ];

  try {
    await transporter.sendMail({
      from: `"킴스폼 홈페이지" <${smtpUser}>`,
      to: notificationEmail,
      subject: `[킴스폼] ${data.name}님 신규 견적 문의`,
      text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
      html: `<div style="font-family:Arial,sans-serif;max-width:600px"><h2>새로운 견적 문의가 접수되었습니다.</h2><table style="width:100%;border-collapse:collapse">${rows
        .map(
          ([label, value]) =>
            `<tr><th style="padding:10px;border:1px solid #ddd;text-align:left;background:#f5f5f5">${escapeHtml(label)}</th><td style="padding:10px;border:1px solid #ddd">${escapeHtml(value)}</td></tr>`,
        )
        .join("")}</table><p style="margin-top:20px"><a href="tel:${escapeHtml(data.phone || "")}">고객에게 전화하기</a></p></div>`,
    });
    console.info(`견적 #${quoteId} 알림 메일 발송 완료`);
  } catch (error) {
    console.error(`견적 #${quoteId} 알림 메일 발송 실패`, error);
  }
}
