USE MyBikeRent
-- Insertion de quelques données de test dans Utilisateurs
INSERT INTO Utilisateurs (Nom, Prenom, Email, MotDePasse, Role)
VALUES 
('Dupont', 'Jean', 'jean.dupont@example.com', 'password123', 'Client'),
('Martin', 'Claire', 'claire.martin@example.com', 'password456', 'Propriétaire'),
('Admin', 'System', 'admin@mybikerent.com', 'adminpass', 'Admin');
GO

-- Insertion de données de test dans Motos
INSERT INTO Motos (UtilisateurID, Marque, Modele, Annee, PrixLocation)
VALUES
(2, 'Yamaha', 'MT-07', 2019, 50.00),
(2, 'Honda', 'CB500', 2020, 45.00);
GO

-- Insertion de données de test dans Reservations
INSERT INTO Reservations (UtilisateurID, MotoID, DateDebut, DateFin, Statut)
VALUES
(1, 1, '2025-05-01', '2025-05-05', 'Confirmée'),
(1, 2, '2025-06-10', '2025-06-15', 'En attente');
GO

-- Insertion d'un paiement pour la réservation confirmée
INSERT INTO Paiements (ReservationID, Montant, MethodePaiement)
VALUES
(1, 250.00, 'Carte Bancaire');
GO

-- Insertion d'un avis
INSERT INTO Avis (ReservationID, UtilisateurID, Note, Commentaire)
VALUES
(1, 1, 5, 'Très bonne expérience!');
GO

-- Création d'index pour optimiser les recherches
CREATE INDEX IDX_Motos_PrixLocation ON Motos(PrixLocation);
CREATE INDEX IDX_Reservations_DateDebut ON Reservations(DateDebut);
CREATE INDEX IDX_Avis_Note ON Avis(Note);
GO
