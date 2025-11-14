CREATE OR ALTER PROCEDURE [functional].[spScheduledTaskGet]
  @id INT
AS
BEGIN
  SET NOCOUNT ON;

  SELECT * FROM [functional].[scheduledTask]
  WHERE [id] = @id;
END;
GO
