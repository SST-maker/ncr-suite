export const SITE_URL = "https://ncr-suite.fr";

export const TRIAL_URL = `${SITE_URL}/demande-acces?essai=7&utm_source=vitrine&utm_medium=cta&utm_campaign=essai-7-jours&utm_content=accueil`;

export const LOGIN_URL = `${SITE_URL}/connexion`;

export const CONTACT_URL = "mailto:contact@ncr-suite.fr";

export const CHAPTERS = [
  {
    "id": "gerez",
    "title": "Reliez votre activité",
    "text": "Clients, équipes, planning et documents : NCR Suite réunit votre activité commerciale et vos opérations dans un même environnement.",
    "points": [
      "Tableaux de bord métier",
      "Priorités et dossiers à suivre",
      "Du bureau au terrain"
    ],
    "view": 0
  },
  {
    "id": "clients",
    "title": "Suivez la relation client",
    "text": "Du premier prospect au dossier client, retrouvez les informations et les documents utiles à votre activité, au bon endroit.",
    "points": [
      "Suivi commercial",
      "Dossiers clients centralisés",
      "Documents rattachés au bon dossier"
    ],
    "view": 1
  },
  {
    "id": "planning",
    "title": "Coordonnez vos équipes",
    "text": "Sessions, vacations, interventions ou rendez-vous : le planning prend le rythme de votre métier.",
    "points": [
      "Planning adapté à votre activité",
      "Équipes et affectations",
      "Espaces accessibles selon les rôles"
    ],
    "view": 2
  },
  {
    "id": "documents",
    "title": "Gardez la trace du travail",
    "text": "Documents, signatures et historiques accompagnent vos dossiers. Les automatisations restent visibles et contrôlables, selon votre métier et votre formule.",
    "points": [
      "Documents et facturation",
      "Signatures et preuves",
      "Automatisations historisées"
    ],
    "view": 3
  },
  {
    "id": "pilotage",
    "title": "Décidez avec une vue claire",
    "text": "Indicateurs d’activité, qualité ou rentabilité : retrouvez les outils de pilotage propres à votre métier et aux modules activés.",
    "points": [
      "Indicateurs métier",
      "Suivi de l’activité",
      "Qualité et rentabilité selon les modules"
    ],
    "view": 4
  }
];

export const SECTORS = [
  {
    "key": "formation",
    "title": "Formation",
    "label": "Organismes de formation",
    "text": "Du premier prospect jusqu’au BPF, chaque étape du parcours reste liée et exploitable.",
    "tags": [
      "CRM et pipeline commercial",
      "Catalogue et programmes",
      "Sessions et émargements",
      "Évaluations automatisées",
      "Facturation et BPF",
      "Qualiopi et preuves"
    ],
    "icon": "graduation",
    "accent": "#0878f9",
    "path": "/logiciel-gestion-formation"
  },
  {
    "key": "securite",
    "title": "Sécurité privée",
    "label": "Entreprises de sécurité",
    "text": "Les équipes du bureau et du terrain partagent enfin le même niveau d’information.",
    "tags": [
      "Clients, sites et contrats",
      "Agents et agréments",
      "Planning et vacations",
      "Rondes QR et PTI",
      "Main courante terrain",
      "Facturation et portail client"
    ],
    "icon": "shield",
    "accent": "#d92d20",
    "path": "/logiciel-securite-privee"
  },
  {
    "key": "nettoyage",
    "title": "Nettoyage",
    "label": "Propreté et multiservices",
    "text": "Chaque intervention devient une prestation planifiée, prouvée et mesurable.",
    "tags": [
      "Clients et sites",
      "Agents et affectations",
      "Pointage et consignes",
      "Rapports et anomalies",
      "Contrôles qualité",
      "Stocks et rentabilité"
    ],
    "icon": "sparkles",
    "accent": "#07865c",
    "path": "/logiciel-entreprise-nettoyage"
  },
  {
    "key": "restauration",
    "title": "Restauration",
    "label": "Restaurants et établissements",
    "text": "La salle, la cuisine et la gestion avancent avec une vision commune du service.",
    "tags": [
      "Réservations et plan de salle",
      "Carte et recettes",
      "Commandes et écran cuisine",
      "Planning des équipes",
      "Hygiène et traçabilité",
      "Stocks et pilotage"
    ],
    "icon": "utensils",
    "accent": "#b36a08",
    "path": "/logiciel-gestion-restaurant"
  },
  {
    "key": "coiffure",
    "title": "Coiffure & beauté",
    "label": "Salons et instituts",
    "text": "Les rendez-vous, l’équipe et la fidélité client se pilotent sans alourdir l’accueil.",
    "tags": [
      "Réservation en ligne",
      "Planning du salon",
      "Fichier client",
      "Prestations et équipe",
      "Fidélité personnalisée",
      "Espace client"
    ],
    "icon": "scissors",
    "accent": "#9b3db4",
    "path": "/logiciel-coiffure"
  }
];

