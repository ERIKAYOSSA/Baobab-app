import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { api } from "../api";
import { BottomNav } from "../components/BottomNav";

export function FamilleExistante() {
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
      <h2>{t("familleDeja")}</h2>
      <form className="card" onSubmit={search}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("nomComplet")} />
        <p><button type="submit">{t("rechercher")}</button></p>
      </form>
      {results.map((p) => (
        <div className="card" key={p.id}>
          <strong>{p.nomComplet}</strong>
          <div>{p.lieuNaissance}</div>
        </div>
      ))}
      <p>
        <button className="secondary" type="button" onClick={() => nav("/ajouter-proche")}>{t("passer")}</button>
      </p>
      <BottomNav />
    </div>
  );
}
