import { Link, useRoute } from "wouter";
import { SiteShell } from "@/components/SiteShell";
import { getDocument, getMoment, getWedding } from "@/data";

export default function DocumentPage() {
  const [, params] = useRoute("/documents/:id");
  const document = getDocument(params?.id);
  if (!document) return <SiteShell><div className="empty-state">Document introuvable.</div></SiteShell>;
  const wedding = getWedding(document.weddingId);
  const moment = getMoment(document.momentId);

  return (
    <SiteShell weddingId={wedding?.id}>
      <main>
        <section className="context-header"><div><Link href={moment ? `/wedding/${document.weddingId}/moment/${moment.id}` : `/wedding/${document.weddingId}`} className="back-link">← {moment?.title ?? "Timeline"}</Link><div className="document-type" style={{ marginTop: 28 }}>{document.kind} · document fictif</div><h1 className="document-title">{document.title}</h1><div className="context-meta">{wedding?.couple} · {wedding?.dateLabel}</div></div><div className="countdown-block"><span className="countdown-value">{String(document.pages).padStart(2, "0")}</span><span className="countdown-label">pages aperçu</span></div></section>
        <section className="document-layout">
          <aside className="document-meta"><div className="aside-card"><span className="aside-label">Dernière mise à jour</span><p className="aside-value">{document.updated}</p><p className="aside-text">Ce document est une représentation locale. Aucun fichier réel n’est ouvert ou envoyé.</p></div><div className="aside-card"><span className="aside-label">Lié au moment</span><p className="aside-value">{moment?.time} · {moment?.title}</p><Link href={`/wedding/${document.weddingId}/moment/${moment?.id}`} className="aside-link">Revenir au moment</Link></div></aside>
          <div className="document-preview"><div className="document-preview-top"><span>World Wedding / {document.kind}</span><span>Prototype / 01</span></div><h2>{document.title}</h2><p>{document.preview}</p><div className="document-lines"><span style={{ width: "82%" }} /><span style={{ width: "64%" }} /><span style={{ width: "91%" }} /><span style={{ width: "74%" }} /><span style={{ width: "48%" }} /></div><p style={{ marginTop: 48, fontSize: 10, textTransform: "uppercase", letterSpacing: ".12em" }}>Aperçu fictif · {document.pages} pages · {wedding?.city}</p></div>
        </section>
      </main>
    </SiteShell>
  );
}
