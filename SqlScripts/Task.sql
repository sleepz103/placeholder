USE [placeholder];
GO
DROP TABLE [dbo].[Task];

CREATE TABLE [dbo].[Task] (
    [TaskId] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Title] NVARCHAR(200) NOT NULL,
    [Status] INT NOT NULL DEFAULT 0,
    [CompletionDate] DATETIME2 NULL,
    [DueDate] DATETIME2 NULL,
    [Description] NVARCHAR(1000) NULL,
    [StartDate] DATETIME2 NULL,
    [Category] NVARCHAR(100) NULL,
    [Difficulty] INT NOT NULL DEFAULT 2,
    [TimeDone] INT NOT NULL DEFAULT 0,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);