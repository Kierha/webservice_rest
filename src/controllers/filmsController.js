// Importation du modèle Film
const Film = require("../models/film");

/**
 * Récupère tous les films avec possibilité de filtrer par acteurs et réalisateurs.
 * @async
 * @function
 * @param {Request} req - La requête client, peut contenir des filtres en tant que query params.
 * @param {Response} res - La réponse à envoyer au client.
 */
exports.getAllFilms = async (req, res) => {
  try {
    // console.log(req.body);
    let { acteurs, realisateurs, limit } = req.query;

    acteurs = acteurs ? acteurs.split(",").map((id) => Number(id)) : [];
    realisateurs = realisateurs
      ? realisateurs.split(",").map((id) => Number(id))
      : [];
    limit = limit ? Number(limit) : 20;

    const films = await Film.getAll(limit, acteurs, realisateurs);
    res.status(200).json(films);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Récupère un film par son ID.
 * @async
 * @function
 * @param {Request} req - La requête client, contenant l'ID du film dans params.
 * @param {Response} res - La réponse à envoyer au client.
 */
exports.getFilmById = async (req, res) => {
  try {
    // console.log(req.body);
    const film = await Film.getById(req.params.id);
    if (!film) {
      return res.status(404).json({ message: "Film not found" });
    } else {
      res.status(200).json(film);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Crée un nouveau film.
 * @async
 * @function
 * @param {Request} req - La requête client, contenant les détails du film dans le body.
 * @param {Response} res - La réponse à envoyer au client.
 */
exports.createFilm = async (req, res) => {
  try {
    // console.log(req.body);
    const { nom, description, date_de_parution } = req.body;
    const newFilm = await Film.create(nom, description, date_de_parution);
    res.status(201).json(newFilm);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Met à jour un film existant par son ID.
 * @async
 * @function
 * @param {Request} req - La requête client, contenant l'ID du film et les détails à mettre à jour.
 * @param {Response} res - La réponse à envoyer au client.
 */
exports.updateFilm = async (req, res) => {
  try {
    // console.log(req.body);
    const { nom, description, date_de_parution } = req.body;
    const filmToUpdate = new Film(
      req.params.id,
      nom,
      description,
      date_de_parution
    );
    const updatedRows = await filmToUpdate.update();
    if (updatedRows === 0) {
      res.status(404).json({ message: "Film not found" });
    } else {
      res.status(200).json(filmToUpdate);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Supprime un film par son ID.
 * @async
 * @function
 * @param {Request} req - La requête client, contenant l'ID du film à supprimer.
 * @param {Response} res - La réponse à envoyer au client.
 */
exports.deleteFilm = async (req, res) => {
  try {
    // console.log(req.body);
    const filmToDelete = new Film(req.params.id);
    const deletedRows = await filmToDelete.delete();
    if (deletedRows === 0) {
      res.status(404).json({ message: "Film not found" });
    } else {
      res.status(204).json({ message: "Film deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Lie un acteur à un film.
 * @async
 * @function
 * @param {Request} req - La requête client, contenant l'ID du film et de l'acteur à lier.
 * @param {Response} res - La réponse à envoyer au client.
 */
exports.linkActeurToFilm = async (req, res) => {
  try {
    // console.log(req.body);
    const filmId = req.params.filmId;
    const acteurId = req.body.acteurId;
    await Film.linkActeur(filmId, acteurId);
    res.status(201).json({ message: "Acteur linked to Film successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Lie un réalisateur à un film.
 * @async
 * @function
 * @param {Request} req - La requête client, contenant l'ID du film et du réalisateur à lier.
 * @param {Response} res - La réponse à envoyer au client.
 */
exports.linkRealisateurToFilm = async (req, res) => {
  try {
    // console.log(req.body);
    const filmId = req.params.filmId;
    const realisateurId = req.body.realisateurId;
    await Film.linkRealisateur(filmId, realisateurId);
    res
      .status(201)
      .json({ message: "Realisateur linked to Film successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = exports;
