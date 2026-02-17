using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WOWA.BLL.DAL;
using WOWA.BLL.Repositories;
using WOWA.BLL.Validation;

namespace WOWA.BLL
{
	public static class StartUp
	{
		public static IServiceCollection AddBusinessLogic(this IServiceCollection services,
			IConfiguration configuration)
		{
			services.AddDbContext<AppDbContext>(options =>
				options.UseSqlServer(
					configuration.GetConnectionString("DefaultConnection")
				)
			);

			services.AddTransient<IWorkoutRepository, WorkoutRepository>();
			services.AddTransient<IWorkoutValidator, WorkoutValidator>();

			return services;
		}
	}
}
