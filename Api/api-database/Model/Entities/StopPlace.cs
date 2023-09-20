using Microsoft.EntityFrameworkCore;

namespace Model.Entities;

[EntityTypeConfiguration(typeof(Configuration.StopPlace))]
public sealed class StopPlace
{
    public Guid Id { get; set; } = Guid.Empty;
    public string ExternalId { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Jbv_code { get; set; } = string.Empty;
    public string Public_code { get; set; } = string.Empty;
    public string Modification { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Transport_mode { get; set; } = string.Empty;
    public string Sub_mode_type { get; set; } = string.Empty;
    public DateTimeOffset? Created { get; set; }
    public DateTimeOffset? Changed { get; set; }
    public string? Description { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public DateTimeOffset? ValidFrom { get; set; }
    public DateTimeOffset? ValidTo { get; set; }
    public ICollection<Platform> Platforms { get; set; } = new List<Platform>();
}
