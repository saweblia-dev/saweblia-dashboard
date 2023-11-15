using Microsoft.AspNetCore.Mvc;
using Saweblia_Backend.Services.Interfaces;
using System.Threading.Tasks;
using Saweblia_Backend.Data.DTOs;

namespace Saweblia_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TypeTravailController : ControllerBase
    {
        private readonly ITypeTravailService _service;
        public TypeTravailController(ITypeTravailService service)
        {
            _service = service;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TypeTravailDTO>> GetById(int id)
        {
            var typeTravail = await _service.GetById(id);

            if (typeTravail == null)
            {
                return NotFound();
            }
            return Ok(typeTravail);
        }
    }
}