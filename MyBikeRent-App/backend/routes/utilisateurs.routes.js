// backend/routes/utilisateurs.routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');

// Contrôleur à créer plus tard
// const utilisateurController = require('../controllers/utilisateur.controller');

// Route temporaire pour éviter les erreurs
router.get('/', (req, res) => {
  res.status(200).json({ message: "Route des utilisateurs opérationnelle" });
});

module.exports = router;