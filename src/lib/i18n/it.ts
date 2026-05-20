export interface Translation {
  nav: { galleria: string; servizi: string; prenota: string; contatti: string };
  hero: { badge: string; title1: string; title2: string; subtitle: string; ctaServizi: string; ctaPrenota: string; tags: string };
  values: { badge: string; title: string; items: { title: string; desc: string }[] };
  gallery: { badge: string; title: string; subtitle: string; all: string };
  team: { badge: string; title: string; subtitle: string };
  services: { badge: string; title: string; subtitle: string; selected_one: string; selected_other: string; prenota_one: string; prenota_other: string; selectedLabel: string; selectLabel: string };
  booking: { title: string; subtitle: string; confirmed: string; confirmedTitle: string; confirmedText: string; date: string; time: string; operator: string; services: string; total: string; noServices: string; remove: string; name: string; email: string; phone: string; staff: string; dateLabel: string; timeLabel: string; notes: string; notesOptional: string; notesPlaceholder: string; submit: string; submitting: string; noSlots: string; error: string; connectionError: string; selectedServices: string };
  reviews: { badge: string; title: string };
  faq: { badge: string; title: string; subtitle: string };
  contact: { badge: string; title: string; subtitle: string; address: string; addressLine1: string; addressLine2: string; addressLine3: string; hours: string; monFri: string; sat: string; sun: string; closed: string; phone: string; email: string; social: string; socialText: string };
  footer: { description: string; services: string; salon: string; team: string; reviews: string; contacts: string; copyright: string };
  admin: { login: string; loginSub: string; loginBtn: string; loggingIn: string; wrongPassword: string; logout: string; dashboard: string; siteLink: string };
  language: { it: string; en: string; de: string };
}

const it: Translation = {
  nav: {
    galleria: "Galleria",
    servizi: "Servizi",
    prenota: "Prenota",
    contatti: "Contatti",
  },
  hero: {
    badge: "Salone di Alta Bellezza",
    title1: "Benvenuti da",
    title2: "Bellezza Salon",
    subtitle: "Scopri i nostri trattamenti esclusivi di acconciatura, estetica e benessere. Ogni servizio è pensato per esaltare la tua bellezza naturale.",
    ctaServizi: "Vedi Servizi",
    ctaPrenota: "Prenota Ora",
    tags: "Acconciatura • Estetica • Benessere",
  },
  values: {
    badge: "Perché Sceglierci",
    title: "La tua bellezza è la nostra passione",
    items: [
      { title: "Prodotti Premium", desc: "Selezioniamo solo i migliori brand internazionali per garantirti un trattamento d'eccellenza." },
      { title: "Professionisti Esperti", desc: "Un team di hairstylist ed estetiste con anni di esperienza e formazione continua." },
      { title: "Atmosfera Esclusiva", desc: "Un ambiente rilassante e raffinato, dove ogni visita diventa un momento di piacere." },
    ],
  },
  gallery: {
    badge: "La Nostra Gallery",
    title: "Galleria",
    subtitle: "I nostri lavori e l'atmosfera del salone.",
    all: "Tutte",
  },
  team: {
    badge: "Il Nostro Team",
    title: "Professionisti al tuo servizio",
    subtitle: "Un team di esperti dedicato alla tua bellezza e al tuo benessere.",
  },
  services: {
    badge: "I Nostri Trattamenti",
    title: "Servizi",
    subtitle: "Seleziona uno o più trattamenti, poi prenota il tuo appuntamento.",
    selected_one: "servizio selezionato",
    selected_other: "servizi selezionati",
    prenota_one: "Prenota Servizio",
    prenota_other: "Prenota {count} Servizi",
    selectedLabel: "Selezionato",
    selectLabel: "Seleziona",
  },
  booking: {
    title: "Prenota un Appuntamento",
    subtitle: "Compila il modulo e ti contatteremo per confermare la disponibilità.",
    confirmed: "Confermato",
    confirmedTitle: "Prenotazione Effettuata",
    confirmedText: "Grazie {name}, ti aspettiamo!",
    date: "Data",
    time: "Orario",
    operator: "Operatore",
    services: "Servizi",
    total: "Totale",
    noServices: "Nessun servizio selezionato.",
    remove: "Rimuovi",
    name: "Nome",
    email: "Email",
    phone: "Telefono",
    staff: "Operatore",
    dateLabel: "Data",
    timeLabel: "Orario",
    notes: "Note",
    notesOptional: "(opzionale)",
    notesPlaceholder: "Richiedi un trattamento particolare o segnala allergie...",
    submit: "Conferma Prenotazione",
    submitting: "Prenotazione in corso...",
    noSlots: "Nessun orario disponibile per questa data.",
    error: "Errore durante la prenotazione",
    connectionError: "Errore di connessione",
    selectedServices: "Servizi Selezionati",
  },
  reviews: {
    badge: "Testimonianze",
    title: "Cosa dicono di noi",
  },
  faq: {
    badge: "Domande Frequenti",
    title: "FAQ",
    subtitle: "Tutto quello che devi sapere prima del tuo appuntamento.",
  },
  contact: {
    badge: "Contattaci",
    title: "Vieni a trovarci",
    subtitle: "Siamo sempre felici di darti il benvenuto nel nostro salone.",
    address: "Indirizzo",
    addressLine1: "Via Roma 42",
    addressLine2: "20121 Milano",
    addressLine3: "Italia",
    hours: "Orari di Apertura",
    monFri: "Lunedì – Venerdì",
    sat: "Sabato",
    sun: "Domenica",
    closed: "Chiuso",
    phone: "Telefono",
    email: "Email",
    social: "Social",
    socialText: "Seguici su Instagram e Facebook per rimanere aggiornato sulle nostre novità.",
  },
  footer: {
    description: "Dal 2010, cura e bellezza nel cuore dell'Italia. Trattamenti esclusivi per valorizzare la tua bellezza naturale.",
    services: "Servizi",
    salon: "Il Salone",
    team: "Il Nostro Team",
    reviews: "Recensioni",
    contacts: "Contatti",
    copyright: "Tutti i diritti riservati",
  },
  admin: {
    login: "Accesso Admin",
    loginSub: "Inserisci la password per accedere",
    loginBtn: "Accedi",
    loggingIn: "Accesso in corso...",
    wrongPassword: "Password errata",
    logout: "Esci",
    dashboard: "Dashboard",
    siteLink: "Vedi sito →",
  },
  language: {
    it: "Italiano",
    en: "English",
    de: "Deutsch",
  },
};

export default it;
