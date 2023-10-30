const express = require("express");
const app = express();

const acteursRoutes = require("./routes/acteurs");
const realisateursRoutes = require("./routes/realisateurs");
const filmsRoutes = require("./routes/films");

// Middleware pour l'analyse des corps JSON
app.use(express.json());

// Routes de l'API
/**
 * Routes pour les acteurs.
 * @route /api/acteurs
 */
app.use("/api/acteurs", acteursRoutes);

/**
 * Routes pour les réalisateurs.
 * @route /api/realisateurs
 */
app.use("/api/realisateurs", realisateursRoutes);

/**
 * Routes pour les films.
 * @route /api/films
 */
app.use("/api/films", filmsRoutes);

// Gestion d'erreur basique
/**
 * Middleware de gestion d'erreurs pour attraper les exceptions et les erreurs non gérées.
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = 3000;
// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
