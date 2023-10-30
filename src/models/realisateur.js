const { pool } = require("../database/connection");

/**
 * Classe représentant un réalisateur.
 */
class Realisateur {
  /**
   * Crée un nouveau réalisateur.
   * @param {number} id - L'ID du réalisateur.
   * @param {string} nom - Le nom du réalisateur.
   * @param {string} prenom - Le prénom du réalisateur.
   * @param {Date|string} date_de_naissance - La date de naissance du réalisateur.
   */
  constructor(id, nom, prenom, date_de_naissance) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.date_de_naissance = date_de_naissance;
  }

  // CRUD Operations

  /**
   * Crée un nouveau réalisateur dans la base de données.
   * @param {string} nom - Le nom du réalisateur.
   * @param {string} prenom - Le prénom du réalisateur.
   * @param {Date|string} date_de_naissance - La date de naissance du réalisateur.
   * @returns {Realisateur} Le réalisateur créé.
   * @throws {Error} Si une erreur survient lors de la création.
   */
  static async create(nom, prenom, date_de_naissance) {
    try {
      const result = await pool.query(
        "INSERT INTO realisateurs (nom, prenom, date_de_naissance) VALUES (?, ?, ?)",
        [nom, prenom, date_de_naissance]
      );
      return new Realisateur(result.insertId, nom, prenom, date_de_naissance);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Récupère un réalisateur par son ID.
   * @param {number} id - L'ID du réalisateur.
   * @returns {Realisateur|null} Le réalisateur trouvé ou null si non trouvé.
   * @throws {Error} Si une erreur survient lors de la récupération.
   */
  static async getById(id) {
    try {
      const rows = await pool.query("SELECT * FROM realisateurs WHERE id = ?", [
        id,
      ]);
      if (rows.length === 0) {
        return null;
      }
      return new Realisateur(
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
   * Récupère tous les réalisateurs (limité par le paramètre "limit").
   * @param {number} [limit=20] - Le nombre maximum de réalisateurs à récupérer.
   * @returns {Realisateur[]} Les réalisateurs récupérés.
   * @throws {Error} Si une erreur survient lors de la récupération.
   */
  static async getAll(limit = 20) {
    try {
      const rows = await pool.query("SELECT * FROM realisateurs LIMIT ?", [
        limit,
      ]);
      return rows.map(
        (row) =>
          new Realisateur(row.id, row.nom, row.prenom, row.date_de_naissance)
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Met à jour le réalisateur dans la base de données.
   * @returns {number} Le nombre de lignes affectées.
   * @throws {Error} Si une erreur survient lors de la mise à jour.
   */
  async update() {
    try {
      const result = await pool.query(
        "UPDATE realisateurs SET nom = ?, prenom = ?, date_de_naissance = ? WHERE id = ?",
        [this.nom, this.prenom, this.date_de_naissance, this.id]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Supprime le réalisateur de la base de données.
   * @returns {number} Le nombre de lignes affectées.
   * @throws {Error} Si une erreur survient lors de la suppression.
   */
  async delete() {
    try {
      const result = await pool.query("DELETE FROM realisateurs WHERE id = ?", [
        this.id,
      ]);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Realisateur;
