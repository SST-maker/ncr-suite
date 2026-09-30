# Préparer un déploiement de TEST GitHub Pages

Cette copie est une vitrine marketing autonome. Ne pas l’importer dans le dépôt de la SaaS, ne pas lier le domaine ncr-suite.fr et ne pas y ajouter de secrets.

## Vérification locale

Depuis le dossier fourni :

```sh
npm ci
npm run build
npm run preview -- --host 127.0.0.1
```

Ouvrir l’adresse affichée par Vite. Le build inclut maintenant `tsc --noEmit` : une erreur TypeScript interrompt la génération.

## Publication de test, à effectuer séparément

Le workflow existant `.github/workflows/deploy.yml` publie `dist` lors d’un push sur `main`. Il est conservé sans modification ; aucune publication n’a été lancée pendant cette mission.

1. Utiliser uniquement un dépôt dédié au test.
2. Y placer les sources et le lockfile, sans `node_modules`, `work` ni l’archive de sauvegarde.
3. Dans Settings → Pages → Build and deployment, sélectionner GitHub Actions.
4. Vérifier le nom de la branche avant le premier push : le workflow fourni est déclenché sur `main`.
5. Contrôler le site au sous-chemin du dépôt après la publication de test.

Vite conserve `base: "./"`. Le JavaScript et le CSS sont intégrés à `dist/index.html` par le plugin singlefile ; la police locale reste dans `dist/fonts/inter-variable.woff2`. Publier **tout le dossier dist**, pas uniquement index.html.

Les routes d’inscription, de connexion, de solutions métier et les pages légales sont des liens absolus vers le site officiel, relevés dans sa navigation publique. Il ne faut pas les convertir en routes locales : cette copie ne contient pas la SaaS.

La canonical et les métadonnées sociales pointent sur le domaine officiel. Le fichier de test doit rester une prévisualisation ; vérifier la stratégie d’indexation du domaine de test avant sa publication publique. Aucun réglage du domaine officiel n’est requis.

## Contrôles visuels restant nécessaires

Le navigateur de contrôle était indisponible dans l’environnement d’exécution. Ouvrir la prévisualisation à 360×800, 390×844, 768×1024, 1024×768 et 1440×900 :
- Hero lisible, boutons accessibles, appareil 3D correctement cadré ;
- défilement des cinq chapitres et scène finale ;
- menu mobile : ouvrir, suivre une ancre, rouvrir puis fermer avec Échap ;
- onglets produit et offres au clavier (flèches, Début/Fin) ;
- cinq catalogues et leurs quatre offres ;
- FAQ générale et FAQ métier ;
- mode sans effets 3D, préférence système de réduction des animations ;
- absence de débordement horizontal et d’erreur console.

Les montants et inclusions sont un relevé statique du catalogue public au 30 septembre 2026, sans connexion aux données de production.
