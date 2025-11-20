function seededRandom(seed: number) {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

export function seededShuffle<T>(array: T[], seed: number): T[] {
  const rand = seededRandom(seed);
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function seededSplitRandomGroups<T>(list: T[], seed: number): T[][] {
  const groupCount = 5;
  const itemsPerGroup = 5;
  const shuffled = seededShuffle(list, seed);
  return Array.from({ length: groupCount }, (_, i) =>
    shuffled.slice(i * itemsPerGroup, i * itemsPerGroup + itemsPerGroup),
  );
}

export function generateSeededHeights(count: number, seed: number) {
  const rand = seededRandom(seed);
  const result: number[] = [];

  let h5 = 0;
  for (let i = 0; i < count; i++) {
    if (i % 5 === 0) h5 = 0;

    let h = 70 + Math.floor(rand() * 9) * 5; // 70~120, 5 단위
    h5 += h;

    if (i % 5 === 4) h = Math.max(h, h + 450 - h5);
    result.push(h);
  }
  return result;
}
