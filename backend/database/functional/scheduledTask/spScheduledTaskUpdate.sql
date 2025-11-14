CREATE OR ALTER PROCEDURE [functional].[spScheduledTaskUpdate]
  @id INT,
  @isActive BIT = NULL,
  @frequency NVARCHAR(50) = NULL,
  @executionTime TIME = NULL,
  @dayOfWeek INT = NULL,
  @dayOfMonth INT = NULL,
  @cronExpression NVARCHAR(255) = NULL,
  @directories NVARCHAR(MAX) = NULL,
  @cleaningConfig NVARCHAR(MAX) = NULL
AS
BEGIN
  SET NOCOUNT ON;

  UPDATE [functional].[scheduledTask]
  SET
    [isActive] = ISNULL(@isActive, [isActive]),
    [frequency] = ISNULL(@frequency, [frequency]),
    [executionTime] = ISNULL(@executionTime, [executionTime]),
    [dayOfWeek] = ISNULL(@dayOfWeek, [dayOfWeek]),
    [dayOfMonth] = ISNULL(@dayOfMonth, [dayOfMonth]),
    [cronExpression] = ISNULL(@cronExpression, [cronExpression]),
    [directories] = ISNULL(@directories, [directories]),
    [cleaningConfig] = ISNULL(@cleaningConfig, [cleaningConfig])
  WHERE [id] = @id;

  SELECT * FROM [functional].[scheduledTask] WHERE [id] = @id;
END;
GO
