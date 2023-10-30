const express = require("express");
const router = express.Router();
const acteursController = require("../controllers/acteursController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Acteur:
 *       type: object
 *       required:
 *         - nom
 *         - prenom
 *       properties:
 *         id:
 *           type: integer
 *           description: L'identifiant de l'acteur.
 *         nom:
 *           type: string
 *           description: Le nom de l'acteur.
 *         prenom:
 *           type: string
 *           description: Le prénom de l'acteur.
 *       example:
 *         id: 1
 *         nom: Tom
 *         prenom: Dunhill
 */

/**
 * @swagger
 * /api/acteurs:
 *   get:
 *     summary: Récupère la liste de tous les acteurs.
 *     tags: [Acteurs]
 *     responses:
 *       200:
 *         description: La liste des acteurs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Acteur'
 *       404:
 *         description: Acteurs non trouvés.
 */
router.get("/", acteursController.getAllActeurs);

/**
 * @swagger
 * /api/acteurs/{id}:
 *   get:
 *     summary: Récupère un acteur par son ID.
 *     tags: [Acteurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID de l'acteur.
 *     responses:
 *       200:
 *         description: L'acteur correspondant à l'ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Acteur'
 *       404:
 *         description: Acteur non trouvé.
 */
router.get("/:id", acteursController.getActeurById);

/**
 * @swagger
 * /api/acteurs:
 *   post:
 *     summary: Crée un nouvel acteur.
 *     tags: [Acteurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Acteur'
 *     responses:
 *       201:
 *         description: L'acteur a été créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Acteur'
 *       400:
 *         description: Mauvaise requête.
 */
router.post("/", acteursController.createActeur);

/**
 * @swagger
 * /api/acteurs/{id}:
 *   put:
 *     summary: Met à jour un acteur par son ID.
 *     tags: [Acteurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID de l'acteur.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Acteur'
 *     responses:
 *       200:
 *         description: L'acteur a été mis à jour avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Acteur'
 *       400:
 *         description: Mauvaise requête.
 *       404:
 *         description: Acteur non trouvé.
 */
router.put("/:id", acteursController.updateActeur);

/**
 * @swagger
 * /api/acteurs/{id}:
 *   delete:
 *     summary: Supprime un acteur par son ID.
 *     tags: [Acteurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID de l'acteur.
 *     responses:
 *       200:
 *         description: L'acteur a été supprimé avec succès.
 *       404:
 *         description: Acteur non trouvé.
 */
router.delete("/:id", acteursController.deleteActeur);

module.exports = router;
