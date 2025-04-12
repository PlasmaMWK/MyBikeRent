import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprimer les données d'authentification du localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Mettre à jour l'état de l'utilisateur
    setUser(null);
    
    // Rediriger vers la page d'accueil
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <h1>MyBikeRent</h1>
        </Link>
      </div>
      
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
          
          {user ? (
            // Menu pour les utilisateurs connectés
            <>
              {user.role === 'Proprietaire' && (
                <li>
                  <Link to="/proprietaire/motos">Mes Motos</Link>
                </li>
              )}
              
              {(user.role === 'Client' || user.role === 'Proprietaire' || user.role === 'Admin') && (
                <li>
                  <Link to="/reservations">Mes Réservations</Link>
                </li>
              )}
              
              {user.role === 'Admin' && (
                <li>
                  <Link to="/admin/dashboard">Administration</Link>
                </li>
              )}
              
              <li>
                <span className="user-welcome">Bonjour, {user.prenom}</span>
              </li>
              
              <li>
                <button onClick={handleLogout} className="btn-logout">
                  Déconnexion
                </button>
              </li>
            </>
          ) : (
            // Menu pour les visiteurs
            <>
              <li>
                <Link to="/login">Connexion</Link>
              </li>
              <li>
                <Link to="/register">Inscription</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;