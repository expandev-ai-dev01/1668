CREATE OR ALTER PROCEDURE [functional].[spScheduledTaskCreate]
  @isActive BIT,
  @frequency NVARCHAR(50),
  @executionTime TIME,
  @dayOfWeek INT = NULL,
  @dayOfMonth INT = NULL,
  @cronExpression NVARCHAR(255) = NULL,
  @directories NVARCHAR(MAX),
  @cleaningConfig NVARCHAR(MAX)
AS
BEGIN
  SET NOCOUNT ON;

  INSERT INTO [functional].[scheduledTask] (
    [isActive],
    [frequency],
    [executionTime],
    [dayOfWeek],
    [dayOfMonth],
    [cronExpression],
    [directories],
    [cleaningConfig]
  )
  VALUES (
    @isActive,
    @frequency,
    @executionTime,
    @dayOfWeek,
    @dayOfMonth,
    @cronExpression,
    @directories,
    @cleaningConfig
  );

  SELECT * FROM [functional].[scheduledTask] WHERE [id] = SCOPE_IDENTITY();
END;
GO
