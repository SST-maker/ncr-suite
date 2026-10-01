# NCR Suite — V3 performance et UX

1er octobre 2026. Copie de test uniquement : `/Users/ec/Downloads/ncr-suite-main`. V2 conservée dans `work/v3/src-before`. Aucun accès en écriture à la production, aucun push ni déploiement.

## Causes identifiées dans le code

- DPR jusqu’à 2,5 sur desktop et 3 sur mobile, budgets de 8,5 et 3,4 millions de pixels.
- Boucles requestAnimationFrame toujours planifiées hors écran malgré l’arrêt des calculs ; absence de suspension explicite lors du masquage de l’onglet.
- Lectures getBoundingClientRect pendant les deux boucles de rendu ; écritures DOM du storytelling même lorsque sa progression ne changeait plus.
- Création immédiate de la scène finale et de son environnement GPU au chargement.
- Six plans de dashboard superposés, dont plusieurs entièrement recouverts ; textures desktop dessinées en 3072 × 1920.
- Galerie avec transformations de tous les panneaux, perspective et interaction pointeur ; will-change permanent et blur de navigation élevé.

Ce sont des coûts constatés dans l’implémentation, pas des mesures de temps GPU ou une attribution mesurée des saccades du navigateur utilisateur.

## Optimisations

- DPR plafonné à 1,5 desktop / 1,25 compact, budgets de 4 / 2 millions de pixels. Le plafond desktop 2,5 → 1,5 correspond à 64 % de pixels en moins lorsqu’aucun autre plafond ne s’applique ; ce n’est pas une promesse de gain FPS.
- Textures desktop 2048 × 1280 maximum, portrait 2× maximum ; anisotropie 4×. Interfaces, éclairage et 3D conservés. Pas d’ombres temps réel activées à supprimer.
- RAF annulé hors écran ou onglet caché, repris sans duplication et avec remise à zéro de l’horloge.
- Scène finale créée seulement à l’approche de sa section.
- Géométrie des sections mémorisée et actualisée par ResizeObserver/redimensionnement ; le rendu lit scrollY au lieu de relire leur rectangle.
- Écritures du storytelling sautées à progression stable ; Header mis à jour seulement au franchissement du seuil.
- Seuls le dernier écran opaque et l’écran en fondu sont dessinés. Les surfaces entièrement masquées sont exclues du rendu.
- Suppression du double setSize ; will-change permanent des boutons retiré, tilt promu uniquement à l’interaction, blur de navigation réduit.

Aucune nouvelle dépendance. Pas de baisse de qualité adaptative en cours de parcours : plafonds fixes et limitation du travail invisible pour éviter des variations de netteté.

## Finitions UX

Cartes métier : grille robuste en six colonnes, disposition 3 + 2 centrées à partir de 1024 px ; 2 + 2 + 1 centrée sur tablette ; une colonne sur mobile. Contenus et design conservés.

Produit : cinq écrans dans l’ordre Formation, Sécurité, Nettoyage, Restauration, Coiffure & Beauté. Sur écran large d’au moins 760 px de hauteur avec souris et sans réduction des mouvements, section sticky sur 360vh. Scroll vertical naturel, aucun blocage de roue ; translate3d pilote le déplacement, scale/opacity suggèrent la profondeur. État React changé seulement au passage d’un métier. Onglets clavier et indicateur 01–05 complètent le parcours. La section se libère après le dernier écran.

Mobile, tablette tactile, fenêtre basse et mouvement réduit : rail horizontal natif avec scroll-snap, swipe, aperçu adjacent et onglets clavier. Pas de longue section épinglée. La vue centrale reste disponible dans le hero ; la galerie est dédiée aux cinq métiers.

Espacement de 100 px sous la navigation pour le carousel épinglé et scroll-margin de 110 px pour les cibles. Overflow horizontal clip pour ne pas créer de conteneur de défilement parasite autour du sticky.

## Fichiers

`src/three/common.ts`, `StoryScene.ts`, `FinalScene.ts`, nouveau `scrollGeometry.ts`, `src/App.tsx`, `src/components/Story.tsx`, `Final.tsx`, `Produit.tsx`, `Metiers.tsx`, `Header.tsx`, `src/index.css` et ce rapport. Build régénéré dans `dist/` avec la police locale.

## Validation

`npm run build` réussi : TypeScript + Vite, code 0, 1931 modules ; HTML 1023,46 kB, gzip 294,59 kB. Journal `work/v3/build.log`.

Tests JSDOM réussis à 1440 et 390 px simulés : sélection métier, retour à la vue centrale, onglets, vingt offres comparées à la source V1, ancres, menu Échap, FAQ et absence d’erreur d’exécution. Parcours desktop testé avec géométrie simulée : cinq étapes, positions translate3d et arrêt au dernier panneau. Logique RAF testée séparément : suspension, reprise, onglet caché et absence de double planification pour les deux scènes.

## Limite restante

Le navigateur automatisé échoue au démarrage (erreur de sandbox TIOCSTI). Aucun relevé réel de FPS, long tasks, dropped frames, CLS ou profil GPU n’a été obtenu. Les tests simulés ne valident pas le rendu visuel, le swipe physique, la netteté Retina ni la fluidité Safari. Ces points restent à contrôler sur les appareils cibles avant publication. Aucun gain de fluidité mesuré n’est revendiqué.
