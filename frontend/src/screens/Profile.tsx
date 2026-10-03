import { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api, clearSession, getUser } from "../api";
import { BottomNav } from "../components/BottomNav";
import { LangSwitch } from "../components/LangSwitch";
import { useNavigate } from "react-router-dom";

type Personne = {
  id: string;
  nomComplet: string;
  telephone?: string;
  nationalite?: string;
  ethnie?: string;
  compteLimite?: boolean;
  accepteMessages?: boolean;
};

export function Profile() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [p, setP] = useState<Personne | null>(getUser<Personne>());
  const [ethnie, setEthnie] = useState(p?.ethnie || "");
  const [accepte, setAccepte] = useState(p?.accepteMessages !== false);

  useEffect(() => {
    void api<{ personne: Personne }>("/api/moi").then((r) => {
      setP(r.personne);
      setEthnie(r.personne.ethnie || "");
      setAccepte(r.personne.accepteMessages !== false);
    });
  }, []);

  async function save(e: FormEvent) {
    e.preventDefault();
    const r = await api<{ personne: Personne }>("/api/moi", {
      method: "PATCH",
      body: JSON.stringify({ ethnie, accepteMessages: accepte, visibilite: { ethnie: "prive" } }),
    });
    setP(r.personne);
  }

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const body = new FormData();
    body.append("file", file);
    await api("/api/moi/piece-identite", { method: "POST", body });
    const r = await api<{ personne: Personne }>("/api/moi");
    setP(r.personne);
  }

  return (
    <div className="app-shell">
      <LangSwitch />
      <h2>{t("moi")}</h2>
      {p?.compteLimite ? <p className="alert">{t("compteLimite")}</p> : null}
      <form className="card" onSubmit={save}>
        <p><strong>{p?.nomComplet}</strong></p>
        <p>{p?.telephone}</p>
        <label>{t("ethnie")}</label>
        <input value={ethnie} onChange={(e) => setEthnie(e.target.value)} />
        <label>
          <input type="checkbox" checked={accepte} onChange={(e) => setAccepte(e.target.checked)} /> {t("accepteMessages")}
        </label>
        <label>Pièce d’identité</label>
        <input type="file" accept="image/jpeg,image/png,application/pdf" onChange={upload} />
        <button type="submit">{t("valider")}</button>
      </form>
      <button className="ghost" type="button" onClick={() => { clearSession(); nav("/"); }}>{t("deconnexion")}</button>
      <BottomNav />
    </div>
  );
}
