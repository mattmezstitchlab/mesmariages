import { Link, useRoute } from "wouter";
import { SiteShell } from "@/components/SiteShell";
import { getPerson, moments, getWedding } from "@/data";

export default function PersonPage() {
  const [, params] = useRoute("/people/:id");
  const person = getPerson(params?.id);
  if (!person) return <SiteShell><div className="empty-state">Personne introuvable.</div></SiteShell>;
  const interventions = moments.filter((moment) => moment.personIds.includes(person.id));
  const contextWedding = getWedding(interventions[0]?.weddingId);

  return (
    <SiteShell weddingId={contextWedding?.id}>
      <main>
        <section className="context-header"><div><Link href={contextWedding ? `/wedding/${contextWedding.id}` : "/"} className="back-link">← {contextWedding?.couple ?? "Mes mariages"}</Link><div className="eyebrow" style={{ marginTop: 28 }}>Personne / fiche relation</div><h1 className="context-title">{person.name}</h1><div className="context-meta">{person.role}</div></div><div className="countdown-block"><span className="countdown-value">{String(interventions.length).padStart(2, "0")}</span><span className="countdown-label">interventions</span></div></section>
        <section className="profile-layout">
          <div className="profile-block"><div className="profile-avatar">{person.initials}</div><p className="profile-name">{person.name}</p><div className="profile-role">{person.role}</div><p className="profile-aside-copy">{person.note}<br /><br />Cette fiche est une source unique. Elle peut être reliée à plusieurs moments sans dupliquer les informations de contact.</p></div>
          <div className="profile-block"><div className="section-heading"><h2>Intervient dans</h2><span>{person.email}</span></div><div className="intervention-list">{interventions.map((moment) => { const wedding = getWedding(moment.weddingId); return <Link href={`/wedding/${moment.weddingId}/moment/${moment.id}`} className="intervention" key={moment.id}><span className="intervention-time">{moment.time}</span><span><span className="intervention-title">{moment.title}</span><span className="intervention-sub">{wedding?.couple} · {wedding?.dateLabel}</span></span><span className="intervention-link">Ouvrir ↗</span></Link>; })}</div><div className="section-heading" style={{ marginTop: 64 }}><h2>Contact démonstration</h2><span>fictif</span></div><p className="detail-copy">{person.phone}<br />{person.email}</p></div>
        </section>
      </main>
    </SiteShell>
  );
}
