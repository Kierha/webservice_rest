const { pool } = require("../database/connection");

/**
 * Classe représentant un film.
 */
class Film {
  /**
   * Crée un nouveau film.
   * @param {number} id - L'ID du film.
   * @param {string} nom - Le nom du film.
   * @param {string} description - La description du film.
   * @param {Date|string} date_de_parution - La date de parution du film.
   */
  constructor(id, nom, description, date_de_parution) {
    this.id = id;
    this.nom = nom;
    this.description = description;
    this.date_de_parution = date_de_parution;
  }

  // CRUD Operations

  /**
   * Crée un nouveau film dans la base de données.
   * @param {string} nom - Le nom du film.
   * @param {string} description - La description du film.
   * @param {Date|string} date_de_parution - La date de parution du film.
   * @returns {Film} Le film créé.
   * @throws {Error} Si une erreur survient lors de la création.
   */
  static async create(nom, description, date_de_parution) {
    try {
      const result = await pool.query(
        "INSERT INTO films (nom, description, date_de_parution) VALUES (?, ?, ?)",
        [nom, description, date_de_parution]
      );
      return new Film(result.insertId, nom, description, date_de_parution);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Récupère un film par son ID.
   * @param {number} id - L'ID du film.
   * @returns {Film|null} Le film trouvé ou null si non trouvé.
   * @throws {Error} Si une erreur survient lors de la récupération.
   */
  static async getById(id) {
    try {
      const rows = await pool.query("SELECT * FROM films WHERE id = ?", [id]);
      if (rows.length === 0) {
        return null;
      }
      return new Film(
        rows[0].id,
        rows[0].nom,
        rows[0].description,
        rows[0].date_de_parution
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Récupère tous les films (limité par le paramètre "limit").
   * @param {number} [limit=20] - Le nombre maximum de films à récupérer.
   * @param {number[]} [acteurs=[]] - Liste des ID des acteurs selon laquelle faire la recherche.
   * @param {number[]} [realisateurs=[]] - Liste des ID des réalisateurs selon laquelle faire la recherche.
   * @returns {Film[]} Les films récupérés.
   * @throws {Error} Si une erreur survient lors de la récupération.
   */
  static async getAll(limit = 20, acteurs = [], realisateurs = []) {
    try {
      let query = "SELECT DISTINCT films.* FROM films";
      let params = [];

      if (acteurs.length > 0) {
        query +=
          " JOIN films_acteurs ON films.id = films_acteurs.film_id WHERE films_acteurs.acteur_id IN (?)";
        params.push(acteurs);
      }

      if (realisateurs.length > 0) {
        if (acteurs.length > 0) {
          query +=
            " AND films.id IN (SELECT film_id FROM films_realisateurs WHERE realisateur_id IN (?))";
        } else {
          query +=
            " JOIN films_realisateurs ON films.id = films_realisateurs.film_id WHERE films_realisateurs.realisateur_id IN (?)";
        }
        params.push(realisateurs);
      }

      query += " LIMIT ?";
      params.push(limit);

      const rows = await pool.query(query, params);
      return rows.map(
        (row) =>
          new Film(row.id, row.nom, row.description, row.date_de_parution)
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Met à jour le film dans la base de données.
   * @returns {number} Le nombre de lignes affectées.
   * @throws {Error} Si une erreur survient lors de la mise à jour.
   */
  async update() {
    try {
      const result = await pool.query(
        "UPDATE films SET nom = ?, description = ?, date_de_parution = ? WHERE id = ?",
        [this.nom, this.description, this.date_de_parution, this.id]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Supprime le film de la base de données.
   * @returns {number} Le nombre de lignes affectées.
   * @throws {Error} Si une erreur survient lors de la suppression.
   */
  async delete() {
    try {
      const result = await pool.query("DELETE FROM films WHERE id = ?", [
        this.id,
      ]);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lie un acteur à un film.
   * @param {number} filmId - L'ID du film.
   * @param {number} acteurId - L'ID de l'acteur.
   * @throws {Error} Si une erreur survient lors de la liaison.
   */
  static async linkActeur(filmId, acteurId) {
    try {
      await pool.query(
        "INSERT INTO films_acteurs (film_id, acteur_id) VALUES (?, ?)",
        [filmId, acteurId]
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lie un réalisateur à un film.
   * @param {number} filmId - L'ID du film.
   * @param {number} realisateurId - L'ID du réalisateur.
   * @throws {Error} Si une erreur survient lors de la liaison.
   */
  static async linkRealisateur(filmId, realisateurId) {
    try {
      await pool.query(
        "INSERT INTO films_realisateurs (film_id, realisateur_id) VALUES (?, ?)",
        [filmId, realisateurId]
      );
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Film;
