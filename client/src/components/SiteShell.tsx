import { Link, useLocation } from "wouter";
import { useEffect, useMemo, useState } from "react";
import { documents, moments, people } from "@/data";
import { useWorkspace } from "@/contexts/WorkspaceContext";

type SiteShellProps = {
  children: React.ReactNode;
  weddingId?: string;
};

export function SiteShell({ children, weddingId }: SiteShellProps) {
  const [location] = useLocation();
  const { weddings } = useWorkspace();
  const [notice, setNotice] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 2400);
    return () => window.clearTimeout(timer);
  }, [notice]);

  useEffect(() => {
    setSearchOpen(false);
    setQuery("");
  }, [location]);

  const searchResults = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    const matches = (value: string) => value.toLowerCase().includes(normalized);
    const result = [
      ...weddings.filter((wedding) => matches(`${wedding.couple} ${wedding.city} ${wedding.dateLabel}`)).map((wedding) => ({ type: "Mariage", label: wedding.couple, sub: `${wedding.dateLabel} · ${wedding.city}`, href: `/wedding/${wedding.id}` })),
      ...people.filter((person) => matches(`${person.name} ${person.role} ${person.email}`)).map((person) => ({ type: "Personne", label: person.name, sub: person.role, href: `/people/${person.id}` })),
      ...moments.filter((moment) => matches(`${moment.title} ${moment.location} ${moment.description}`)).map((moment) => ({ type: "Moment", label: `${moment.time} · ${moment.title}`, sub: moment.location, href: `/wedding/${moment.weddingId}/moment/${moment.id}` })),
      ...documents.filter((document) => matches(`${document.title} ${document.kind} ${document.preview}`)).map((document) => ({ type: "Document", label: document.title, sub: `${document.kind} · ${document.updated}`, href: `/documents/${document.id}` })),
    ];
    return result.slice(0, 8);
  }, [query, weddings]);

  const isTimeline = Boolean(weddingId) && /^\/wedding\/[^/]+$/.test(location);

  return (
    <div className="app-shell">
      <div className="page-width">
        <header className="topbar">
          <Link href="/" className="wordmark" aria-label="World Wedding, accueil"><span className="wordmark-mark" aria-hidden="true" /><span>WORLD WEDDING</span></Link>
          <nav className="topnav" aria-label="Navigation principale">
            <Link href="/" className={!weddingId && location === "/" ? "active" : ""}>Mariages</Link>
            <Link href="/providers" className={location === "/providers" ? "active" : ""}>Prestataires</Link>
            {weddingId && <Link href={`/wedding/${weddingId}`} className={isTimeline ? "active" : ""}>Timeline</Link>}
            <button className={searchOpen ? "text-button active-search" : "text-button"} onClick={() => setSearchOpen((open) => !open)} aria-expanded={searchOpen}>Recherche</button>
          </nav>
          <span className="proto-tag">Saison 2027</span>
          {searchOpen && <div className="search-panel"><div className="search-input-wrap"><span>⌕</span><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Personne, document, moment…" aria-label="Rechercher dans World Wedding" /><button onClick={() => { setQuery(""); setSearchOpen(false); }} aria-label="Fermer la recherche">×</button></div>{query && <div className="search-results">{searchResults.length ? searchResults.map((result) => <Link href={result.href} className="search-result" key={`${result.type}-${result.href}`}><span className="search-result-type">{result.type}</span><span><strong>{result.label}</strong><small>{result.sub}</small></span><span className="search-result-arrow">↗</span></Link>) : <div className="search-empty">Aucun résultat dans les données locales.</div>}</div>}</div>}
        </header>
        {children}
        <footer className="demo-note">MES MARIAGES · Bureau de coordination · Saison 2027</footer>
      </div>
      <nav className="mobile-nav" aria-label="Navigation mobile">
        <Link href="/" className={!weddingId && location === "/" ? "active" : ""}><span className="nav-mark" />Mariages</Link>
        <button className={searchOpen ? "active" : ""} onClick={() => setSearchOpen(true)}><span className="nav-mark" />Recherche</button>
        <Link href="/providers" className={location === "/providers" ? "active" : ""}><span className="nav-mark" />Prestataires</Link>
        {weddingId ? <Link href={`/wedding/${weddingId}`} className={isTimeline ? "active" : ""}><span className="nav-mark" />Timeline</Link> : <button onClick={() => setNotice("Ouvrez un mariage pour voir sa Timeline")}><span className="nav-mark" />Timeline</button>}
      </nav>
      {notice && <div className="toast-note" role="status">{notice}</div>}
    </div>
  );
}
