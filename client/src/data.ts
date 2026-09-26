export type Wedding = {
  id: string;
  couple: string;
  dateLabel: string;
  dateISO?: string;
  dateShort: string;
  city: string;
  countdown: string;
  guests: number;
  nextAction: string;
  status: string;
  venueId: string;
  venueLabel?: string;
  image?: string;
  imageAlt?: string;
};

export type Person = {
  id: string;
  name: string;
  role: string;
  initials: string;
  email: string;
  phone: string;
  note: string;
};

export type Venue = {
  id: string;
  name: string;
  city: string;
  address: string;
  note: string;
};

export type DocumentItem = {
  id: string;
  title: string;
  kind: string;
  weddingId: string;
  momentId?: string;
  updated: string;
  pages: number;
  preview: string;
};

export type Moment = {
  id: string;
  weddingId: string;
  time: string;
  title: string;
  location: string;
  description: string;
  duration: string;
  personIds: string[];
  providerIds: string[];
  documentIds: string[];
  music: string;
  logistics: string[];
  image?: string;
  imageAlt?: string;
};

export const venues: Venue[] = [
  {
    id: "venue-aurora",
    name: "Maison Aurore",
    city: "Paris",
    address: "12 rue des Étoiles, 75008 Paris",
    note: "Lieu de démonstration fictif · cour intérieure et salons nord",
  },
  {
    id: "venue-ormes",
    name: "Domaine des Ormes",
    city: "Lille",
    address: "48 chemin des Saules, 59000 Lille",
    note: "Lieu de démonstration fictif · jardin et grange haute",
  },
];

export const weddings: Wedding[] = [
  {
    id: "matt-sophie",
    couple: "Matt & Sophie",
    dateLabel: "14 JUIN 2027",
    dateISO: "2027-06-14",
    dateShort: "14.06.27",
    city: "Paris",
    countdown: "J—261",
    guests: 126,
    nextAction: "Valider le traiteur",
    status: "À finaliser",
    venueId: "venue-aurora",
    venueLabel: "Maison Aurore",
    image: "/manus-storage/matt-sophie-paris_c3bbb026.jpg",
    imageAlt: "Cour parisienne au crépuscule, image de démonstration",
  },
  {
    id: "claire-thomas",
    couple: "Claire & Thomas",
    dateLabel: "28 AOÛT 2027",
    dateISO: "2027-08-28",
    dateShort: "28.08.27",
    city: "Lille",
    countdown: "J—336",
    guests: 94,
    nextAction: "Relancer le photographe",
    status: "En préparation",
    venueId: "venue-ormes",
    venueLabel: "Domaine des Ormes",
    image: "/manus-storage/claire-thomas-lille_f3be1c74.jpg",
    imageAlt: "Jardin de château après la pluie, image de démonstration",
  },
];

export const people: Person[] = [
  {
    id: "matt-mez",
    name: "Matt Mez",
    role: "Saxophone live",
    initials: "MM",
    email: "matt.mez@example.test",
    phone: "+33 6 00 00 00 01",
    note: "Set acoustique pour l’accueil et la première danse.",
  },
  {
    id: "claire-aubert",
    name: "Claire Aubert",
    role: "Traiteur",
    initials: "CA",
    email: "claire.aubert@example.test",
    phone: "+33 6 00 00 00 02",
    note: "Coordination du cocktail et du dîner.",
  },
  {
    id: "julien-martin",
    name: "Julien Martin",
    role: "Photographe",
    initials: "JM",
    email: "julien.martin@example.test",
    phone: "+33 6 00 00 00 03",
    note: "Reportage éditorial, présence dès les préparatifs.",
  },
  {
    id: "noa-bernard",
    name: "Noa Bernard",
    role: "DJ",
    initials: "NB",
    email: "noa.bernard@example.test",
    phone: "+33 6 00 00 00 04",
    note: "Régie son et programmation de la soirée.",
  },
  {
    id: "lea-morel",
    name: "Léa Morel",
    role: "Fleuriste",
    initials: "LM",
    email: "lea.morel@example.test",
    phone: "+33 6 00 00 00 05",
    note: "Fleurs de saison et installation de la cérémonie.",
  },
  {
    id: "antoine-rey",
    name: "Antoine Rey",
    role: "Régie lieu",
    initials: "AR",
    email: "antoine.rey@example.test",
    phone: "+33 6 00 00 00 06",
    note: "Accès, horaires d’installation et coordination technique.",
  },
];

