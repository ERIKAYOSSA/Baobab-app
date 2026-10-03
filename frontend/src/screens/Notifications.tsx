import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "../api";
import { BottomNav } from "../components/BottomNav";

export function Notifications() {
  const { t } = useTranslation();
  const [items, setItems] = useState<{ id: string; type: string; texte: string }[]>([]);
  useEffect(() => {
    void api<{ notifications: typeof items }>("/api/notifications").then((r) => setItems(r.notifications));
  }, []);
  return (
    <div className="app-shell">
      <h2>{t("notifications")}</h2>
      {items.map((n) => (
        <div key={n.id} className="card">
          <strong>{n.type}</strong>
          <p>{n.texte}</p>
        </div>
      ))}
      {items.length === 0 && <p className="card">—</p>}
      <BottomNav />
    </div>
  );
}
