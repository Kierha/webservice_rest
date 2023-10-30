const express = require("express");
const router = express.Router();
const realisateursController = require("../controllers/realisateursController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Realisateur:
 *       type: object
 *       required:
 *         - nom
 *         - prenom
 *         - date_de_naissance
 *       properties:
 *         id:
 *           type: integer
 *           description: L'identifiant du réalisateur.
 *         nom:
 *           type: string
 *           description: Le nom du réalisateur.
 *         prenom:
 *           type: string
 *           description: Le prénom du réalisateur.
 *         date_de_naissance:
 *           type: string
 *           format: date
 *           description: La date de naissance du réalisateur.
 *       example:
 *         id: 1
 *         nom: Nolan
 *         prenom: Christopher
 *         date_de_naissance: "1970-07-30"
 */

/**
 * @swagger
 * /api/realisateurs:
 *   get:
 *     summary: Récupère la liste de tous les réalisateurs.
 *     tags: [Realisateurs]
 *     responses:
 *       200:
 *         description: La liste des réalisateurs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Realisateur'
 */
router.get("/", realisateursController.getAllRealisateurs);

/**
 * @swagger
 * /api/realisateurs/{id}:
 *   get:
 *     summary: Récupère un réalisateur par son ID.
 *     tags: [Realisateurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID du réalisateur.
 *     responses:
 *       200:
 *         description: Le réalisateur correspondant à l'ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Realisateur'
 */
router.get("/:id", realisateursController.getRealisateurById);

/**
 * @swagger
 * /api/realisateurs:
 *   post:
 *     summary: Crée un nouveau réalisateur.
 *     tags: [Realisateurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Realisateur'
 *     responses:
 *       201:
 *         description: Le réalisateur a été créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Realisateur'
 */
router.post("/", realisateursController.createRealisateur);

/**
 * @swagger
 * /api/realisateurs/{id}:
 *   put:
 *     summary: Met à jour un réalisateur par son ID.
 *     tags: [Realisateurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID du réalisateur.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Realisateur'
 *     responses:
 *       200:
 *         description: Réalisateur mis à jour avec succès.
 */
router.put("/:id", realisateursController.updateRealisateur);

/**
 * @swagger
 * /api/realisateurs/{id}:
 *   delete:
 *     summary: Supprime un réalisateur par son ID.
 *     tags: [Realisateurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID du réalisateur.
 *     responses:
 *       200:
 *         description: Réalisateur supprimé avec succès.
 */
router.delete("/:id", realisateursController.deleteRealisateur);

module.exports = router;
