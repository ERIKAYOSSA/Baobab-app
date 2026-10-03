import { useTranslation } from "react-i18next";

export function LangSwitch() {
  const { i18n } = useTranslation();
  function setLang(lng: string) {
    void i18n.changeLanguage(lng);
    localStorage.setItem("baobab_lang", lng);
  }
  return (
    <div className="lang">
      <button type="button" onClick={() => setLang("fr")}>FR</button>
      <button type="button" onClick={() => setLang("en")}>EN</button>
      <button type="button" onClick={() => setLang("sw")}>SW</button>
    </div>
  );
}
