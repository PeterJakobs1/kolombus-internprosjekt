using System.Text.Json.Serialization;

namespace API.Models;

sealed record StopPlaceVersion3
{
    [JsonPropertyName("id")]
    public Guid Id { get; set; }

    [JsonPropertyName("externalId")]
    public string ExternalId { get; set; }

    [JsonPropertyName("jbvCode")]
    public string JbvCode { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("description")]
    public string? Description { get; set; }

    [JsonPropertyName("latitude")]
    public double Latitude { get; set; }

    [JsonPropertyName("longitude")]
    public double Longitude { get; set; }

    [JsonPropertyName("type")]
    public string Type { get; set; }

    [JsonPropertyName("transportMode")]
    public string TransportMode { get; set; }

    [JsonPropertyName("subModeType")]
    public string SubModeType { get; set; }

    [JsonPropertyName("validFrom")]
    public DateTimeOffset ValidFrom { get; set; }

    [JsonPropertyName("validTo")]
    public DateTimeOffset ValidTo { get; set; }
}
