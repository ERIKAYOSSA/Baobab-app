import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { api } from "../api";
import { BottomNav } from "../components/BottomNav";

export function FindFamily() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const [results, setResults] = useState<{ id: string; nomComplet: string; lieuNaissance?: string }[]>([]);

  async function search(e: FormEvent) {
    e.preventDefault();
    const r = await api<{ results: typeof results }>(`/api/personnes/recherche?q=${encodeURIComponent(q)}`);
    setResults(r.results);
  }

  return (
    <div className="app-shell">
      <div className="card">
        <h2>{t("familleDeja")}</h2>
        <form onSubmit={search}>
          <input value={q} onChange={(e) => setQ(e.target.value)} />
          <button type="submit">{t("rechercher")}</button>
        </form>
        {results.map((p) => (
          <div key={p.id} className="card">
            <strong>{p.nomComplet}</strong>
            <div>{p.lieuNaissance}</div>
          </div>
        ))}
        <button className="ghost" type="button" onClick={() => nav("/arbre")}>{t("passer")}</button>
      </div>
      <BottomNav />
    </div>
  );
}
