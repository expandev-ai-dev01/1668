CREATE OR ALTER PROCEDURE [functional].[spScanHistoryList]
AS
BEGIN
  SET NOCOUNT ON;

  SELECT
    [id],
    [operationDate],
    [directoryAnalyzed],
    [totalFilesAnalyzed],
    [totalFilesRemoved],
    [totalSpaceFreed],
    [criteriaUsed]
  FROM [functional].[scanHistory]
  ORDER BY [operationDate] DESC;
END;
GO
