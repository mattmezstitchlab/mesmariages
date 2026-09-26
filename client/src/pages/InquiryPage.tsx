import { FormEvent, useState } from "react";
import { Link, useLocation } from "wouter";

const NEEDS = ["Organisation complète", "Lieu", "Prestataires", "Planning du jour J", "Musique / ambiance", "Invités / logistique"];

function makeId() {
  return `lead-${Date.now().toString(36)}`;
}

export type WeddingInquiry = {
  id: string;
  createdAt: string;
  names: string;
  email: string;
  phone: string;
  date: string;
  city: string;
  guests: number;
  budget: string;
  needs: string[];
  style: string;
  message: string;
};

export function getInquiry(id?: string): WeddingInquiry | null {
  if (!id) return null;
  try {
    const raw = window.localStorage.getItem(`mes-mariages-lead-${id}`);
    return raw ? JSON.parse(raw) as WeddingInquiry : null;
  } catch {
    return null;
  }
}

export default function InquiryPage() {
  const [, navigate] = useLocation();
  const [names, setNames] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [guests, setGuests] = useState("");
  const [budget, setBudget] = useState("");
  const [needs, setNeeds] = useState<string[]>(["Organisation complète"]);
  const [style, setStyle] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function toggleNeed(value: string) {
    setNeeds((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!names.trim() || !email.trim() || !date || !city.trim() || Number(guests) < 1) {
      setError("Renseignez vos prénoms, votre e-mail, la date, la ville et le nombre d’invités.");
      return;
    }
    const lead: WeddingInquiry = {
      id: makeId(),
      createdAt: new Date().toISOString(),
      names: names.trim(),
      email: email.trim(),
      phone: phone.trim(),
      date,
      city: city.trim(),
      guests: Number(guests),
      budget,
      needs,
      style: style.trim(),
      message: message.trim(),
    };
    window.localStorage.setItem(`mes-mariages-lead-${lead.id}`, JSON.stringify(lead));
    window.localStorage.setItem("mes-mariages-last-lead", lead.id);
    navigate(`/rapport/${lead.id}`);
  }

  return (
    <main className="public-page">
      <header className="public-header">
        <Link href="/" className="public-wordmark">WORLD WEDDING</Link>
        <Link href="/" className="public-back">Bureau ↗</Link>
      </header>
      <section className="inquiry-hero">
        <div>
          <span className="eyebrow">Votre mariage / Première rencontre</span>
          <h1>Racontez-nous<br /><em>votre journée.</em></h1>
        </div>
        <p>Quelques réponses suffisent. Nous transformons votre projet en première feuille de route : priorités, moments clés, besoins logistiques et prochaines étapes.</p>
      </section>

      <form className="public-form" onSubmit={handleSubmit}>
        <div className="public-form-intro">
          <span className="aside-label">01 / Votre projet</span>
          <strong>Le formulaire prend environ 2 minutes.</strong>
          <span>Votre rapport apparaît immédiatement après l’envoi.</span>
        </div>
        <div className="public-form-fields">
          <label><span>Vos prénoms *</span><input value={names} onChange={(e) => setNames(e.target.value)} placeholder="Emma & Louis" /></label>
          <div className="form-field-row"><label><span>E-mail *</span><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@email.com" /></label><label><span>Téléphone</span><input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+33 6…" /></label></div>
          <div className="form-field-row"><label><span>Date du mariage *</span><input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label><label><span>Ville / région *</span><input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Lille, Paris, Belgique…" /></label></div>
          <div className="form-field-row"><label><span>Nombre d’invités *</span><input type="number" min="1" value={guests} onChange={(e) => setGuests(e.target.value)} placeholder="120" /></label><label><span>Budget indicatif</span><select value={budget} onChange={(e) => setBudget(e.target.value)}><option value="">À définir</option><option>Moins de 15 000 €</option><option>15 000 – 25 000 €</option><option>25 000 – 40 000 €</option><option>40 000 € et +</option></select></label></div>

          <fieldset>
            <legend>Ce dont vous avez besoin</legend>
            <div className="choice-grid">{NEEDS.map((need) => <button type="button" key={need} className={needs.includes(need) ? "choice active" : "choice"} onClick={() => toggleNeed(need)}>{needs.includes(need) ? "✓" : "＋"} {need}</button>)}</div>
          </fieldset>

          <label><span>Ambiance / style</span><input value={style} onChange={(e) => setStyle(e.target.value)} placeholder="Élégant, festif, naturel, très éditorial…" /></label>
          <label><span>Ce que vous avez déjà en tête</span><textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} placeholder="Lieu trouvé, contraintes, envie particulière, ce qui vous inquiète…" /></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="public-submit-row"><span>Vos réponses servent à préparer votre première feuille de route.</span><button className="primary-button" type="submit">Recevoir mon rapport <span>↗</span></button></div>
        </div>
      </form>
      <footer className="public-footer">WORLD WEDDING · Première étude de votre projet · 2027</footer>
    </main>
  );
}
