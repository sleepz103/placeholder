using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagerApi.Models;

public enum TaskStatus
{
    NotDone    = 0,
    InProgress = 1,
    Done       = 2
}

public enum TaskDifficulty
{
    Easy   = 1,
    Medium = 2,
    Hard   = 3
}

// Maps to existing [dbo].[Task] on Azure SQL.
// Existing columns: TaskId, Title, Status, CompletionDate, DueDate
// New gamification columns: run AlterTable.sql in SSMS first!
[Table("Task")]
public class TaskItem
{
    [Key]
    [Column("TaskId")]
    public int TaskId { get; set; }

    [Column("Title")]
    public required string Title { get; set; }

    [Column("Status")]
    public TaskStatus Status { get; set; } = TaskStatus.NotDone;

    [Column("CompletionDate")]
    public DateTime? CompletionDate { get; set; }

    [Column("DueDate")]
    public DateTime? DueDate { get; set; }

    [Column("Description")]
    public string? Description { get; set; }

    [Column("StartDate")]
    public DateTime? StartDate { get; set; }

    [Column("Category")]
    public string? Category { get; set; }

    [Column("Difficulty")]
    public TaskDifficulty Difficulty { get; set; } = TaskDifficulty.Medium;

    [Column("TimeDone")]
    public int TimeDone { get; set; } = 0;

    [Column("CreatedAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
