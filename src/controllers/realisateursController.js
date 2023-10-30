// Importation du modèle Realisateur
const Realisateur = require("../models/realisateur");

/**
 * Récupère tous les réalisateurs.
 * @async
 * @function
 * @param {Request} req - La requête client.
 * @param {Response} res - La réponse à envoyer au client.
 */
exports.getAllRealisateurs = async (req, res) => {
  try {
    const realisateurs = await Realisateur.getAll();
    res.status(200).json(realisateurs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Récupère un réalisateur par son ID.
 * @async
 * @function
 * @param {Request} req - La requête client, contenant l'ID du réalisateur dans params.
 * @param {Response} res - La réponse à envoyer au client.
 */
exports.getRealisateurById = async (req, res) => {
  try {
    const realisateur = await Realisateur.getById(req.params.id);
    if (!realisateur) {
      res.status(404).json({ message: "Réalisateur not found" });
    } else {
      res.status(200).json(realisateur);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Crée un nouveau réalisateur.
 * @async
 * @function
 * @param {Request} req - La requête client, contenant les détails du réalisateur dans le body.
 * @param {Response} res - La réponse à envoyer au client.
 */
exports.createRealisateur = async (req, res) => {
  try {
    const { nom, prenom, date_de_naissance } = req.body;
    const newRealisateur = await Realisateur.create(
      nom,
      prenom,
      date_de_naissance
    );
    res.status(201).json(newRealisateur);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Met à jour un réalisateur existant par son ID.
 * @async
 * @function
 * @param {Request} req - La requête client, contenant l'ID du réalisateur et les détails à mettre à jour.
 * @param {Response} res - La réponse à envoyer au client.
 */
exports.updateRealisateur = async (req, res) => {
  try {
    const { nom, prenom, date_de_naissance } = req.body;
    const realisateurToUpdate = new Realisateur(
      req.params.id,
      nom,
      prenom,
      date_de_naissance
    );
    const updatedRows = await realisateurToUpdate.update();
    if (updatedRows === 0) {
      res.status(404).json({ message: "Réalisateur not found" });
    } else {
      res.status(200).json(realisateurToUpdate);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Supprime un réalisateur par son ID.
 * @async
 * @function
 * @param {Request} req - La requête client, contenant l'ID du réalisateur à supprimer.
 * @param {Response} res - La réponse à envoyer au client.
 */
exports.deleteRealisateur = async (req, res) => {
  try {
    const realisateurToDelete = new Realisateur(req.params.id);
    const deletedRows = await realisateurToDelete.delete();
    if (deletedRows === 0) {
      res.status(404).json({ message: "Réalisateur not found" });
    } else {
      res.status(204).json({ message: "Réalisateur deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = exports;
