export function scoreCases(rows, minAmount) {
  return rows
    .map((r) => {
      const amount = Number(r["Claim Amount"] || 0);
      const status = (r["Case Status "] || "").toLowerCase();

      let score = 0;
      if (status.includes("active")) score += 40;
      if (amount >= 1000) score += 30;
      if (amount >= 2000) score += 20;

      return { ...r, score, amount };
    })
    .filter((r) => r.score >= 50 && r.amount >= minAmount)
    .sort((a, b) => b.score - a.score);
}
