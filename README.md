# Cosmic Portfolio

Ce projet est un portfolio professionnel développé avec Astro, React et Tailwind CSS. Il intègre des éléments via Three.js et des animations fluides avec Framer Motion.

## Stack Technique

- **Framework :** Astro
- **UI Framework :** React
- **Styling :** Tailwind CSS
- **Animations :** Framer Motion
- **3D Rendering :** Three.js (@react-three/fiber, @react-three/drei)
- **Typographie :** @fontsource/inter, @fontsource/orbitron, @fontsource/space-grotesk
- **Icônes :** Lucide React, React Icons

## Prérequis

- Node.js (version 18.0.0 ou supérieure)
- npm, yarn ou pnpm

## Installation

1. Cloner le dépôt :
```bash
git clone https://github.com/Etw0Dragon/portfolio-space-tm.git
cd portfolio-space-tm
```

2. Installer les dépendances :
```bash
npm install
```

## Développement

Pour lancer le serveur de développement local avec rechargement automatique :

```bash
npm run dev
```

Le site sera accessible par défaut à l'adresse `http://localhost:4321`.

## Build et Production

Pour générer la version optimisée pour la production :

```bash
npm run build
```

Pour prévisualiser le build localement :

```bash
npm run preview
```

## Structure du Projet

- `/public/` : Contient les assets statiques (images, vidéos).
- `/src/components/` : Composants React utilisés dans l'interface.
- `/src/constants/` : Données statiques et liens du site.
- `/src/layouts/` : Modèles de mise en page Astro.
- `/src/pages/` : Pages du site (système de routage basé sur les fichiers).
- `/src/utils/` : Scripts utilitaires et helper functions.

## Licence

Ce projet est sous licence CC BY-NC 4.0. Voir le fichier `LICENSE` pour plus de détails.
