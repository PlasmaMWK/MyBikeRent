// backend/models/moto.model.js
const sql = require('mssql');
const dbConfig = require('../config/db.config');

class MotoModel {
  async getAllMotos() {
    try {
      await sql.connect(dbConfig);
      const result = await sql.query`
        SELECT 
          m.MotoID, 
          m.Marque, 
          m.Modele, 
          m.Annee, 
          m.PrixLocation, 
          m.Disponibilite,
          u.Nom as NomProprietaire, 
          u.Prenom as PrenomProprietaire
        FROM Motos m
        JOIN Utilisateurs u ON m.UtilisateurID = u.UtilisateurID
        WHERE m.Disponibilite = 1
        ORDER BY m.Marque, m.Modele
      `;
      return result.recordset;
    } catch (err) {
      console.error('Erreur lors de la récupération des motos:', err);
      throw err;
    } finally {
      sql.close();
    }
  }

  async getMotoById(motoId) {
    try {
      await sql.connect(dbConfig);
      const result = await sql.query`
        SELECT 
          m.MotoID, 
          m.Marque, 
          m.Modele, 
          m.Annee, 
          m.PrixLocation, 
          m.Disponibilite,
          u.Nom as NomProprietaire, 
          u.Prenom as PrenomProprietaire
        FROM Motos m
        JOIN Utilisateurs u ON m.UtilisateurID = u.UtilisateurID
        WHERE m.MotoID = ${motoId}
      `;
      return result.recordset[0];
    } catch (err) {
      console.error(`Erreur lors de la récupération de la moto ID ${motoId}:`, err);
      throw err;
    } finally {
      sql.close();
    }
  }
}

module.exports = new MotoModel();