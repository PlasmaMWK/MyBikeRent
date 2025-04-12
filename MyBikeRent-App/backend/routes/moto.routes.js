// backend/routes/motos.routes.js
const express = require('express');
const router = express.Router();
const motoController = require('../controllers/moto.controller');

// Récupérer toutes les motos disponibles
router.get('/', motoController.findAll);

// Récupérer une moto spécifique par ID
router.get('/:id', motoController.findOne);

module.exports = router;