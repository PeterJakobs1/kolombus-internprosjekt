using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Model.Configuration;

public sealed class Route : IEntityTypeConfiguration<Entities.Route>
{
    public void Configure(EntityTypeBuilder<Entities.Route> builder)
    {
        builder.HasKey(e => e.Id);
    }
}