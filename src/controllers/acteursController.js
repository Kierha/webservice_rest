// Importation du modèle d'acteur
const Acteur = require("../models/acteur");

/**
 * Récupère tous les acteurs.
 * @async
 * @function
 * @param {Request} req - Objet de la requête.
 * @param {Response} res - Objet de la réponse.
 */
exports.getAllActeurs = async (req, res) => {
  try {
    const acteurs = await Acteur.getAll();
    res.status(200).json(acteurs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Récupère un acteur par son ID.
 * @async
 * @function
 * @param {Request} req - Objet de la requête.
 * @param {Response} res - Objet de la réponse.
 */
exports.getActeurById = async (req, res) => {
  try {
    const acteur = await Acteur.getById(req.params.id);
    if (!acteur) {
      res.status(404).json({ message: "Acteur not found" });
    } else {
      res.status(200).json(acteur);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Crée un nouvel acteur.
 * @async
 * @function
 * @param {Request} req - Objet de la requête.
 * @param {Response} res - Objet de la réponse.
 */
exports.createActeur = async (req, res) => {
  try {
    const { nom, prenom, date_de_naissance } = req.body;
    const newActeur = await Acteur.create(nom, prenom, date_de_naissance);
    res.status(201).json(newActeur);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Met à jour un acteur existant par son ID.
 * @async
 * @function
 * @param {Request} req - Objet de la requête.
 * @param {Response} res - Objet de la réponse.
 */
exports.updateActeur = async (req, res) => {
  try {
    const { nom, prenom, date_de_naissance } = req.body;
    const acteurToUpdate = new Acteur(
      req.params.id,
      nom,
      prenom,
      date_de_naissance
    );
    const updatedRows = await acteurToUpdate.update();
    if (updatedRows === 0) {
      res.status(404).json({ message: "Acteur not found" });
    } else {
      res.status(200).json(acteurToUpdate);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Supprime un acteur par son ID.
 * @async
 * @function
 * @param {Request} req - Objet de la requête.
 * @param {Response} res - Objet de la réponse.
 */
exports.deleteActeur = async (req, res) => {
  try {
    const acteurToDelete = new Acteur(req.params.id);
    const deletedRows = await acteurToDelete.delete();
    if (deletedRows === 0) {
      res.status(404).json({ message: "Acteur not found" });
    } else {
      res.status(204).json({ message: "Acteur deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = exports;
