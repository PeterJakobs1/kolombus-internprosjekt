using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Model.Configuration;

public sealed class Line : IEntityTypeConfiguration<Entities.Line>
{
    public void Configure(EntityTypeBuilder<Entities.Line> builder)
    {
        builder.HasKey(e => e.Id);
    }
}