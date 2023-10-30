# API Cinématographique

Cette API basique permet de gérer une base de données de films, acteurs et réalisateurs. Elle offre des fonctionnalités CRUD pour les entités mentionnées et permet également de lier des acteurs et réalisateurs à des films.
<br>
<br>
A noter : Aucun fichier JSON permettant de compléter la BDD n'est fourni, il faut soit les rentrées manuellement, soit via les routes API (POSTMAN par exemple), ou des fichiers CSV pour remplir les tables de données.

## Table des matières

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Lancement de l'API](#lancement-de-lapi)
- [Routes](#routes)
  - [Acteurs](#acteurs)
  - [Films](#films)
  - [Réalisateurs](#réalisateurs)

## Prérequis

- Node.js (v14+ recommandé)
- Une BDD MariaDB configurée

## Installation

1. Clonez ce dépôt GitHub :

```bash
git clone <git@github.com:Kierha/webservice_rest.git>
```

2. Accédez au répertoire du projet :

```bash
cd chemin_du_repertoire
```

3. Installez les dépendances du projet :

```bash
npm install
```

4. Configurez votre base de données `database/connection.js` avec vos informations d'accès (configurez votre fichier .env à la racine du projet).

## Lancement de l'API

Pour lancer l'API, exécutez la commande suivante :

```bash
npm start
```

Votre serveur sera alors accessible à l'adresse `http://localhost:3000`.

## Routes

Votre documentation OpenAPI sera accessible à l'adresse : `http://localhost:3000/api-docs/`.

### Acteurs

#### **GET** `/api/acteurs`

Récupère la liste de tous les acteurs.

- **Réponse**: Un tableau d'objets représentant chacun un acteur.

#### **GET** `/api/acteurs/:id`

Récupère un acteur par son ID.

- **Paramètres**: `id` - ID de l'acteur.
- **Réponse**: Un objet représentant l'acteur.

#### **POST** `/api/acteurs`

Ajoute un nouvel acteur.

- **Corps de la demande**:
  - `nom` (obligatoire) - Nom de l'acteur.
  - `prenom` (obligatoire) - Prénom de l'acteur.
  - `date_de_naissance` (optionnel) - Date de naissance de l'acteur.
- **Réponse**: L'objet représentant l'acteur nouvellement créé.

#### **PUT** `/api/acteurs/:id`

Met à jour un acteur par son ID.

- **Paramètres**: `id` - ID de l'acteur à mettre à jour.
- **Corps de la demande**:
  - `nom` (optionnel) - Nouveau nom de l'acteur.
  - `prenom` (optionnel) - Nouveau prénom de l'acteur.
  - `date_de_naissance` (optionnel) - Nouvelle date de naissance.
- **Réponse**: Un message confirmant la mise à jour.

#### **DELETE** `/api/acteurs/:id`

Supprime un acteur par son ID.

- **Paramètres**: `id` - ID de l'acteur à supprimer.
- **Réponse**: Un message confirmant la suppression.

### Films

#### **GET** `/api/films`

Récupère la liste de tous les films.

- **Réponse**: Un tableau d'objets représentant chacun un film.

#### **GET** `/api/films/:id`

Récupère un film par son ID.

- **Paramètres**: `id` - ID du film.
- **Réponse**: Un objet représentant le film.

#### **POST** `/api/films`

Ajoute un nouveau film.

- **Corps de la demande**:
  - `titre` (obligatoire) - Titre du film.
  - `description` (optionnel) - Description du film.
  - `annee` (optionnel) - Année de sortie.
- **Réponse**: L'objet représentant le film nouvellement créé.

#### **PUT** `/api/films/:id`

Met à jour un film par son ID.

- **Paramètres**: `id` - ID du film à mettre à jour.
- **Corps de la demande**:
  - `titre` (optionnel) - Nouveau titre du film.
  - `description` (optionnel) - Nouvelle description.
  - `annee` (optionnel) - Nouvelle année de sortie.
- **Réponse**: Un message confirmant la mise à jour.

#### **DELETE** `/api/films/:id`

Supprime un film par son ID.

- **Paramètres**: `id` - ID du film à supprimer.
- **Réponse**: Un message confirmant la suppression.

#### **POST** `/api/films/:filmId/acteurs`

Lie un acteur à un film.

- **Paramètres**: `filmId` - ID du film.
- **Corps de la demande**:
  - `acteurId` (obligatoire) - ID de l'acteur à lier.
- **Réponse**: Un message confirmant le lien.

#### **POST** `/api/films/:filmId/realisateurs`

Lie un réalisateur à un film.

- **Paramètres**: `filmId` - ID du film.
- **Corps de la demande**:
  - `realisateurId` (obligatoire) - ID du réalisateur à lier.
- **Réponse**: Un message confirmant le lien.

### Réalisateurs

#### **GET** `/api/realisateurs`

Récupère la liste de tous les réalisateurs.

- **Réponse**: Un tableau d'objets représentant chacun un réalisateur.

#### **GET** `/api/realisateurs/:id`

Récupère un réalisateur par son ID.

- **Paramètres**: `id` - ID du réalisateur.
- **Réponse**: Un objet représentant le réalisateur.

#### **POST** `/api/realisateurs`

Ajoute un nouveau réalisateur.

- **Corps de la demande**:
  - `nom` (obligatoire) - Nom du réalisateur.
  - `prenom` (obligatoire) - Prénom du réalisateur.
  - `date_de_naissance` (optionnel) - Date de naissance du réalisateur.
- **Réponse**: L'objet représentant le réalisateur nouvellement créé.

#### **PUT** `/api/realisateurs/:id`

Met à jour un réalisateur par son ID.

- **Paramètres**: `id` - ID du réalisateur à mettre à jour.
- **Corps de la demande**:
  - `nom` (optionnel) - Nouveau nom du réalisateur.
  - `prenom` (optionnel) - Nouveau prénom du réalisateur.
  - `date_de_naissance` (optionnel) - Nouvelle date de naissance.
- **Réponse**: Un message confirmant la mise à jour.

#### **DELETE** `/api/realisateurs/:id`

Supprime un réalisateur par son ID.

- **Paramètres**: `id` - ID du réalisateur à supprimer.
- **Réponse**: Un message confirmant la suppression.
