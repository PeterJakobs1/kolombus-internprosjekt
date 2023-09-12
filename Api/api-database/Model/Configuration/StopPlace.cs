using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Model.Configuration;

public sealed class StopPlace : IEntityTypeConfiguration<Entities.StopPlace>
{
    public void Configure(EntityTypeBuilder<Entities.StopPlace> builder)
    {
        builder.HasKey(e => e.Id);
    }
}