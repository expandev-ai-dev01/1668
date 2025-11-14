/**
 * @schema config
 * Schema for system-wide configuration and settings.
 */
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'config')
BEGIN
    EXEC('CREATE SCHEMA config');
END;
GO
