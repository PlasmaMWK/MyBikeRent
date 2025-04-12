-- Procédure pour réserver une moto
CREATE PROCEDURE sp_ReserverMoto
    @UtilisateurID INT,
    @MotoID INT,
    @DateDebut DATETIME,
    @DateFin DATETIME
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Reservations (UtilisateurID, MotoID, DateDebut, DateFin, Statut)
    VALUES (@UtilisateurID, @MotoID, @DateDebut, @DateFin, 'En attente');
END;
GO

-- Procédure pour gérer le paiement d'une réservation
CREATE PROCEDURE sp_GererPaiement
    @ReservationID INT,
    @Montant DECIMAL(10,2),
    @MethodePaiement NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Paiements (ReservationID, Montant, MethodePaiement)
    VALUES (@ReservationID, @Montant, @MethodePaiement);

    -- Mise à jour du statut de la réservation après paiement
    UPDATE Reservations
    SET Statut = 'Payée'
    WHERE ReservationID = @ReservationID;
END;
GO
