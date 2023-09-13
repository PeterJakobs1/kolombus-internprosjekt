using System.Text.Json.Serialization;

namespace API.Models;

sealed record LineVersion3
{
    [JsonPropertyName("id")]
    public Guid Id { get; set; }

    [JsonPropertyName("externalId")]
    public string ExternalId { get; set; }


    [JsonPropertyName("kolId")]
    public string KolId { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("transportMode")]
    public string TransportMode { get; set; }

    [JsonPropertyName("transportSubMode")]
    public string TransportSubMode { get; set; }

    [JsonPropertyName("publicCode")]
    public string PublicCode { get; set; }
}
