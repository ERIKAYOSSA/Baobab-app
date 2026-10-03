import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { api, setSession } from "../api";
import { LangSwitch } from "../components/LangSwitch";

type Step = 1 | 2 | 3 | 4 | 5;

export function Signup() {
  const { t } = useTranslation();
  const nav = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [error, setError] = useState("");
  const [telephone, setTelephone] = useState("");
  const [code, setCode] = useState("");
  const [debugCode, setDebugCode] = useState("");
  const [form, setForm] = useState({
    nomComplet: "",
    dateNaissance: "",
    lieuNaissance: "",
    genre: "non_precise",
    piecePlusTard: true,
    nationalite: "",
    paysOrigine: "",
    ethnie: "",
    languesMaternelles: "",
    consentementCulturel: false,
  });

  async function sendSms(e: FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const r = await api<{ debugCode?: string }>("/api/inscription/telephone", {
        method: "POST",
        body: JSON.stringify({ telephone }),
      });
      setDebugCode(r.debugCode || "");
      setStep(1);
      (document.getElementById("otp") as HTMLInputElement | null)?.focus();
    } catch (err) {
      setError(err instanceof Error ? err.message : "error");
    }
  }

  async function verify(e: FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const r = await api<{
        existing: boolean;
        accessToken?: string;
        refreshToken?: string;
        personne?: unknown;
      }>("/api/inscription/verifier-otp", {
        method: "POST",
        body: JSON.stringify({ telephone, code }),
      });
      if (r.existing && r.accessToken && r.refreshToken) {
        setSession(r.accessToken, r.refreshToken, r.personne);
        nav("/arbre");
        return;
      }
      setStep(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : "error");
    }
  }

  async function finish(e: FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const r = await api<{ accessToken: string; refreshToken: string; personne: unknown }>(
        "/api/inscription/finaliser",
        {
          method: "POST",
          body: JSON.stringify({
            telephone,
            ...form,
            languesMaternelles: form.languesMaternelles
              ? form.languesMaternelles.split(",").map((x) => x.trim()).filter(Boolean)
              : [],
          }),
        },
      );
      setSession(r.accessToken, r.refreshToken, r.personne);
      nav("/famille");
    } catch (err) {
      setError(err instanceof Error ? err.message : "error");
    }
  }

  return (
    <div className="app-shell">
      <LangSwitch />
      <div className="brand">
        <h1>Baobab</h1>
        <p>{t("plantez")}</p>
      </div>
      {error ? <p className="error">{error}</p> : null}
      {step === 1 && (
        <form className="card" onSubmit={debugCode || code ? verify : sendSms}>
          <h2>{t("connexion")}</h2>
          <label>{t("telephone")}</label>
          <input value={telephone} onChange={(e) => setTelephone(e.target.value)} placeholder="+2376..." required />
          <button type="submit">{t("envoyerCode")}</button>
          {(debugCode || true) && (
            <>
              <label>{t("codeSms")}</label>
              <input id="otp" value={code} onChange={(e) => setCode(e.target.value)} maxLength={6} />
              {debugCode ? <p className="alert">Dev OTP: {debugCode}</p> : null}
              <button type="submit">{t("verifier")}</button>
            </>
          )}
        </form>
      )}
      {step === 2 && (
        <form className="card" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
          <label>{t("nomComplet")}</label>
          <input value={form.nomComplet} onChange={(e) => setForm({ ...form, nomComplet: e.target.value })} required />
          <label>{t("dateNaissance")}</label>
          <input type="date" value={form.dateNaissance} onChange={(e) => setForm({ ...form, dateNaissance: e.target.value })} required />
          <label>{t("lieuNaissance")}</label>
          <input value={form.lieuNaissance} onChange={(e) => setForm({ ...form, lieuNaissance: e.target.value })} required />
          <label>{t("genre")}</label>
          <select value={form.genre} onChange={(e) => setForm({ ...form, genre: e.target.value })}>
            <option value="femme">{t("femme")}</option>
            <option value="homme">{t("homme")}</option>
            <option value="autre">{t("autre")}</option>
            <option value="non_precise">{t("nonPrecise")}</option>
          </select>
          <button type="submit">{t("continuer")}</button>
        </form>
      )}
      {step === 3 && (
        <form className="card" onSubmit={(e) => { e.preventDefault(); setStep(4); }}>
          <p>{t("compteLimite")}</p>
          <label>
            <input type="checkbox" checked={form.piecePlusTard} onChange={(e) => setForm({ ...form, piecePlusTard: e.target.checked })} /> {t("plusTard")}
          </label>
          <button type="submit">{t("continuer")}</button>
        </form>
      )}
      {step === 4 && (
        <form className="card" onSubmit={(e) => { e.preventDefault(); setStep(5); }}>
          <label>{t("nationalite")} *</label>
          <input value={form.nationalite} onChange={(e) => setForm({ ...form, nationalite: e.target.value })} required />
          <label>{t("paysOrigine")}</label>
          <input value={form.paysOrigine} onChange={(e) => setForm({ ...form, paysOrigine: e.target.value })} />
          <label>{t("ethnie")}</label>
          <input value={form.ethnie} onChange={(e) => setForm({ ...form, ethnie: e.target.value })} />
          <label>{t("langues")}</label>
          <input value={form.languesMaternelles} onChange={(e) => setForm({ ...form, languesMaternelles: e.target.value })} />
          <label>
            <input type="checkbox" checked={form.consentementCulturel} onChange={(e) => setForm({ ...form, consentementCulturel: e.target.checked })} /> {t("consentement")}
          </label>
          <button type="submit">{t("continuer")}</button>
        </form>
      )}
      {step === 5 && (
        <form className="card" onSubmit={finish}>
          <h2>{t("recap")}</h2>
          <p>{form.nomComplet} · {form.dateNaissance} · {form.lieuNaissance}</p>
          <p>{telephone} · {form.nationalite}</p>
          <button type="submit">{t("valider")}</button>
        </form>
      )}
    </div>
  );
}
