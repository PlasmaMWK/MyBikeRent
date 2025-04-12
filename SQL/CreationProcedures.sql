-- Proc�dure pour r�server une moto
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

-- Proc�dure pour g�rer le paiement d'une r�servation
CREATE PROCEDURE sp_GererPaiement
    @ReservationID INT,
    @Montant DECIMAL(10,2),
    @MethodePaiement NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Paiements (ReservationID, Montant, MethodePaiement)
    VALUES (@ReservationID, @Montant, @MethodePaiement);

    -- Mise � jour du statut de la r�servation apr�s paiement
    UPDATE Reservations
    SET Statut = 'Pay�e'
    WHERE ReservationID = @ReservationID;
END;
GO
