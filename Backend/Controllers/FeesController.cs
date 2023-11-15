using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Saweblia_Backend.Data;
using Saweblia_Backend.Models;

namespace Saweblia_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FeesController : ControllerBase
    {
        private readonly MyDbContext _context;

        public FeesController(MyDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public ActionResult<Fee> GetById(int id)
        {
            var fees = _context.Fees.FirstOrDefault(f => f.Id_Fees == id);

            if (fees == null)
            {
                return NotFound();
            }
            return fees;
        }
    }
}
