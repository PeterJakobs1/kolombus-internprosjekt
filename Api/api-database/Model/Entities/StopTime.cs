using Microsoft.EntityFrameworkCore;

namespace Model.Entities;

[EntityTypeConfiguration(typeof(Configuration.StopTime))]
public sealed class StopTime
{
    public string Id { get; set; } = string.Empty;

    public Guid JourneyId { get; set; } = Guid.Empty;
    public Journey Journey { get; set; } = null!;

    public Guid RouteId { get; set; } = Guid.Empty;
    public Route Route { get; set; } = null!;

    public Guid PlatformId { get; set; } = Guid.Empty;
    public Platform Platform { get; set; } = null!;
}
