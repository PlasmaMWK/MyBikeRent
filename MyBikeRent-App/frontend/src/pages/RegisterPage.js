// frontend/src/pages/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    confirmPassword: '',
    role: 'Client' // Par défaut, l'utilisateur s'inscrit en tant que client
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Vérifier que les mots de passe correspondent
    if (formData.motDePasse !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    // En mode développement, on simule l'inscription
    // À remplacer par un vrai appel API en production
    setSuccess('Inscription réussie! Vous allez être redirigé vers la page de connexion.');
    
    // Redirection après 2 secondes
    setTimeout(() => {
      navigate('/login');
    }, 2000);

    // Version avec l'API réelle - à décommenter quand l'API sera prête
    /*
    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        motDePasse: formData.motDePasse,
        role: formData.role
      });

      setSuccess('Inscription réussie! Vous allez être redirigé vers la page de connexion.');
      
      // Redirection après 2 secondes
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Erreur lors de l\'inscription');
      } else {
        setError('Erreur lors de l\'inscription');
      }
      console.error(err);
    }
    */
  };

  return (
    <div className="register-page">
      <h1>Créer un compte</h1>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="nom">Nom:</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="prenom">Prénom:</label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="motDePasse">Mot de passe:</label>
          <input
            type="password"
            id="motDePasse"
            name="motDePasse"
            value={formData.motDePasse}
            onChange={handleChange}
            required
            minLength="6"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmer le mot de passe:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength="6"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="role">Je souhaite m'inscrire en tant que:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="Client">Client</option>
            <option value="Proprietaire">Propriétaire de motos</option>
          </select>
          <p className="info-text">
            * Les comptes administrateurs sont créés uniquement par un administrateur existant
          </p>
        </div>
        
        <button type="submit" className="btn-register">S'inscrire</button>
      </form>
      
      <div className="auth-links">
        <p>
          Déjà un compte? <Link to="/login">Se connecter</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;