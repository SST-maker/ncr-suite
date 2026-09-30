# Audit et mapping avant modification — 30 septembre 2026

Périmètre : copie locale `/Users/ec/Downloads/ncr-suite-main` uniquement. Aucun compte, dépôt distant, API métier ou environnement de production utilisé.

## Source publique
La page HTML officielle charge un bundle public : `https://ncr-suite.fr/ncr-suite-app-v2925-r4.js`. Le lecteur web renvoie seulement le chargement. Les textes de présentation, le catalogue public des offres et les fiches publiques métier ont donc été extraits de ce bundle, sans exécuter son code ni consulter les espaces internes. Les tableaux extraits sont conservés dans `work/audit/`.

Pages : accueil ; /logiciel-gestion-formation ; /logiciel-securite-privee ; /logiciel-entreprise-nettoyage ; /logiciel-gestion-restaurant ; /logiciel-coiffure ; /demande-acces?essai=7 ; /mentions-legales ; /confidentialite. Connexion : destination publique relevée dans la navigation, aucun accès authentifié.

## Audit du prototype
- Story : hero et cinq séquences de gestion, clients, planning, documents et pilotage ; scène Three.js avec appareil, textures et cartes flottantes, transitions pilotées par le scroll. À conserver ; affirmations générales trop larges à recadrer.
- Metiers : six cartes inclinables ; BTP, santé, conseil, commerce, immobilier, associations non justifiés par la vitrine. Remplacer par les cinq métiers publics et leurs liens exacts.
- Produit : galerie de cinq écrans en perspective, navigation par onglets. À conserver. Écrans simulés, chiffres et sociétés inventés à retirer ; ajouter une indication explicite d’illustration.
- Avantages : cinq cartes avec révélations GSAP. Conserver la grille ; reformuler autour du socle modulaire, des rôles, de la PWA et des automatisations.
- FAQ : réponses génériques sur de faux métiers. Remplacer et reprendre les FAQ publiques des pages métier.
- Final : logo et panneaux en 3D. Conserver et relier à la demande d’essai publique.
- Header/Footer : destinations limitées à l’accueil. Ajouter offres, demande d’essai, connexion, contact et liens légaux existants.
- Tarifs : absents du prototype. Créer un sélecteur métier avec quatre cartes fidèles au catalogue public.
- ui.ts : revenus 48 920 €, 412 600 €, croissance, 1 284 clients, note 4,8/5, 126 avis, faux noms et coordonnées. Retirer des vues desktop, mobile et flottantes. Conserver les graphiques comme schémas sans valeurs et les identifier comme illustrations.
- SEO : métadonnées présentes mais FAQ JSON-LD obsolète. Corriger les descriptions, supprimer le doublon de données FAQ et compléter le partage social.
- Build : Vite singlefile, base relative déjà correcte. Le build ne contrôle pas TypeScript : ajouter tsc --noEmit.

## Mapping
Proposition de valeur → Hero ; poste de pilotage / CRM / planning / documents / indicateurs → cinq séquences 3D ; cinq univers → cartes métiers ; fonctions selon métier et formule → galerie ; modularité / rôles / PWA / historique → avantages ; catalogue exact → nouvelle section Offres ; FAQ publiques → accordéons ; ouverture sur validation → CTA final ; contact / pages publiques → footer.

Pas de promesse de certification Qualiopi, d’économie chiffrée ou d’inscription immédiate. Les capacités métier sont annoncées selon l’offre ou les modules activés. Les tarifs sont un relevé statique au 30 septembre 2026.