export const documents: DocumentItem[] = [
  {
    id: "doc-caterer",
    title: "Contrat traiteur",
    kind: "CONTRAT",
    weddingId: "matt-sophie",
    momentId: "matt-cocktail",
    updated: "Mis à jour le 04.03.27",
    pages: 6,
    preview: "Menu cocktail · 126 couverts · service à 15:30",
  },
  {
    id: "doc-photographer",
    title: "Planning photographe",
    kind: "PLANNING",
    weddingId: "matt-sophie",
    momentId: "matt-photos",
    updated: "Mis à jour le 22.02.27",
    pages: 3,
    preview: "Préparatifs · portraits · lumière de fin de journée",
  },
  {
    id: "doc-sax",
    title: "Fiche technique saxophone",
    kind: "TECHNIQUE",
    weddingId: "matt-sophie",
    momentId: "matt-cocktail",
    updated: "Mis à jour le 12.01.27",
    pages: 2,
    preview: "Entrée nord · alimentation autonome · 1 retour",
  },
  {
    id: "doc-florals",
    title: "Plan de fleurs",
    kind: "CRÉATION",
    weddingId: "claire-thomas",
    momentId: "claire-ceremony",
    updated: "Mis à jour le 14.04.27",
    pages: 4,
    preview: "Palette ivoire · feuillage sombre · installation 10:00",
  },
  {
    id: "doc-dj",
    title: "Feuille de route soirée",
    kind: "PRODUCTION",
    weddingId: "claire-thomas",
    momentId: "claire-party",
    updated: "Mis à jour le 19.04.27",
    pages: 5,
    preview: "Ouverture de bal · 22:30 · fin prévue 02:00",
  },
];

