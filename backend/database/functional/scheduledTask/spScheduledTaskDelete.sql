CREATE OR ALTER PROCEDURE [functional].[spScheduledTaskDelete]
  @id INT
AS
BEGIN
  SET NOCOUNT ON;

  DELETE FROM [functional].[scheduledTask]
  WHERE [id] = @id;
END;
GO
