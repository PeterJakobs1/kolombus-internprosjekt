using Microsoft.EntityFrameworkCore;
using Model.Converters;
using Model.Entities;

namespace Model;

public abstract class ModelContextBase : DbContext
{
    public ModelContextBase(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Journey> Journeys { get; set; }
    public DbSet<Line> Lines { get; set; }
    public DbSet<Platform> Platforms { get; set; }
    public DbSet<Route> Routes { get; set; }
    public DbSet<StopPlace> StopPlaces { get; set; }
    public DbSet<StopTime> StopTimes { get; set; }

    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        configurationBuilder.Properties<TimeOnly>()
            .HaveConversion<TimeOnlyConverter>()
            .HaveColumnType("time");

        base.ConfigureConventions(configurationBuilder);
    }
}
