const express = require("express");
const router = express.Router();
const filmsController = require("../controllers/filmsController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Film:
 *       type: object
 *       required:
 *         - nom
 *         - description
 *         - date_de_parution
 *       properties:
 *         id:
 *           type: integer
 *           description: L'identifiant du film.
 *         nom:
 *           type: string
 *           description: Le nom du film.
 *         description:
 *           type: string
 *           description: La description du film.
 *         date_de_parution:
 *           type: string
 *           format: date
 *           description: La date de parution du film.
 *       example:
 *         id: 1
 *         nom: Avatar
 *         description: Un film de science-fiction.
 *         date_de_parution: "2009-12-18"
 */

/**
 * @swagger
 * /api/films:
 *   get:
 *     summary: Récupère la liste de tous les films.
 *     tags: [Films]
 *     responses:
 *       200:
 *         description: La liste des films.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Film'
 */
router.get("/", filmsController.getAllFilms);

/**
 * @swagger
 * /api/films/{id}:
 *   get:
 *     summary: Récupère un film par son ID.
 *     tags: [Films]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID du film.
 *     responses:
 *       200:
 *         description: Le film correspondant à l'ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Film'
 */
router.get("/:id", filmsController.getFilmById);

/**
 * @swagger
 * /api/films:
 *   post:
 *     summary: Crée un nouveau film.
 *     tags: [Films]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Film'
 *     responses:
 *       201:
 *         description: Le film a été créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Film'
 */
router.post("/", filmsController.createFilm);

/**
 * @swagger
 * /api/films/{filmId}/acteurs:
 *   post:
 *     summary: Lie un acteur à un film.
 *     tags: [Films]
 *     parameters:
 *       - in: path
 *         name: filmId
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID du film.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               acteurId:
 *                 type: integer
 *                 required: true
 *             example:
 *               acteurId: 1
 *     responses:
 *       200:
 *         description: Acteur lié au film avec succès.
 */
router.post("/:filmId/acteurs", filmsController.linkActeurToFilm);

/**
 * @swagger
 * /api/films/{filmId}/realisateurs:
 *   post:
 *     summary: Lie un réalisateur à un film.
 *     tags: [Films]
 *     parameters:
 *       - in: path
 *         name: filmId
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID du film.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               realisateurId:
 *                 type: integer
 *                 required: true
 *             example:
 *               realisateurId: 1
 *     responses:
 *       200:
 *         description: Réalisateur lié au film avec succès.
 */
router.post("/:filmId/realisateurs", filmsController.linkRealisateurToFilm);

/**
 * @swagger
 * /api/films/{id}:
 *   put:
 *     summary: Met à jour un film par son ID.
 *     tags: [Films]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID du film.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Film'
 *     responses:
 *       200:
 *         description: Film mis à jour avec succès.
 */
router.put("/:id", filmsController.updateFilm);

/**
 * @swagger
 * /api/films/{id}:
 *   delete:
 *     summary: Supprime un film par son ID.
 *     tags: [Films]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'ID du film.
 *     responses:
 *       200:
 *         description: Film supprimé avec succès.
 */
router.delete("/:id", filmsController.deleteFilm);

module.exports = router;
