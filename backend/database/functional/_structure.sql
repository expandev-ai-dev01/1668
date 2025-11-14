/**
 * @schema functional
 * Schema for core business logic and application features.
 */
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'functional')
BEGIN
    EXEC('CREATE SCHEMA functional');
END;
GO

/**
 * @table scanHistory Stores records of past cleaning operations.
 * @multitenancy false
 * @softDelete false
 * @alias sch
 */
CREATE TABLE [functional].[scanHistory] (
  [id] INT IDENTITY(1, 1) NOT NULL,
  [operationDate] DATETIME2 NOT NULL,
  [directoryAnalyzed] NVARCHAR(1024) NOT NULL,
  [totalFilesAnalyzed] INT NOT NULL,
  [totalFilesRemoved] INT NOT NULL,
  [totalSpaceFreed] BIGINT NOT NULL, -- in bytes
  [criteriaUsed] NVARCHAR(MAX) NOT NULL -- Stored as JSON string
);
GO

ALTER TABLE [functional].[scanHistory]
ADD CONSTRAINT [pkScanHistory] PRIMARY KEY CLUSTERED ([id]);
GO

ALTER TABLE [functional].[scanHistory]
ADD CONSTRAINT [dfScanHistory_operationDate] DEFAULT (GETUTCDATE()) FOR [operationDate];
GO

/**
 * @table scheduledTask Stores configurations for scheduled cleaning tasks.
 * @multitenancy false
 * @softDelete false
 * @alias sct
 */
CREATE TABLE [functional].[scheduledTask] (
  [id] INT IDENTITY(1, 1) NOT NULL,
  [isActive] BIT NOT NULL DEFAULT (1),
  [frequency] NVARCHAR(50) NOT NULL, -- 'daily', 'weekly', 'monthly', 'custom'
  [executionTime] TIME NOT NULL,
  [dayOfWeek] INT NULL, -- 1 (Sunday) to 7 (Saturday)
  [dayOfMonth] INT NULL, -- 1 to 31
  [cronExpression] NVARCHAR(255) NULL,
  [directories] NVARCHAR(MAX) NOT NULL, -- JSON array of paths
  [cleaningConfig] NVARCHAR(MAX) NOT NULL, -- JSON object of criteria
  [nextRun] DATETIME2 NULL,
  [lastRun] DATETIME2 NULL
);
GO

ALTER TABLE [functional].[scheduledTask]
ADD CONSTRAINT [pkScheduledTask] PRIMARY KEY CLUSTERED ([id]);
GO

ALTER TABLE [functional].[scheduledTask]
ADD CONSTRAINT [chkScheduledTask_frequency] CHECK ([frequency] IN ('daily', 'weekly', 'monthly', 'custom'));
GO
