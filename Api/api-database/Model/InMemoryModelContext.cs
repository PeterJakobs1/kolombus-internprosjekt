using Microsoft.EntityFrameworkCore;

namespace Model;

public sealed class InMemoryModelContext : ModelContextBase
{
    public InMemoryModelContext(DbContextOptions<InMemoryModelContext> options) : base(options)
    {
    }
}
