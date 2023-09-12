using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Model.Configuration;

public sealed class Platform : IEntityTypeConfiguration<Entities.Platform>
{
    public void Configure(EntityTypeBuilder<Entities.Platform> builder)
    {
        builder.HasKey(e => e.Id);
    }
}