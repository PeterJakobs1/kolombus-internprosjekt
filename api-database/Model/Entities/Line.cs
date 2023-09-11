using Microsoft.EntityFrameworkCore;

namespace Model.Entities;

[EntityTypeConfiguration(typeof(Configuration.Line))]
public sealed class Line
{
    public Guid Id { get; set; } = Guid.Empty;
    public string ExternalId { get; set; } = string.Empty;
    //public string KolId { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;
    //public string TransportMode { get; set; }
    //public string TransportSubMode { get; set; }
    public string PublicCode { get; set; } = string.Empty;

    public ICollection<Route> Routes { get; set; } = new List<Route>();
}
