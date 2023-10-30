-- Script création de la base de données et des tables 

-- Création de la base de données
CREATE DATABASE movies;

-- Création de la table des acteurs
CREATE TABLE acteurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    date_de_naissance DATE NOT NULL
);

-- Création de la table des réalisateurs
CREATE TABLE realisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    date_de_naissance DATE NOT NULL
);

-- Création de la table des films
CREATE TABLE films (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(128) NOT NULL,
    description VARCHAR(2048),
    date_de_parution DATE NOT NULL
);

-- Création de la table associant les acteurs aux films
CREATE TABLE films_acteurs (
    film_id INT,
    acteur_id INT,
    FOREIGN KEY (film_id) REFERENCES films(id),
    FOREIGN KEY (acteur_id) REFERENCES acteurs(id),
    PRIMARY KEY (film_id, acteur_id)
);

-- Création de la table associant les réalisateurs aux films
CREATE TABLE films_realisateurs (
    film_id INT,
    realisateur_id INT,
    FOREIGN KEY (film_id) REFERENCES films(id),
    FOREIGN KEY (realisateur_id) REFERENCES realisateurs(id),
    PRIMARY KEY (film_id, realisateur_id)
);
