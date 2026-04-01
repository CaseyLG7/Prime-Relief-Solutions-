function getColor(score) {
  if (score >= 80) return "green";
  if (score >= 60) return "orange";
  return "red";
}

export default function Table({ data }) {
  return (
    <table border="1" cellPadding="5" width="100%">
      <thead>
        <tr>
          <th>Score</th>
          <th>Case</th>
          <th>Defendant</th>
          <th>Amount</th>
          <th>Hearing</th>
        </tr>
      </thead>
      <tbody>
        {data.map((r, i) => (
          <tr key={i}>
            <td style={{ color: getColor(r.score) }}>{r.score}</td>
            <td>{r["Case Number"]}</td>
            <td>{r["Defendant Name"]}</td>
            <td>${r.amount}</td>
            <td>{r["Next Hearing Date"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
