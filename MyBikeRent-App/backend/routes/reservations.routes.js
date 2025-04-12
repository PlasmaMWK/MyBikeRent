// backend/routes/reservations.routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');

// Contrôleur à créer plus tard
// const reservationController = require('../controllers/reservation.controller');

// Route temporaire pour éviter les erreurs
router.get('/', (req, res) => {
  res.status(200).json({ message: "Route des réservations opérationnelle" });
});

module.exports = router;