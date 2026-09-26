import { useMemo, useState } from "react";
import { Link } from "wouter";
import { SiteShell } from "@/components/SiteShell";
import { moments, people } from "@/data";
import { useWorkspace } from "@/contexts/WorkspaceContext";

export default function ProvidersPage() {
  const { weddings } = useWorkspace();
  const [filter, setFilter] = useState("all");
  const providerRows = useMemo(() => people.map((person) => {
    const linkedMoments = moments.filter((moment) => moment.providerIds.includes(person.id) && (filter === "all" || moment.weddingId === filter));
    const linkedWeddingIds = Array.from(new Set(linkedMoments.map((moment) => moment.weddingId)));
    return { person, linkedMoments, linkedWeddingIds };
  }).filter((row) => filter === "all" ? row.linkedWeddingIds.length > 0 : row.linkedMoments.length > 0), [filter]);

  return (
    <SiteShell>
      <main>
        <section className="page-intro providers-intro"><div><div className="eyebrow">Annuaire / Saison 2027</div><h1 className="display-title">Les<br /><em>prestataires</em></h1></div><div className="intro-note"><strong>Une seule source</strong>Les prestataires sont reliés aux moments des mariages. Filtrez un dossier pour voir qui intervient, sans créer de doublons.</div></section>
        <section aria-labelledby="providers-heading"><div className="section-heading"><h2 id="providers-heading">Annuaire actif</h2><span>{providerRows.length} prestataires</span></div><div className="filter-row" role="group" aria-label="Filtrer les prestataires par mariage"><button className={filter === "all" ? "filter-button active" : "filter-button"} onClick={() => setFilter("all")}>Tous les mariages</button>{weddings.map((wedding) => <button className={filter === wedding.id ? "filter-button active" : "filter-button"} key={wedding.id} onClick={() => setFilter(wedding.id)}>{wedding.couple}</button>)}</div><div className="provider-list">{providerRows.length ? providerRows.map(({ person, linkedMoments, linkedWeddingIds }) => <article className="provider-row" key={person.id}><div className="profile-avatar small-avatar">{person.initials}</div><div className="provider-main"><h2>{person.name}</h2><p>{person.role} <span>· {person.email}</span></p><div className="provider-tags">{linkedWeddingIds.map((weddingId) => { const wedding = weddings.find((item) => item.id === weddingId); return wedding ? <span key={wedding.id}>{wedding.couple}</span> : null; })}</div></div><div className="provider-moments">{linkedMoments.slice(0, 3).map((moment) => <Link href={`/wedding/${moment.weddingId}/moment/${moment.id}`} key={moment.id}><span>{moment.time}</span>{moment.title} ↗</Link>)}{linkedMoments.length > 3 && <small>+ {linkedMoments.length - 3} autres moments</small>}</div></article>) : <div className="empty-state"><p>Aucun prestataire n’est encore relié à ce mariage.</p><Link href={filter === "all" ? "/new-wedding" : `/wedding/${filter}/edit`} className="aside-link">Compléter le dossier</Link></div>}</div></section><div className="action-row"><Link href="/new-wedding" className="text-button"><span className="plus">＋</span> Ajouter un mariage</Link><span className="muted-caption">Les prestataires apparaissent dès qu’ils sont reliés à un moment.</span></div>
      </main>
    </SiteShell>
  );
}
