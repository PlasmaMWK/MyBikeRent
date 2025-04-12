import React from 'react';
import { Navigate } from 'react-router-dom';

// Composant qui protège les routes nécessitant une authentification
const PrivateRoute = ({ children, requiredRole }) => {
  // Récupérer l'utilisateur du localStorage
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  
  // Vérifier si l'utilisateur est connecté
  if (!user) {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    return <Navigate to="/login" replace />;
  }

  // Si un rôle spécifique est requis, vérifier le rôle de l'utilisateur
  if (requiredRole && user.role !== requiredRole) {
    // Si l'utilisateur est Admin, il a accès à tout
    if (user.role === 'Admin') {
      return children;
    }
    
    // Si l'accès est réservé aux propriétaires et que l'utilisateur est client
    if (requiredRole === 'Proprietaire' && user.role === 'Client') {
      return <Navigate to="/" replace />;
    }
  }
  
  // Si tout est ok, afficher le contenu de la route
  return children;
};

export default PrivateRoute;