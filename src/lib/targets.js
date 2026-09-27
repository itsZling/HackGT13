// Static MVP target pool (2 per difficulty, per CLAUDE.md minimum). Swap for a
// Firestore "targets" collection later if the library grows past this.
export const TARGET_POOL = [
  { id: "easy-1", difficulty: "easy", referenceImage: "/targets/easy-1.png", colors: ["#B9C99F", "#F7CB71", "#7C3219", "#FEF9CE"] },
  { id: "easy-2", difficulty: "easy", referenceImage: "/targets/easy-2.png", colors: ["#FFFFFF", "#EC1D25", "#004B8E"] },
  { id: "easy-3", difficulty: "easy", referenceImage: "/targets/easy-3.png", colors: ["#FAE29E", "#743F3F"] },
  { id: "easy-4", difficulty: "easy", referenceImage: "/targets/easy-4.png", colors: ["#84B9EF", "#FFFFFF", "#2F6193"] },
  { id: "easy-5", difficulty: "easy", referenceImage: "/targets/easy-5.png", colors: ["#065840", "#C3C3A8"] },
  { id: "medium-1", difficulty: "medium", referenceImage: "/targets/medium-1.png", colors: ["#3450AE", "#22D16A"] },
  { id: "medium-2", difficulty: "medium", referenceImage: "/targets/medium-2.png", colors: ["#284A5B", "#F1F271", "#BE6B6C"] },
  { id: "medium-3", difficulty: "medium", referenceImage: "/targets/medium-3.png", colors: ["#FFF8E1", "#9676CF", "#7454B4"] },
  { id: "medium-4", difficulty: "medium", referenceImage: "/targets/medium-4.png", colors: ["#8FC5EF", "#2D3464", "#FFFFFF"] },
  { id: "medium-5", difficulty: "medium", referenceImage: "/targets/medium-5.png", colors: ["#F8D2D1", "#DE6B67", "#2F5A76"] },
  { id: "hard-1", difficulty: "hard", referenceImage: "/targets/hard-1.png", colors: ["#1F1446", "#FFCA00", "#4A9A86"] },
  { id: "hard-2", difficulty: "hard", referenceImage: "/targets/hard-2.png", colors: ["#8BFA94", "#D76159"] },
  { id: "hard-3", difficulty: "hard", referenceImage: "/targets/hard-3.png", colors: ["#45B45B", "#194247", "#E3473C", "#FABC0D"] },
  { id: "hard-4", difficulty: "hard", referenceImage: "/targets/hard-4.png", colors: ["#94B31F", "#FFFFFF", "#5F5F1E"] },
  { id: "hard-5", difficulty: "hard", referenceImage: "/targets/hard-5.png", colors: ["#F7CB71", "#7C3219", "#8B4524"] },
];

export function getTargetById(id) {
  return TARGET_POOL.find((t) => t.id === id) ?? null;
}

export function pickRandomTargetId(difficulty) {
  const pool = TARGET_POOL.filter((t) => t.difficulty === difficulty);
  if (pool.length === 0) {
    throw new Error(`No targets available for difficulty "${difficulty}"`);
  }
  return pool[Math.floor(Math.random() * pool.length)].id;
}
