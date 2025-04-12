// backend/middleware/auth.middleware.js
const jwt = require('jsonwebtoken');

// Clé secrète pour JWT - doit correspondre à celle utilisée lors de la création
const JWT_SECRET = 'mybikerent-secret-key';

// Middleware pour vérifier le token JWT
exports.verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  
  if (!token) {
    return res.status(403).json({ message: "Aucun token fourni" });
  }

  // Enlever "Bearer" si présent
  const tokenValue = token.startsWith('Bearer ') ? token.slice(7) : token;

  try {
    const decoded = jwt.verify(tokenValue, JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Non autorisé! Token invalide" });
  }
};

// Middleware pour vérifier les rôles
exports.isAdmin = (req, res, next) => {
  if (req.userRole === 'Admin') {
    next();
  } else {
    return res.status(403).json({ message: "Accès refusé. Rôle Admin requis." });
  }
};

exports.isProprietaire = (req, res, next) => {
  if (req.userRole === 'Proprietaire' || req.userRole === 'Admin') {
    next();
  } else {
    return res.status(403).json({ message: "Accès refusé. Rôle Propriétaire ou Admin requis." });
  }
};

exports.isClient = (req, res, next) => {
  if (req.userRole === 'Client' || req.userRole === 'Proprietaire' || req.userRole === 'Admin') {
    next();
  } else {
    return res.status(403).json({ message: "Accès refusé. Rôle Client, Propriétaire ou Admin requis." });
  }
};