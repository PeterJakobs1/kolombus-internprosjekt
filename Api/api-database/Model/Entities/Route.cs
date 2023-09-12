using Microsoft.EntityFrameworkCore;

namespace Model.Entities;

[EntityTypeConfiguration(typeof(Configuration.Route))]
public sealed class Route
{
    public Guid Id { get; set; } = Guid.Empty;
    public string ExternalId { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? Direction { get; set; }
    public string DestinationDisplay { get; set; } = string.Empty;
    public Guid LineId { get; set; } = Guid.Empty;
    public Line Line { get; set; } = null!;
    public ICollection<StopTime> Stops { get; set; } = new List<StopTime>();
}
