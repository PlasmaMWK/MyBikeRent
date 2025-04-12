-- Trigger pour empêcher la suppression d'un utilisateur possédant une réservation active
CREATE TRIGGER trg_PrevenirSuppressionUtilisateur
ON Utilisateurs
INSTEAD OF DELETE
AS
BEGIN
    IF EXISTS (
        SELECT 1
        FROM deleted d
        JOIN Reservations r ON d.UtilisateurID = r.UtilisateurID
        WHERE r.Statut IN ('En attente', 'Confirmée')
    )
    BEGIN
        RAISERROR ('Suppression impossible : l''utilisateur a une réservation active.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END

    DELETE FROM Utilisateurs
    WHERE UtilisateurID IN (SELECT UtilisateurID FROM deleted);
END;
GO
