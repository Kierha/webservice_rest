-- Création de la base de données
CREATE DATABASE IF NOT EXISTS movies;
USE movies;

-- Création de la table des acteurs
CREATE TABLE IF NOT EXISTS acteurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    date_de_naissance DATE NOT NULL
);

-- Création de la table des réalisateurs
CREATE TABLE IF NOT EXISTS realisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    date_de_naissance DATE NOT NULL
);

-- Création de la table des films
CREATE TABLE IF NOT EXISTS films (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(128) NOT NULL,
    description VARCHAR(2048),
    date_de_parution DATE NOT NULL
);

-- Création de la table associant les acteurs aux films
CREATE TABLE IF NOT EXISTS films_acteurs (
    film_id INT,
    acteur_id INT,
    FOREIGN KEY (film_id) REFERENCES films(id),
    FOREIGN KEY (acteur_id) REFERENCES acteurs(id),
    PRIMARY KEY (film_id, acteur_id)
);

-- Création de la table associant les réalisateurs aux films
CREATE TABLE IF NOT EXISTS films_realisateurs (
    film_id INT,
    realisateur_id INT,
    FOREIGN KEY (film_id) REFERENCES films(id),
    FOREIGN KEY (realisateur_id) REFERENCES realisateurs(id),
    PRIMARY KEY (film_id, realisateur_id)
);

-- Insertion de données d'exemple
INSERT INTO acteurs (nom, prenom, date_de_naissance) VALUES
('DiCaprio', 'Leonardo', '1974-11-11'),
('Pitt', 'Brad', '1963-12-18'),
('Johansson', 'Scarlett', '1984-11-22'),
('Hanks', 'Tom', '1956-07-09'),
('Lawrence', 'Jennifer', '1990-08-15');

INSERT INTO realisateurs (nom, prenom, date_de_naissance) VALUES
('Spielberg', 'Steven', '1946-12-18'),
('Nolan', 'Christopher', '1970-07-30'),
('Tarantino', 'Quentin', '1963-03-27'),
('Scorsese', 'Martin', '1942-11-17'),
('Coppola', 'Francis Ford', '1939-04-07');

INSERT INTO films (nom, description, date_de_parution) VALUES
('Inception', 'Un voleur qui s'infiltre dans les rêves', '2010-07-16'),
('Forrest Gump', 'L\'histoire d\'un homme au destin extraordinaire', '1994-07-06'),
('Pulp Fiction', 'Des histoires entremêlées dans le milieu criminel', '1994-10-14'),
('The Godfather', 'La saga d\'une famille mafieuse', '1972-03-24'),
('Avengers: Endgame', 'La conclusion épique de la saga Avengers', '2019-04-26');

-- Insertion de données dans la table films_acteurs
INSERT INTO films_acteurs (film_id, acteur_id) VALUES
(1, 1), -- Inception, Leonardo DiCaprio
(2, 4), -- Forrest Gump, Tom Hanks
(3, 2), -- Pulp Fiction, Brad Pitt
(4, 1), -- The Godfather, Leonardo DiCaprio
(5, 3); -- Avengers: Endgame, Scarlett Johansson

-- Insertion de données dans la table films_realisateurs
INSERT INTO films_realisateurs (film_id, realisateur_id) VALUES
(1, 2), -- Inception, Christopher Nolan
(2, 1), -- Forrest Gump, Steven Spielberg
(3, 3), -- Pulp Fiction, Quentin Tarantino
(4, 5), -- The Godfather, Francis Ford Coppola
(5, 1); -- Avengers: Endgame, Steven Spielberg
