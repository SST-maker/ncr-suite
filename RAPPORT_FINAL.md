# NCR Suite — rapport d’intégration de la vitrine

**30 septembre 2026 — copie locale de test uniquement**

Les modifications sont effectuées dans `/Users/ec/Downloads/ncr-suite-main`. Le build est généré dans `dist`. Aucun déploiement, commit, push, accès authentifié, appel à une API métier ou changement de production n’a été effectué.

## Sources publiques utilisées

- [Accueil, proposition de valeur, métiers et offres](https://ncr-suite.fr/)
- [Formation](https://ncr-suite.fr/logiciel-gestion-formation)
- [Sécurité privée](https://ncr-suite.fr/logiciel-securite-privee)
- [Nettoyage](https://ncr-suite.fr/logiciel-entreprise-nettoyage)
- [Restauration](https://ncr-suite.fr/logiciel-gestion-restaurant)
- [Coiffure et beauté](https://ncr-suite.fr/logiciel-coiffure)
- [Demande d’essai](https://ncr-suite.fr/demande-acces?essai=7)
- Destinations légales reprises : [mentions légales](https://ncr-suite.fr/mentions-legales), [confidentialité](https://ncr-suite.fr/confidentialite).
- Connexion relevée dans la navigation publique : `https://ncr-suite.fr/connexion`. Aucun compte consulté. Contact : `contact@ncr-suite.fr`.

**Méthode :** le lecteur web ne renvoyait que l’écran de chargement. Les contenus publics ont été relevés dans le bundle JavaScript distribué par la vitrine, avec extraction des objets littéraux du catalogue public, des métiers et des FAQ. Ce bundle n’a pas été exécuté. Les textes et données des espaces internes ne servent pas de source commerciale. L’empreinte SHA-256, les tableaux extraits et l’extrait de la vitrine sont conservés dans `work/audit`. Il ne s’agit pas d’un contrôle du rendu de production dans un navigateur.

## Informations intégrées

Proposition de valeur : relier clients, équipes, planning, documents, facturation et opérations dans un environnement adapté au métier. Cinq univers publics, fonctions métier, modularité, accès par rôle, PWA, automatisations et historiques.

Quatre formules par métier, soit **20 offres**, reprises avec leurs noms, périodicités, prix, limites d’accès, résumés et principales inclusions du catalogue public :

| Métier | Découverte | Essentielle | Professionnelle | Métier, à partir de |
|---|---:|---:|---:|---:|
| Formation | 39,90 € | 69,90 € | 99,90 € | 149,90 € |
| Sécurité privée | 39,90 € | 69,90 € | 89,90 € | 119,90 € |
| Nettoyage | 29,90 € | 49,90 € | 79,90 € | 109,90 € |
| Restauration | 29,90 € | 49,90 € | 79,90 € | 109,90 € |
| Coiffure & beauté | 9,90 € | 19,90 € | 39,90 € | 69,90 € |

Prix **HT par mois**. Métier est sur mesure : configuration et tarif contractuel final définis avant l’ouverture. Essai gratuit de **7 jours de Professionnelle**, après validation, sans carte bancaire ni contrat d’abonnement à signer au démarrage. Les liens des offres conservent les paramètres publics ; le texte explique explicitement la formule testée.

FAQ : quatre réponses générales fondées sur la vitrine et le formulaire public, plus les vingt questions/réponses des cinq fiches métier, accessibles par sélecteur.

## Design et composants

Conservés : les deux scènes Three.js, l’appareil en perspective, les panneaux flottants, les transitions au scroll, les cartes inclinables, les gradients, les halos, les animations GSAP, les formes du logo et l’alternance des sections claires/sombres.

- **Story** : hero explicite, essai et conditions, cinq chapitres recadrés sur les fonctions publiques.
- **Metiers** : cinq métiers réels, modules clés, icônes adaptées, liens de découverte fonctionnels.
- **Produit** : galerie conservée, navigation clavier corrigée, distinction claire entre illustrations et interfaces réelles.
- **Avantages** : contenu réécrit autour du socle commun, de la modularité, de la PWA et des rôles. Composant existant conservé.
- **Offres** : nouveau composant, sélecteur métier, quatre cartes par catalogue, inclusions, conditions et liens publics.
- **Faq** : FAQ générale et sélecteur de questions métier.
- **Header / Footer / Final** : accès aux offres, connexion, essai, contact et pages légales ; menu avec fermeture Échap et restitution du focus.

Aucune nouvelle bibliothèque ajoutée à l’application. Les outils de vérification sont isolés sous `work/tools` et ne font pas partie du build.

## Données fictives retirées

Retrait des métiers non justifiés : artisans/BTP, santé, conseil, commerce, immobilier et associations comme offres NCR Suite. Suppression des promesses génériques non sourcées, dont disponibilité immédiate des équipes, segmentation et relances systématiques.

Dans les textures desktop, mobile et flottantes : retrait des revenus **48 920 € / 412 600 €**, du nombre **1 284 clients**, des pourcentages de croissance/performance, de la note **4,8/5**, des **126 avis**, des montants de factures, des noms d’entreprises et des coordonnées inventés. Les graphiques sont conservés comme schémas sans valeurs réelles, avec mentions d’illustration. Les exemples de créneaux et statuts servent uniquement à illustrer les usages ; ce ne sont pas des preuves client.

Aucun logo client, témoignage ou prix promotionnel n’a été ajouté.

## SEO, accessibilité, responsive et performance

- Title, description, Open Graph, Twitter et description SoftwareApplication alignés sur les cinq métiers ; canonical officielle conservée ; image sociale officielle référencée.
- Ancienne FAQ JSON-LD supprimée pour éviter des réponses fictives ou divergentes. Un seul H1 dans l’application rendue. Contenus commerciaux présents dans le DOM ; version de secours sans JavaScript mise à jour.
- Onglets clavier : flèches et Début/Fin avec déplacement effectif du focus ; attributs ARIA ; menu mobile avec Échap ; CTA explicites ; liens d’évitement et focus visibles conservés.
- Réduction des animations respectée, y compris changements de préférence système. Repli sans WebGL conservé. Sur écran de moins de 540 px de haut et moins de 1024 px de large, la scène immersive laisse place à la version statique pour éviter un hero trop serré.
- Navigation desktop repoussée à 1024 px ; offres en une, deux ou quatre colonnes ; boutons et sélecteurs adaptables ; cartes métier à vrais liens.
- Police Inter locale ; fin des requêtes Google Fonts. Révocation des URL d’images temporaires lors des changements de format. Une seule détection WebGL, contexte de détection libéré.
- `base: "./"` et build singlefile conservés. La police reste un asset séparé : publier **tout `dist`**.

## Validation effectuée

Dernière exécution :

```text
> ncr-suite-vitrine@1.0.0 build
> tsc --noEmit && vite build
vite v7.3.2 building client environment for production...
✓ 1927 modules transformed.
dist/index.html  1,033.66 kB │ gzip: 297.02 kB
✓ built in 7.49s
```

**Code de sortie : 0.** Aucun échec TypeScript ou Vite. Police locale : 352 240 octets, présente dans `dist/fonts`.

Tests d’exécution React dans JSDOM : **réussis**, en mode réduction des animations puis en mode sans WebGL. Contrôles : 5 métiers, 20 offres comparées aux prix/inclusions de la source publique, H1 unique dans l’application, ancres internes, destinations des liens, navigation des onglets, fermeture du menu, sélecteur FAQ et absence d’erreur d’exécution dans cet environnement.

Rendus des **10 textures** d’interface et des **16 cartes flottantes**, inspectés visuellement via un moteur Canvas local. Les poids intermédiaires de police ont été normalisés dans l’outil de contrôle pour sa compatibilité ; le code de rendu du site conserve ses poids d’origine. Ces rendus ne constituent pas des captures navigateur.

Prévisualisation et police : réponses **HTTP 200** sur le serveur local. Chemins relatifs contrôlés pour la racine et un sous-chemin GitHub Pages. Aucun script TypeScript source n’est référencé dans le build.

## Limites et vérifications restantes

**Le rendu complet dans un vrai navigateur, les collisions responsive, les contrastes mesurés, la console navigateur et les animations WebGL ne sont pas validés.** Le navigateur intégré a échoué à démarrer ; Chrome automatisé s’est fermé au lancement. La distribution alternative de test n’était pas compatible avec macOS 13. Les tests DOM et les rendus Canvas ne remplacent pas ces contrôles.

La prévisualisation locale est disponible pendant cette session sur `http://127.0.0.1:4173/`. Une demande d’ouverture dans Codex a été envoyée. La procédure de contrôle aux cinq résolutions et le déploiement de test sont décrits dans `DEPLOIEMENT_GITHUB_PAGES.md`.

Les tarifs sont un instantané du 30 septembre 2026 : recontrôler le catalogue avant une publication ultérieure. Aucun déploiement de test ou de production n’a été lancé.

## Fichiers

Modifiés : `src/data.ts`, `src/App.tsx`, `src/index.css`, `src/three/ui.ts`, `src/components/Story.tsx`, `Header.tsx`, `Footer.tsx`, `Metiers.tsx`, `Produit.tsx`, `Final.tsx`, `Faq.tsx`, `index.html`, `package.json`, `package-lock.json`, `DEPLOIEMENT_GITHUB_PAGES.md`.

Créés : `src/components/Offres.tsx`, `src/offers.ts`, `public/fonts/inter-variable.woff2`, `.gitignore`, `AUDIT_CONTENU.md`, ce rapport. Build généré : `dist/`.

Les scènes `src/three/StoryScene.ts`, `src/three/FinalScene.ts`, le workflow GitHub Pages et `vite.config.ts` sont inchangés. Sauvegarde initiale : `work/original-prototype.tar.gz`. Journaux, sources publiques extraites et contrôles : `work/audit` et `work/qa` ; exclus des sources à publier par `.gitignore`.
