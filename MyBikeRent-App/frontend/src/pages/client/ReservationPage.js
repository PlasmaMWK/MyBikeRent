// frontend/src/pages/client/ReservationPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ReservationPage = () => {
  const { motoId } = useParams();
  const navigate = useNavigate();
  
  const [moto, setMoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [dateDebut, setDateDebut] = useState(new Date().toISOString().split('T')[0]);
  const [dateFin, setDateFin] = useState(new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0]);
  const [nombreJours, setNombreJours] = useState(1);
  const [montantTotal, setMontantTotal] = useState(0);
  
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    // Simuler la récupération des détails de la moto par ID
    setLoading(true);
    
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

      const motoTrouvee = motosData.find(m => m.MotoID === parseInt(motoId));
      
      if (motoTrouvee) {
        setMoto(motoTrouvee);
        setMontantTotal(motoTrouvee.PrixLocation); // Prix pour 1 jour par défaut
      } else {
        setError('Moto non trouvée');
      }
      
      setLoading(false);
    }, 1000);

    // Version avec l'API réelle - à décommenter quand l'API sera prête
    /*
    const fetchMotoDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/motos/${motoId}`);
        setMoto(response.data);
        setMontantTotal(response.data.PrixLocation); // Prix pour 1 jour par défaut
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des détails de la moto');
        setLoading(false);
        console.error(err);
      }
    };

    fetchMotoDetails();
    */
  }, [motoId]);

  useEffect(() => {
    // Calculer le nombre de jours et le montant total
    if (dateDebut && dateFin && moto) {
      const date1 = new Date(dateDebut);
      const date2 = new Date(dateFin);
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      setNombreJours(diffDays || 1); // Minimum 1 jour
      setMontantTotal((diffDays || 1) * moto.PrixLocation);
    }
  }, [dateDebut, dateFin, moto]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token || !user) {
      navigate('/login', { state: { from: `/reservation/${motoId}` } });
      return;
    }

    // Simuler la création d'une réservation
    alert('Réservation créée avec succès!');
    navigate('/');

    // Version avec l'API réelle - à décommenter quand l'API sera prête
    /*
    try {
      await axios.post(
        'http://localhost:3001/api/reservations',
        {
          utilisateurId: user.id,
          motoId: motoId,
          dateDebut: dateDebut,
          dateFin: dateFin
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      navigate('/reservations/success');
    } catch (err) {
      setError('Erreur lors de la réservation');
      console.error(err);
    }
    */
  };

  if (loading) return <div className="loading">Chargement des détails...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!moto) return <div className="error">Moto non trouvée</div>;

  return (
    <div className="reservation-page">
      <h1>Réservation de moto</h1>
      
      <div className="moto-details">
        <h2>{moto.Marque} {moto.Modele} ({moto.Annee})</h2>
        <p><strong>Prix par jour:</strong> {moto.PrixLocation}€</p>
        <p><strong>Propriétaire:</strong> {moto.NomProprietaire} {moto.PrenomProprietaire}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="reservation-form">
        <div className="form-group">
          <label htmlFor="dateDebut">Date de début:</label>
          <input
            type="date"
            id="dateDebut"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="dateFin">Date de fin:</label>
          <input
            type="date"
            id="dateFin"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
            min={dateDebut}
            required
          />
        </div>
        
        <div className="reservation-summary">
          <h3>Récapitulatif</h3>
          <p><strong>Durée de location:</strong> {nombreJours} jour(s)</p>
          <p><strong>Montant total:</strong> {montantTotal}€</p>
        </div>
        
        <button type="submit" className="btn-reserve">Réserver</button>
      </form>
    </div>
  );
};

export default ReservationPage;