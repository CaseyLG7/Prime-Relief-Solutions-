"use client";
import { useEffect, useState } from "react";
import Stats from "../components/Stats";
import Filters from "../components/Filters";
import Table from "../components/Table";
import { scoreCases } from "../lib/score";

export default function Page() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [minAmount, setMinAmount] = useState(500);

  // LOAD DEFAULT JSON DATA
  useEffect(() => {
    fetch("/api/cases")
      .then((r) => r.json())
      .then((res) => {
        setData(res);
        setFiltered(scoreCases(res, minAmount));
      });
  }, []);

  // CSV UPLOAD + AUTO PARSE
  function handleCSVUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target.result;
      const rows = text.split("\n").map((r) => r.split(","));

      const headers = rows[0];
      const json = rows.slice(1).map((row) => {
        let obj = {};
        headers.forEach((h, i) => {
          obj[h.trim()] = row[i]?.trim();
        });
        return obj;
      });

      setData(json);
      setFiltered(scoreCases(json, minAmount));
    };

    reader.readAsText(file);
  }

  // FILTERING
  useEffect(() => {
    const f = scoreCases(data, minAmount).filter((row) =>
      Object.values(row).some((v) =>
        String(v).toLowerCase().includes(search.toLowerCase())
      )
    );
    setFiltered(f);
  }, [search, minAmount]);

  return (
    <div style={{ padding: 20 }}>
      <h1>LDP Eviction Dashboard</h1>

      {/* CSV UPLOAD */}
      <input type="file" accept=".csv" onChange={handleCSVUpload} />

      <Stats data={filtered} />

      <Filters
        search={search}
        setSearch={setSearch}
        minAmount={minAmount}
        setMinAmount={setMinAmount}
      />

      <Table data={filtered} />
    </div>
  );
}
