-- Cr�ation des r�les
CREATE ROLE RoleAdmin;
CREATE ROLE RoleClient;
CREATE ROLE RoleProprietaire;
GO

-- Attribution de droits personnalis�s pour le r�le Client
GRANT SELECT ON DATABASE::MyBikeRent TO RoleClient;
GRANT INSERT, UPDATE ON Reservations, Avis TO RoleClient;
GO

-- Attribution de droits pour le r�le Propri�taire (gestion des motos)
GRANT SELECT, INSERT, UPDATE, DELETE ON Motos TO RoleProprietaire;
GO

-- Le r�le Admin re�oit tous les droits sur la base
GRANT CONTROL ON DATABASE::MyBikeRent TO RoleAdmin;
GO
