using TaskManagerApi.Models;

namespace TaskManagerApi.Services;

/// <summary>
/// Calculates money earned and HP lost based on task difficulty.
/// Inspired by Habitica – tuned for developer habits.
/// </summary>
public static class GamificationService
{
    // Money earned when a task is moved to "Done"
    private static readonly Dictionary<TaskDifficulty, int> MoneyRewards = new()
    {
        { TaskDifficulty.Easy,   10 },
        { TaskDifficulty.Medium, 25 },
        { TaskDifficulty.Hard,   50 }
    };

    // HP lost when a task is overdue and still NotDone
    private static readonly Dictionary<TaskDifficulty, int> HpPenalties = new()
    {
        { TaskDifficulty.Easy,   5  },
        { TaskDifficulty.Medium, 15 },
        { TaskDifficulty.Hard,   30 }
    };

    public static int GetMoneyReward(TaskDifficulty difficulty) =>
        MoneyRewards[difficulty];

    public static int GetHpPenalty(TaskDifficulty difficulty) =>
        HpPenalties[difficulty];

    /// <summary>
    /// Returns the gamification result when a task status changes.
    /// </summary>
    public static GamificationResult CalculateStatusChange(
        Models.TaskStatus oldStatus,
        Models.TaskStatus newStatus,
        TaskDifficulty difficulty)
    {
        // Task completed → earn money
        if (newStatus == Models.TaskStatus.Done && oldStatus != Models.TaskStatus.Done)
            return new GamificationResult(MoneyEarned: GetMoneyReward(difficulty), HpLost: 0);

        // Task moved back from Done → lose money
        if (oldStatus == Models.TaskStatus.Done && newStatus != Models.TaskStatus.Done)
            return new GamificationResult(MoneyEarned: -GetMoneyReward(difficulty), HpLost: 0);

        return new GamificationResult(MoneyEarned: 0, HpLost: 0);
    }
}

public record GamificationResult(int MoneyEarned, int HpLost);
