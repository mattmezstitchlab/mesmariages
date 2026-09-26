import { Link, useRoute } from "wouter";
import { getInquiry } from "./InquiryPage";

function formatDate(value: string) {
  if (!value) return "Date à définir";
  return new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(`${value}T12:00:00`));
}

function printReport() {
  window.print();
}

export default function ReportPage() {
  const [, params] = useRoute("/rapport/:id");
  const inquiry = getInquiry(params?.id);

  if (!inquiry) {
    return <main className="public-page"><header className="public-header"><Link href="/" className="public-wordmark">WORLD WEDDING</Link></header><section className="report-missing"><span className="eyebrow">Rapport introuvable</span><h1>Cette demande n’est plus disponible.</h1><Link href="/demande" className="primary-button">Recommencer <span>↗</span></Link></section></main>;
  }

  const days = inquiry.date ? Math.max(0, Math.ceil((new Date(`${inquiry.date}T12:00:00`).getTime() - Date.now()) / 86400000)) : null;
  const priorities = inquiry.needs.length ? inquiry.needs.slice(0, 3) : ["Cadrer les priorités", "Construire la Timeline", "Identifier les prestataires"];

  return (
    <main className="public-page report-page">
      <header className="public-header"><Link href="/" className="public-wordmark">WORLD WEDDING</Link><span className="report-tag">PREMIÈRE FEUILLE DE ROUTE</span></header>
      <section className="report-hero">
        <div><span className="eyebrow">Rapport préparatoire · {formatDate(inquiry.createdAt.slice(0, 10))}</span><h1>{inquiry.names},<br /><em>voici votre point de départ.</em></h1></div>
        <p>Ce document rassemble les premières informations de votre projet. Il devient le point de départ du dossier de mariage et de sa Timeline.</p>
      </section>

      <section className="report-grid">
        <article className="report-panel report-summary"><span className="aside-label">Votre projet</span><div className="report-facts"><div><small>Date</small><strong>{formatDate(inquiry.date)}</strong></div><div><small>Lieu</small><strong>{inquiry.city}</strong></div><div><small>Invités</small><strong>{inquiry.guests}</strong></div><div><small>Horizon</small><strong>{days === null ? "À définir" : days > 0 ? `J—${days}` : "Date passée"}</strong></div></div></article>
        <article className="report-panel"><span className="aside-label">Priorités détectées</span><ol className="report-priorities">{priorities.map((item, index) => <li key={item}><span>0{index + 1}</span><strong>{item}</strong></li>)}</ol></article>
      </section>

      <section className="report-next">
        <div><span className="eyebrow">La suite</span><h2>Votre mariage peut maintenant devenir un dossier vivant.</h2><p>La prochaine étape consiste à préciser les contraintes, les prestataires déjà choisis et les moments importants. La Timeline servira ensuite de colonne vertébrale opérationnelle.</p></div>
        <div className="report-actions"><button className="primary-button" onClick={printReport}>Imprimer / PDF <span>↗</span></button><Link href="/demande" className="back-link">Modifier mes réponses</Link></div>
      </section>

      <section className="report-details">
        <div><span className="aside-label">Vos besoins</span><div className="report-tags">{inquiry.needs.map((item) => <span key={item}>{item}</span>)}</div></div>
        {inquiry.style && <div><span className="aside-label">Ambiance</span><p>{inquiry.style}</p></div>}
        {inquiry.message && <div><span className="aside-label">Votre note</span><p>{inquiry.message}</p></div>}
      </section>
      <footer className="public-footer">WORLD WEDDING · Rapport préparatoire · Conservez cette page pour la suite</footer>
    </main>
  );
}
