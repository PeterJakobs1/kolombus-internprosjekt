using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public sealed class JourneysController : ControllerBase
{
    readonly ModelContextBase modelContext;

    public JourneysController(ModelContextBase modelContext)
    {
        this.modelContext = modelContext;
    }

    [HttpGet]
    [Route("{tripId}/stoptimes")]
    public async Task<IActionResult> GetStopTimes(string tripId, DateOnly date, TimeOnly time, CancellationToken cancellationToken)
    {
        var departures = await modelContext.StopTimes
            .AsNoTracking()
            .Where(j => j.Journey.TripId == tripId)
            .Include(st => st.Route)
            .Include(st => st.Route.Line)
            .Select(st => new StopTimeVersion4()
            {
                Id = st.Route.Line.Id,
                LineNumber = st.Route.Line.PublicCode,
                LineName = st.Route.Line.Name,
            })
            .ToListAsync(cancellationToken);

        return Ok(departures);
    }
}