-- Exemple de plan de maintenance : r�indexation de toutes les tables
EXEC sp_MSforeachtable 'ALTER INDEX ALL ON ? REBUILD';
GO
