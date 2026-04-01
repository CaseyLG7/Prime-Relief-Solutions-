export default function Stats({ data }) {
  const total = data.length;
  const high = data.filter((d) => d.score >= 80).length;

  const avg =
    data.reduce((sum, d) => sum + (d.amount || 0), 0) /
    (data.length || 1);

  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
      <div>Leads: {total}</div>
      <div>High Priority: {high}</div>
      <div>Avg: ${avg.toFixed(0)}</div>
    </div>
  );
}
