using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Model.Converters;

public sealed class TimeOnlyConverter : ValueConverter<TimeOnly, TimeSpan>
{
    public TimeOnlyConverter() : base(
        t => t.ToTimeSpan(),
        t => TimeOnly.FromTimeSpan(t))
    {
    }
}
