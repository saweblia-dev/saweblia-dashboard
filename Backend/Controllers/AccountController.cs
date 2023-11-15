using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Saweblia_Backend.Data;
using Saweblia_Backend.Data.DTOs;
using Saweblia_Backend.Models;
namespace Saweblia_Backend.Controllers;
[ApiController]
[Route("[controller]")]
public class AccountController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly MyDbContext _dbContext;
    public AccountController(IConfiguration configuration, MyDbContext dbContext)
    {
        _configuration = configuration;
        _dbContext = dbContext;
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register(UserDTO model)
    {
        if (ModelState.IsValid)
        {
            // Check if email is already taken
            if (await _dbContext.Users.AnyAsync(u => u.phone == model.phone))
            {
                ModelState.AddModelError("", "Phone is already taken.");
                return BadRequest(ModelState);
            }

            // Hash the password (implement your own password hashing logic)

            string hashedPassword;

            hashedPassword  = HashPassword(model.Password);
            
                
            // Save the user to the database
            User user = new User
            {
                Email = model.Email,
                Password = hashedPassword,
                full_name = model.full_name,
                phone = model.phone,
            };
            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
        return BadRequest(ModelState);
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login(UserDTO model)
    {
        if (ModelState.IsValid)
        {
            // Check if the email and password or the phone num match
            User user = await _dbContext.Users.FirstOrDefaultAsync(u => u.phone == model.phone);

            if (user != null)
            {
                return Ok(new { User = user });
            }

            ModelState.AddModelError("", "Invalid Phone Number");
        }

        return BadRequest(ModelState);
    }

    private string HashPassword(string password)
    {
        // Implement your password hashing logic (e.g., using bcrypt)
        using var sha256 = SHA256.Create();
        var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
        var hashedPassword = BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
        return hashedPassword;
    }

}