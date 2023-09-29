using Microsoft.EntityFrameworkCore;
using Model;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var database = builder.Configuration.GetValue<string>("Database");

//builder.Services.AddDbContext<ModelContextBase, InMemoryModelContext>(options =>
//    options.UseInMemoryDatabase("kolumbus"));

//builder.Services.AddDbContext<ModelContextBase, SQLiteModelContext>(options =>
//    options.UseSqlite(
//        builder.Configuration.GetConnectionString("SQLite"),
//        x => x.MigrationsAssembly("ModelMigrations")));


var isRunningLocally = builder.Environment.IsDevelopment();

if (isRunningLocally)
{
    builder.Services.AddDbContext<ModelContextBase, SQLServerModelContext>(options =>
        options.UseSqlServer(
            builder.Configuration.GetConnectionString("SQLite"),
            x => x.MigrationsAssembly("ModelMigrations")));
}
else
{
    builder.Services.AddDbContext<ModelContextBase, SQLServerModelContext>(options =>
       options.UseSqlServer(
           builder.Configuration.GetConnectionString("KolombusDB"),
           x => x.MigrationsAssembly("ModelMigrations")));
}
var app = builder.Build();

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
app.UseSwagger();
app.UseSwaggerUI();
app.UseDeveloperExceptionPage();
// }

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
