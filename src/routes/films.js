const express = require("express");
const router = express.Router();
const filmsController = require("../controllers/filmsController");

/**
 * Récupère tous les films.
 * @route GET /films
 */
router.get("/", filmsController.getAllFilms);

/**
 * Récupère un film par son ID.
 * @route GET /films/{id}
 * @param {number} id - L'ID du film.
 */
router.get("/:id", filmsController.getFilmById);

/**
 * Crée un nouveau film.
 * @route POST /films
 * @body {string} nom - Le nom du film.
 * @body {string} description - La description du film.
 * @body {Date|string} date_de_parution - La date de parution du film.
 */
router.post("/", filmsController.createFilm);

/**
 * Lie un acteur à un film.
 * @route POST /films/{filmId}/acteurs
 * @param {number} filmId - L'ID du film.
 * @body {number} acteurId - L'ID de l'acteur à lier.
 */
router.post("/:filmId/acteurs", filmsController.linkActeurToFilm);

/**
 * Lie un réalisateur à un film.
 * @route POST /films/{filmId}/realisateurs
 * @param {number} filmId - L'ID du film.
 * @body {number} realisateurId - L'ID du réalisateur à lier.
 */
router.post("/:filmId/realisateurs", filmsController.linkRealisateurToFilm);

/**
 * Met à jour un film par son ID.
 * @route PUT /films/{id}
 * @param {number} id - L'ID du film.
 * @body {string} nom - Le nom du film (facultatif).
 * @body {string} description - La description du film (facultatif).
 * @body {Date|string} date_de_parution - La date de parution du film (facultatif).
 */
router.put("/:id", filmsController.updateFilm);

/**
 * Supprime un film par son ID.
 * @route DELETE /films/{id}
 * @param {number} id - L'ID du film.
 */
router.delete("/:id", filmsController.deleteFilm);

module.exports = router;
