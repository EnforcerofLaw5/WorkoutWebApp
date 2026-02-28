using Microsoft.EntityFrameworkCore;
using WOWA.BLL.DAL;
using WOWA.BLL.Dtos;

namespace WOWA.BLL.Repositories;

public interface IExerciseRepository
{
    Task<Exercise> Create(Exercise exercise);
    Task Delete(int id);
    Task<Exercise?> Get(int id);
    Task<List<Exercise>> GetAll();
    Task<List<Exercise>> GetByName(string name);
    Task<Exercise> Update(Exercise exercise);
}

public class ExerciseRepository(AppDbContext _context) : IExerciseRepository
{
    public async Task<List<Exercise>> GetAll()
    {
        var exercises = new List<Exercise>();
        var dbExercises = await _context.Exercises.ToListAsync();
        foreach (var dbExercise in dbExercises)
            exercises.Add(dbExercise.MaptoDto());
        return exercises;
    }

    public async Task<Exercise?> Get(int id)
    {
        var exercise = await _context.Exercises.FindAsync(id);
        if (exercise == null)
            return null;
        return exercise.MaptoDto();
    }

    public async Task<List<Exercise>> GetByName(string name)
    {
        var exercises = new List<Exercise>();
        var exercise = await _context.Exercises.Where(x => x.Name == name).ToListAsync();
        foreach (var dbExercise in exercise)
            exercises.Add(dbExercise.MaptoDto());
        return exercises;
    }

    public async Task<Exercise> Create(Exercise exercise)
    {
        var dbExercise = await exercise.MapToModel(_context);
        _context.Exercises.Add(dbExercise);
        await _context.SaveChangesAsync();
        return dbExercise.MaptoDto();
    }

    public async Task<Exercise> Update(Exercise exercise)
    {
        var dbExercise = await exercise.MapToModel(_context);
        await _context.SaveChangesAsync();
        return dbExercise.MaptoDto();
    }

    public async Task Delete(int id)
    {
        var exercise = await _context.Exercises.FindAsync(id);
        if (exercise == null) return;
        _context.Remove(exercise);
        await _context.SaveChangesAsync();
    }
}