
-- Vue des motos les plus louées
CREATE VIEW V_MotosLesPlusLouees AS
SELECT m.MotoID, m.Marque, m.Modele, COUNT(r.ReservationID) AS NombreReservations
FROM Motos m
LEFT JOIN Reservations r ON m.MotoID = r.MotoID
GROUP BY m.MotoID, m.Marque, m.Modele
HAVING COUNT(r.ReservationID) > 0;
GO

-- Vue des utilisateurs les mieux notés
CREATE VIEW V_UtilisateursLesMieuxNotes AS
SELECT u.UtilisateurID, u.Nom, u.Prenom, AVG(a.Note) AS NoteMoyenne
FROM Utilisateurs u
JOIN Avis a ON u.UtilisateurID = a.UtilisateurID
GROUP BY u.UtilisateurID, u.Nom, u.Prenom;
GO

-- Vue des revenus par mois
CREATE VIEW V_RevenusParMois AS
SELECT YEAR(p.DatePaiement) AS Annee, MONTH(p.DatePaiement) AS Mois, SUM(p.Montant) AS Revenus
FROM Paiements p
GROUP BY YEAR(p.DatePaiement), MONTH(p.DatePaiement);
GO
