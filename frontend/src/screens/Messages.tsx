import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import { BottomNav } from "../components/BottomNav";

type Msg = { id: string; texte: string; auteurId: string; createdAt: string };

export function Messages() {
  const { personneId } = useParams();
  const [convId, setConvId] = useState("");
  const [items, setItems] = useState<Msg[]>([]);
  const [texte, setTexte] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!personneId) return;
    void (async () => {
      try {
        const c = await api<{ conversation: { id: string } }>(`/api/conversations/${personneId}`, { method: "POST" });
        setConvId(c.conversation.id);
        const m = await api<{ messages: Msg[] }>(`/api/conversations/${c.conversation.id}/messages`);
        setItems(m.messages);
      } catch (err) {
        setError(err instanceof Error ? err.message : "error");
      }
    })();
  }, [personneId]);

  async function send(e: FormEvent) {
    e.preventDefault();
    if (!convId) return;
    const r = await api<{ message: Msg }>(`/api/conversations/${convId}/messages`, {
      method: "POST",
      body: JSON.stringify({ texte }),
    });
    setItems((prev) => [...prev, { ...r.message, auteurId: "me", texte }]);
    setTexte("");
  }

  return (
    <div className="app-shell">
      <h2>Messages</h2>
      {error ? <p className="error">{error}</p> : null}
      {items.map((m) => (
        <div key={m.id} className="card">{m.texte}</div>
      ))}
      <form className="card" onSubmit={send}>
        <input value={texte} onChange={(e) => setTexte(e.target.value)} />
        <button type="submit">OK</button>
      </form>
      <BottomNav />
    </div>
  );
}
