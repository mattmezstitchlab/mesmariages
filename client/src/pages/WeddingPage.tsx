import { Link, useRoute } from "wouter";
import { SiteShell } from "@/components/SiteShell";
import { getVenue, moments } from "@/data";
import { useWorkspace } from "@/contexts/WorkspaceContext";

export default function WeddingPage() {
  const [, params] = useRoute("/wedding/:id");
  const { weddings } = useWorkspace();
  const wedding = weddings.find((item) => item.id === params?.id);
  if (!wedding) return <SiteShell><div className="empty-state">Dossier introuvable.</div></SiteShell>;
  const venue = getVenue(wedding.venueId);
  const weddingMoments = moments.filter((moment) => moment.weddingId === wedding.id);

  return (
    <SiteShell weddingId={wedding.id}>
      <main>
        <section className="context-header">
          <div>
            <Link href="/" className="back-link">← Mes mariages</Link>
            <h1 className="context-title">{wedding.couple}</h1>
            <div className="context-meta">{wedding.dateLabel} · {wedding.city} · {wedding.guests} invités</div>
          </div>
          <div className="countdown-block"><span className="countdown-value">{wedding.countdown}</span><span className="countdown-label">avant le jour J</span></div>
        </section>

        <section className="timeline-layout" aria-labelledby="timeline-heading">
          <div className="timeline-wrap">
            <div className="timeline-toolbar"><strong id="timeline-heading">Timeline</strong><span>Jour du mariage · {weddingMoments.length} moments</span></div>
            {weddingMoments.length ? weddingMoments.map((moment) => (
              <Link href={`/wedding/${wedding.id}/moment/${moment.id}`} className="timeline-item" key={moment.id}>
                <span className="timeline-time">{moment.time}</span>
                <span className="timeline-main"><span className="timeline-title">{moment.title}</span><span className="timeline-location">{moment.location}</span></span>
                <span className="timeline-note">{moment.duration}</span>
                <span className="timeline-dot" aria-hidden="true" />
              </Link>
            )) : <div className="empty-state timeline-empty"><p>Ce nouveau dossier n’a pas encore de moments.</p><Link href={`/wedding/${wedding.id}/edit`} className="aside-link">Modifier le dossier</Link></div>}
          </div>
          <aside className="timeline-aside">
            <div className="aside-card"><span className="aside-label">Prochaine action</span><p className="aside-value">{wedding.nextAction}</p><p className="aside-text">Le prochain geste à poser pour garder ce dossier en mouvement.</p></div>
            <div className="aside-card"><span className="aside-label">Lieu</span><p className="aside-value">{venue?.name ?? wedding.venueLabel}</p><p className="aside-text">{venue?.address ?? "Adresse à confirmer"}<br />{venue?.note ?? "Lieu de démonstration local"}</p><Link href={weddingMoments[0] ? `/wedding/${wedding.id}/moment/${weddingMoments[0].id}` : `/wedding/${wedding.id}/edit`} className="aside-link">{weddingMoments[0] ? "Voir le jour" : "Compléter le dossier"}</Link></div>
            <div className="aside-card"><span className="aside-label">État du dossier</span><p className="aside-value">{wedding.status}</p><p className="aside-text">Les informations affichées sont locales et fictives.</p><Link href={`/wedding/${wedding.id}/edit`} className="aside-link">Modifier le dossier</Link></div>
          </aside>
        </section>
      </main>
    </SiteShell>
  );
}
