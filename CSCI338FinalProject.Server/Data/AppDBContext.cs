using CSCI338FinalProject.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace CSCI338FinalProject.Server.Data
{
    public class AppDbContext : DbContext
    {   
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Exercise> Exercises => Set<Exercise>();
        public DbSet<Workout> Workouts => Set<Workout>();
        public DbSet<ExerciseSet> ExerciseSets => Set<ExerciseSet>();
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasMany(w => w.Workouts);

            modelBuilder.Entity<Workout>()
            .HasMany(e => e.Exercises);

            modelBuilder.Entity<Exercise>()
                .HasMany(e => e.ExerciseSets);
        }
    }
}
