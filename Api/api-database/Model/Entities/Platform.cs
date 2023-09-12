using Microsoft.EntityFrameworkCore;

namespace Model.Entities;

[EntityTypeConfiguration(typeof(Configuration.Platform))]
public sealed class Platform
{
    public Guid Id { get; set; } = Guid.Empty;
    public string ExternalId { get; set; } = string.Empty;
    public string NSRId { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string? PublicCode { get; set; }

    public Guid StopPlaceId { get; set; } = Guid.Empty;
    public StopPlace StopPlace { get; set; } = null!;

    public ICollection<StopTime> Stops { get; set; } = new List<StopTime>();
}
