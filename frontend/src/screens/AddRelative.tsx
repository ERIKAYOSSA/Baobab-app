import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { api, getUser } from "../api";
import { BottomNav } from "../components/BottomNav";

const TYPES = ["parent", "enfant", "frere_soeur", "conjoint", "belle_famille"] as const;

export function AddRelative() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const me = getUser<{ id: string }>();
  const [typeLien, setTypeLien] = useState<(typeof TYPES)[number] | "">("");
  const [matches, setMatches] = useState<{ id: string; nomComplet: string }[]>([]);
  const [keepId, setKeepId] = useState("");
  const [form, setForm] = useState({
    nomComplet: "",
    dateNaissance: "",
    lieuNaissance: "",
    genre: "non_precise",
    biologique: true,
    actuel: true,
  });

  useEffect(() => {
    void api("/api/personnes/types-lien");
  }, []);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!me?.id || !typeLien) return;
    const r = await api<{ proche: { id: string }; correspondances: { id: string; nomComplet: string }[] }>(
      `/api/personnes/${me.id}/proche`,
      { method: "POST", body: JSON.stringify({ typeLien, ...form }) },
    );
    setKeepId(r.proche.id);
    setMatches(r.correspondances || []);
    if (!r.correspondances?.length) nav("/arbre");
  }

  async function merge(doublonId: string) {
    await api(`/api/personnes/${keepId}/fusionner`, {
      method: "POST",
      body: JSON.stringify({ doublonId }),
    });
    nav("/arbre");
  }

  return (
    <div className="app-shell">
      <h2>{t("ajouterProche")}</h2>
      {!typeLien && (
        <div className="cards">
          {TYPES.map((id) => (
            <button key={id} className="pick" type="button" onClick={() => setTypeLien(id)}>
              {t(id === "frere_soeur" ? "frereSoeur" : id === "belle_famille" ? "belleFamille" : id)}
            </button>
          ))}
        </div>
      )}
      {typeLien && !matches.length && (
        <form className="card" onSubmit={submit}>
          <label>{t("nomComplet")}</label>
          <input required value={form.nomComplet} onChange={(e) => setForm({ ...form, nomComplet: e.target.value })} />
          <label>{t("dateNaissance")}</label>
          <input type="date" value={form.dateNaissance} onChange={(e) => setForm({ ...form, dateNaissance: e.target.value })} />
          <label>{t("lieuNaissance")}</label>
          <input value={form.lieuNaissance} onChange={(e) => setForm({ ...form, lieuNaissance: e.target.value })} />
          {(typeLien === "parent" || typeLien === "enfant") && (
            <label>
              <input type="checkbox" checked={form.biologique} onChange={(e) => setForm({ ...form, biologique: e.target.checked })} /> biologique
            </label>
          )}
          {typeLien === "conjoint" && (
            <label>
              <input type="checkbox" checked={form.actuel} onChange={(e) => setForm({ ...form, actuel: e.target.checked })} /> actuel
            </label>
          )}
          <button type="submit">{t("valider")}</button>
        </form>
      )}
      {matches.length > 0 && (
        <div className="card">
          {matches.map((m) => (
            <div key={m.id}>
              <p>{m.nomComplet}</p>
              <button type="button" onClick={() => merge(m.id)}>{t("fusionner")}</button>
            </div>
          ))}
          <button className="ghost" type="button" onClick={() => nav("/arbre")}>{t("passer")}</button>
        </div>
      )}
      <BottomNav />
    </div>
  );
}
