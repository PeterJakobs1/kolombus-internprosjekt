using System;
using System.Text.Json;
using System.Text.Json.Serialization;

public class DateAndTimeConverter : JsonConverter<DateTimeOffset>
{
    public override DateTimeOffset Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        if (reader.TokenType == JsonTokenType.String)
        {
            if (DateTimeOffset.TryParse(reader.GetString(), out DateTimeOffset dateTimeOffset))
            {
                return dateTimeOffset;
            }
        }

        return DateTimeOffset.MinValue;
    }

    public override void Write(Utf8JsonWriter writer, DateTimeOffset value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString("yyyy-MM-ddTHH:mm:ss.fffzzz"));
    }
}
