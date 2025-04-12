// backend/models/utilisateur.model.js
const sql = require('mssql');
const dbConfig = require('../config/db.config');
const bcrypt = require('bcrypt');

class UtilisateurModel {
  async findByEmail(email) {
    try {
      await sql.connect(dbConfig);
      const result = await sql.query`
        SELECT UtilisateurID, Nom, Prenom, Email, MotDePasse, Role
        FROM Utilisateurs
        WHERE Email = ${email}
      `;
      return result.recordset[0];
    } catch (err) {
      console.error('Erreur lors de la recherche de l\'utilisateur par email:', err);
      throw err;
    } finally {
      sql.close();
    }
  }

  async create(utilisateur) {
    try {
      // Hashage du mot de passe
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(utilisateur.motDePasse, salt);

      await sql.connect(dbConfig);
      const result = await sql.query`
        INSERT INTO Utilisateurs (Nom, Prenom, Email, MotDePasse, Role)
        VALUES (${utilisateur.nom}, ${utilisateur.prenom}, ${utilisateur.email}, ${hashedPassword}, ${utilisateur.role})
        
        SELECT SCOPE_IDENTITY() AS UtilisateurID
      `;
      
      return result.recordset[0].UtilisateurID;
    } catch (err) {
      console.error('Erreur lors de la création de l\'utilisateur:', err);
      throw err;
    } finally {
      sql.close();
    }
  }
}

module.exports = new UtilisateurModel();