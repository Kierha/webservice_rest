const express = require("express");
const router = express.Router();
const acteursController = require("../controllers/acteursController");

/**
 * Récupère tous les acteurs.
 * @route GET /acteurs
 */
router.get("/", acteursController.getAllActeurs);

/**
 * Récupère un acteur par son ID.
 * @route GET /acteurs/{id}
 * @param {number} id - L'ID de l'acteur.
 */
router.get("/:id", acteursController.getActeurById);

/**
 * Crée un nouvel acteur.
 * @route POST /acteurs
 * @body {string} nom - Le nom de l'acteur.
 * @body {string} prenom - Le prénom de l'acteur.
 * @body {Date|string} date_de_naissance - La date de naissance de l'acteur.
 */
router.post("/", acteursController.createActeur);

/**
 * Met à jour un acteur par son ID.
 * @route PUT /acteurs/{id}
 * @param {number} id - L'ID de l'acteur.
 * @body {string} nom - Le nom de l'acteur (facultatif).
 * @body {string} prenom - Le prénom de l'acteur (facultatif).
 * @body {Date|string} date_de_naissance - La date de naissance de l'acteur (facultatif).
 */
router.put("/:id", acteursController.updateActeur);

/**
 * Supprime un acteur par son ID.
 * @route DELETE /acteurs/{id}
 * @param {number} id - L'ID de l'acteur.
 */
router.delete("/:id", acteursController.deleteActeur);

module.exports = router;
