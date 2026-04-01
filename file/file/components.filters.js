export default function Filters({ search, setSearch, minAmount, setMinAmount }) {
  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <input
        type="number"
        value={minAmount}
        onChange={(e) => setMinAmount(e.target.value)}
      />
    </div>
  );
}
