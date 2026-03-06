using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagerApi.Data;
using TaskManagerApi.DTOs;
using TaskManagerApi.Models;
using TaskManagerApi.Services;

namespace TaskManagerApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _context;

    public TasksController(AppDbContext context)
    {
        _context = context;
    }

    // GET /api/tasks  (optional: ?status=0/1/2)
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskItem>>> GetAll([FromQuery] Models.TaskStatus? status)
    {
        var query = _context.Tasks.AsQueryable();
        if (status.HasValue)
            query = query.Where(t => t.Status == status.Value);
        return await query.OrderByDescending(t => t.CreatedAt).ToListAsync();
    }

    // GET /api/tasks/5
    [HttpGet("{id}")]
    public async Task<ActionResult<TaskItem>> GetById(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task is null)
            return NotFound(new { message = $"Task with ID {id} not found." });
        return task;
    }

    // POST /api/tasks
    [HttpPost]
    public async Task<ActionResult<TaskItem>> Create([FromBody] CreateTaskDto dto)
    {
        var task = new TaskItem
        {
            Title       = dto.Title,
            Description = dto.Description,
            StartDate   = dto.StartDate,
            DueDate     = dto.DueDate,
            Category    = dto.Category,
            Difficulty  = dto.Difficulty,
            Status      = Models.TaskStatus.NotDone,
            TimeDone    = 0,
            CreatedAt   = DateTime.UtcNow
        };

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = task.TaskId }, task);
    }

    // PUT /api/tasks/5  (also handles Kanban column drag → status change)
    [HttpPut("{id}")]
    public async Task<ActionResult<object>> Update(int id, [FromBody] UpdateTaskDto dto)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task is null)
            return NotFound(new { message = $"Task with ID {id} not found." });

        GamificationResult? gamification = null;

        if (dto.Title is not null)       task.Title       = dto.Title;
        if (dto.Description is not null) task.Description = dto.Description;
        if (dto.StartDate is not null)   task.StartDate   = dto.StartDate;
        if (dto.DueDate is not null)     task.DueDate     = dto.DueDate;
        if (dto.Category is not null)    task.Category    = dto.Category;
        if (dto.Difficulty is not null)  task.Difficulty  = dto.Difficulty.Value;

        if (dto.Status is not null && dto.Status.Value != task.Status)
        {
            gamification = GamificationService.CalculateStatusChange(
                task.Status, dto.Status.Value, task.Difficulty);

            task.Status = dto.Status.Value;

            if (dto.Status.Value == Models.TaskStatus.Done)
            {
                task.TimeDone++;
                task.CompletionDate = DateTime.UtcNow;
            }
        }

        await _context.SaveChangesAsync();

        return Ok(new
        {
            task,
            gamification = gamification is null ? null : new
            {
                moneyEarned = gamification.MoneyEarned,
                hpLost      = gamification.HpLost,
                message     = gamification.MoneyEarned > 0
                    ? $"+{gamification.MoneyEarned} coins earned! 🎉"
                    : gamification.MoneyEarned < 0
                        ? $"{gamification.MoneyEarned} coins deducted."
                        : null
            }
        });
    }

    // DELETE /api/tasks/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task is null)
            return NotFound(new { message = $"Task with ID {id} not found." });

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
