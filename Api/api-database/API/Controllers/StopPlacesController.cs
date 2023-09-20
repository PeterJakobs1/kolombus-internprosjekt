using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public sealed partial class StopsPlacesController : ControllerBase
{
    readonly ModelContextBase modelContext;

    public StopsPlacesController(ModelContextBase modelContext)
    {
        this.modelContext = modelContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetStopPlaces(CancellationToken cancellationToken)
    {
        var stopPlaces = await modelContext.StopPlaces
            .AsNoTracking()

            .Select(sp => new StopPlaceVersion3()
            {
                Id = sp.Id,
                ExternalId = sp.ExternalId,
                Name = sp.Name,
                Latitude = sp.Latitude,
                Longitude = sp.Longitude,
                PublicCode = sp.Public_code,

            })
            .ToListAsync(cancellationToken);

        return Ok(stopPlaces);
    }

    [HttpGet]
    [Route("{externalId}/platforms")]
    public async Task<IActionResult> GetPlatforms(string externalId, CancellationToken cancellationToken)
    {
        var platforms = await modelContext.Platforms
            .AsNoTracking()
            .Where(p => p.StopPlace.ExternalId == externalId)
            .Select(sp => new Platform()
            {
                Id = sp.Id,
                ExternalId = sp.ExternalId,
                Name = sp.Name,
                Longitude = sp.Longitude,
                Latitude = sp.Latitude,
                Type = sp.Type,
                PublicCode = sp.Public_code,

            })
            .ToListAsync(cancellationToken);

        return Ok(platforms);
    }
}
