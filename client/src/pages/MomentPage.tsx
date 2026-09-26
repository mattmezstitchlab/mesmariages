import { Link, useRoute } from "wouter";
import { SiteShell } from "@/components/SiteShell";
import { getDocuments, getMoment, getPeople, getVenue, getWedding } from "@/data";

export default function MomentPage() {
  const [, params] = useRoute("/wedding/:weddingId/moment/:momentId");
  const wedding = getWedding(params?.weddingId);
  const moment = getMoment(params?.momentId);
  if (!wedding || !moment) return <SiteShell><div className="empty-state">Moment introuvable.</div></SiteShell>;
  const people = getPeople(moment.personIds);
  const providers = getPeople(moment.providerIds);
  const docs = getDocuments(moment.documentIds);
  const venue = getVenue(wedding.venueId);

  return (
    <SiteShell weddingId={wedding.id}>
      <main>
        <section className="context-header">
          <div>
            <Link href={`/wedding/${wedding.id}`} className="back-link">← Timeline · {wedding.couple}</Link>
            <h1 className="context-title">{moment.title}</h1>
            <div className="context-meta">{moment.time} · {wedding.dateLabel} · {venue?.name}</div>
          </div>
          <div className="countdown-block"><span className="countdown-value">{moment.duration}</span><span className="countdown-label">durée prévue</span></div>
        </section>

        <section className="moment-head"><span className="moment-head-label"><strong>Moment {String(moment.weddingId === "matt-sophie" ? "04" : "05")}</strong> / détail éditorial</span><span className="folio">01</span></section>
        <section className="moment-hero">
          <div className="moment-hero-visual">{moment.image && <img src={moment.image} alt={moment.imageAlt ?? "Photographie éditoriale de mariage"} />}</div>
          <div className="moment-summary"><div><div className="eyebrow">{moment.location}</div><h2 className="moment-title">{moment.title}</h2><p className="moment-summary-copy">{moment.description}</p></div><div className="moment-time">{moment.time} <span className="muted-caption">· {moment.duration}</span></div></div>
        </section>

        <section className="detail-grid">
          <div className="detail-section"><h2>Prestataires</h2><div className="detail-list">{providers.map((person) => <Link href={`/people/${person.id}`} key={person.id}><span>{person.name}</span><small>{person.role}</small></Link>)}</div></div>
          <div className="detail-section"><h2>Personnes</h2><div className="detail-list">{people.map((person) => <Link href={`/people/${person.id}`} key={person.id}><span>{person.name}</span><small>ouvrir</small></Link>)}</div></div>
          <div className="detail-section"><h2>Documents</h2><div className="detail-list">{docs.length ? docs.map((doc) => <Link href={`/documents/${doc.id}`} key={doc.id}><span>{doc.title}</span><small>{doc.kind}</small></Link>) : <div><span>Aucun document lié</span><small>—</small></div>}</div></div>
          <div className="detail-section"><h2>Musique</h2><p className="detail-copy">{moment.music}</p></div>
          <div className="detail-section"><h2>Logistique</h2><ul className="logistics-list">{moment.logistics.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div className="detail-section"><h2>Lieu</h2><p className="detail-copy">{venue?.name}<br />{venue?.address}<br /><span className="muted-caption">{venue?.note}</span></p></div>
        </section>
      </main>
    </SiteShell>
  );
}
