using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;
using Model.Entities;

namespace prime_internal_project_2023.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DataController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Create(IServiceProvider serviceProvider, CancellationToken cancellationToken)
    {
        using var scope = serviceProvider.CreateScope();
        //using var modelContext = scope.ServiceProvider.GetRequiredService<InMemoryModelContext>();
        using var modelContext = scope.ServiceProvider.GetRequiredService<SQLServerModelContext>();

        await modelContext.Database.EnsureDeletedAsync(cancellationToken);
        modelContext.Database.EnsureCreated();

        await StopPlaces(modelContext, cancellationToken);
        await Platforms(modelContext, cancellationToken);
        await Lines(modelContext, cancellationToken);
        await Routes(modelContext, cancellationToken);
        await Journeys(modelContext, cancellationToken);
        await StopTimes(modelContext, cancellationToken);

        return Ok("Done");
    }

    static async Task StopPlaces(SQLServerModelContext modelContext, CancellationToken cancellationToken)
    {
        var stopPlaces = JsonNode.Parse(System.IO.File.OpenRead("Data/stopplaces.json"))!.AsArray();

        foreach (var record in stopPlaces!)
        {
            await modelContext.StopPlaces.AddAsync(new StopPlace()
            {
                Id = (Guid)record!["id"]!,
                ExternalId = (string)record!["external_id"]!,
                Jbv_code = (string)record!["jbv_code"]!,
                Name = (string)record!["name"]!,
                Description = (string)record!["description"]!,
                Modification = (string)record!["modification"]!,
                Latitude = (double)record!["latitude"]!,
                Longitude = (double)record!["longitude"]!,
                Type = (string)record!["type"]!,
                Transport_mode = (string)record!["transport_mode"]!,
                Sub_mode_type = (string)record!["sub_mode_type"]!,
                ValidFrom = (DateTimeOffset?)record!["valid_from"]!,
                ValidTo = (DateTimeOffset?)record!["valid_to"],
                Created = (DateTimeOffset?)record!["created"]!,
                Changed = (DateTimeOffset?)record!["changed"]!,
            }, cancellationToken);
        }

        modelContext.SaveChanges();
    }

    static async Task Platforms(SQLServerModelContext modelContext, CancellationToken cancellationToken)
    {
        var platforms = JsonNode.Parse(System.IO.File.OpenRead("Data/platforms.json"))!.AsArray();

        foreach (var record in platforms!)
        {
            await modelContext.Platforms.AddAsync(new Platform()
            {
                Id = (Guid)record!["id"]!,
                NSRId = (string)record!["nsr_id"]!,
                ExternalId = (string)record!["external_id"]!,
                StopPlaceId = (Guid)record!["stop_place_id"]!,
                Name = (string)record!["name"]!,
                Modification = (string)record!["modification"]!,
                Description = (string)record!["description"]!,
                Latitude = (double)record!["latitude"]!,
                Longitude = (double)record!["longitude"]!,
                Type = (string)record!["type"]!,
                Transport_mode = (string)record!["transport_mode"]!,
                //Sub_mode_type = (string)record!["sub_mode_type"]!,
                PublicCode = (string)record!["public_code"]!,
                Private_code = (string)record!["private_code"]!,
                Changed = (DateTimeOffset?)record!["changed"]!,
                Created = (DateTimeOffset?)record!["created"]!,
            }, cancellationToken);
        }

        modelContext.SaveChanges();
    }

    static async Task Lines(SQLServerModelContext modelContext, CancellationToken cancellationToken)
    {
        var lines = JsonNode.Parse(System.IO.File.OpenRead("Data/lines.json"))!.AsArray();

        foreach (var record in lines!)
        {
            await modelContext.Lines.AddAsync(new Line()
            {
                Id = (Guid)record!["id"]!,
                ExternalId = (string)record!["external_id"]!,
                Name = (string)record!["name"]!,
                KolId = (string)record!["kol_id"]!,
                // TransportationType = (string)record!["transportation_type"]!,
                //  Transport_Sub_Mode = (string)record!["transport_sub_mode"]!,
                PublicCode = (string)record!["public_code"]!,
            }, cancellationToken);
        }

        modelContext.SaveChanges();
    }

    static async Task Routes(SQLServerModelContext modelContext, CancellationToken cancellationToken)
    {
        var lines = new Dictionary<string, Guid?>(await modelContext.Lines
            .AsNoTracking()
            .Select(l => new KeyValuePair<string, Guid?>(l.ExternalId, l.Id))
            .ToArrayAsync(cancellationToken));

        var routes = JsonNode.Parse(System.IO.File.OpenRead("Data/routes.json"))!.AsArray();

        Guid? lineId = null;

        foreach (var record in routes!)
        {
            lineId = lines.GetValueOrDefault((string)record!["line_ref"]!);

            if (lineId == null)
            {
                continue;
            }

            await modelContext.Routes.AddAsync(new Model.Entities.Route()
            {
                Id = (Guid)record!["id"]!,
                ExternalId = (string)record!["external_id"]!,
                Name = (string)record!["name"]!,
                Direction = (string)record!["direction"]!,
                DestinationDisplay = (string)record!["destination_display"]!,
                LineId = lineId.Value
            }, cancellationToken);
        }

        modelContext.SaveChanges();
    }

    static async Task Journeys(SQLServerModelContext modelContext, CancellationToken cancellationToken)
    {
        var journeys = JsonNode.Parse(System.IO.File.OpenRead("Data/journeys.json"))!.AsArray();

        foreach (var record in journeys!)
        {
            await modelContext.Journeys.AddAsync(new Journey()
            {
                Id = (Guid)record!["id"]!,
                ExternalId = (string)record!["external_id"]!,
                TripId = (string)record!["trip_id"]!,
                Name = (string)record!["name"]!,
                StartTime = TimeOnly.Parse((string)record!["start_time"]!),
                EndTime = TimeOnly.Parse((string)record!["end_time"]!),
            }, cancellationToken);
        }

        modelContext.SaveChanges();
    }

    static async Task StopTimes(SQLServerModelContext modelContext, CancellationToken cancellationToken)
    {
        var journeys = new Dictionary<string, Guid?>(await modelContext.Journeys
            .AsNoTracking()
            .Select(j => new KeyValuePair<string, Guid?>(j.TripId, j.Id))
            .ToArrayAsync(cancellationToken));

        var platforms = new Dictionary<string, Guid?>(await modelContext.Platforms
            .AsNoTracking()
            .Select(l => new KeyValuePair<string, Guid?>(l.NSRId, l.Id))
            .ToArrayAsync(cancellationToken));

        var stopTimes = JsonNode.Parse(System.IO.File.OpenRead("Data/stoptimes.json"))!.AsArray();

        Guid? journeyId = null;
        Guid? platformId = null;

        foreach (var record in stopTimes!)
        {
            journeyId = journeys.GetValueOrDefault((string)record!["trip_id"]!);
            platformId = platforms.GetValueOrDefault((string)record!["platform_nsr_id"]!);

            if (journeyId == null || platformId == null)
            {
                continue;
            }

            await modelContext.StopTimes.AddAsync(new StopTime()
            {
                Id = (string)record!["id"]!,
                JourneyId = journeyId.Value,
                RouteId = new Guid("1D24AF55-6603-4CFC-8D89-CCDDA8275940"), // TODO
                PlatformId = platformId.Value,
            }, cancellationToken);
        }

        modelContext.SaveChanges();
    }
}
