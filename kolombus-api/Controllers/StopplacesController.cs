using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StopsPlacesController : ControllerBase
{
    private static List<Stopplaces> stopPlaces = new List<Stopplaces>
        {
            new Stopplaces
            {
                Id = 2,
                ExternalId = "123",
                JbvCode = "123",
                Name = "Test",
                Description = "Test",
                Latitude = 1.0,
                Longitude = 1.0,
                Type = "Test",
                TransportMode = "Test",
                SubModeType = "Test",
                ValidFrom = DateTimeOffset.Now,
                ValidTo = DateTimeOffset.Now
            },

            new() {
                Id = 2,
                ExternalId = "test-id",
                JbvCode = "123",
                Name = "Test stop 2",
                Description = "Test",
                Latitude = 1.0,
                Longitude = 1.0,
                Type = "Test",
                TransportMode = "Test",
                SubModeType = "Test",
                ValidFrom = DateTimeOffset.Now,
                ValidTo = DateTimeOffset.Now
            }
        };
    [HttpGet]
    public async Task<ActionResult<List<Stopplaces>>> GetAllStopplaces()
    {

        return Ok(stopPlaces);
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<List<Stopplaces>>> GetSingleStop(int id)
    {
        var stop = stopPlaces.Find(x => x.Id = id);
        return Ok(stop);
    }
}

