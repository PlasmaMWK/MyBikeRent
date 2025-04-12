// frontend/src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [motos, setMotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simuler le chargement des motos disponibles depuis l'API
    // En production, remplacer par un vrai appel API
    setTimeout(() => {
      // Données simulées pour le développement
      const motosData = [
        { 
          MotoID: 1, 
          Marque: 'Honda', 
          Modele: 'CBR 600 RR', 
          Annee: 2022, 
          PrixLocation: 75.00, 
          Disponibilite: true,
          NomProprietaire: 'Durand', 
          PrenomProprietaire: 'Jean'
        },
        { 
          MotoID: 2, 
          Marque: 'Yamaha', 
          Modele: 'MT-07', 
          Annee: 2023, 
          PrixLocation: 60.00, 
          Disponibilite: true,
          NomProprietaire: 'Martin', 
          PrenomProprietaire: 'Sophie'
        },
        { 
          MotoID: 3, 
          Marque: 'Kawasaki', 
          Modele: 'Ninja 650', 
          Annee: 2021, 
          PrixLocation: 65.00, 
          Disponibilite: true,
          NomProprietaire: 'Dupont', 
          PrenomProprietaire: 'Marc'
        },
        { 
          MotoID: 4, 
          Marque: 'Ducati', 
          Modele: 'Monster 821', 
          Annee: 2022, 
          PrixLocation: 85.00, 
          Disponibilite: true,
          NomProprietaire: 'Leroy', 
          PrenomProprietaire: 'Julie'
        },
        { 
          MotoID: 5, 
          Marque: 'BMW', 
          Modele: 'S 1000 RR', 
          Annee: 2023, 
          PrixLocation: 95.00, 
          Disponibilite: true,
          NomProprietaire: 'Thomas', 
          PrenomProprietaire: 'Pierre'
        }
      ];

      setMotos(motosData);
      setLoading(false);
    }, 1000);

    // Version avec l'API réelle - à décommenter quand l'API sera prête
    // const fetchMotos = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:3001/api/motos');
    //     setMotos(response.data);
    //     setLoading(false);
    //   } catch (err) {
    //     setError('Erreur lors du chargement des motos');
    //     setLoading(false);
    //     console.error(err);
    //   }
    // };
    // fetchMotos();
  }, []);

  if (loading) return <div className="loading">Chargement des motos disponibles...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="homepage">
      <div className="hero">
        <h1>Bienvenue sur MyBikeRent</h1>
        <p>Trouvez et réservez facilement la moto de vos rêves</p>
      </div>

      <div className="search-container">
        <input 
          type="text" 
          placeholder="Rechercher par marque, modèle..." 
          className="search-input"
        />
        <button className="search-button">Rechercher</button>
      </div>
      
      <h2>Motos disponibles à la location</h2>
      <div className="motos-grid">
        {motos.length > 0 ? (
          motos.map(moto => (
            <div key={moto.MotoID} className="moto-card">
              <h3>{moto.Marque} {moto.Modele}</h3>
              <p>Année: {moto.Annee}</p>
              <p>Prix: {moto.PrixLocation}€ / jour</p>
              <p>Propriétaire: {moto.NomProprietaire} {moto.PrenomProprietaire}</p>
              <Link to={`/reservation/${moto.MotoID}`} className="btn-details">
                Réserver
              </Link>
            </div>
          ))
        ) : (
          <p>Aucune moto disponible actuellement</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;