/**
 * @schema subscription
 * Schema for account management and subscription services.
 */
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'subscription')
BEGIN
    EXEC('CREATE SCHEMA subscription');
END;
GO
