using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public sealed partial class PlatformsController : ControllerBase
{
    readonly ModelContextBase modelContext;

    public PlatformsController(ModelContextBase modelContext)
    {
        this.modelContext = modelContext;
    }

    [HttpGet]
    [Route("{platformId:guid}/lines")]
    public async Task<IActionResult> GetLines(Guid platformId, CancellationToken cancellationToken)
    {
        var lines = await modelContext.StopTimes
            .AsNoTracking()
            .Where(st => st.PlatformId == platformId)
            .Include(st => st.Route)
            .Include(st => st.Route.Line)
            .Select(st => new LineVersion3()
            {
                Id = st.Route.Line.Id,
                ExternalId = st.Route.Line.ExternalId,
                KolId = string.Empty,
                Name = st.Route.Line.Name,
                TransportMode = string.Empty,
                TransportSubMode = string.Empty,
                PublicCode = st.Route.Line.PublicCode
            })
            .ToListAsync(cancellationToken);

        return Ok(lines);
    }

    [HttpGet]
    [Route("{platformId:guid}/departures")]
    public async Task<IActionResult> GetDepartures(Guid platformId, DateTimeOffset startTime, int limit, CancellationToken cancellationToken)
    {
        var departures = await modelContext.StopTimes
            .AsNoTracking()
            .Where(st => st.PlatformId == platformId)
            .Include(st => st.Route)
            .Include(st => st.Route.Line)
            .Select(st => new StopTimeVersion4()
            {
                Id = st.Route.Line.Id,
                LineNumber = st.Route.Line.PublicCode,
                LineName = st.Route.Line.Name,
                Latitude = st.Platform.Latitude,
                Longitude = st.Platform.Longitude,
            })
            .ToListAsync(cancellationToken);

        return Ok(departures);
    }
}