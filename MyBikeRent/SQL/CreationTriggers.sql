-- Trigger pour emp�cher la suppression d'un utilisateur poss�dant une r�servation active
CREATE TRIGGER trg_PrevenirSuppressionUtilisateur
ON Utilisateurs
INSTEAD OF DELETE
AS
BEGIN
    IF EXISTS (
        SELECT 1
        FROM deleted d
        JOIN Reservations r ON d.UtilisateurID = r.UtilisateurID
        WHERE r.Statut IN ('En attente', 'Confirm�e')
    )
    BEGIN
        RAISERROR ('Suppression impossible : l''utilisateur a une r�servation active.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END

    DELETE FROM Utilisateurs
    WHERE UtilisateurID IN (SELECT UtilisateurID FROM deleted);
END;
GO