export const PANELS = [
  {
    "title": "Gestion",
    "text": "Clients, équipes, planning et documents : NCR Suite réunit votre activité commerciale et vos opérations dans un même environnement."
  },
  {
    "title": "Clients",
    "text": "Du premier prospect au dossier client, retrouvez les informations et les documents utiles à votre activité, au bon endroit."
  },
  {
    "title": "Planning",
    "text": "Sessions, vacations, interventions ou rendez-vous : le planning prend le rythme de votre métier."
  },
  {
    "title": "Documents",
    "text": "Documents, signatures et historiques accompagnent vos dossiers. Les automatisations restent visibles et contrôlables, selon votre métier et votre formule."
  },
  {
    "title": "Pilotage",
    "text": "Indicateurs d’activité, qualité ou rentabilité : retrouvez les outils de pilotage propres à votre métier et aux modules activés."
  }
];

export const ADVANTAGES = [
  {
    "title": "Un socle commun",
    "text": "Clients, équipes, planning et documents circulent dans le même environnement pour limiter les ressaisies.",
    "icon": "layers"
  },
  {
    "title": "Les bons outils métier",
    "text": "Les menus, indicateurs et automatisations suivent les opérations de votre secteur.",
    "icon": "puzzle"
  },
  {
    "title": "Bureau et terrain",
    "text": "Une PWA accessible sur ordinateur et mobile pour accompagner les équipes là où elles travaillent.",
    "icon": "globe"
  },
  {
    "title": "Des accès maîtrisés",
    "text": "Équipes, clients, formateurs et intervenants disposent d’espaces adaptés à leur rôle, selon la formule et les modules.",
    "icon": "shield"
  },
  {
    "title": "Une évolution lisible",
    "text": "Commencez avec la formule adaptée. Le catalogue de modules et les offres supérieures accompagnent ensuite vos besoins.",
    "icon": "sparkles"
  }
];

export const FAQ = [
  {
    "q": "À qui s’adresse NCR Suite ?",
    "a": "NCR Suite propose cinq environnements : formation, sécurité privée, nettoyage, restauration et coiffure-beauté. Chaque métier dispose de ses outils, sur un socle commun."
  },
  {
    "q": "Comment fonctionne l’essai gratuit de 7 jours ?",
    "a": "Vous présentez votre activité dans le formulaire de demande. Après validation, vous testez la formule Professionnelle pendant 7 jours, sans carte bancaire et sans contrat d’abonnement à signer au démarrage. Aucun compte n’est créé automatiquement."
  },
  {
    "q": "Les mêmes fonctions sont-elles incluses dans toutes les offres ?",
    "a": "Non. Les fonctions et les accès varient selon le métier et la formule : Découverte, Essentielle, Professionnelle ou Métier. Le catalogue public détaille les principales inclusions. Métier est une offre sur mesure dont le tarif final est défini avant l’ouverture."
  },
  {
    "q": "Puis-je utiliser NCR Suite sur mobile ?",
    "a": "Oui. NCR Suite est présentée comme une PWA pour travailler sur ordinateur et mobile, au bureau comme sur le terrain."
  }
];

