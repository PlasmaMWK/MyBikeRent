// frontend/src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // En mode développement, on simule la connexion
    // À remplacer par un vrai appel API en production
    if (email === 'client@example.com' && password === 'password') {
      const mockUserData = {
        id: 1,
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'client@example.com',
        role: 'Client'
      };
      
      // Stocker les données dans le localStorage
      localStorage.setItem('token', 'mock-token-client');
      localStorage.setItem('user', JSON.stringify(mockUserData));
      
      // Mettre à jour l'état utilisateur dans l'app
      setUser(mockUserData);
      
      // Rediriger vers la page d'accueil
      navigate('/');
      return;
    }
    
    if (email === 'proprio@example.com' && password === 'password') {
      const mockUserData = {
        id: 2,
        nom: 'Martin',
        prenom: 'Sophie',
        email: 'proprio@example.com',
        role: 'Proprietaire'
      };
      
      localStorage.setItem('token', 'mock-token-proprietaire');
      localStorage.setItem('user', JSON.stringify(mockUserData));
      setUser(mockUserData);
      navigate('/proprietaire/motos');
      return;
    }
    
    if (email === 'admin@example.com' && password === 'password') {
      const mockUserData = {
        id: 3,
        nom: 'Admin',
        prenom: 'Admin',
        email: 'admin@example.com',
        role: 'Admin'
      };
      
      localStorage.setItem('token', 'mock-token-admin');
      localStorage.setItem('user', JSON.stringify(mockUserData));
      setUser(mockUserData);
      navigate('/admin/dashboard');
      return;
    }

    // Version avec l'API réelle - à décommenter quand l'API sera prête
    /*
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email: email,
        motDePasse: password
      });

      // Stocker le token et les infos utilisateur dans localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Mettre à jour l'état utilisateur dans l'app
      setUser(response.data.user);

      // Rediriger en fonction du rôle
      switch (response.data.user.role) {
        case 'Admin':
          navigate('/admin/dashboard');
          break;
        case 'Proprietaire':
          navigate('/proprietaire/motos');
          break;
        case 'Client':
        default:
          navigate('/');
          break;
      }
    } catch (err) {
      setError('Email ou mot de passe incorrect');
      console.error(err);
    }
    */

    // Afficher une erreur si les identifiants ne correspondent pas
    setError('Email ou mot de passe incorrect');
  };

  return (
    <div className="login-page">
      <h1>Connexion</h1>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="btn-login">Se connecter</button>
      </form>
      
      <div className="auth-links">
        <p>
          Pas encore de compte? <Link to="/register">S'inscrire</Link>
        </p>
      </div>

      <div className="demo-accounts">
        <h3>Comptes de démonstration</h3>
        <p><strong>Client:</strong> client@example.com / password</p>
        <p><strong>Propriétaire:</strong> proprio@example.com / password</p>
        <p><strong>Admin:</strong> admin@example.com / password</p>
      </div>
    </div>
  );
};

export default LoginPage;