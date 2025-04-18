USE [master]
GO
/****** Object:  Database [MyBikeRent]    Script Date: 12/04/2025 13:19:14 ******/
CREATE DATABASE [MyBikeRent]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'MyBikeRent', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\MyBikeRent.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'MyBikeRent_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\MyBikeRent_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [MyBikeRent] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [MyBikeRent].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [MyBikeRent] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [MyBikeRent] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [MyBikeRent] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [MyBikeRent] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [MyBikeRent] SET ARITHABORT OFF 
GO
ALTER DATABASE [MyBikeRent] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [MyBikeRent] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [MyBikeRent] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [MyBikeRent] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [MyBikeRent] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [MyBikeRent] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [MyBikeRent] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [MyBikeRent] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [MyBikeRent] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [MyBikeRent] SET  DISABLE_BROKER 
GO
ALTER DATABASE [MyBikeRent] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [MyBikeRent] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [MyBikeRent] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [MyBikeRent] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [MyBikeRent] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [MyBikeRent] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [MyBikeRent] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [MyBikeRent] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [MyBikeRent] SET  MULTI_USER 
GO
ALTER DATABASE [MyBikeRent] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [MyBikeRent] SET DB_CHAINING OFF 
GO
ALTER DATABASE [MyBikeRent] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [MyBikeRent] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [MyBikeRent] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [MyBikeRent] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [MyBikeRent] SET QUERY_STORE = ON
GO
ALTER DATABASE [MyBikeRent] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [MyBikeRent]
GO
/****** Object:  DatabaseRole [RoleProprietaire]    Script Date: 12/04/2025 13:19:14 ******/
CREATE ROLE [RoleProprietaire]
GO
/****** Object:  DatabaseRole [RoleClient]    Script Date: 12/04/2025 13:19:14 ******/
CREATE ROLE [RoleClient]
GO
/****** Object:  DatabaseRole [RoleAdmin]    Script Date: 12/04/2025 13:19:14 ******/
CREATE ROLE [RoleAdmin]
GO
/****** Object:  Table [dbo].[Utilisateurs]    Script Date: 12/04/2025 13:19:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Utilisateurs](
	[UtilisateurID] [int] IDENTITY(1,1) NOT NULL,
	[Nom] [nvarchar](100) NOT NULL,
	[Prenom] [nvarchar](100) NOT NULL,
	[Email] [nvarchar](100) NOT NULL,
	[MotDePasse] [nvarchar](255) NOT NULL,
	[Role] [nvarchar](50) NOT NULL,
	[DateInscription] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[UtilisateurID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Avis]    Script Date: 12/04/2025 13:19:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Avis](
	[AvisID] [int] IDENTITY(1,1) NOT NULL,
	[ReservationID] [int] NOT NULL,
	[UtilisateurID] [int] NOT NULL,
	[Note] [int] NULL,
	[Commentaire] [nvarchar](500) NULL,
	[DateAvis] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[AvisID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[V_UtilisateursLesMieuxNotes]    Script Date: 12/04/2025 13:19:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Vue des utilisateurs les mieux notés
CREATE VIEW [dbo].[V_UtilisateursLesMieuxNotes] AS
SELECT u.UtilisateurID, u.Nom, u.Prenom, AVG(a.Note) AS NoteMoyenne
FROM Utilisateurs u
JOIN Avis a ON u.UtilisateurID = a.UtilisateurID
GROUP BY u.UtilisateurID, u.Nom, u.Prenom;
GO
/****** Object:  Table [dbo].[Paiements]    Script Date: 12/04/2025 13:19:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Paiements](
	[PaiementID] [int] IDENTITY(1,1) NOT NULL,
	[ReservationID] [int] NOT NULL,
	[Montant] [decimal](10, 2) NOT NULL,
	[DatePaiement] [datetime] NULL,
	[MethodePaiement] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[PaiementID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[V_RevenusParMois]    Script Date: 12/04/2025 13:19:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Vue des revenus par mois
CREATE VIEW [dbo].[V_RevenusParMois] AS
SELECT YEAR(p.DatePaiement) AS Annee, MONTH(p.DatePaiement) AS Mois, SUM(p.Montant) AS Revenus
FROM Paiements p
GROUP BY YEAR(p.DatePaiement), MONTH(p.DatePaiement);
GO
/****** Object:  Table [dbo].[Motos]    Script Date: 12/04/2025 13:19:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Motos](
	[MotoID] [int] IDENTITY(1,1) NOT NULL,
	[UtilisateurID] [int] NOT NULL,
	[Marque] [nvarchar](50) NOT NULL,
	[Modele] [nvarchar](50) NOT NULL,
	[Annee] [int] NULL,
	[PrixLocation] [decimal](10, 2) NOT NULL,
	[Disponibilite] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[MotoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reservations]    Script Date: 12/04/2025 13:19:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reservations](
	[ReservationID] [int] IDENTITY(1,1) NOT NULL,
	[UtilisateurID] [int] NOT NULL,
	[MotoID] [int] NOT NULL,
	[DateDebut] [datetime] NOT NULL,
	[DateFin] [datetime] NOT NULL,
	[Statut] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[ReservationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[V_MotosLesPlusLouees]    Script Date: 12/04/2025 13:19:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Vue des motos les plus louées
CREATE VIEW [dbo].[V_MotosLesPlusLouees] AS
SELECT m.MotoID, m.Marque, m.Modele, COUNT(r.ReservationID) AS NombreReservations
FROM Motos m
LEFT JOIN Reservations r ON m.MotoID = r.MotoID
GROUP BY m.MotoID, m.Marque, m.Modele
HAVING COUNT(r.ReservationID) > 0;
GO
/****** Object:  Index [IDX_Avis_Note]    Script Date: 12/04/2025 13:19:14 ******/
CREATE NONCLUSTERED INDEX [IDX_Avis_Note] ON [dbo].[Avis]
(
	[Note] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IDX_Motos_PrixLocation]    Script Date: 12/04/2025 13:19:14 ******/
