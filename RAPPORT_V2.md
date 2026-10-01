# NCR Suite — V2 multi-métier

1er octobre 2026 — projet local de test : `/Users/ec/Downloads/ncr-suite-main`.

## Sections et représentation métier

Accueil explicite « Une plateforme. Cinq expériences métier. », cinq univers visibles dès le hero, cinq chapitres immersifs, nouvelle section de socle commun, cartes de fonctionnalités, galerie et offres synchronisées. Une vue d’ensemble neutre accueille le visiteur. NCR Suite reste la marque unique.

Formation : sessions, stagiaires, émargements et documents. Sécurité privée : vacations, agents, rondes et main courante. Nettoyage : interventions, pointage, preuves et qualité. Restauration : réservations, plan de salle, carte, cuisine et hygiène. Coiffure & Beauté : agenda, clients, prestations et collaborateurs. Fonctions et tarifs fondés sur les données publiques auditées en V1, instantané du 30 septembre 2026 ; aucun tarif ajouté.

## 3D, sélecteur et couleurs

Le même appareil et la même scène immersive passent entre la vue centrale et les cinq métiers. Textures, panneaux flottants et halo changent avec le contexte. La scène finale reprend les cinq environnements. Aucune scène WebGL supplémentaire par métier.

Le sélecteur sans rechargement adapte le contexte du hero, le mockup, la galerie et le catalogue d’offres. Navigation immersive au défilement et sélecteur de chapitres conservés. Configuration commune dans `src/verticals.ts`.

| Métier | Accent |
|---|---|
| Formation | Bleu `#2458c6` |
| Sécurité privée | Rouge `#9b1c1c` |
| Nettoyage | Vert `#287451` |
| Restauration | Ocre `#94600e` |
| Coiffure & Beauté | Prune `#652052` |

## Mockups

Six compositions, chacune déclinée en paysage et portrait : vue centrale + cinq dashboards distincts. Quinze panneaux flottants métier. Les écrans métier ont des dispositions et un vocabulaire adaptés ; ils ne mélangent pas les activités. Aucun nom, logo, compte ou coordonnée client des captures repris. Indicateurs sans statistiques commerciales fictives, mention d’illustration et de disponibilité selon offre/modules.

## Fichiers principaux

Créés : `src/verticals.ts`, `src/components/VerticalSelector.tsx`, `src/components/Socle.tsx`, ce rapport.

Modifiés : `src/App.tsx`, `src/data.ts`, `src/index.css`, `src/components/Story.tsx`, `Produit.tsx`, `Metiers.tsx`, `Offres.tsx`, `Header.tsx`, `src/three/ui.ts`, `StoryScene.ts`, `FinalScene.ts`, `index.html`.

Build régénéré dans `dist/`. Sources à importer dans le dépôt de test : contenu du dossier projet, hors `node_modules`, `work`, `.DS_Store` ; les exclusions sont dans `.gitignore`. Pour publier un build statique, utiliser tout `dist`, police comprise. Aucun commit, push ou déploiement réalisé.

## Résultats

`npm run build` : code de sortie **0** ; TypeScript et Vite réussis, 1930 modules. `dist/index.html` : 1022,99 kB, gzip 294,07 kB. Journal : `work/v2/build.log`.

Tests React/JSDOM réussis en mode réduit, largeur mobile simulée 390 px et repli sans WebGL : cinq sélections, vue neutre, changement des images, synchronisation galerie/offres, 20 offres comparées aux sources, ancres, onglets clavier, fermeture du menu par Échap, FAQ et absence d’erreur d’exécution dans cet environnement. Le test attend désormais la disponibilité des images plutôt qu’un délai fixe trop court.

Douze rendus Canvas et quinze cartes flottantes inspectés visuellement. Preuves dans `work/v2/qa`. Sauvegarde du code V1 dans `work/v2/src-before`.

## Derniers contrôles

Le rendu complet dans un navigateur, les collisions responsive, les contrastes mesurés et les transitions WebGL ne sont pas validés : l’outil navigateur a échoué au démarrage. Les tests DOM et les rendus Canvas ne remplacent pas cette vérification. Contrôler desktop, tablette, smartphone, changement de métier et défilement 3D avant publication. Les tarifs restent un instantané à recontrôler avant publication ultérieure.

La production, Supabase, Stripe, les comptes et le dépôt de production sont inchangés.
