import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function BottomNav() {
  const { t } = useTranslation();
  return (
    <nav className="nav">
      <NavLink to="/arbre">{t("arbre")}</NavLink>
      <NavLink to="/decouvrir">{t("decouvrir")}</NavLink>
      <NavLink to="/notifications">{t("notifications")}</NavLink>
      <NavLink to="/moi">{t("moi")}</NavLink>
    </nav>
  );
}
