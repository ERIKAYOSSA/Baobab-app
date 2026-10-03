import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "../api";
import { BottomNav } from "../components/BottomNav";

export function Discover() {
  const { t } = useTranslation();
  const [q, setQ] = useState("");
  const [results, setResults] = useState<{ id: string; nomComplet: string }[]>([]);

  async function search(e: FormEvent) {
    e.preventDefault();
    const r = await api<{ results: typeof results }>(`/api/personnes/recherche?q=${encodeURIComponent(q)}`);
    setResults(r.results);
  }

  return (
    <div className="app-shell">
      <h2>{t("decouvrir")}</h2>
      <form className="card" onSubmit={search}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("rechercher")} />
        <button type="submit">{t("rechercher")}</button>
      </form>
      {results.map((p) => (
        <div key={p.id} className="card">{p.nomComplet}</div>
      ))}
      <BottomNav />
    </div>
  );
}
