// backend/controllers/auth.controller.js
const UtilisateurModel = require('../models/utilisateur.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Clé secrète pour JWT - à stocker dans un fichier d'environnement en production
const JWT_SECRET = 'mybikerent-secret-key';

exports.register = async (req, res) => {
  try {
    // Vérifier si l'email existe déjà
    const userExists = await UtilisateurModel.findByEmail(req.body.email);
    if (userExists) {
      return res.status(400).json({
        message: "Un compte avec cet email existe déjà"
      });
    }

    // Créer le nouvel utilisateur
    const userId = await UtilisateurModel.create({
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      motDePasse: req.body.motDePasse,
      role: req.body.role || 'Client' // Par défaut, le rôle est Client
    });

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      utilisateurId: userId
    });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la création du compte",
      error: err.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    // Rechercher l'utilisateur par email
    const user = await UtilisateurModel.findByEmail(req.body.email);
    if (!user) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect"
      });
    }

    // Vérifier le mot de passe
    const passwordIsValid = await bcrypt.compare(req.body.motDePasse, user.MotDePasse);
    if (!passwordIsValid) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect"
      });
    }

    // Créer le token JWT
    const token = jwt.sign(
      { id: user.UtilisateurID, role: user.Role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: "Connexion réussie",
      user: {
        id: user.UtilisateurID,
        nom: user.Nom,
        prenom: user.Prenom,
        email: user.Email,
        role: user.Role
      },
      token: token
    });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la connexion",
      error: err.message
    });
  }
};