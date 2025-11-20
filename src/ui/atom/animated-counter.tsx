"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollCounter({
  start = 0,
  target = 100,
  minStep = 1,
  maxStep = 10,
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);
  const [value, setValue] = useState(start);

  // 화면 등장/이탈 상태 감지
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
        } else {
          setActive(false);
          setValue(start);
        }
      },
      { threshold: 0 }, // 보이면 활성 / 안 보이면 비활성
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [start]);

  // 스크롤할 때마다 값 업데이트
  useEffect(() => {
    if (!active) return;
    const el = ref.current;

    const update = () => {
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // 스크롤 진행률 계산: 요소의 top이 화면 아래→중간→위로 이동할수록 0→1
      const rawProgress = 1 - Math.min(Math.max(rect.top / vh, 0), 1);
      const progress = Math.min(rawProgress * 1.4, 1);

      // 기대되는 목표값
      const expected = start + (target - start) * progress;

      // 현재 값이 기대값보다 낮으면 랜덤 step로 점프
      if (value < expected) {
        const step =
          Math.floor(minStep + Math.random() * (maxStep - minStep)) || 1;
        const next = Math.min(value + step, expected, target);
        if (next !== value) setValue(next);
      }
    };

    const onScroll = () => requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [active, value, start, target, minStep, maxStep]);

  return (
    <span
      ref={ref}
      className="text-brand-red inline-block font-bold tabular-nums transition-transform duration-75"
      style={{ transform: `translateY(${value % 10}px)` }}
    >
      {Math.round(value)}
    </span>
  );
}
