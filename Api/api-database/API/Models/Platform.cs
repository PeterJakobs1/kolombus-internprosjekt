using System.Text.Json.Serialization;

namespace API.Models;

sealed record Platform
{
    [JsonPropertyName("id")]
    public Guid Id { get; set; }

    [JsonPropertyName("nsrId")]
    public string NSRId { get; set; }

    [JsonPropertyName("externalId")]
    public string ExternalId { get; set; }

    [JsonPropertyName("stopPlaceId")]
    public string StopPlaceId { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("description")]
    public string Description { get; set; }

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

    [JsonPropertyName("public_code")]
    public string? PublicCode { get; set; }

    [JsonPropertyName("privateCode")]
    public string PrivateCode { get; set; }
}
