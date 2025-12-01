using CSCI338FinalProject.Server.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(11, 0, 0)) 
    )
);

builder.Services.AddControllers();

builder.Services.AddScoped<Suggestion>();
builder.Services.AddSingleton<AppStore>();

builder.Services.AddCors(options =>
{
	options.AddPolicy("Dev", builder =>
	{
		builder.AllowAnyOrigin()
			   .AllowAnyMethod()
			   .AllowAnyHeader();
	});
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}

app.UseStaticFiles();
app.UseRouting();
app.UseCors("Dev");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Workouts}/{action=Index}/{id?}");

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

//app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
