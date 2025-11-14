CREATE OR ALTER PROCEDURE [functional].[spScheduledTaskList]
AS
BEGIN
  SET NOCOUNT ON;

  SELECT * FROM [functional].[scheduledTask]
  ORDER BY [id] ASC;
END;
GO
