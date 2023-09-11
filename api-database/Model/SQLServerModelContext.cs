using Microsoft.EntityFrameworkCore;

namespace Model;

public sealed class SQLServerModelContext : ModelContextBase
{
    public SQLServerModelContext(DbContextOptions<SQLServerModelContext> options) : base(options)
    {
    }
}