export const moments: Moment[] = [
  {
    id: "matt-prep",
    weddingId: "matt-sophie",
    time: "09:00",
    title: "Préparatifs",
    location: "Maison Aurore · suite 02",
    description: "Les préparatifs se déroulent dans la suite côté jardin, avec une lumière douce jusqu’à la cérémonie.",
    duration: "02H00",
    personIds: ["julien-martin", "antoine-rey"],
    providerIds: ["julien-martin"],
    documentIds: [],
    music: "Silence de travail",
    logistics: ["Accès équipe photo : entrée service", "Café et eau dans la suite", "Prévoir 20 min de battement"],
  },
  {
    id: "matt-ceremony",
    weddingId: "matt-sophie",
    time: "11:30",
    title: "Cérémonie",
    location: "Cour intérieure · Maison Aurore",
    description: "Cérémonie civile en extérieur, sous les tilleuls. Les invités sont installés face au mur de pierre claire.",
    duration: "01H00",
    personIds: ["lea-morel", "antoine-rey"],
    providerIds: ["lea-morel"],
    documentIds: [],
    music: "Quatuor à cordes · playlist cérémonie",
    logistics: ["Installation florale : 10:00", "Plan B pluie : salon ouest", "Chaises en deux blocs de 63"],
  },
  {
    id: "matt-photos",
    weddingId: "matt-sophie",
    time: "13:00",
    title: "Photographies",
    location: "Jardin nord · Maison Aurore",
    description: "Portraits de couple et photos de groupe dans le jardin nord, avant l’arrivée des premiers verres.",
    duration: "01H30",
    personIds: ["julien-martin", "matt-mez"],
    providerIds: ["julien-martin"],
    documentIds: ["doc-photographer"],
    music: "Playlist calme · volume fond",
    logistics: ["Groupe famille : 13:15", "Prévoir ombre pour les invités", "Retour cour intérieure : 14:20"],
    image: "/manus-storage/matt-sophie-paris_c3bbb026.jpg",
    imageAlt: "Cour parisienne au crépuscule, image de démonstration",
  },
  {
    id: "matt-cocktail",
    weddingId: "matt-sophie",
    time: "15:30",
    title: "Cocktail",
    location: "Cour intérieure · Maison Aurore",
    description: "Le moment charnière de la journée : service au plateau, saxophone live et circulation libre entre la cour et le jardin.",
    duration: "02H00",
    personIds: ["matt-mez", "claire-aubert", "antoine-rey"],
    providerIds: ["matt-mez", "claire-aubert"],
    documentIds: ["doc-caterer", "doc-sax"],
    music: "Playlist cocktail · Matt Mez live",
    logistics: ["Installation : 14:45", "Accès prestataires : entrée nord", "Comptoir traiteur : aile est"],
    image: "/manus-storage/matt-sophie-paris_c3bbb026.jpg",
    imageAlt: "Cour parisienne au crépuscule, image de démonstration",
  },
  {
    id: "matt-dinner",
    weddingId: "matt-sophie",
    time: "19:00",
    title: "Dîner",
    location: "Salon des miroirs · Maison Aurore",
    description: "Dîner assis dans le salon des miroirs, avec une table unique et un service en quatre temps.",
    duration: "03H00",
    personIds: ["claire-aubert", "antoine-rey"],
    providerIds: ["claire-aubert"],
    documentIds: ["doc-caterer"],
    music: "Dîner · sélection instrumentale",
    logistics: ["Placement : table unique", "Discours entre service 2 et 3", "Dessert : 21:45"],
  },
  {
    id: "matt-dance",
    weddingId: "matt-sophie",
    time: "22:30",
    title: "Première danse",
    location: "Salon des miroirs · Maison Aurore",
    description: "Un moment court et suspendu avant l’ouverture de la piste à tous les invités.",
    duration: "00H15",
    personIds: ["matt-mez", "noa-bernard"],
    providerIds: ["matt-mez", "noa-bernard"],
    documentIds: [],
    music: "Morceau choisi par les mariés",
    logistics: ["Piste dégagée : 22:15", "Lumière chaude uniquement", "Ouverture piste après le morceau"],
  },
  {
    id: "matt-party",
    weddingId: "matt-sophie",
    time: "00:00",
    title: "Soirée",
    location: "Orangerie · Maison Aurore",
    description: "La soirée se poursuit dans l’orangerie, avec régie son discrète et bar côté jardin.",
    duration: "02H00",
    personIds: ["noa-bernard", "antoine-rey"],
    providerIds: ["noa-bernard"],
    documentIds: [],
    music: "DJ set · ouverture libre",
    logistics: ["Bar côté jardin", "Fin son prévue : 02:00", "Dernier passage navettes : 01:30"],
  },
  {
    id: "claire-prep",
    weddingId: "claire-thomas",
    time: "10:00",
    title: "Préparatifs",
    location: "Domaine des Ormes · étage jardin",
    description: "Une matinée lente et lumineuse dans les chambres du domaine, avec un départ vers le jardin à 11:30.",
    duration: "01H30",
    personIds: ["julien-martin", "antoine-rey"],
    providerIds: ["julien-martin"],
    documentIds: [],
    music: "Silence de travail",
    logistics: ["Accès photo : escalier est", "Départ couple : 11:25", "Prévoir parapluies transparents"],
  },
  {
    id: "claire-ceremony",
    weddingId: "claire-thomas",
    time: "12:00",
    title: "Cérémonie",
    location: "Jardin des saules · Domaine des Ormes",
    description: "Cérémonie laïque dans le jardin, au bord des saules. Le plan B est prévu dans la grange haute.",
    duration: "01H00",
    personIds: ["lea-morel", "antoine-rey"],
    providerIds: ["lea-morel"],
    documentIds: ["doc-florals"],
    music: "Piano discret · cérémonie",
    logistics: ["Arche florale : 10:00", "Plan B : grange haute", "Eau fraîche à l’entrée"],
  },
  {
    id: "claire-lunch",
    weddingId: "claire-thomas",
    time: "14:00",
    title: "Déjeuner",
    location: "Grange haute · Domaine des Ormes",
    description: "Déjeuner long autour des produits du Nord, avec un service libre et des tables réparties dans la grange.",
    duration: "02H30",
    personIds: ["claire-aubert", "antoine-rey"],
    providerIds: ["claire-aubert"],
    documentIds: [],
    music: "Playlist déjeuner",
    logistics: ["Service au buffet", "Terrasse ouverte si météo favorable", "Discours : 15:30"],
    image: "/manus-storage/claire-thomas-lille_f3be1c74.jpg",
    imageAlt: "Jardin de château après la pluie, image de démonstration",
  },
  {
    id: "claire-party",
    weddingId: "claire-thomas",
    time: "22:30",
    title: "Soirée",
    location: "Grange haute · Domaine des Ormes",
    description: "La grange prend le relais pour la soirée : lumière rasante, piste centrale et programmation DJ progressive.",
    duration: "03H30",
    personIds: ["noa-bernard", "antoine-rey"],
    providerIds: ["noa-bernard"],
    documentIds: ["doc-dj"],
    music: "DJ set · montée progressive",
    logistics: ["Installation régie : 20:00", "Piste centrale libre", "Fin prévue : 02:00"],
    image: "/manus-storage/claire-thomas-lille_f3be1c74.jpg",
    imageAlt: "Jardin de château après la pluie, image de démonstration",
  },
];

export const getWedding = (id?: string) => weddings.find((item) => item.id === id);
export const getMoment = (id?: string) => moments.find((item) => item.id === id);
export const getPerson = (id?: string) => people.find((item) => item.id === id);
export const getDocument = (id?: string) => documents.find((item) => item.id === id);
export const getVenue = (id?: string) => venues.find((item) => item.id === id);
export const getPeople = (ids: string[]) => ids.map((id) => getPerson(id)).filter(Boolean) as Person[];
export const getDocuments = (ids: string[]) => ids.map((id) => getDocument(id)).filter(Boolean) as DocumentItem[];
