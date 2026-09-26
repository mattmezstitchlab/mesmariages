import { FormEvent, useEffect, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { SiteShell } from "@/components/SiteShell";
import { getVenue } from "@/data";
import { useWorkspace } from "@/contexts/WorkspaceContext";

function toDateLabel(value: string) {
  if (!value) return "DATE À DÉFINIR";
  const date = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "long", year: "numeric" }).format(date).toUpperCase();
}

export default function WeddingFormPage() {
  const [, editParams] = useRoute("/wedding/:id/edit");
  const isEdit = Boolean(editParams?.id);
  const [, navigate] = useLocation();
  const { weddings, addWedding, updateWedding } = useWorkspace();
  const existing = weddings.find((wedding) => wedding.id === editParams?.id);
  const [couple, setCouple] = useState(existing?.couple ?? "");
  const [date, setDate] = useState(existing?.dateISO ?? "");
  const [city, setCity] = useState(existing?.city ?? "");
  const [guests, setGuests] = useState(String(existing?.guests ?? ""));
  const [nextAction, setNextAction] = useState(existing?.nextAction ?? "Préparer le prochain point");
  const [venue, setVenue] = useState(existing ? getVenue(existing.venueId)?.name ?? existing.venueLabel ?? "" : "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!existing) return;
    setCouple(existing.couple);
    setDate(existing.dateISO ?? "");
    setCity(existing.city);
    setGuests(String(existing.guests));
    setNextAction(existing.nextAction);
    setVenue(getVenue(existing.venueId)?.name ?? existing.venueLabel ?? "");
  }, [existing]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!couple.trim() || !date || !city.trim() || Number(guests) < 1) {
      setError("Renseignez au minimum les mariés, la date, la ville et le nombre d’invités.");
      return;
    }
    const input = {
      couple: couple.trim(),
      dateLabel: toDateLabel(date),
      dateISO: date,
      dateShort: date.split("-").reverse().join("."),
      city: city.trim(),
      countdown: isEdit && existing ? existing.countdown : "J—à venir",
      guests: Number(guests),
      nextAction: nextAction.trim() || "Préparer le prochain point",
      status: isEdit && existing ? existing.status : "Nouveau dossier",
      venueId: isEdit && existing ? existing.venueId : `local-venue-${Date.now()}`,
      venueLabel: venue.trim() || `Lieu à confirmer · ${city.trim()}`,
      imageAlt: "Visuel de démonstration du mariage",
    };
    if (isEdit && existing) {
      updateWedding(existing.id, input);
      navigate(`/wedding/${existing.id}`);
    } else {
      const wedding = addWedding(input);
      navigate(`/wedding/${wedding.id}`);
    }
  }

  return (
    <SiteShell>
      <main>
        <section className="context-header form-context-header"><div><Link href="/" className="back-link">← Mes mariages</Link><div className="eyebrow" style={{ marginTop: 28 }}>{isEdit ? "Dossier / édition locale" : "Dossier / nouveau mariage"}</div><h1 className="context-title">{isEdit ? "Modifier" : "Nouveau mariage"}</h1><div className="context-meta">Les changements restent dans ce navigateur.</div></div><div className="countdown-block"><span className="countdown-value">{isEdit ? "02" : "+01"}</span><span className="countdown-label">édition locale</span></div></section>
        <form className="wedding-form" onSubmit={handleSubmit}>
          <div className="form-intro"><span className="aside-label">Fiche de départ</span><p>Créez un dossier léger pour retrouver immédiatement le couple, sa date et la prochaine action.</p><span className="muted-caption">Aucune donnée n’est envoyée.</span></div>
          <div className="form-fields">
            <label><span>Les mariés</span><input value={couple} onChange={(event) => setCouple(event.target.value)} placeholder="Ex. Emma & Louis" autoFocus /></label>
            <div className="form-field-row"><label><span>Date</span><input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label><label><span>Ville</span><input value={city} onChange={(event) => setCity(event.target.value)} placeholder="Paris" /></label></div>
            <div className="form-field-row"><label><span>Invités</span><input type="number" min="1" value={guests} onChange={(event) => setGuests(event.target.value)} placeholder="120" /></label><label><span>Lieu (optionnel)</span><input value={venue} onChange={(event) => setVenue(event.target.value)} placeholder="Maison Aurore" /></label></div>
            <label><span>Prochaine action</span><input value={nextAction} onChange={(event) => setNextAction(event.target.value)} placeholder="Valider le traiteur" /></label>
            {error && <p className="form-error" role="alert">{error}</p>}
            <div className="form-actions"><Link href={isEdit && existing ? `/wedding/${existing.id}` : "/"} className="back-link">Annuler</Link><button type="submit" className="primary-button">{isEdit ? "Enregistrer les changements" : "Créer le mariage"}<span>↗</span></button></div>
          </div>
        </form>
      </main>
    </SiteShell>
  );
}
