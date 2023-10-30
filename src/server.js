const express = require("express");
const app = express();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const acteursRoutes = require("./routes/acteurs");
const realisateursRoutes = require("./routes/realisateurs");
const filmsRoutes = require("./routes/films");
const path = require("path");

// Options pour swagger-jsdoc
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mon API Cinema",
      version: "1.0.0",
      description:
        "Une API simple pour gérer des films, acteurs et réalisateurs.",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: [path.join(__dirname, "./routes/*.js")],
};

const specs = swaggerJsdoc(options);

// Middleware pour l'analyse des corps JSON
app.use(express.json());

// Routes de l'API
app.use("/api/acteurs", acteursRoutes);
app.use("/api/realisateurs", realisateursRoutes);
app.use("/api/films", filmsRoutes);

// Redirige l'accès à la racine vers la documentation Swagger
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

// Utilisez swagger-ui-express pour servir votre documentation API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Permet de tester la documentation Swagger
// app.get("/swagger.json", (req, res) => {
//   res.setHeader("Content-Type", "application/json");
//   res.send(specs);
// });

// Gestion d'erreur basique
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = 3000;
// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});
