import React, { useState, useEffect } from 'react';

const MesMotosPage = () => {
  const [motos, setMotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    marque: '',
    modele: '',
    annee: new Date().getFullYear(),
    prixLocation: '',
    disponibilite: true
  });

  // Récupérer le token du localStorage
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    // Simuler le chargement des motos du propriétaire
    setTimeout(() => {
      // Données simulées pour le développement
      const motosData = [
        { 
          MotoID: 6, 
          Marque: 'Triumph', 
          Modele: 'Street Triple', 
          Annee: 2021, 
          PrixLocation: 70.00, 
          Disponibilite: true,
          DateAjout: '2023-05-15'
        },
        { 
          MotoID: 7, 
          Marque: 'KTM', 
          Modele: 'Duke 390', 
          Annee: 2022, 
          PrixLocation: 55.00, 
          Disponibilite: true,
          DateAjout: '2023-06-20'
        },
        { 
          MotoID: 8, 
          Marque: 'Suzuki', 
          Modele: 'GSX-R750', 
          Annee: 2020, 
          PrixLocation: 65.00, 
          Disponibilite: false,
          DateAjout: '2023-04-10'
        }
      ];

      setMotos(motosData);
      setLoading(false);
    }, 1000);

    // Version avec l'API réelle - à décommenter quand l'API sera prête
    /*
    const fetchMesMotos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/motos/proprietaire/${user.id}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        setMotos(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement de vos motos');
        setLoading(false);
        console.error(err);
      }
    };

    if (user && user.id) {
      fetchMesMotos();
    }
    */
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simuler l'ajout d'une moto
    const newMoto = {
      MotoID: Math.floor(Math.random() * 1000) + 10, // ID simulé
      Marque: formData.marque,
      Modele: formData.modele,
      Annee: formData.annee,
      PrixLocation: parseFloat(formData.prixLocation),
      Disponibilite: formData.disponibilite,
      DateAjout: new Date().toISOString().split('T')[0]
    };

    // Ajouter la nouvelle moto à la liste
    setMotos([...motos, newMoto]);
    
    // Réinitialiser le formulaire
    setFormData({
      marque: '',
      modele: '',
      annee: new Date().getFullYear(),
      prixLocation: '',
      disponibilite: true
    });
    
    // Cacher le formulaire
    setShowForm(false);

    // Version avec l'API réelle - à décommenter quand l'API sera prête
    /*
    try {
      // Ajouter une nouvelle moto
      const response = await axios.post(
        'http://localhost:5000/api/motos',
        {
          utilisateurId: user.id,
          marque: formData.marque,
          modele: formData.modele,
          annee: formData.annee,
          prixLocation: formData.prixLocation,
          disponibilite: formData.disponibilite
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      // Ajouter la nouvelle moto à la liste
      setMotos([...motos, response.data]);
      
      // Réinitialiser le formulaire
      setFormData({
        marque: '',
        modele: '',
        annee: new Date().getFullYear(),
        prixLocation: '',
        disponibilite: true
      });
      
      // Cacher le formulaire
      setShowForm(false);
    } catch (err) {
      setError('Erreur lors de l\'ajout de la moto');
      console.error(err);
    }
    */
  };

  const toggleDisponibilite = async (motoId) => {
    // Mettre à jour l'état des motos
    setMotos(motos.map(moto => 
      moto.MotoID === motoId 
        ? { ...moto, Disponibilite: !moto.Disponibilite } 
        : moto
    ));

    // Version avec l'API réelle - à décommenter quand l'API sera prête
    /*
    try {
      await axios.patch(
        `http://localhost:5000/api/motos/${motoId}/disponibilite`,
        {
          disponibilite: !motos.find(m => m.MotoID === motoId).Disponibilite
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
    } catch (err) {
      setError('Erreur lors de la mise à jour de la disponibilité');
      console.error(err);
    }
    */
  };

  if (loading) return <div className="loading">Chargement de vos motos...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="mes-motos-page">
      <h1>Mes Motos</h1>
      
      <button 
        className="btn-add-moto" 
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Annuler' : 'Ajouter une moto'}
      </button>
      
      {showForm && (
        <form onSubmit={handleSubmit} className="moto-form">
          <div className="form-group">
            <label htmlFor="marque">Marque:</label>
            <input
              type="text"
              id="marque"
              name="marque"
              value={formData.marque}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="modele">Modèle:</label>
            <input
              type="text"
              id="modele"
              name="modele"
              value={formData.modele}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="annee">Année:</label>
            <input
              type="number"
              id="annee"
              name="annee"
              value={formData.annee}
              onChange={handleChange}
              required
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="prixLocation">Prix de location (€/jour):</label>
            <input
              type="number"
              id="prixLocation"
              name="prixLocation"
              value={formData.prixLocation}
              onChange={handleChange}
              required
              min="1"
              step="0.01"
            />
          </div>
          
          <div className="form-group checkbox">
            <label htmlFor="disponibilite">
              <input
                type="checkbox"
                id="disponibilite"
                name="disponibilite"
                checked={formData.disponibilite}
                onChange={handleChange}
              />
              Disponible à la location
            </label>
          </div>
          
          <button type="submit" className="btn-submit">Ajouter la moto</button>
        </form>
      )}
      
      <div className="motos-list">
        {motos.length > 0 ? (
          motos.map(moto => (
            <div key={moto.MotoID} className="moto-item">
              <div className="moto-details">
                <h3>{moto.Marque} {moto.Modele} ({moto.Annee})</h3>
                <p><strong>Prix:</strong> {moto.PrixLocation}€ / jour</p>
                <p><strong>Statut:</strong> {moto.Disponibilite ? 'Disponible' : 'Non disponible'}</p>
                <p><strong>Ajoutée le:</strong> {moto.DateAjout}</p>
              </div>
              
              <div className="moto-actions">
                <button 
                  className={`btn-toggle ${moto.Disponibilite ? 'available' : 'unavailable'}`}
                  onClick={() => toggleDisponibilite(moto.MotoID)}
                >
                  {moto.Disponibilite ? 'Rendre indisponible' : 'Rendre disponible'}
                </button>
                <button className="btn-edit">Modifier</button>
                <button className="btn-view-reservations">Voir réservations</button>
              </div>
            </div>
          ))
        ) : (
          <p>Vous n'avez pas encore ajouté de motos</p>
        )}
      </div>

      <style jsx>{`
        .mes-motos-page {
          padding: 1rem;
        }
        
        .btn-add-moto {
          background-color: #4CAF50;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 4px;
          cursor: pointer;
          margin-bottom: 20px;
        }
        
        .moto-form {
          background: #f9f9f9;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
          border: 1px solid #ddd;
        }
        
        .motos-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .moto-item {
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .moto-details h3 {
          margin-top: 0;
          color: #333;
        }
        
        .moto-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .btn-toggle, .btn-edit, .btn-view-reservations {
          padding: 8px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        }
        
        .btn-toggle.available {
          background-color: #f44336;
          color: white;
        }
        
        .btn-toggle.unavailable {
          background-color: #4CAF50;
          color: white;
        }
        
        .btn-edit {
          background-color: #2196F3;
          color: white;
        }
        
        .btn-view-reservations {
          background-color: #FF9800;
          color: white;
        }
        
        @media (max-width: 768px) {
          .moto-item {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .moto-actions {
            margin-top: 15px;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default MesMotosPage;