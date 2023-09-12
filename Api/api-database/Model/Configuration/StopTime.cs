using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Model.Configuration;

public sealed class StopTime : IEntityTypeConfiguration<Entities.StopTime>
{
    public void Configure(EntityTypeBuilder<Entities.StopTime> builder)
    {
        builder.HasKey(e => e.Id);
    }
}