CREATE NONCLUSTERED INDEX [IDX_Motos_PrixLocation] ON [dbo].[Motos]
(
	[PrixLocation] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IDX_Reservations_DateDebut]    Script Date: 12/04/2025 13:19:14 ******/
CREATE NONCLUSTERED INDEX [IDX_Reservations_DateDebut] ON [dbo].[Reservations]
(
	[DateDebut] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Avis] ADD  DEFAULT (getdate()) FOR [DateAvis]
GO
ALTER TABLE [dbo].[Motos] ADD  DEFAULT ((1)) FOR [Disponibilite]
GO
ALTER TABLE [dbo].[Paiements] ADD  DEFAULT (getdate()) FOR [DatePaiement]
GO
ALTER TABLE [dbo].[Reservations] ADD  DEFAULT ('En attente') FOR [Statut]
GO
ALTER TABLE [dbo].[Utilisateurs] ADD  DEFAULT (getdate()) FOR [DateInscription]
GO
ALTER TABLE [dbo].[Avis]  WITH CHECK ADD  CONSTRAINT [FK_Avis_Reservations] FOREIGN KEY([ReservationID])
REFERENCES [dbo].[Reservations] ([ReservationID])
GO
ALTER TABLE [dbo].[Avis] CHECK CONSTRAINT [FK_Avis_Reservations]
GO
ALTER TABLE [dbo].[Avis]  WITH CHECK ADD  CONSTRAINT [FK_Avis_Utilisateurs] FOREIGN KEY([UtilisateurID])
REFERENCES [dbo].[Utilisateurs] ([UtilisateurID])
GO
ALTER TABLE [dbo].[Avis] CHECK CONSTRAINT [FK_Avis_Utilisateurs]
GO
ALTER TABLE [dbo].[Motos]  WITH CHECK ADD  CONSTRAINT [FK_Motos_Utilisateurs] FOREIGN KEY([UtilisateurID])
REFERENCES [dbo].[Utilisateurs] ([UtilisateurID])
GO
ALTER TABLE [dbo].[Motos] CHECK CONSTRAINT [FK_Motos_Utilisateurs]
GO
ALTER TABLE [dbo].[Paiements]  WITH CHECK ADD  CONSTRAINT [FK_Paiements_Reservations] FOREIGN KEY([ReservationID])
REFERENCES [dbo].[Reservations] ([ReservationID])
GO
ALTER TABLE [dbo].[Paiements] CHECK CONSTRAINT [FK_Paiements_Reservations]
GO
ALTER TABLE [dbo].[Reservations]  WITH CHECK ADD  CONSTRAINT [FK_Reservations_Motos] FOREIGN KEY([MotoID])
REFERENCES [dbo].[Motos] ([MotoID])
GO
ALTER TABLE [dbo].[Reservations] CHECK CONSTRAINT [FK_Reservations_Motos]
GO
ALTER TABLE [dbo].[Reservations]  WITH CHECK ADD  CONSTRAINT [FK_Reservations_Utilisateurs] FOREIGN KEY([UtilisateurID])
REFERENCES [dbo].[Utilisateurs] ([UtilisateurID])
GO
ALTER TABLE [dbo].[Reservations] CHECK CONSTRAINT [FK_Reservations_Utilisateurs]
GO
ALTER TABLE [dbo].[Avis]  WITH CHECK ADD CHECK  (([Note]>=(1) AND [Note]<=(5)))
GO
/****** Object:  StoredProcedure [dbo].[sp_GererPaiement]    Script Date: 12/04/2025 13:19:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Procédure pour gérer le paiement d'une réservation
CREATE PROCEDURE [dbo].[sp_GererPaiement]
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
/****** Object:  StoredProcedure [dbo].[sp_ReserverMoto]    Script Date: 12/04/2025 13:19:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Procédure pour réserver une moto
CREATE PROCEDURE [dbo].[sp_ReserverMoto]
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
USE [master]
GO
ALTER DATABASE [MyBikeRent] SET  READ_WRITE 
GO
