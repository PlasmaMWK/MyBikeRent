

-- Table Utilisateurs
CREATE TABLE Utilisateurs (
    UtilisateurID INT IDENTITY(1,1) PRIMARY KEY,
    Nom NVARCHAR(100) NOT NULL,
    Prenom NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    MotDePasse NVARCHAR(255) NOT NULL,
    Role NVARCHAR(50) NOT NULL,
    DateInscription DATETIME DEFAULT GETDATE()
);
GO

-- Table Motos
CREATE TABLE Motos (
    MotoID INT IDENTITY(1,1) PRIMARY KEY,
    UtilisateurID INT NOT NULL,
    Marque NVARCHAR(50) NOT NULL,
    Modele NVARCHAR(50) NOT NULL,
    Annee INT,
    PrixLocation DECIMAL(10,2) NOT NULL,
    Disponibilite BIT DEFAULT 1,
    CONSTRAINT FK_Motos_Utilisateurs FOREIGN KEY (UtilisateurID) REFERENCES Utilisateurs(UtilisateurID)
);
GO

-- Table Réservations
CREATE TABLE Reservations (
    ReservationID INT IDENTITY(1,1) PRIMARY KEY,
    UtilisateurID INT NOT NULL, -- Client effectuant la réservation
    MotoID INT NOT NULL,
    DateDebut DATETIME NOT NULL,
    DateFin DATETIME NOT NULL,
    Statut NVARCHAR(50) DEFAULT 'En attente',
    CONSTRAINT FK_Reservations_Utilisateurs FOREIGN KEY (UtilisateurID) REFERENCES Utilisateurs(UtilisateurID),
    CONSTRAINT FK_Reservations_Motos FOREIGN KEY (MotoID) REFERENCES Motos(MotoID)
);
GO

-- Table Paiements
CREATE TABLE Paiements (
    PaiementID INT IDENTITY(1,1) PRIMARY KEY,
    ReservationID INT NOT NULL,
    Montant DECIMAL(10,2) NOT NULL,
    DatePaiement DATETIME DEFAULT GETDATE(),
    MethodePaiement NVARCHAR(50),
    CONSTRAINT FK_Paiements_Reservations FOREIGN KEY (ReservationID) REFERENCES Reservations(ReservationID)
);
GO

-- Table Avis
CREATE TABLE Avis (
    AvisID INT IDENTITY(1,1) PRIMARY KEY,
    ReservationID INT NOT NULL,
    UtilisateurID INT NOT NULL, -- Client qui laisse l'avis
    Note INT CHECK (Note BETWEEN 1 AND 5),
    Commentaire NVARCHAR(500),
    DateAvis DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_Avis_Reservations FOREIGN KEY (ReservationID) REFERENCES Reservations(ReservationID),
    CONSTRAINT FK_Avis_Utilisateurs FOREIGN KEY (UtilisateurID) REFERENCES Utilisateurs(UtilisateurID)
);
GO
