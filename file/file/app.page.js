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

  useEffect(() => {
    fetch("/api/cases")
      .then((r) => r.json())
      .then((res) => {
        setData(res);
        setFiltered(scoreCases(res, minAmount));
      });
  }, []);

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
