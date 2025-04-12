-- Script de sauvegarde de la base de donn�es
BACKUP DATABASE MyBikeRent
TO DISK = 'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\Backup\MyBikeRent.bak'
WITH FORMAT,
     MEDIANAME = 'MyBikeRentBackup',
     NAME = 'Full Backup of MyBikeRent';
GO

-- Exemple de script de restauration (� ex�cuter depuis la base master)
RESTORE DATABASE MyBikeRent
FROM DISK = 'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\Backup\MyBikeRent.bak'
WITH REPLACE;
GO
