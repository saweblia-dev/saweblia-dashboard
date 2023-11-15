using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Saweblia_Backend.Data;
using Saweblia_Backend.Data.DTOs;
using Saweblia_Backend.Services.Interfaces;
using System.Threading.Tasks;

namespace Saweblia_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly IConfiguration _configuration;

        public AdminController(MyDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("authenticate")]
        [AllowAnonymous]
        public async Task<IActionResult> Authenticate([FromBody] AdminDTO model)
        {
            if (model == null)
                return BadRequest(new { Message = "Invalid request. Please provide valid data." });

            // Retrieve admin by username and password
            Saweblia_Backend.Models.Admin admin = await _context.Admins
                .FirstOrDefaultAsync(x => x.UserName == model.UserName && x.Password == model.Password);

            if (admin == null)
                return NotFound(new { Message = "Admin not found. Please check your credentials." });

            // Generate JWT Token
            var token = GenerateJwtToken(admin);

            // If you have more information to return about the connected user, you can include it here.
            var responseData = new
            {
                Message = "Login Success!",
                Token = token,
                ConnectedUser = new
                {
                    admin.Id,
                    admin.UserName,
                    // Include other properties as needed
                }
            };

            return Ok(responseData);
        }

        private string GenerateJwtToken(Saweblia_Backend.Models.Admin admin)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            string secretKey = _configuration["JwtSettings:SecretKey"];

            // Print the secret key to console for debugging
            Console.WriteLine($"JWT Secret Key: {secretKey}");

            byte[] key = Encoding.ASCII.GetBytes(secretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
            new Claim(ClaimTypes.Name, admin.Id.ToString()),
                    // Add more claims as needed
                }),
                Expires = DateTime.UtcNow.AddHours(1), // Token expiration time
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}