export const BUSINESS_FAQ = [
  {
    "key": "formation",
    "name": "Formation",
    "items": [
      {
        "q": "NCR Suite remplace-t-il plusieurs outils de formation ?",
        "a": "NCR Suite réunit le suivi commercial, les sessions, les documents, les présences, les évaluations, la facturation et les preuves qualité dans un environnement cohérent."
      },
      {
        "q": "Le BPF est-il préparé automatiquement ?",
        "a": "Les données de chiffre d’affaires, stagiaires, heures, financeurs, formateurs et sous-traitance sont consolidées avec des contrôles de cohérence et un export d’aide à la saisie."
      },
      {
        "q": "Les stagiaires et formateurs disposent-ils de leur espace ?",
        "a": "Des portails dédiés peuvent être activés pour les stagiaires, formateurs et clients, avec dépôts de pièces, signatures et historique exploitable."
      },
      {
        "q": "Peut-on commencer avec une petite formule ?",
        "a": "Oui. Les formules progressent de Découverte à Métier et les modules disponibles restent visibles afin de choisir le bon niveau au moment utile."
      }
    ]
  },
  {
    "key": "securite",
    "name": "Sécurité privée",
    "items": [
      {
        "q": "Les agents peuvent-ils utiliser NCR Suite sur téléphone ?",
        "a": "Oui. L’espace terrain permet de consulter planning et consignes, réaliser les rondes, alimenter la main courante et transmettre les preuves depuis une PWA mobile."
      },
      {
        "q": "Le logiciel gère-t-il les rondes par QR code ?",
        "a": "Les points de passage peuvent être créés et imprimés, puis chaque lecture est horodatée et rattachée à la vacation concernée."
      },
      {
        "q": "Les clients disposent-ils d’un portail ?",
        "a": "Un portail client peut présenter les missions, rapports, rondes, documents et messages autorisés pour chaque donneur d’ordre."
      },
      {
        "q": "Que deviennent les données lors d’une baisse de formule ?",
        "a": "Les droits premium sont retirés selon la formule, mais les données existantes sont conservées pour pouvoir être retrouvées lors d’une remontée en gamme."
      }
    ]
  },
  {
    "key": "nettoyage",
    "name": "Nettoyage",
    "items": [
      {
        "q": "Les agents ont-ils besoin d’installer une application ?",
        "a": "NCR Suite fonctionne comme une PWA : l’espace terrain peut être ajouté à l’écran du téléphone et utilisé avec une expérience proche d’une application."
      },
      {
        "q": "Peut-on envoyer des rapports aux clients ?",
        "a": "Les rapports de visite, photos, anomalies et contrôles qualité peuvent être rattachés au bon site et partagés depuis le portail client selon les droits accordés."
      },
      {
        "q": "Comment la rentabilité d’un chantier est-elle calculée ?",
        "a": "Le module compare le chiffre d’affaires prévu avec les temps réalisés, les coûts horaires et les consommables enregistrés."
      },
      {
        "q": "NCR Suite convient-il au multiservice ?",
        "a": "Les sites, protocoles, équipes, types d’intervention et modules peuvent être adaptés à une organisation de propreté ou de multiservices."
      }
    ]
  },
  {
    "key": "restauration",
    "name": "Restauration",
    "items": [
      {
        "q": "NCR Suite gère-t-il les réservations en ligne ?",
        "a": "Une page publique permet aux clients de réserver, tandis que le restaurant suit les demandes, les confirmations et le plan de salle depuis son espace."
      },
      {
        "q": "Le menu peut-il être publié avec un QR code ?",
        "a": "Le menu public peut être diffusé par QR code et présenté en plusieurs langues avec les informations utiles comme les allergènes."
      },
      {
        "q": "Peut-on suivre les commandes en cuisine ?",
        "a": "L’écran cuisine reçoit les commandes et permet de suivre les étapes de préparation jusqu’à leur disponibilité pour le service."
      },
      {
        "q": "Les contrôles HACCP sont-ils historisés ?",
        "a": "Les températures et checklists d’hygiène sont enregistrées avec leur date et restent consultables dans l’historique de l’établissement."
      }
    ]
  },
  {
    "key": "coiffure",
    "name": "Coiffure & beauté",
    "items": [
      {
        "q": "Les clients peuvent-ils réserver depuis leur téléphone ?",
        "a": "Oui. La page de réservation publique est adaptée au mobile et permet de choisir une prestation, un professionnel et un créneau disponible."
      },
      {
        "q": "Peut-on envoyer des rappels de rendez-vous ?",
        "a": "Les confirmations et rappels automatiques peuvent être activés afin de prévenir les clients avant leur rendez-vous."
      },
      {
        "q": "L’équipe dispose-t-elle de plusieurs accès ?",
        "a": "Les formules supérieures ajoutent des accès équipe et des rôles adaptés pour organiser le salon sans partager un identifiant unique."
      },
      {
        "q": "Le logiciel convient-il aussi aux instituts de beauté ?",
        "a": "Les prestations, durées, équipes, rendez-vous et parcours client peuvent être configurés pour un salon de coiffure comme pour un institut."
      }
    ]
  }
];
