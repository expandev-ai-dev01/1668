CREATE OR ALTER PROCEDURE [functional].[spScanHistoryCreate]
  @directoryAnalyzed NVARCHAR(1024),
  @totalFilesAnalyzed INT,
  @totalFilesRemoved INT,
  @totalSpaceFreed BIGINT,
  @criteriaUsed NVARCHAR(MAX)
AS
BEGIN
  SET NOCOUNT ON;

  INSERT INTO [functional].[scanHistory] (
    [directoryAnalyzed],
    [totalFilesAnalyzed],
    [totalFilesRemoved],
    [totalSpaceFreed],
    [criteriaUsed]
  )
  VALUES (
    @directoryAnalyzed,
    @totalFilesAnalyzed,
    @totalFilesRemoved,
    @totalSpaceFreed,
    @criteriaUsed
  );

  SELECT * FROM [functional].[scanHistory] WHERE [id] = SCOPE_IDENTITY();
END;
GO
