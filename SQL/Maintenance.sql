-- Exemple de plan de maintenance : réindexation de toutes les tables
EXEC sp_MSforeachtable 'ALTER INDEX ALL ON ? REBUILD';
GO
