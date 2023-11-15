using Microsoft.AspNetCore.Identity;

namespace Saweblia_Backend.Models;

public class User
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string full_name { get; set; }
    public string phone { get; set; }

/*    public virtual List<Facture> Factures { get; set; } = new List<Facture>();*/

    // Add other properties as needed
}