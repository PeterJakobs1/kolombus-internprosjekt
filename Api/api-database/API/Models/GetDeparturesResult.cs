using System.Text.Json.Serialization;

namespace API.Models;

sealed record StopTimeVersion4
{
    [JsonPropertyName("id")]
    public Guid Id { get; set; }

    [JsonPropertyName("lineNumber")]
    public string LineNumber { get; set; }

    [JsonPropertyName("lineName")]
    public string LineName { get; set; }

    [JsonPropertyName("transportMode")]
    public string TransportMode { get; set; }

    [JsonPropertyName("transportSubMode")]
    public string TransportSubMode { get; set; }

    [JsonPropertyName("destination")]
    public string Destination { get; set; }

    [JsonPropertyName("staticDestination")]
    public string StaticDestination { get; set; }

    [JsonPropertyName("alighting")]
    public bool Alighting { get; set; }

    [JsonPropertyName("boarding")]
    public bool Boarding { get; set; }

    [JsonPropertyName("timeType")]
    public string TimeType { get; set; }

    [JsonPropertyName("timeSource")]
    public string TimeSource { get; set; }

    [JsonPropertyName("platformId")]
    public string PlatformId { get; set; }

    [JsonPropertyName("platformName")]
    public string PlatformName { get; set; }

    [JsonPropertyName("platformCode")]
    public string PlatformCode { get; set; }

    [JsonPropertyName("platformExternalId")]
    public string PlatformExternalId { get; set; }

    [JsonPropertyName("platformNsrId")]
    public string PlatformNsrId { get; set; }

    [JsonPropertyName("tripId")]
    public string TripId { get; set; }

    [JsonPropertyName("order")]
    public int Order { get; set; }

    [JsonPropertyName("isNextStop")]
    public bool IsNextStop { get; set; }

    [JsonPropertyName("arrivalStatus")]
    public string ArrivalStatus { get; set; }

    [JsonPropertyName("departureStatus")]
    public string DepartureStatus { get; set; }

    [JsonPropertyName("scheduleArrivalTime")]
    public DateTimeOffset ScheduleArrivalTime { get; set; }

    [JsonPropertyName("scheduleDepartureTime")]
    public DateTimeOffset ScheduleDepartureTime { get; set; }

    [JsonPropertyName("expectedArrivalTime")]
    public DateTimeOffset ExpectedArrivalTime { get; set; }

    [JsonPropertyName("expectedDepartureTime")]
    public DateTimeOffset ExpectedDepartureTime { get; set; }

    [JsonPropertyName("notices")]
    public List<string> Notices { get; set; }

    [JsonPropertyName("creationTime")]
    public DateTimeOffset CreationTime { get; set; }

    [JsonPropertyName("isValid")]
    public bool IsValid { get; set; }

    [JsonPropertyName("vehicleId")]
    public string VehicleId { get; set; }

    [JsonPropertyName("publicCode")]
    public string Public_Code { get; set; }
}
