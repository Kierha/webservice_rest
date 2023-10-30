const express = require("express");
const router = express.Router();
const realisateursController = require("../controllers/realisateursController");

/**
 * Récupère tous les réalisateurs.
 * @route GET /realisateurs
 */
router.get("/", realisateursController.getAllRealisateurs);

/**
 * Récupère un réalisateur par son ID.
 * @route GET /realisateurs/{id}
 * @param {number} id - L'ID du réalisateur.
 */
router.get("/:id", realisateursController.getRealisateurById);

/**
 * Crée un nouveau réalisateur.
 * @route POST /realisateurs
 * @body {string} nom - Le nom du réalisateur.
 * @body {string} prenom - Le prénom du réalisateur.
 * @body {Date|string} date_de_naissance - La date de naissance du réalisateur.
 */
router.post("/", realisateursController.createRealisateur);

/**
 * Met à jour un réalisateur par son ID.
 * @route PUT /realisateurs/{id}
 * @param {number} id - L'ID du réalisateur.
 * @body {string} nom - Le nom du réalisateur (facultatif).
 * @body {string} prenom - Le prénom du réalisateur (facultatif).
 * @body {Date|string} date_de_naissance - La date de naissance du réalisateur (facultatif).
 */
router.put("/:id", realisateursController.updateRealisateur);

/**
 * Supprime un réalisateur par son ID.
 * @route DELETE /realisateurs/{id}
 * @param {number} id - L'ID du réalisateur.
 */
router.delete("/:id", realisateursController.deleteRealisateur);

module.exports = router;
