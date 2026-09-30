export const SITE_URL = "https://ncr-suite.fr";

export const CHAPTERS = [
  {
    id: "gerez",
    title: "Gérez votre activité",
    text: "Un tableau de bord clair pour suivre votre chiffre d’affaires, vos interventions et vos priorités du jour, en temps réel.",
    points: ["Vue d’ensemble instantanée", "Priorités du jour", "Indicateurs en direct"],
    view: 0,
  },
  {
    id: "clients",
    title: "Centralisez vos clients",
    text: "Fiches, historiques, échanges et documents réunis au même endroit. Plus aucune information dispersée.",
    points: ["Fiches clients complètes", "Historique des échanges", "Segmentation simple"],
    view: 1,
  },
  {
    id: "planning",
    title: "Organisez votre planning",
    text: "Rendez-vous, interventions et équipes synchronisés. Votre agenda s’adapte à votre façon de travailler.",
    points: ["Agenda d’équipe partagé", "Interventions sur site", "Rappels automatiques"],
    view: 2,
  },
  {
    id: "documents",
    title: "Automatisez vos documents",
    text: "Devis, factures, contrats : générés, envoyés et relancés automatiquement, sans ressaisie.",
    points: ["Devis & factures en un clic", "Signature en ligne", "Relances programmées"],
    view: 3,
  },
  {
    id: "pilotage",
    title: "Pilotez votre entreprise",
    text: "Indicateurs, objectifs et rapports pour décider avec précision, où que vous soyez.",
    points: ["Tableaux de bord sur mesure", "Objectifs suivis", "Rapports exportables"],
    view: 4,
  },
];

export const SECTORS = [
  {
    title: "Artisans & BTP",
    text: "Devis, chantiers, interventions et facturation depuis le terrain, sans papier.",
    tags: ["Chantiers", "Devis", "Interventions"],
    icon: "hardhat",
    accent: "#0a6cff",
  },
  {
    title: "Santé & bien-être",
    text: "Rendez-vous, dossiers patients et rappels dans un environnement simple et sécurisé.",
    tags: ["Rendez-vous", "Dossiers", "Rappels"],
    icon: "heart",
    accent: "#12b76a",
  },
  {
    title: "Conseil & services",
    text: "Suivi des missions, temps passé, contrats et facturation récurrente.",
    tags: ["Missions", "Contrats", "Récurrence"],
    icon: "briefcase",
    accent: "#7a5af8",
  },
  {
    title: "Commerce",
    text: "Clients, commandes, stocks et documents commerciaux réunis au même endroit.",
    tags: ["Commandes", "Stocks", "Fidélité"],
    icon: "store",
    accent: "#f79009",
  },
  {
    title: "Immobilier",
    text: "Biens, mandats, visites et suivi des dossiers avec une vision claire du portefeuille.",
    tags: ["Mandats", "Visites", "Dossiers"],
    icon: "building",
    accent: "#0891b2",
  },
  {
    title: "Formation & associations",
    text: "Sessions, inscrits, adhésions et communication pilotés depuis un seul outil.",
    tags: ["Sessions", "Adhésions", "Suivi"],
    icon: "graduation",
    accent: "#db2777",
  },
];

export const PANELS = [
  { title: "Tableau de bord", text: "Chiffre d’affaires, clients actifs et priorités du jour, d’un seul regard." },
  { title: "Clients", text: "Une base clients vivante : statuts, historiques et chiffre d’affaires associé." },
  { title: "Planning", text: "Un agenda d’équipe lisible, avec interventions, rendez-vous et rappels." },
  { title: "Documents", text: "Devis, factures et contrats générés, suivis et relancés automatiquement." },
  { title: "Pilotage", text: "Revenus, objectifs et répartition par activité pour décider sereinement." },
];

export const ADVANTAGES = [
  {
    title: "Simple",
    text: "Une interface claire, sans formation interminable. Vos équipes sont opérationnelles dès le premier jour.",
    icon: "sparkles",
  },
  {
    title: "Centralisé",
    text: "Clients, planning, documents et indicateurs au même endroit. Fini les outils dispersés et les doubles saisies.",
    icon: "layers",
  },
  {
    title: "Accessible partout",
    text: "Au bureau, chez un client ou en déplacement : retrouvez votre activité sur ordinateur, tablette et mobile.",
    icon: "globe",
  },
  {
    title: "Adapté à votre métier",
    text: "Une base commune et des modules qui s’ajustent à votre secteur, à vos documents et à vos process.",
    icon: "puzzle",
  },
  {
    title: "Pensé pour les professionnels",
    text: "Fiabilité, performance et sobriété : un outil de travail conçu pour durer et accompagner votre croissance.",
    icon: "shield",
  },
];

export const FAQ = [
  {
    q: "À quels métiers s’adresse NCR Suite ?",
    a: "NCR Suite s’adapte à de nombreux secteurs : artisans et BTP, santé et bien-être, conseil et services, commerce, immobilier, formation et associations. Une base commune, des modules ajustés à votre activité.",
  },
  {
    q: "Que puis-je centraliser dans NCR Suite ?",
    a: "Votre gestion, vos clients, votre planning, vos documents (devis, factures, contrats) et vos outils métier sont réunis dans un environnement unique, sans double saisie.",
  },
  {
    q: "Puis-je utiliser NCR Suite en déplacement ?",
    a: "Oui. NCR Suite est pensée pour être accessible partout : au bureau, chez un client ou en déplacement, sur ordinateur, tablette et mobile.",
  },
  {
    q: "Comment découvrir NCR Suite ?",
    a: "Rendez-vous sur ncr-suite.fr pour découvrir la plateforme et les solutions adaptées à votre métier.",
  },
];
