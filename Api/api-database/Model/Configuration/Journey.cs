using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Model.Configuration;

public sealed class Journey : IEntityTypeConfiguration<Entities.Journey>
{
    public void Configure(EntityTypeBuilder<Entities.Journey> builder)
    {
        builder.HasKey(e => e.Id);
    }
}