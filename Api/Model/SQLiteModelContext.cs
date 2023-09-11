using Microsoft.EntityFrameworkCore;

namespace Model;

public sealed class SQLiteModelContext : ModelContextBase
{
    public SQLiteModelContext(DbContextOptions<SQLiteModelContext> options) : base(options)
    {
    }
}