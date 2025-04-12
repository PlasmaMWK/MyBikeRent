// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000; // Changé de 3001 à 5000

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const motosRoutes = require('./routes/moto.routes');
const utilisateursRoutes = require('./routes/utilisateurs.routes');
const reservationsRoutes = require('./routes/reservations.routes');
const authRoutes = require('./routes/auth.routes');

// Utilisation des routes
app.use('/api/motos', motosRoutes);
app.use('/api/utilisateurs', utilisateursRoutes);
app.use('/api/reservations', reservationsRoutes);
app.use('/api/auth', authRoutes);

// Route simple pour tester que le serveur fonctionne
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API MyBikeRent!' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}.`);
});