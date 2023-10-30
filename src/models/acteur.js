const { pool } = require("../database/connection");

/**
 * Classe représentant un acteur.
 */
class Acteur {
  /**
   * Crée un nouvel acteur.
   * @param {number} id - L'ID de l'acteur.
   * @param {string} nom - Le nom de l'acteur.
   * @param {string} prenom - Le prénom de l'acteur.
   * @param {Date|string} date_de_naissance - La date de naissance de l'acteur.
   */
  constructor(id, nom, prenom, date_de_naissance) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.date_de_naissance = date_de_naissance;
  }

  // CRUD Operations

  /**
   * Crée un nouvel acteur dans la base de données.
   * @param {string} nom - Le nom de l'acteur.
   * @param {string} prenom - Le prénom de l'acteur.
   * @param {Date|string} date_de_naissance - La date de naissance de l'acteur.
   * @returns {Acteur} L'acteur créé.
   * @throws {Error} Si une erreur survient lors de la création.
   */
  static async create(nom, prenom, date_de_naissance) {
    try {
      const result = await pool.query(
        "INSERT INTO acteurs (nom, prenom, date_de_naissance) VALUES (?, ?, ?)",
        [nom, prenom, date_de_naissance]
      );
      return new Acteur(result.insertId, nom, prenom, date_de_naissance);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Récupère un acteur par son ID.
   * @param {number} id - L'ID de l'acteur.
   * @returns {Acteur|null} L'acteur trouvé ou null si non trouvé.
   * @throws {Error} Si une erreur survient lors de la récupération.
   */
  static async getById(id) {
    try {
      const rows = await pool.query("SELECT * FROM acteurs WHERE id = ?", [id]);
      if (rows.length === 0) {
        return null;
      }
      return new Acteur(
        rows[0].id,
        rows[0].nom,
        rows[0].prenom,
        rows[0].date_de_naissance
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Récupère tous les acteurs (limité par le paramètre "limit").
   * @param {number} [limit=20] - Le nombre maximum d'acteurs à récupérer.
   * @returns {Acteur[]} Les acteurs récupérés.
   * @throws {Error} Si une erreur survient lors de la récupération.
   */
  static async getAll(limit = 20) {
    try {
      const rows = await pool.query("SELECT * FROM acteurs LIMIT ?", [limit]);
      return rows.map(
        (row) => new Acteur(row.id, row.nom, row.prenom, row.date_de_naissance)
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Met à jour l'acteur dans la base de données.
   * @returns {number} Le nombre de lignes affectées.
   * @throws {Error} Si une erreur survient lors de la mise à jour.
   */
  async update() {
    try {
      const result = await pool.query(
        "UPDATE acteurs SET nom = ?, prenom = ?, date_de_naissance = ? WHERE id = ?",
        [this.nom, this.prenom, this.date_de_naissance, this.id]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Supprime l'acteur de la base de données.
   * @returns {number} Le nombre de lignes affectées.
   * @throws {Error} Si une erreur survient lors de la suppression.
   */
  async delete() {
    try {
      const result = await pool.query("DELETE FROM acteurs WHERE id = ?", [
        this.id,
      ]);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Acteur;
