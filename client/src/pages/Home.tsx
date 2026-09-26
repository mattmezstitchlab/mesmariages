import { Link } from "wouter";
import { SiteShell } from "@/components/SiteShell";
import { useWorkspace } from "@/contexts/WorkspaceContext";

export default function Home() {
  const { weddings } = useWorkspace();

  return (
    <SiteShell>
      <main>
        <section className="page-intro">
          <div>
            <div className="eyebrow">Bureau / Saison 2027</div>
            <h1 className="display-title">Mes<br /><em>mariages</em></h1>
            <div className="metric-row" aria-label="Résumé de la saison">
              <div className="metric"><span className="metric-value">{String(weddings.length).padStart(2, "0")}</span><span className="metric-label">dossiers actifs</span></div>
              <div className="metric"><span className="metric-value">{weddings.reduce((total, wedding) => total + wedding.guests, 0)}</span><span className="metric-label">invités suivis</span></div>
              <div className="metric"><span className="metric-value">27</span><span className="metric-label">saison</span></div>
            </div>
          </div>
          <div className="intro-note">
            <strong>Le bureau de travail</strong>
            Chaque mariage est un dossier vivant. Ouvrez une édition pour entrer directement dans sa Timeline.
          </div>
        </section>

        <section aria-labelledby="weddings-heading">
          <div className="section-heading"><h2 id="weddings-heading">Éditions en cours</h2><span>{String(weddings.length).padStart(2, "0")} / {String(weddings.length).padStart(2, "0")} mariages</span></div>
          <div className="issue-list">
            {weddings.map((wedding, index) => (
              <Link href={`/wedding/${wedding.id}`} className="issue-card" key={wedding.id}>
                <div className="issue-image" aria-label={wedding.imageAlt}>
                  {wedding.image && <img src={wedding.image} alt="" />}
                </div>
                <div className="issue-top"><span className="issue-index">WORLD WEDDING / {String(index + 1).padStart(2, "0")}</span><span className="issue-count">{wedding.countdown}</span></div>
                <div className="issue-bottom">
                  <span className="issue-kicker">{wedding.dateLabel} · {wedding.city}</span>
                  <h2 className="issue-title">{wedding.couple}</h2>
                  <div className="issue-meta">
                    <p><strong>Prochaine action</strong>{wedding.nextAction}</p>
                    <span className="issue-arrow" aria-hidden="true">↗</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="action-row">
            <Link href="/new-wedding" className="text-button"><span className="plus">＋</span> Nouveau mariage</Link>
            <span className="muted-caption">Dossier enregistré localement</span>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
