-- Script de sauvegarde de la base de données
BACKUP DATABASE MyBikeRent
TO DISK = 'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\Backup\MyBikeRent.bak'
WITH FORMAT,
     MEDIANAME = 'MyBikeRentBackup',
     NAME = 'Full Backup of MyBikeRent';
GO

-- Exemple de script de restauration (à exécuter depuis la base master)
RESTORE DATABASE MyBikeRent
FROM DISK = 'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\Backup\MyBikeRent.bak'
WITH REPLACE;
GO
