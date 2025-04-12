# MyBikeRent - Système de location de motos

MyBikeRent est une application de gestion de location de motos permettant aux propriétaires de mettre leurs motos en location et aux clients de les réserver.

## Structure du projet

```
MyBikeRent/
│
├── MyBikeRent.sql            # Script SQL complet de création de la base de données
├── README.md                 # Ce fichier d'information
│
├── Backups/
│   └── MyBikeRent.bak        # Fichier de sauvegarde de la base de données
│
└── SQL/                      # Scripts SQL séparés par fonctionnalité
    ├── BackupEtRestauration.sql   # Scripts pour sauvegarder et restaurer la base de données
    ├── CreationBddEtTables.sql    # Création des tables de la base de données
    ├── CreationProcedures.sql     # Procédures stockées pour les opérations courantes
    ├── CreationTriggers.sql       # Triggers pour la gestion des contraintes d'intégrité
    ├── CreationVues.sql           # Vues pour les rapports et statistiques
    ├── InsertionDonneesTests.sql  # Données de test pour le développement
    ├── Maintenance.sql            # Scripts de maintenance pour la base de données
    └── RolesEtAttributions.sql    # Définition des rôles utilisateurs et permissions
```

## Description des fichiers

### Scripts SQL principaux

- **MyBikeRent.sql** : Script complet généré par SQL Server contenant toute la structure de la base de données, incluant tables, vues, procédures stockées, contraintes, etc.

### Dossier SQL/

- **CreationBddEtTables.sql** : Définit la structure principale de la base de données avec les tables suivantes :
  - Utilisateurs (clients, propriétaires, administrateurs)
  - Motos (véhicules disponibles à la location)
  - Réservations (demandes de location)
  - Paiements (transactions financières)
  - Avis (commentaires et notes des clients)

- **CreationProcedures.sql** : Contient les procédures stockées :
  - sp_ReserverMoto : Pour créer une nouvelle réservation
  - sp_GererPaiement : Pour traiter les paiements des réservations

- **CreationTriggers.sql** : Définit les triggers pour maintenir l'intégrité des données :
  - trg_PrevenirSuppressionUtilisateur : Empêche la suppression d'un utilisateur ayant des réservations actives

- **CreationVues.sql** : Contient des vues pour les rapports et statistiques :
  - V_MotosLesPlusLouees : Liste des motos avec le nombre de réservations
  - V_UtilisateursLesMieuxNotes : Classement des utilisateurs par note moyenne
  - V_RevenusParMois : Récapitulatif des revenus mensuels

- **InsertionDonneesTests.sql** : Contient des données de test pour le développement et les tests, avec création d'index pour optimiser les recherches.

- **RolesEtAttributions.sql** : Définit les rôles utilisateurs et leurs permissions :
  - RoleAdmin : Contrôle total sur la base de données
  - RoleClient : Permissions limitées pour effectuer des réservations et donner des avis
  - RoleProprietaire : Droits pour gérer leurs motos mises en location

- **BackupEtRestauration.sql** : Scripts pour sauvegarder et restaurer la base de données.

- **Maintenance.sql** : Scripts pour la maintenance régulière de la base de données (réindexation).

## Architecture de la base de données

### Tables principales

1. **Utilisateurs** : Stocke les informations des utilisateurs (clients, propriétaires, administrateurs)
   - UtilisateurID, Nom, Prenom, Email, MotDePasse, Role, DateInscription

2. **Motos** : Informations sur les motos disponibles à la location
   - MotoID, UtilisateurID (propriétaire), Marque, Modele, Annee, PrixLocation, Disponibilite

3. **Reservations** : Gère les demandes de location
   - ReservationID, UtilisateurID (client), MotoID, DateDebut, DateFin, Statut

4. **Paiements** : Enregistre les transactions financières
   - PaiementID, ReservationID, Montant, DatePaiement, MethodePaiement

5. **Avis** : Commentaires et notes des clients
   - AvisID, ReservationID, UtilisateurID, Note, Commentaire, DateAvis

## Configuration requise

- SQL Server 2022 ou plus récent
- Espace disque suffisant pour la base de données et ses sauvegardes

## Installation et configuration

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/PlasmaMWK/MyBikeRent.git
   cd ./MyBikeRent
   ```

2. **Créer la base de données**
   
   **Option 1 : Utiliser le script complet**
   - Ouvrir SQL Server Management Studio (SSMS)
   - Se connecter à votre instance SQL Server
   - Ouvrir le fichier `MyBikeRent.sql`
   - Exécuter le script pour créer la base de données et tous ses objets

   **Option 2 : Utiliser les scripts séparés**
   - Ouvrir SQL Server Management Studio (SSMS)
   - Se connecter à votre instance SQL Server
   - Créer une nouvelle base de données nommée `MyBikeRent`
   - Exécuter les scripts suivants dans l'ordre :
     1. `SQL/CreationBddEtTables.sql`
     2. `SQL/CreationVues.sql`
     3. `SQL/CreationProcedures.sql`
     4. `SQL/CreationTriggers.sql`
     5. `SQL/RolesEtAttributions.sql`
     6. `SQL/InsertionDonneesTests.sql` (optionnel, pour les tests)

   **Option 3 : Restaurer depuis la sauvegarde**
   - Ouvrir SQL Server Management Studio (SSMS)
   - Se connecter à votre instance SQL Server
   - Utiliser le script dans `SQL/BackupEtRestauration.sql` pour restaurer la base depuis le fichier de sauvegarde `Backups/MyBikeRent.bak`
   - Ajuster les chemins de fichiers selon votre installation

3. **Configurer les accès utilisateurs**
   - Créer les utilisateurs SQL correspondant aux rôles définis dans `RolesEtAttributions.sql`
   - Assigner les rôles aux utilisateurs selon leurs besoins d'accès

## Utilisation

### Administration
- Utiliser le compte administrateur pour gérer les utilisateurs, motos et réservations
- Maintenir la base de données en exécutant régulièrement les scripts de maintenance

### Propriétaires de motos
- Enregistrer de nouvelles motos à louer
- Gérer les disponibilités et tarifs des motos
- Suivre les réservations et revenus générés

### Clients
- Parcourir les motos disponibles à la location
- Effectuer des réservations pour les dates souhaitées
- Laisser des avis après utilisation

## Maintenance

- Exécuter régulièrement le script `SQL/Maintenance.sql` pour optimiser les performances
- Créer des sauvegardes régulières avec le script `SQL/BackupEtRestauration.sql`

## Développement

Pour étendre le projet, vous pouvez :
- Ajouter de nouvelles tables pour des fonctionnalités supplémentaires
- Créer des procédures stockées pour de nouvelles opérations
- Développer une interface utilisateur (web ou application) connectée à cette base de données

