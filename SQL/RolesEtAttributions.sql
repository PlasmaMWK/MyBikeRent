-- Création des rôles
CREATE ROLE RoleAdmin;
CREATE ROLE RoleClient;
CREATE ROLE RoleProprietaire;
GO

-- Attribution de droits personnalisés pour le rôle Client
GRANT SELECT ON DATABASE::MyBikeRent TO RoleClient;
GRANT INSERT, UPDATE ON Reservations, Avis TO RoleClient;
GO

-- Attribution de droits pour le rôle Propriétaire (gestion des motos)
GRANT SELECT, INSERT, UPDATE, DELETE ON Motos TO RoleProprietaire;
GO

-- Le rôle Admin reçoit tous les droits sur la base
GRANT CONTROL ON DATABASE::MyBikeRent TO RoleAdmin;
GO
