# Déploiement GitHub Pages

Ce projet est une application React/Vite : les fichiers `src/*.tsx` ne doivent pas être servis directement par GitHub Pages.

## Méthode recommandée 

1. Déposer tout le contenu de ce dossier à la racine du dépôt GitHub.
2. Vérifier que la branche principale s'appelle `main`.
3. Dans GitHub : **Settings > Pages > Build and deployment > Source > GitHub Actions**.
4. Faire un commit/push sur `main`.
5. L'action **Deploy GitHub Pages** installe les dépendances, exécute `npm run build` puis publie `dist`.

Le fichier `vite.config.ts` utilise `base: "./"` afin que le site fonctionne aussi quand GitHub Pages l'héberge sous `https://utilisateur.github.io/nom-du-repo/`.

## Pourquoi la version originale affichait une page blanche

Le fichier `index.html` original contient :

```html
<script type="module" src="/src/main.tsx"></script>
```

Ce chemin est destiné au serveur de développement Vite. GitHub Pages est un hébergement statique et ne transpile pas TypeScript/TSX ni React. Il faut donc publier la sortie de `vite build` (`dist`) et non les sources brutes.
