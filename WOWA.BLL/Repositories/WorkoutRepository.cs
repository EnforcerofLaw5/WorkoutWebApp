using Microsoft.EntityFrameworkCore;
using WOWA.BLL.DAL;
using WOWA.BLL.Dtos;

namespace WOWA.BLL.Repositories;

public interface IWorkoutRepository
{
	Task<Workout> Create(Workout workout);
	Task Delete(int id);
	Task<Workout?> Get(int id);
	Task<List<Workout>> GetAll();
	Task<List<Workout>> GetByName(string name);
	Task<Workout> Update(Workout workout);
}

public class WorkoutRepository(AppDbContext _context) : IWorkoutRepository
{
	public async Task<List<Workout>> GetAll()
	{
		var workouts = new List<Workout>();
		var dbWorkouts = await _context.Workouts.ToListAsync();
		foreach (var dbWorkout in dbWorkouts)
			workouts.Add(dbWorkout.MaptoDto());
		return workouts;
	}

	public async Task<Workout?> Get(int id)
	{
		var workout = await _context.Workouts.FindAsync(id);
		if (workout == null)
			return null;
		return workout.MaptoDto();
	}

	public async Task<List<Workout>> GetByName(string name)
	{
		var workouts = new List<Workout>();
		var workout = await  _context.Workouts.Where(x => x.Name == name).ToListAsync();
		foreach (var dbWorkout in workout)
			workouts.Add(dbWorkout.MaptoDto());
		return workouts;
	}

	public async Task<Workout> Create(Workout workout)
	{
		var dbWorkout = await workout.MapToModel(_context);
		_context.Workouts.Add(dbWorkout);
		await _context.SaveChangesAsync();
		return dbWorkout.MaptoDto();
	}

	public async Task<Workout> Update(Workout workout)
	{
		var dbWorkout = await workout.MapToModel(_context);
		await _context.SaveChangesAsync();
		return dbWorkout.MaptoDto();
	}

	public async Task Delete(int id)
	{
		var workout = await _context.Workouts.FindAsync(id);
		if (workout == null) return;
		_context.Remove(workout);
		await _context.SaveChangesAsync();
	}
}