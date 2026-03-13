using TaskManagerApi.Models;

namespace TaskManagerApi.DTOs;

// POST /api/tasks
public class CreateTaskDto
{
    public required string Title { get; set; }
    public string? Description { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? DueDate { get; set; }
    public string? Category { get; set; }
    public TaskDifficulty Difficulty { get; set; } = TaskDifficulty.Medium;
}

// PUT /api/tasks/{id} - all fields optional
public class UpdateTaskDto
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? DueDate { get; set; }
    public string? Category { get; set; }
    public TaskDifficulty? Difficulty { get; set; }
    // Moving between Kanban columns: NotDone=0, InProgress=1, Done=2
    public Models.TaskStatus? Status { get; set; }
}
