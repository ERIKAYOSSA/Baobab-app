import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { api, getUser } from "../api";
import { BottomNav } from "../components/BottomNav";

type Node = { id: string; nomComplet: string; dateNaissance?: string; statutVital?: string; ethnie?: string };
type Edge = { type: string; from: string; to: string };

export function Tree() {
  const { t } = useTranslation();
  const me = getUser<{ id: string }>();
  const [tree, setTree] = useState<{ nodes: Node[]; edges: Edge[] }>({ nodes: [], edges: [] });
  const [selected, setSelected] = useState<Node | null>(null);

  useEffect(() => {
    if (!me?.id) return;
    void api<{ nodes: Node[]; edges: Edge[] }>(`/api/arbre/${me.id}?depth=2`).then((r) => {
      setTree(r);
      setSelected(r.nodes.find((n) => n.id === me.id) || r.nodes[0] || null);
    });
  }, [me?.id]);

  const parents = useMemo(
    () => tree.edges.filter((e) => e.type === "PARENT_DE" && e.to === me?.id).map((e) => tree.nodes.find((n) => n.id === e.from)).filter(Boolean) as Node[],
    [tree, me?.id],
  );
  const children = useMemo(
    () => tree.edges.filter((e) => e.type === "PARENT_DE" && e.from === me?.id).map((e) => tree.nodes.find((n) => n.id === e.to)).filter(Boolean) as Node[],
    [tree, me?.id],
  );
  const others = tree.nodes.filter((n) => n.id !== me?.id && !parents.some((p) => p.id === n.id) && !children.some((c) => c.id === n.id));

  return (
    <div className="app-shell">
      <div className="brand"><h1>Baobab</h1></div>
      <div className="tree-area">
        <div className="row">
          {parents.map((n) => (
            <button key={n.id} className="node" type="button" onClick={() => setSelected(n)}>{n.nomComplet}</button>
          ))}
        </div>
        <div className="row">
          <button className="node me" type="button" onClick={() => setSelected(tree.nodes.find((n) => n.id === me?.id) || null)}>
            {tree.nodes.find((n) => n.id === me?.id)?.nomComplet || "Moi"}
          </button>
        </div>
        <div className="row">
          {children.map((n) => (
            <button key={n.id} className="node" type="button" onClick={() => setSelected(n)}>{n.nomComplet}</button>
          ))}
        </div>
        {others.length > 0 && (
          <div className="row">
            {others.map((n) => (
              <button key={n.id} className="node" type="button" onClick={() => setSelected(n)}>{n.nomComplet}</button>
            ))}
          </div>
        )}
      </div>
      {selected && (
        <div className="card">
          <strong>{selected.nomComplet}</strong>
          <div>{selected.dateNaissance} · {selected.statutVital} · {selected.ethnie}</div>
          {selected.id !== me?.id && (
            <Link to={`/messages/${selected.id}`}>{t("messages")}</Link>
          )}
        </div>
      )}
      <Link to="/ajouter-proche"><button type="button" style={{ position: "fixed", right: 18, bottom: 88, borderRadius: 28 }}>+</button></Link>
      <BottomNav />
    </div>
  );
}
