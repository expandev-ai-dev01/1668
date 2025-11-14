/**
 * @schema security
 * Schema for authentication, authorization, and security-related objects.
 */
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'security')
BEGIN
    EXEC('CREATE SCHEMA security');
END;
GO
